/*
 *  Copyright 2015-2023 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


/* jshint esversion: 9 */

//
// General auxiliar functions
//

// Management of JSON object (see README_ng.md for more information)
function wsasm_new_objElto ( base_elto )
{
        var elto = {
		       comments:     [],  // need_in_memory as comments: array of string
		       labels:       [],
		       track_source: [],  // need_in_memory as source_tracking: array of string

                       seg_name:     '',
                       datatype:     '',  // datatype
                       byte_size:     0,  // size(datatype) in bytes
                       value:        '0',
                       format:       '',

                       binary:               '',
                       firm_reference:       null,
                       firm_reference_index: -1,
                       pending:              []
                   } ;

        if (null != base_elto) {
	    elto.seg_name  = base_elto.seg_name ;
	    elto.datatype  = base_elto.datatype ;
            elto.byte_size = base_elto.byte_size ;
        }

        return elto ;
}

function wsasm_make_signature_user ( elto, use_as_around )
{
        var offset = elto.signature_type_arr.length - elto.signature_size_arr.length ;

	elto.signature_user = '' ;
	for (let j=0; j<elto.signature_size_arr.length; j++)
        {
	     elto.signature_user = elto.signature_user +
                                   '[ ' +
                                       elto.signature_type_arr[j+offset] + ', ' +
                                       elto.signature_size_arr[j] + use_as_around + ' bits' +
                                   ' ]' ;
	}

	return elto.signature_user ;
}

function wsasm_get_sel_valbin ( value, start_bit, stop_bit )
{
         var sel_start = 0 ;
         var sel_stop  = 0 ;
         var valbin    = 0 ;
         var a = null ;

         if (start_bit > stop_bit) // 31>12
         {
             sel_start = (WORD_LENGTH - 1) - start_bit ; // 0
             sel_stop  = (WORD_LENGTH - 1) - stop_bit ;  // 19
         }
         else // 0>11
         {
             sel_stop  = (WORD_LENGTH - 1) - start_bit ; // 31
             sel_start = (WORD_LENGTH - 1) - stop_bit ;  // 20
         }

         a = dt_get_decimal_value(value) ;
         valbin = parseInt(a.number) ;
         if (valbin < 0)
              valbin = (valbin >>> 0).toString(2) ;
         else valbin = valbin.toString(2).padStart(WORD_LENGTH, '0') ;

         valbin = valbin.substring(sel_start, sel_stop+1) ; // [0:19], [20,31]
         return valbin ;
}

function wsasm_eltoError ( context, elto, msg )
{
         asm_setLabelContext(context, elto.associated_context) ;

         return asm_langError(context, msg) ;
}

function wsasm_get_similar_candidates ( context, elto )
{
         var msg = elto.source ;
         if (typeof elto.associated_pseudo !== "undefined") {
	     msg = elto.source + ' (part of pseudoinstruction "' + elto.associated_pseudo.source + '")' ;
         }

         msg = i18n_get_TagFor('compiler', 'REMEMBER FORMAT USED') +
	       "'" + msg + "': <br>" +
	       "<span class='m-2'>\u2718</span> " +
	       elto.value.signature_user + "<br>" ;

         msg += i18n_get_TagFor('compiler', 'NOT MATCH FORMAT') + ":<br>" ;
         for (let key in context.firmware)
         {
	      if ( (key.includes(elto.value.instruction)) || (elto.value.instruction.includes(key)) )
	      {
		  for (let k=0; k<context.firmware[key].length; k++) {
		       msg += "<span class='m-1'>\u2714</span> " +
			      context.firmware[key][k].signature_user + "<br>" ;
		  }
	      }
         }
         msg += i18n_get_TagFor('compiler', 'CHECKS') ;

         return msg ;
}

function wsasm_is_ValidTag ( tag )
{
        var tg = tag.trim() ;
        if ("" == tg) {
            return false;
        }

        var ret = isDecimal(tg[0]) ;
        if (ret.isDecimal == true) {
            return false;
        }

        var myRegEx = /[^a-z,_\d]/i ;
        return !(myRegEx.test(tag)) ;
}

function wsasm_order2index_startstop ( start_bit, stop_bit )
{
     // Translate from startbit/stop_bit to asm_start_bit/asm_stop_bit:
     //
     // .../63/31(MSB) ..................... 0(LSB)
     //                      ^         ^
     //                 start_bit  stop_bit

     var lower_bit = 0 ;
     var w_index   = 0 ;
     var n_bits    = 0 ;
     var w_n_bits  = WORD_LENGTH ;
     for (let m=0; m<start_bit.length; m++)
     {
          lower_bit    = Math.min(start_bit[m], stop_bit[m]) ;
          w_index      = ~~(lower_bit / w_n_bits) ;
          start_bit[m] = w_index * 2 * w_n_bits + w_n_bits - 1 - start_bit[m] ; // w_index*64+32-1 - start_bit 
          stop_bit[m]  = w_index * 2 * w_n_bits + w_n_bits - 1 - stop_bit[m] ;  // w_index*64+32-1 - stop_bit 
	  n_bits       = n_bits + Math.abs(stop_bit[m] - start_bit[m]) + 1 ;
     }

     return n_bits ;
}

function wsasm_mk_default_options ( )
{
           var options = {} ;

           // Initialize default options...
	   options.field_multipart_order = "backwards" ; // "backwards" | "forwards" ;
	   options.mandatory_comma       = false ; // false | true
           options.instruction_comma     = true  ; // true  | false

           return options ;
}

function wsasm_expand_options ( base_options )
{
           var options = wsasm_mk_default_options() ;

           // Replace default options if exits in base_options
           for (var key in options)
           {
                if (typeof base_options[key] !== "undefined") {
                    options[key] = base_options[key] ;
                }
           }

           return options ;
}


//
//  (1/3) Prepare context for compiling and loading   (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_prepare_context ( CU_data, asm_source )
//   * wsasm_prepare_context_firmware           ( context, CU_data )
//   * wsasm_prepare_context_pseudoinstructions ( context, CU_data )
//

function wsasm_prepare_oc ( elto, aux )
{
	elto.oc = {
                     value:         '',    // "begin {...}" has no 'co/oc' field
                     asm_start_bit: [ 0 ], // initial value to 0:0 to skip this field by default
                     asm_stop_bit:  [ 0 ]
                  } ;

        // set elto.oc.value
	if (typeof aux.co !== "undefined") {
	     elto.oc.value = aux.co ;
        }
	else
        if (typeof aux.oc !== "undefined") {
	     elto.oc.value = aux.oc ;
        }

        // IF empty 'oc' -> return default elto...
        if (0 == elto.oc.value.length) {
            return elto ;
        }

        // copy start/stop from ir.default_eltos by default
        var xr_info = simhw_sim_ctrlStates_get() ;
	elto.oc.asm_start_bit[0] = parseInt(xr_info.ir.default_eltos.oc.begin) ;
	elto.oc.asm_stop_bit [0] = parseInt(xr_info.ir.default_eltos.oc.end) ;
        elto.oc.asm_n_bits       = elto.oc.asm_stop_bit[0] - elto.oc.asm_start_bit[0] + 1 ;

        // IF firmware v1 -> return elto...
	if (typeof aux.fields_all == "undefined") {
            return elto ;
        }

        // IF firmware v2 with start/stop bit -> copy + return elto
        for (let k=0; k<aux.fields_all.length; k++)
        {
	     if (typeof aux.fields_all[k].type == "undefined") {
                 continue ;
             }
	     if (aux.fields_all[k].type != "oc") {
                 continue ;
             }

             // copy start/stop bits...
	     for (let m=0; m<aux.fields_all[k].bits_start.length; m++) {
	    	  elto.oc.asm_start_bit[m] = parseInt(aux.fields_all[k].bits_start[m]) ;
                  elto.oc.asm_stop_bit [m] = parseInt(aux.fields_all[k].bits_stop[m]) ;
	     }

             // translate bit to index...
             elto.oc.asm_n_bits = wsasm_order2index_startstop(elto.oc.asm_start_bit, elto.oc.asm_stop_bit) ;
        }

        return elto ;
}

function wsasm_prepare_eoc ( elto, aux )
{
	elto.eoc = {
                      value:         '',    // "begin {...}" has no 'cop/eoc' field
                      asm_start_bit: [ 0 ], // initial value to 0:0 to skip this field by default
                      asm_stop_bit:  [ 0 ]
                   } ;

        // elto.eoc.value
	if (typeof aux.cop !== "undefined") {
	     elto.eoc.value = aux.cop ;
        }
	else if (typeof aux.eoc !== "undefined") {
	     elto.eoc.value = aux.eoc ;
        }

        // copy start/stop from ir.default_eltos by default
        var xr_info = simhw_sim_ctrlStates_get() ;
	elto.eoc.asm_start_bit[0] = parseInt(xr_info.ir.default_eltos.eoc.begin) ;
	elto.eoc.asm_stop_bit [0] = parseInt(xr_info.ir.default_eltos.eoc.end) ;
        elto.eoc.asm_n_bits       = elto.eoc.asm_stop_bit[0] - elto.eoc.asm_start_bit[0] + 1 ;

        // IF empty 'eoc' -> return elto...
        if (0 == elto.eoc.value.length) {
	    elto.eoc.asm_start_bit[0] = elto.eoc.asm_stop_bit[0] + 1 ; // in order to skip empty eoc
            elto.eoc.asm_n_bits       = 0 ;
            return elto ;
        }

        // IF firmware v1 -> return elto...
	if (typeof aux.fields_all == "undefined") {
            return elto ;
        }

        // IF firmware v2 with start/stop bit -> copy + return elto
        for (let k=0; k<aux.fields_all.length; k++)
        {
	     if (typeof aux.fields_all[k].type == "undefined") {
                 continue ;
             }
	     if (aux.fields_all[k].type != "eoc") {
                 continue ;
             }

             // copy start/stop bits...
	     for (let m=0; m<aux.fields_all[k].bits_start.length; m++) {
	    	  elto.eoc.asm_start_bit[m] = parseInt(aux.fields_all[k].bits_start[m]) ;
                  elto.eoc.asm_stop_bit [m] = parseInt(aux.fields_all[k].bits_stop[m]) ;
	     }

             // translate bit to index...
             elto.eoc.asm_n_bits = wsasm_order2index_startstop(elto.eoc.asm_start_bit, elto.eoc.asm_stop_bit) ;
        }

        return elto ;
}

function wsasm_prepare_context_firmware ( context, CU_data )
{
           let elto = null ;
	   let aux  = null ;
           let start_bit = [] ;
           let stop_bit  = [] ;
           let lower_bit = 0 ;
           let w_n_bits  = 0 ;
           let w_index   = 0 ;
           let n_bits    = 0 ;

	   // Fill firmware
	   for (let i=0; i<CU_data.firmware.length; i++)
           {
		aux = CU_data.firmware[i];

	   	if (typeof context.firmware[aux.name] === "undefined") {
	   	    context.firmware[aux.name] = [] ;
		}

                // elto: initial fields...
                elto = {} ;

                elto.name                = aux.name ;
		elto.isPseudoinstruction = false ;
		elto.nwords              = parseInt(aux.nwords) ;
		elto.oc                  = {} ;  // computed later
		elto.eoc                 = {} ;  // computed later
		elto.fields              = [] ;  // computed later
		elto.signature           = aux.signature ;
		elto.signature_type_str  = aux.name ;
		elto.signature_type_arr  = '' ;  // computed later
		elto.signature_size_str  = '' ;  // computed later
		elto.signature_size_arr  = [] ;  // computed later

		if (typeof aux.signatureUser !== "undefined") {
                    elto.signature_type_str = aux.signatureUser ;
                }

                // tooltip with details...
		elto["mc-start"] = aux["mc-start"] ;
		elto.microcode   = aux.microcode ;
		elto.help        = aux.help ;

                // fields: oc + eoc
                wsasm_prepare_oc(elto, aux) ;
                wsasm_prepare_eoc(elto, aux) ;

                // fields...
		if (typeof aux.fields !== "undefined") {
                    elto.fields = aux.fields ;
                }

		elto.signature_size_arr.push(elto.oc.value.length) ;
                for (let j=0; j<elto.fields.length; j++)
                {
                     // initial values...
                     start_bit = [] ;
                     stop_bit  = [] ;
                     if (1 == CU_data.version)
                     {
                         start_bit[0] = parseInt(elto.fields[j].startbit) ;
                         stop_bit[0]  = parseInt(elto.fields[j].stopbit) ;
                     }
                     else // (2 == CU_data.version)
                     {
                         if ("forwards" == context.options.field_multipart_order)
                         {
				 for (let m=0; m<elto.fields[j].bits_start.length; m++)
				 {
				      start_bit[m] = parseInt(elto.fields[j].bits_start[m]) ;
	                              stop_bit[m]  = parseInt(elto.fields[j].bits_stop[m]) ;
				 }
                         }
                         else // "backwards"
                         {
				 for (let m=0; m<elto.fields[j].bits_start.length; m++)
				 {
                                      om = elto.fields[j].bits_start.length - 1 - m ;
				      start_bit[m] = parseInt(elto.fields[j].bits_start[om]) ;
	                              stop_bit[m]  = parseInt(elto.fields[j].bits_stop[om]) ;
				 }
                         }
                     }

                     // translate from startbit/stop_bit to asm_start_bit/asm_stop_bit...
                     n_bits = wsasm_order2index_startstop(start_bit, stop_bit) ;

                     // copy back the computed values
                     elto.fields[j].asm_start_bit = start_bit ;
                     elto.fields[j].asm_stop_bit  = stop_bit ;
                     elto.fields[j].asm_n_bits    = n_bits ;

		     elto.signature_size_arr.push(n_bits) ;
                }

                // elto: derived fields...
                elto.signature_type_str = base_replaceAll(elto.signature_type_str, 'inm', 'imm') ;  // TODO: temporal fix
		elto.signature_size_str = elto.signature_size_arr.join(' ') ;
		elto.signature_type_arr = elto.signature_type_str.split(' ') ;
                elto.signature_user     = wsasm_make_signature_user(elto, '') ;

                // add elto to firmware
	   	context.firmware[aux.name].push(elto) ;
	   }

	   return context ;
}

function wsasm_prepare_context_pseudoinstructions ( context, CU_data )
{
           let elto    = null ;
	   let initial = null ;
	   let finish  = null ;

	   // Fill pseudoinstructions
	   for (let i=0; i<CU_data.pseudoInstructions.length; i++)
	   {
		initial = CU_data.pseudoInstructions[i].initial ;
		finish  = CU_data.pseudoInstructions[i].finish ;

		if (typeof context.pseudoInstructions[initial.name] === "undefined")
                {
	 	    context.pseudoInstructions[initial.name] = 0 ;
		    if (typeof context.firmware[initial.name] === "undefined") {
		        context.firmware[initial.name] = [] ;
		    }
		}

		context.pseudoInstructions[initial.name]++;

                // initial elto fields...
                elto = {} ;

                elto.name                = initial.name ;
	        elto.isPseudoinstruction = true ;
	        elto.fields              = [] ;
	        elto.finish              = finish.signature ;
	        elto.signature           = initial.signature ;
	        elto.signature_type_str  = initial.signature.replace(/,/g," ") ;

                if (typeof initial.fields !== "undefined")  elto.fields = initial.fields ;

                // elto: derived fields...
                elto.signature_type_str = base_replaceAll(elto.signature_type_str, 'inm', 'imm') ;  // TODO: temporal fix
	        elto.signature_type_arr = elto.signature_type_str.split(' ') ;
		elto.signature_size_arr = Array(elto.signature_type_arr.length).fill(WORD_BYTES*BYTE_LENGTH);
		elto.signature_size_str = elto.signature_size_arr.join(' ') ;
                elto.signature_user     = wsasm_make_signature_user(elto, '') ;

                // add elto to firmware
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


//
//  (2/3) Compile assembly to JSON object (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_src2obj ( context )
//   * wsasm_src2obj_helper  ( context, ret )
//      * wsasm_src2obj_data ( context, ret )
//      * wsasm_src2obj_text ( context, ret )
//         * wsasm_src2obj_text_elto_fields  ( context, ret, elto, pseudo_context )
//           * wsasm_src2obj_text_instr_op_match ( context, ret, elto, atom, parentheses )
//           * wsasm_src2obj_text_ops_getAtom ( context, pseudo_context )
//         * wsasm_find_candidate_and_encode ( context, ret, elto )
//           * wsasm_encode_instruction ( context, ret, elto, candidate )
//             * wsasm_encode_field ( arr_encoded, value, start_bit, stop_bit )
//           * wsasm_find_instr_candidates ( context, ret, elto )
//             * wsasm_src2obj_text_getDistance ( elto_firm_reference_i, elto_value )
//   * wsasm_resolve_pseudo ( context, ret )
//   * wsasm_resolve_labels ( context, ret )
//      * wsasm_compute_labels  ( context, ret, start_at_obj_i )
//      * wsasm_get_label_value ( context, ret, elto, label )
//

function wsasm_src2obj_data ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
           var tag            = "" ;
           var acc_cmt        = "" ;
	   var ret1    = null ;
           var elto    = null ;

	   //
	   //  *.data*   |   *.data*
	   //   .text    |    label1: .directive "value"
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;

           elto = wsasm_new_objElto(null) ;
           elto.seg_name = seg_name ;

	   //
	   //   .data    |   .data
	   //  *.text*   |   *label1: .directive "value"*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                             // NOT end-of-file
                 )
           {
		   //
		   //  * label1: *
		   //  * label2: *  .word 2, 4
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

		   possible_tag = "" ;
		   while (
                           (! wsasm_is_directive_datatype(asm_getToken(context))) &&  // NOT .data/...
                           (! wsasm_isEndOfFile(context))                             // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // CHECK tag
		      if ("TAG" != asm_getTokenType(context))
                      {
                          if ("" == possible_tag) {
                              possible_tag = "[empty]" ;
                          }

			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'NO TAG OR DIRECTIVE') +
                                               "'" + possible_tag + "'") ;
		      }

		      tag = possible_tag.substring(0, possible_tag.length-1);

                      // CHECK tag is not an instruction, is repeated or has an invalid format
   		      if (wsasm_is_ValidTag(tag) == false) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (typeof ret.labels_asm[tag] != "undefined") {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;
		      ret.labels_asm[tag] = 0 ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   elto.associated_context = asm_getLabelContext(context) ;

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context))
                   {
		        // ELTO: in case of ending with 'label:' but without data value
                        if (elto.labels.length > 0) {
		            ret.obj.push(elto) ;
                        }

			break;
                   }

		   //
		   //    label1:
		   //    label2: *.word* 2, 4
		   //

		   elto.datatype = asm_getToken(context) ;

                   if (wsasm_has_datatype_attr(elto.datatype, "numeric"))
                   {
		        //  .word  *2, 4, 0x8F, 'a', 077*
		        //  .float *1.2345*

			// Get value size in bytes
			elto.byte_size = wsasm_get_datatype_size(elto.datatype) ;

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			while (
                                (wsasm_is_directive(asm_getToken(context)) == false) &&
                                (wsasm_isEndOfFile(context) == false)
                              )
                        {
				let number   = 0 ;
			        let num_bits = "0" ;

				// Get value
				ret1 = dt_get_imm_value(possible_value) ;
				if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                                {
                                    // CHECK numerical datatype
				    if (".word" !== elto.datatype)
                                    {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'NO NUMERIC DATATYPE') +
                                                             "'" + possible_value + "'") ;
				    }

                                    // CHECK valid label
				    if (wsasm_is_ValidTag(possible_value) == false) {
					 return asm_langError(context,
							      i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                                              "'" + possible_value + "'") ;
   				    }
				    if (context.firmware[possible_value]) {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                                             "'" + possible_value + "'") ;
   				    }

				    // Label as number (later translation)
                                    elto.pending.push({
                                                         type:         "field-data",
						         label:        possible_value,
						         addr:         elto.seg_ptr,
						         start_bit:    [ 0 ],
						         stop_bit:     [ WORD_BYTES*BYTE_LENGTH-1 ],
						         n_bits:       WORD_BYTES*BYTE_LENGTH,
						         rel:          false,
						         labelContext: asm_getLabelContext(context),
                                                         field_j:      0
                                                     }) ;
                                }
                                else
                                {
				    number = ret1.number ;

				    // Decimal/Float --> binary
				    if (ret1.isDecimal == true)
				         a = decimal2binary(number, elto.byte_size*BYTE_LENGTH) ;
				    else a =   float2binary(number, elto.byte_size*BYTE_LENGTH) ;

				    num_bits   = a[0] ;
				    free_space = a[1] ;

				    // CHECK size
				    if (free_space < 0)
				    {
				        return asm_langError(context,
							     i18n_get_TagFor('compiler', 'EXPECTED VALUE') + elto.datatype +
							     "' (" + elto.byte_size*BYTE_LENGTH + " bits), " +
							     i18n_get_TagFor('compiler', 'BUT INSERTED') + possible_value +
							     "' (" + num_bits.length + " bits) " +
							     i18n_get_TagFor('compiler', 'INSTEAD') ) ;
				    }
                                }

				// Add ELTO
                                elto.seg_name   = seg_name ;
		                elto.source     = possible_value ;
				elto.track_source.push(possible_value) ;
		                elto.comments.push(acc_cmt) ;
			        elto.value      = num_bits ;
                                elto.source_alt = elto.datatype + ' ' + possible_value ;
			        elto.format     = ret1.format ;

				ret.obj.push(elto) ;
                                elto = wsasm_new_objElto(elto) ; // new elto, same datatype


				// optional ','
				asm_nextToken(context) ;
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context) ;
                                }

			        if ( wsasm_is_directive(asm_getToken(context)) ||
                                     ("TAG" == asm_getTokenType(context)) ||
                                     ("."   == asm_getToken(context)[0]) )
                                {
				      break ; // end loop, already read token (tag/directive)
                                }

                                // <value> | .<directive>
				possible_value = asm_getToken(context) ;
                        }
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "space"))
                   {
		        //   .space *20*
		        //   .zero  *20*

                        // <value>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			// CHECK valid space argument
			ret1 = isDecimal(possible_value) ;
			possible_value = ret1.number ;
                        if (ret1.isDecimal == false) {
			    return asm_langError(context,
			                         i18n_get_TagFor('compiler', 'NO NUMBER OF BYTES') +
                                                 "'" + possible_value + "'") ;
		        }
			if (possible_value < 0) {
			     return asm_langError(context,
			                          i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') +
                                                  "'" + possible_value + "'") ;
			}

                        var byte_val = '0x0' ;
			if (".zero" != elto.datatype) {
                             byte_val = '_' ;
			}

			// ELTO: spaces/zeroes
                        elto.seg_name   = seg_name ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = possible_value ;
			elto.value      = byte_val ;
  			elto.track_source = Array(ret1.number).fill('_') ;
                        elto.source_alt = elto.datatype + ' ' + possible_value ;

			ret.obj.push(elto) ;
			elto = wsasm_new_objElto(null) ;

			asm_nextToken(context) ;
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "align"))
                   {
		        //   .align  *2*
		        //   .balign *4*

                        // <value>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			// CHECK if number
			ret1 = isDecimal(possible_value) ;
			possible_value = ret1.number ;
			if ( (ret1.isDecimal == false) && (possible_value >= 0) )
                        {
			     return asm_langError(context,
			                          i18n_get_TagFor('compiler', 'INVALID ALIGN VALUE') +
                                                  "'" + possible_value + "'. " +
			                          i18n_get_TagFor('compiler', 'REMEMBER ALIGN VAL')) ;
		        }

			// Calculate offset
                        var align_offset = parseInt(possible_value) ;  // .balign
                        if (".align" == elto.datatype) {
                            align_offset = Math.pow(2, align_offset) ; // .align
		        }

			// ELTO: spaces/zeroes
                        elto.seg_name   = seg_name ;
			elto.track_source.push('.align ' + possible_value) ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = align_offset ;
			elto.value      = possible_value ;
                        elto.source_alt = elto.datatype + ' ' + possible_value ;

                        ret.obj.push(elto) ;
                        elto = wsasm_new_objElto(null) ;

			asm_nextToken(context) ;
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "string"))
                   {
		        //  .ascii  * "hola", " mundo\n" *
		        //  .asciiz * "hola mundo" *
		        //  .string * "hola mundo" *

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

                        // CHECK valid string
                        ret1 = treatControlSequences(possible_value) ;
			if (true == ret1.error) {
			    return asm_langError(context, ret1.string);
		        }
                        possible_value = ret1.string ;

			while (!wsasm_is_directive(asm_getToken(context)) && !wsasm_isEndOfFile(context))
                        {
				// CHECK string
				if ("\"" !== possible_value[0]) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NO QUOTATION MARKS') +
                                                         "'" + possible_value + "'") ;
			        }
				if ("\"" !== possible_value[possible_value.length-1]) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NOT CLOSED STRING')) ;
			        }
				if ("" == possible_value) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NOT CLOSED STRING')) ;
			        }
		                if ("STRING" != asm_getTokenType(context)) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NO QUOTATION MARKS') +
                                                         "'" + possible_value + "'") ;
			        }

			        // ELTO: string
                                elto.seg_name   = seg_name ;
				elto.comments.push(acc_cmt) ;

				// process characters of the string
			        elto.value = [] ;
                                for (let i=0; i<possible_value.length; i++)
                                {
                                     if (possible_value[i] == "\"") {
                                         continue;
                                     }

  				     elto.track_source.push(possible_value[i]) ;
                                     num_bits = possible_value.charCodeAt(i) ;
			             elto.value.push(num_bits) ;
                                }
                                if ([".asciiz", ".string"].includes(elto.datatype)) {
                                     elto.value.push(0) ;
  				     elto.track_source.push('0x0') ;
                                }
				elto.byte_size  = elto.value.length ;
				elto.source     = possible_value ;
                                elto.source_alt = elto.datatype + ' ' + base_replaceAll(possible_value, '\n', '\\n') ;
				
				ret.obj.push(elto) ;
				elto = wsasm_new_objElto(elto) ;


				// optional ','
				asm_nextToken(context);
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context);
			        }

			        if (
                                     wsasm_is_directive(asm_getToken(context)) ||
                                     ("TAG" == asm_getTokenType(context))      ||
                                     ("."   == asm_getToken(context)[0])
                                   )
                                {
				     break ; // end loop, already read token (tag/directive)
                                }

                                // <value> | .<directive>
				possible_value = asm_getToken(context);
                                ret1 = treatControlSequences(possible_value) ;
				if (true == ret1.error) {
				    return asm_langError(context, ret1.string);
			        }

                                possible_value = ret1.string ;
                        }
		   }
		   else
		   {
                        // CHECK datatype
			return asm_langError(context,
				             i18n_get_TagFor('compiler', 'UNEXPECTED DATATYPE') +
                                             "'" + elto.datatype + "'") ;
		   }
           }

	   // Return ret
           return ret ;
}


function wsasm_encode_field ( arr_encoded, value, start_bit, stop_bit )
{
           var val_i = 0 ;
           for (let m=0; m<=start_bit.length; m++)
           {
                for (let k=start_bit[m]; k<=stop_bit[m]; k++)
                {
                     if (typeof value[val_i] == "undefined") {
                         console.log("wsasm_encode_field: value.length < encode space :-S") ;
                     }

                     arr_encoded[k] = value[val_i] ;
                     val_i++ ;
                }
           }
}

function wsasm_encode_instruction ( context, ret, elto, candidate )
{
           var start_bit = 0 ;
           var stop_bit  = 0 ;
           var n_bits    = 0 ;
           var value       = 0 ;
           var val_encoded = "" ;
           var arr_encoded = "" ;
           var ret1      = null ;
           var bit_size  = 0 ;

           // prepare val_encoded...
           bit_size    = elto.byte_size * BYTE_LENGTH ;
           val_encoded = "0".repeat(bit_size) ;
           arr_encoded = val_encoded.split('');

           // (1) Instruction, copy 'co' and 'cop' field...
           wsasm_encode_field(arr_encoded,
                              candidate.oc.value,  candidate.oc.asm_start_bit,  candidate.oc.asm_stop_bit) ;
           wsasm_encode_field(arr_encoded,
                              candidate.eoc.value, candidate.eoc.asm_start_bit, candidate.eoc.asm_stop_bit) ;

           // (2) Fields, copy values...
           //     Example:
           //     * elto.value.signature_type_arr = [ 'li', *'reg', 'imm'* ]
           //     * candidate.fields = [ {name: 'r1', type: 'reg', asm_start_bit: [0], asm_stop_bit: [5]}, {...} ]
           for (let j=0; j<candidate.fields.length; j++)
           {
                // start/stop bit...
                start_bit = candidate.fields[j].asm_start_bit ;
                stop_bit  = candidate.fields[j].asm_stop_bit ;
                n_bits    = candidate.fields[j].asm_n_bits ;

                // value to be encode...
                if ( ["imm", "(imm)", "address", "(address)"].includes(elto.value.signature_type_arr[j+1]) )
                {
                         value = elto.value.fields[j] ;
                         if ('(' == value[0]) {
                              value = value.replace('(', '').replace(')', '') ;
                         }

			 ret1 = dt_get_imm_value(value) ;
			 if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                         {
                              var pinfo = {
                                             type:         "field-instruction",
                                             label:        elto.value.fields[j],
                                             addr:         0,
                                             start_bit:    start_bit,
                                             stop_bit:     stop_bit,
                                             n_bits:       n_bits,
                                             rel:          false,
					     labelContext: asm_getLabelContext(context),
                                             field_j:      j
                                          } ;
                              elto.pending.push(pinfo) ;

                              if (["address", "(address)"].includes(elto.value.signature_type_arr[j+1]))
                              {
                                   if (   (typeof candidate.fields[j].address_type != "undefined") &&
                                        ("abs" != candidate.fields[j].address_type) )
                                   {
                                        pinfo.rel = true ;
                                   }
                              }

                              continue ; // no full field to add (label to be resolved) -> skip adding this field
                         }

			 if (ret1.isDecimal)
			      a = decimal2binary(ret1.number, n_bits) ;
			 else a =   float2binary(ret1.number, n_bits) ;

			 value = a[0] ;
                         if (a[1] < 0)
                         {
			     return wsasm_eltoError(context, elto,
						    i18n_get_TagFor('compiler', 'EXPECTED VALUE') + " immediate" +
						    " (" + n_bits + " bits), " +
						    i18n_get_TagFor('compiler', 'BUT INSERTED') + elto.value.fields[i-1] +
						    " (" + value.length + " bits) " +
						    i18n_get_TagFor('compiler', 'INSTEAD') ) ;
                         }

			 value = value.padStart(n_bits, '0') ; // TOCHECK: if negative number, then already filled with '1'...
                }
                else if ( ["reg", "(reg)"].includes(elto.value.signature_type_arr[j+1]) )
                {
                         value = elto.value.fields[j] ;
                         if ('(' == value[0]) {
                              value = value.replace('(', '').replace(')', '') ;
                         }
                         value = context.registers[value] ;
			 value = (value >>> 0).toString(2) ;
			 value = value.padStart(n_bits, '0') ;
                }
                else
                {
                         // TODO: Should be error if not field type is detected ??

                         // this is a sink case...
			 value = "0".padStart(n_bits, '0') ;
                }

                // add field...
                wsasm_encode_field(arr_encoded, value, start_bit, stop_bit) ;
           }

           return arr_encoded.join('') ;
}

function wsasm_src2obj_text_getDistance ( elto_firm_reference_i, elto_value )
{
           // get candidate signature_type and signature_size...
           var candidate_type_as_string = base_replaceAll(elto_firm_reference_i.signature_type_str, 'address', 'imm') ;
           var candidate_size_as_intarr = elto_firm_reference_i.signature_size_arr ;

           // get elto signature_type and signature_size...
           var signature_type_as_string = base_replaceAll(elto_value.signature_type_arr.join(' '), 'address', 'imm') ;
           var signature_size_as_intarr = elto_value.signature_size_arr ;

           // if candidate has not the same types as expected then return is NOT candidate
           if (candidate_type_as_string != signature_type_as_string) {
               return -1 ;
           }

           // if candidate is smaller than expected then return is NOT candidate
           var distance   = 0 ;
           var distance_j = 0 ;
           var offset_j   = 0 ;
           offset_j = candidate_size_as_intarr.length - signature_size_as_intarr.length ;
           for (let j=0; j<candidate_size_as_intarr.length; j++)
           {
                distance_j = candidate_size_as_intarr[j+offset_j] - signature_size_as_intarr[j] ;
                if (distance_j < 0) {
                    return -1 ;
                }

                distance = distance + distance_j ;
           }

           return distance ;
}

function wsasm_find_instr_candidates ( context, ret, elto )
{
           var candidates = 0 ;
           var distance   = 0 ;

           // for each candidate, check if can be used...
           elto.firm_reference_distance = -1 ;
           elto.firm_reference_index    =  0 ;
           for (let i=0; i<elto.firm_reference.length; i++)
           {
                distance = wsasm_src2obj_text_getDistance(elto.firm_reference[i], elto.value) ;
                if (distance < 0) {
                    continue ;
                }

                candidates++ ;
                if ( (elto.firm_reference_distance < 0) ||
                     (elto.firm_reference_distance > distance) )
                {
                    elto.firm_reference_distance = distance ;
                    elto.firm_reference_index    = i ;
                }
           }

	   // CHECK: elto signature* match at least one firm_reference
	   if (0 == candidates) {
               var msg = wsasm_get_similar_candidates(context, elto) ;
               return wsasm_eltoError(context, elto, msg) ;
	   }

           // update instruction size for multi-word instructions (e.g.: 'la address' in 2 words)
           elto.byte_size = elto.firm_reference[elto.firm_reference_index].nwords * WORD_BYTES ;

           // Return ret
           return ret ;
}

function wsasm_src2obj_text_instr_op_match ( context, ret, elto, atom, parentheses )
{
	   var opx = '' ;

           // if atom is register -> $0, x0, ...
	   if (typeof context.registers[atom] != "undefined")
           {
	       if (parentheses) {
	           elto.value.fields.push('(' + atom + ')') ;
	           elto.value.signature_type_arr.push('(reg)') ;
	       }
	       else {
	           elto.value.fields.push(atom) ;
	           elto.value.signature_type_arr.push('reg') ;
	       }
	       elto.value.signature_size_arr.push(context.registers[atom].toString(2).length) ;

	       // return ok
	       return ret ;
           }

           // if atom is immediate -> 0x123, 12, 3.14, ...
	   var ret1 = dt_get_imm_value(atom) ;
	   if ( (ret1.isDecimal) || (ret1.isFloat) )
           {
                   var a = null ;
	           if (ret1.isDecimal)
		        a = decimal2binary(ret1.number, elto.byte_size*BYTE_LENGTH) ;
	           else a =   float2binary(ret1.number, elto.byte_size*BYTE_LENGTH) ;

		   if (parentheses) {
		       elto.value.fields.push('(' + atom + ')') ;
		       elto.value.signature_type_arr.push('(imm)') ;
		   }
		   else {
	               elto.value.fields.push(atom) ;
	               elto.value.signature_type_arr.push('imm') ;
		   }
	           elto.value.signature_size_arr.push(a[2]) ; // a[2]: minimum number of bits to represent a[0]...

		   // return ok
		   return ret ;
           }

	   if (parentheses) {
	       elto.value.fields.push('(' + atom + ')') ;
	       elto.value.signature_type_arr.push('(address)') ;
	   }
	   else {
	       elto.value.fields.push(atom) ;
	       elto.value.signature_type_arr.push('address') ;
	   }

           // while address is unknown we cannot compute the minimal number of bits to encode it -> 1 single bit
           // in resolve_labels we compute the minimal (and if needed, recompute candidate)...
	   elto.value.signature_size_arr.push(1) ;

	   // return ok
	   return ret ;
}

function wsasm_src2obj_text_ops_getAtom ( context, pseudo_context )
{
         var opx = '' ;

	 if (pseudo_context != null)
         {
             // if (end-of-file) -> return ''
	     if (pseudo_context.index >= pseudo_context.parts.length) {
	         return '' ; // return empty string
             }

	     pseudo_context.index++ ;
	     opx = pseudo_context.parts[pseudo_context.index] ;
         }
         else
         {
             asm_nextToken(context) ;
             opx = asm_getToken(context) ;

             // if (end-of-file || label:) -> return ''
             if ( (wsasm_isEndOfFile(context)) || ("TAG" == asm_getTokenType(context)) ) {
	           return '' ; // return empty string
             }
         }

         // if (instruction || .data/...) -> return ''
	 if ( (typeof context.firmware[opx] !== "undefined") || (wsasm_is_directive_segment(opx)) ) {
	       return '' ; // not an atom -> return empty string
	 }

	 return opx ;
}

function wsasm_src2obj_text_elto_fields ( context, ret, elto, pseudo_context )
{
           var ret1 = null ;
	   var opx  = '' ;
           var atom = '' ;
           var par  = false ;

           // Example of instruction:
           //   "add x1 x2 x3"
           // Example of pseudoinstruction:
           //   "lui rd , sel ( 31 , 12 , label ) addu rd , rd , sel ( 11 , 0 , label ) "

           // skip instruction name...
           opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

	   while ( (opx != '') && (elto.value.fields.length < 100) )
	   {
              atom = opx ;
              par  = false ;

              // *sel*(31 ,  12 ,  label )
	      if ('sel' == opx)
              {
                  var sel    = { start:0, stop: 0, label:'' } ;
                  var valbin = '0' ;

                  // sel*(*31 ,  12 ,  label )
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if ('(' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
                  }

                  // sel (*31*,  12 ,  label )
                  sel.stop = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  sel.stop = parseInt(sel.stop) ;
	          if (isNaN(sel.stop)) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') + sel.stop) ;
                  }

                  // sel ( 31*,* 12 ,  label )
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if (',' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
                  }

                  // sel ( 31 , *12*,  label )
                  sel.start = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  sel.start = parseInt(sel.start) ;
	          if (isNaN(sel.start)) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') + sel.start) ;
                  }

                  // sel ( 31 ,  12*,* label )
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if (',' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
                  }

                  // sel ( 31 ,  12 , *label*)
                  sel.label = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

                  // sel ( 31 ,  12 ,  label*)*
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if (')' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }

                  // check if sel.label is number or tag...
		  a = dt_get_imm_value(sel.label) ;
		  if (a.isDecimal)
                  {
                      valbin = wsasm_get_sel_valbin(sel.label, sel.start, sel.stop) ;
                      atom   = dt_binary2format(valbin, a.format) ;
                  }
                  else
                  {
	              if (wsasm_is_ValidTag(sel.label) == false) {
		          return wsasm_eltoError(context, elto,
                                                 i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel.label + "'") ;
                      }

                      // if label then define 'sel(...)' as a new 'label'... ;-)
                      atom = sel.label + "[" + sel.start + ":" + sel.stop + "]" ;
                  }
              }
              // *(*x0)
	      else if ('(' == opx)
              {
                  par = true ;

                  // (*x0*)
                  atom = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  if ("" == atom) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }

                  // (x0*)*
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if (')' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }
              }

              // match 'atom' + parentheses and add to elto.fields...
              ret1 = wsasm_src2obj_text_instr_op_match(context, ret, elto, atom, par) ;
              if (ret1.error != null) {
                  return ret1 ;
              }

	      // *,* OR next operand...
              opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	      if (',' == opx)
              {
                  do {
                    opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  } while (',' == opx) ;
              }
              else if (('' != opx) && (context.options.mandatory_comma))
              {
		  return asm_langError(context,
				       i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
              }
	   }

	   // CHECK: More than 100 fields? really? umm, might be an error...
	   if (elto.value.fields.length > 100)
	   {
	       return wsasm_eltoError(context, elto,
				      i18n_get_TagFor('compiler', 'NOT MATCH FORMAT')     + ".<br>"  +
				      i18n_get_TagFor('compiler', 'REMEMBER FORMAT USED') + " '" + elto.source + "'.<br>" +
				      i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
	   }

           // elto: derived attributes...
	   elto.value.signature_type_str = elto.value.signature_type_arr.join(' ') ;
	   elto.value.signature_size_str = elto.value.signature_size_arr.join(' ') ;
           elto.value.signature_user     = wsasm_make_signature_user(elto.value, '+') ;

           // Return ret
           return ret ;
}

function wsasm_find_candidate_and_encode ( context, ret, elto )
{
           // Find candidate from firm_reference
           ret = wsasm_find_instr_candidates(context, ret, elto) ;
           if (ret.error != null) {
	       return ret;
           }

           var candidate = elto.firm_reference[elto.firm_reference_index] ;

           // Fill initial binary with the initial candidate...
           elto.binary = wsasm_encode_instruction(context, ret, elto, candidate) ;

           // Return ret
           return ret ;
}

function wsasm_src2obj_text ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
	   var possible_inst  = "" ;
           var tag     = "" ;
           var acc_cmt = "" ;
           var elto      = null ;
           var candidate = null ;

           var xr_info = simhw_sim_ctrlStates_get() ;
	   var oc_size = parseInt(xr_info.ir.default_eltos.oc.length) ;

	   //
	   //  *.text*   |  *.text*
	   //   .data    |    label1: instr op1 op2 op3
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;

           elto = wsasm_new_objElto(null) ;
           elto.seg_name = seg_name ;

	   //
	   //   .text    |   .text
	   //  *.data*   |   *label1: instr op1 op2 op3*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                             // NOT end-of-file
                 )
           {
		   //
		   //  * label1: *
	           //  * label2: *  instr op1 op2 op3
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

		   possible_tag = "" ;
		   while (
                           (typeof context.firmware[asm_getToken(context)] === "undefined") &&  // NOT instruction
                           (! wsasm_isEndOfFile(context))                                       // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // CHECK tag
		      if ("TAG" != asm_getTokenType(context))
                      {
                          if ("" == possible_tag) {
                              possible_tag = "[empty]" ;
                          }

			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'NO TAG, DIR OR INS') +
                                               "'" + possible_tag + "'") ;
		      }

		      tag = possible_tag.substring(0, possible_tag.length-1);

                      // CHECK valid tag
   		      if (wsasm_is_ValidTag(tag) == false) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (typeof ret.labels_asm[tag] != "undefined") {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;
		      ret.labels_asm[tag] = 0 ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   elto.associated_context = asm_getLabelContext(context) ;

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context))
                   {
		        // ELTO: in case of ending with 'label:' but without instruction
                        if (elto.labels.length > 0) {
		            ret.obj.push(elto) ;
                        }

			break;
                   }

		   //
		   //    label1:
	           //    label2:   *instr* op1 op2 op3
		   //

	           possible_inst  = asm_getToken(context) ;
                   elto.byte_size = WORD_BYTES ;
		   elto.value     = {} ;

		   elto.value.instruction        = possible_inst ;
                   elto.firm_reference           = context.firmware[possible_inst] ;
		   elto.value.fields             = [] ;
		   elto.value.signature_type_arr = [ possible_inst ] ;
		   elto.value.signature_size_arr = [ oc_size ] ;

		   //
		   //    label1:
	           //    label2:    instr  *op1, op2 op3*
		   //

                   ret = wsasm_src2obj_text_elto_fields(context, ret, elto, null) ;
		   if (ret.error != null) {
		       return ret;
		   }

                   if (elto.value.fields.length > 0) {
		        elto.source     = elto.value.instruction + ' ' + elto.value.fields.join(' ') ;
		        elto.source_alt = elto.value.instruction + ' ' + elto.value.fields.join(', ') ;
                   }
		   else {
                        elto.source     = elto.value.instruction ;
                        elto.source_alt = elto.source ;
                   }
		   elto.comments.push(acc_cmt) ;
		   elto.track_source.push(elto.source) ;

		   // Find candidate from firm_reference
		   ret = wsasm_find_instr_candidates(context, ret, elto) ;
		   if (ret.error != null) {
		       return ret;
		   }

		   candidate = elto.firm_reference[elto.firm_reference_index] ;

                   // if instruction -> fill initial binary based on candidate...
		   if (candidate.isPseudoinstruction == false)
                   {
		        elto.datatype = "instruction" ;
		        elto.value.signature_size_arr.unshift(elto.firm_reference[0].oc.length) ; // push at the beginning

			// Fill initial binary with the initial candidate...
			elto.binary = wsasm_encode_instruction(context, ret, elto, candidate) ;
                   }
		   else
		   {
		       elto.datatype = "pseudoinstruction" ;
		       elto.value.signature_size_arr.unshift(0) ; // push at the beginning
		       elto.binary   = '' ;
		   }

		   // ELTO: instruction + fields
		   ret.obj.push(elto) ;
		   elto = wsasm_new_objElto(elto) ; // new elto, same datatype
           }

	   // Return ret
           return ret ;
}


function wsasm_src2obj_helper ( context, ret )
{
	  ret.data_found = false;
	  ret.text_found = false;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (wsasm_isEndOfFile(context) == false)
          {
	       var segname = asm_getToken(context);

               // CHECK segment name
	       if (typeof ret.seg[segname] === "undefined")
               {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'INVALID SEGMENT NAME') +
                                        "'" + segname + "'") ;
	       }

	       // Compile .data and check errors
	       if ("data" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_data(context, ret);
		   ret.data_found = true;
	       }

	       if (ret.error != null) {
		   return ret;
	       }

	       // Compile .text and check errors
	       if ("text" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_text(context, ret);
		   ret.text_found = true;
	       }

	       if (ret.error != null) {
		   return ret;
	       }
	 }

	 return ret;
}


function wsasm_resolve_pseudo ( context, ret )
{
         var pseudo_context = { parts: null, index: 0 } ;
         var pseudo_elto    = null ;
         var elto           = null ;
         var eltos          = [] ;
         var possible_inst  = '' ;
         var ret1           = null ;
         var pseudo_values  = '' ;
         var pseudo_replace = '' ;
         var pseudo_elto_candidate = null ;
         var pseudo_value_k = '' ;

         for (let i=0; i<ret.obj.length; i++)
         {
              if ("pseudoinstruction" != ret.obj[i].datatype) {
                   continue ; // skip instructions...
              }
              if (null == ret.obj[i].firm_reference)
              {
                   // skip empty pseudoinstructions, example:
                   //        "pseudo"
                   // label:         <- empty line with label, former pseudo
                   continue ;
              }

              pseudo_elto = ret.obj[i] ;
              pseudo_elto_candidate = pseudo_elto.firm_reference[pseudo_elto.firm_reference_index] ;

              pseudo_values   = pseudo_elto.source.trim().split(' ') ;
              pseudo_replaced = pseudo_elto_candidate.finish ;
              for (let k=0; k<(pseudo_values.length-1); k++)
	      {
                   pseudo_value_k = base_replaceAll(pseudo_values[k+1], '(', '') ;
		   pseudo_value_k = base_replaceAll(pseudo_value_k,     ')', '') ;

                   pseudo_replaced = base_replaceAll(pseudo_replaced, pseudo_elto_candidate.fields[k].name, pseudo_value_k) ;
              }
              // example pseudo_replaced: "lui rd , sel ( 31 , 12 , label ) addu rd , rd , sel ( 11 , 0 , label ) "
              pseudo_context.parts = pseudo_replaced.split(' ') ;
              pseudo_context.index = 0 ;

              while (pseudo_context.index < pseudo_context.parts.length)
              {
	         possible_inst = pseudo_context.parts[pseudo_context.index] ;

                 // skip empty possible instruction
	         if ("" == possible_inst) {
	             pseudo_context.index++ ;
                     continue ;
                 }

                 elto = wsasm_new_objElto(pseudo_elto) ;
                 elto.firm_reference    = context.firmware[possible_inst] ;
                 elto.associated_pseudo = pseudo_elto ;
	         elto.datatype          = "instruction" ;
                 elto.binary            = '' ;

		 elto.value                    = {} ;
		 elto.value.instruction        = possible_inst ;
	         elto.value.fields             = [] ;
	         elto.value.signature_type_arr = [ possible_inst ] ;
		 elto.value.signature_size_arr = [] ;
                 elto.associated_context       = pseudo_elto.associated_context ;

                 // Match fields of the pseudoinstruction...
                 ret1 = wsasm_src2obj_text_elto_fields(context, ret, elto, pseudo_context) ;
                 if (ret1.error != null) {
                     return ret1 ;
                 }

                 // Fill related source...
                 if (0 == eltos.length)
                      elto.track_source.push(pseudo_elto.source) ;
                 else elto.track_source.push("&nbsp;") ;
	  	 elto.source     = elto.value.instruction + ' ' + elto.value.fields.join(' ') ;
	  	 elto.source_alt = elto.value.instruction + ' ' + elto.value.fields.join(', ') ;

                 // Find candidate from firm_reference and fill initial binary based on it...
                 ret = wsasm_find_candidate_and_encode(context, ret, elto) ;
		 if (ret.error != null) {
		     return ret ;
		 }

                 if (0 == eltos.length) {
                     elto.labels   = pseudo_elto.labels ;
		     elto.comments = pseudo_elto.comments.slice() ;
		 }

                 // add elto to some temporal array
                 eltos.push(elto) ;
              }

              // ret.obj = ret.obj[0]...ret.obj[i]  + eltos +  ret.obj[i+1]...ret.obj[ret.obj.length-1]
              ret.obj.splice(i, 1, ...eltos) ;
              eltos = [] ;
         }

	 return ret;
}


function wsasm_compute_labels ( context, ret, start_at_obj_i )
{
         var seg_name = '' ;
         var seg_ptr  = 0 ;
         var elto_ptr = 0 ;
         var padding  = 0 ;
         var elto_align = 0 ; // by default, align to byte
         var tag = '' ;
         var last_assigned = {} ;

         for (let i=start_at_obj_i; i<ret.obj.length; i++)
         {
              // get starting address of segment
              seg_name = ret.obj[i].seg_name ;
              seg_ptr  = ret.seg[seg_name].begin ;
              if (typeof last_assigned[seg_name] == "undefined") {
                  last_assigned[seg_name] = seg_ptr ;
              }

              // if .align X then address of next elto must be multiple of 2^X
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "align"))
              {
                     elto_align = ret.obj[i].byte_size ;
                     if (elto_align > 1)
                     {
                         padding = last_assigned[seg_name] % elto_align ; // temporal value for padding
                         if (padding != 0) {
                             padding = elto_align - padding ;
                         }
                         last_assigned[seg_name] += padding ;
                     }

                     // update x.elto_ptr so obj2mem will skip those bytes...
                     ret.obj[i].elto_ptr = last_assigned[seg_name] ;

                     continue ;
              }

              // get starting address of next elto
              elto_ptr = last_assigned[seg_name] ;

              if ([ "", "instruction", "pseudoinstruction" ].includes(ret.obj[i].datatype) == false)
              {
                  // align datatype to datatype_size in bytes (4 in multiple of 4, 2 in multiple of 2...)
                  var datatype_size = wsasm_get_datatype_size(ret.obj[i].datatype) ;
                  if (elto_ptr % datatype_size != 0) {
                      elto_ptr += datatype_size - (elto_ptr % datatype_size) ;
                  }
              }

              ret.obj[i].seg_ptr     = seg_ptr ;             // starting address of the .data/.kdata segment
              ret.obj[i].elto_ptr    = elto_ptr ;
              ret.obj[i].byte_offset = elto_ptr - seg_ptr ;  // offset within .data segment
              ret.obj[i].padding     = 0 ;

              // add labels_asm...
              for (var j=0; j<ret.obj[i].labels.length; j++) {
                     tag = ret.obj[i].labels[j] ;
		     ret.labels_asm[tag] = "0x" + elto_ptr.toString(16) ;
              }

              // machine_code and total size...
              if (elto_align != 0)
              {
                  if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string")) {
                        ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                  }
                  else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space")) {
                        ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                  }
              }

              // update last address of segment...
              last_assigned[seg_name] = elto_ptr + ret.obj[i].byte_size + ret.obj[i].padding ;
         }

         return ret ;
}

function wsasm_get_label_value ( context, ret, elto, label )
{
         var value  = '' ;
         var valbin = '' ;

         // if label -> return associated value as integer
         value = ret.labels_asm[label] ;
	 if (typeof value !== "undefined")
         {
              valbin = (parseInt(value) >>> 0).toString(2) ;
              ret.labels_valbin[label] = valbin ;
              return ret ;
	 }

         // try to detect if value is 'lz[xx:yy]'...
         var value_arr = label.split(/^(.*)\[(\d+):(\d+)\]/s) ;
	 if (value_arr.length < 5) {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + label + "'") ;
	 }

         // Example:
         // ['', 'w1', '12', '31', '']
         //  0    1     2     3    4
         var sel_stop  = parseInt(value_arr[2]) ;
         var sel_start = parseInt(value_arr[3]) ;
         var sel_label = value_arr[1] ;

         // if label not found -> return error
         value = ret.labels_asm[sel_label] ;
	 if (typeof value === "undefined") {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel_label + "'") ;
	 }

	 // compute selection...
         valbin = wsasm_get_sel_valbin(value, sel_start, sel_stop) ;
         ret.labels_valbin[label] = valbin ;

         return ret ;
}

function wsasm_resolve_labels ( context, ret )
{
         var elto  = null ;
         var value = 0 ;
         var arr_encoded = null ;
         var candidate_old = null ;
         var candidate     = null ;

         // compute address of labels (with current object)...
         ret = wsasm_compute_labels(context, ret, 0) ;
	 if (ret.error != null) {
	     return ret;
	 }

         // for all object elements...
         for (let i=0; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;

              // ...review the pending labels (forth and back)
              for (let j=0; j<elto.pending.length; j++)
              {
                  ret = wsasm_get_label_value(context, ret, elto, elto.pending[j].label) ;
	          if (ret.error != null) {
	              return ret;
	          }

                  // to remember: value is binary as string at this point of code
                  value = ret.labels_valbin[elto.pending[j].label] ;

                  // address-abs vs address-rel
                  if (elto.pending[j].rel)
                  {
                      value = parseInt(value, 2) ;
                      value = (value >>> 0) - (elto.elto_ptr + WORD_BYTES) ;
                      if (value < 0)
                      {
                          value = (value >>> 0).toString(2);
                          value = "1" + value.replace(/^[1]+/g, "");
                          value = value.padStart(elto.pending[j].n_bits, '1') ;
                      }
                      else
                      {
                          value = value.toString(2) ;
                      }
                  }

                  // instruction-field
                  if ("field-instruction" == elto.pending[j].type)
                  {
                      candidate_old = elto.firm_reference[elto.firm_reference_index] ;
                      elto.value.signature_size_arr[elto.pending[j].field_j + 1] = value.length ;
                      elto.value.signature_size_str = elto.value.signature_size_arr.join(' ') ;

                      // if label.size doesn't fit the field.n_bits, try (at least) another one...
                      if (value.length > elto.pending[j].n_bits)
                      {
                          // Resetting pending elements in this instruction (encode_instruction will populate it again)...
                          elto.pending = [] ;

                          // Find candidate from firm_reference and fill initial binary based on it...
                          ret = wsasm_find_candidate_and_encode(context, ret, elto) ;
		          if (ret.error != null) {
		              return ret ;
		          }

                          candidate = elto.firm_reference[elto.firm_reference_index] ;

                          // RE-compute pseudo-instructions, in case we replace current element with a pseudoinstruction...
                          if (candidate.isPseudoinstruction)
                          {
		              ret = wsasm_resolve_pseudo(context, ret) ;
		              if (ret.error != null) {
		                  return ret;
		              }
                          }

		          // RE-compute address of labels (from current element) in case following labels becomes moved...
                          if (candidate.nwords != candidate_old.nwords)
                          {
		              ret = wsasm_compute_labels(context, ret, i) ;
		              if (ret.error != null) {
		                  return ret;
		              }
                          }
                      }
                  }

                  if (value.length > elto.pending[j].n_bits)
                  {
	              return wsasm_eltoError(context, elto,
                                             "'" + elto.pending[j].label + "'" +
                                             i18n_get_TagFor('compiler', 'NEEDS') +
                                             value.length +
                                             i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                             elto.pending[j].n_bits + " " +
                                             i18n_get_TagFor('compiler', 'BITS')) ;
                  }

                  // update elto.binary
                  value = value.padStart(elto.pending[j].n_bits, '0') ;
                  arr_encoded = elto.binary.split('') ;
                  wsasm_encode_field(arr_encoded, value, elto.pending[j].start_bit, elto.pending[j].stop_bit) ;
                  elto.binary = arr_encoded.join('') ;

                  // data-field -> update elto.value (is not an object as inst-field)
                  if ("field-data" == elto.pending[j].type) {
                      elto.value = elto.binary ;
                  }
              }
         }

         // build reverse lookup hash labels (hash labels_asm -> key)
         for (var key in ret.labels_asm) {
              ret.hash_labels_asm_rev[ret.labels_asm[key]] = key ;
         }

         // build reverse lookup hash segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.hash_seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

         return ret ;
}

function wsasm_obj2src ( context, ret, options )
{
         var o = '' ;
         var elto = null ;
         var curr_segment = '' ;

         // check params
         if (typeof ret.obj == "undefined") {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'UNKNOWN 2')) ; // TODO: update error message
         }

         // prepare options...
         options = wsasm_expand_options(options) ;

         // for all object elements...
         for (let i=0; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;

              // switch to another segment
              if (curr_segment != elto.seg_name) {
                  curr_segment = elto.seg_name ;
                  o += '\n' + curr_segment + '\n' ;
              }

              // show labels
              for (let j=0; j<elto.labels.length; j++) {
                   o += elto.labels[j] + ":\n" ;
              }

              // show element source code
              if ( ('instruction' == elto.datatype) && (false == options.instruction_comma) )
                   o += "\t" + base_replaceAll(elto.source_alt, ',', '') + "\n" ;
              else o += "\t" + elto.source_alt + "\n" ;
         }

         // return alternative source
         ret.src_alt = o ;
         return ret ;
}


//
//  (3/3) Load JSON object to main memory (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_obj2mem  ( ret )
//   * wsasm_writememory_if_word              ( mp, gen, track_source, track_comments )
//   * wsasm_writememory_and_accumulate       ( mp, gen, valuebin )
//   * wsasm_zeropadding_and_writememory      ( mp, gen )
//   * wsasm_writememory_and_accumulate_part  ( mp, gen, valuebin, track_source_j, track_source, track_comments )
//   * wsasm_writememory_and_accumulate_part_for_big_endian    ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
//   * wsasm_writememory_and_accumulate_part_for_little_endian ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
//

function wsasm_writememory_if_word ( mp, gen, track_source, track_comments )
{
        // check if a full word is present...
        if (gen.byteWord < WORD_BYTES) {
            return ;
        }

        // write into memory current word...
        var melto = {
                      "value":           gen.machine_code,
                      "source":          gen.source,
                      "source_tracking": gen.track_source,
                      "comments":        gen.comments,
		      "binary":          gen.machine_code,
                      "firm_reference":  gen.firm_reference,
                      "is_assembly":     gen.is_assembly,
                    } ;
        main_memory_set(mp, gen.addr, melto) ;

        // set 'gen' to 'default' values for next word...
        gen.byteWord       =  0 ;
        gen.addr           = '0x' + (parseInt(gen.addr) + WORD_BYTES).toString(16) ;
        gen.machine_code   = '' ;
        gen.source         = '' ;
        gen.track_source   = track_source ;
        gen.comments       = track_comments ;
        gen.firm_reference = null ;
        gen.is_assembly    = false ;
}

function wsasm_writememory_and_accumulate ( mp, gen, valuebin )
{
        wsasm_writememory_if_word(mp, gen, [], []) ;

        gen.machine_code  = valuebin + gen.machine_code ;  //  3,2,1,0
        gen.byteWord     += 1 ;
}

function wsasm_zeropadding_and_writememory ( mp, gen )
{
        if (0 == gen.byteWord) {
            return ;
        }

        // zero-padding...
        var left_bytes = WORD_BYTES - gen.byteWord ;
	for (var k=0; k<left_bytes; k++) {
	     wsasm_writememory_and_accumulate(mp, gen, '0'.repeat(BYTE_LENGTH)) ;
	}

        // write last full word...
        wsasm_writememory_if_word(mp, gen, [], []) ;
}

function wsasm_writememory_and_accumulate_part ( mp, gen, valuebin, track_source_j, track_source, track_comments )
{
        wsasm_writememory_if_word(mp, gen, track_source, track_comments) ;

        gen.machine_code  = valuebin + gen.machine_code ;  //  3,2,1,0
        gen.byteWord     += 1 ;

        if (track_source_j != null) {
            gen.track_source.push(track_source_j) ;
	}
}

function wsasm_writememory_and_accumulate_part_for_big_endian ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
{
         var b_index   = j_byte * BYTE_LENGTH ;
	 var valuebin8 = valuebin.substr(b_index, BYTE_LENGTH) ;

	 wsasm_writememory_and_accumulate_part(ret_mp, gen, valuebin8, null, obj_i.track_source, obj_i.comments) ;
}

function wsasm_writememory_and_accumulate_part_for_little_endian ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
{
	 var b_index = 0 ;

         if (n_bytes < WORD_BYTES) {
             b_index = n_bytes - j_byte - 1 ;
         }
         else {
	     b_index = (j_byte / WORD_BYTES) >>> 0 ;
	     b_index = b_index * WORD_BYTES + WORD_BYTES - (j_byte % WORD_BYTES) - 1 ;
         }

         b_index = b_index * BYTE_LENGTH ;
	 var valuebin8 = valuebin.substr(b_index, BYTE_LENGTH) ;

	 wsasm_writememory_and_accumulate_part(ret_mp, gen, valuebin8, null, obj_i.track_source, obj_i.comments) ;
}


 /*
  *  Public API (see README_ng.md for more information)
  */

function wsasm_prepare_context ( CU_data, options )
{
	   // Check arguments
           if (typeof CU_data == "undefined") {
               return { error: 'CU_data is undefined in wsasm_prepare_context\n' } ;
           }

           // Initialize context...
           var context = {} ;
	   context.line           	= 1 ;      // here
	   context.error          	= null ;
	   context.i              	= 0 ;      // here
           context.text                 = '' ;     // here
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;      // here
           context.comments             = [] ;
	   context.newlines       	= [] ;
	   context.registers      	= [] ;     // here
	   context.firmware             = {} ;     // here
	   context.pseudoInstructions	= [];      // here
	   context.stackRegister	= null ;
	   context.version	        = CU_data.version ;
	   context.options              = {} ;     // here

           // Fill the assembler configuration
           context.options = wsasm_expand_options(options) ;

	   // Fill register names
	   for (i=0; i<CU_data.registers.length; i++)
	   {
		if (typeof CU_data.registers[i] === 'undefined') {
                    continue ;
                }
		for (var j=0; j<CU_data.registers[i].length; j++) {
		     context.registers[CU_data.registers[i][j]] = i ;
                }
	   }

	   // Fill firmware
           context = wsasm_prepare_context_firmware(context, CU_data) ;

	   // Fill pseudoinstructions
           context = wsasm_prepare_context_pseudoinstructions(context, CU_data) ;

           // return context
	   return context ;
}

function wsasm_prepare_source ( context, asm_source )
{
	   // Check arguments
           if (typeof context == "undefined") {
               return { error: 'context is undefined in wsasm_prepare_source\n' } ;
           }

           // set a new assembler source code
	   context.line        	= 1 ;          // here
	   context.error       	= null ;
	   context.i            = 0 ;          // here
           context.text         = asm_source ; // here
	   context.tokens       = [] ;
	   context.token_types  = [] ;
	   context.t            = 0 ;          // here
           context.comments     = [] ;
	   context.newlines     = [] ;

           // return context
	   return context ;
}

function wsasm_src2obj ( context )
{
	   // Check arguments
           if (typeof context == "undefined") {
               return { error: 'Context is undefined in wsasm_src2obj\n' } ;
           }

           // Initialize ret object
           var ret = {} ;
           ret.obj = [] ;
           ret.mp  = {} ;
  	   ret.seg                 = sim_segments ;
           ret.hash_seg_rev        = [] ;
           ret.labels_asm          = {} ;
           ret.hash_labels_asm_rev = {} ;
	   ret.labels              = {} ; // [addr] = {name, addr, startbit, stopbit}
           ret.labels_valbin       = {} ;

           // pass 1: compile raw assembly
           ret = wsasm_src2obj_helper(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

           // pass 2: replace pseudo-instructions
           ret = wsasm_resolve_pseudo(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   // pass 3: resolve all labels (translate into addresses)
           ret = wsasm_resolve_labels(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

           // check if main or kmain in assembly code
           if (ret.text_found)
           {
               if ( (typeof ret.labels_asm["main"]  === "undefined" ) &&
                    (typeof ret.labels_asm["kmain"] === "undefined" ) )
               {
                     return asm_langError(context,
                                          i18n_get_TagFor('compiler', 'NO MAIN OR KMAIN')) ;
               }
           }

	   return ret;
}

function wsasm_obj2mem  ( ret )
{
	 var addr      = '' ;
         var n_bytes   = 0 ;
         var valuebin  = '' ;
         var candidate = null ;

         var seg_name_old    = '' ;
         var seg_name        = '' ;
         var last_assig_word = {} ;
         var word_1 = 0 ;
         var word_2 = 0 ;

         var gen = {} ;
         gen.byteWord       = 0 ;
         gen.addr           = -1 ;
         gen.machine_code   = '' ;
         gen.source         = '' ;
         gen.track_source   = [] ;
         gen.comments       = [] ;
         gen.firm_reference = null ;

         ret.mp = {} ;
         for (let i=0; i<ret.obj.length; i++)
         {
              // (1) flushing if there is some pending data in 'seg_name_old' segment...
              seg_name = ret.obj[i].seg_name ;
	      if (seg_name_old != seg_name)
              {
	          if (seg_name_old != '') {
                      wsasm_zeropadding_and_writememory(ret.mp, gen) ;
                  }
                  seg_name_old = seg_name ;
	      }

              // ...update initial word address for this segment if needed...
              if (typeof last_assig_word[seg_name] == "undefined")
              {
                  gen.addr = "0x" + ret.obj[i].elto_ptr.toString(16) ;
                  last_assig_word[seg_name] = gen.addr ;
              }

              // ... and setup the working address for the new obj[i]
              gen.addr = last_assig_word[seg_name] ; // recover last saved value if we switch to other segment

              // skip .byte to .half/.word/... alignment if needed
              if ((i != 0) && (ret.obj[i].seg_name == ret.obj[i-1].seg_name))
              {
                   word_1 = ret.obj[i].elto_ptr - (ret.obj[i-1].elto_ptr + ret.obj[i-1].byte_size) ;
                   if (word_1 > 0) {
                       valuebin = "0".repeat(BYTE_LENGTH) ;
                       for (let j=0; j<word_1; j++) {
                            wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, null, [], ret.obj[i].comments) ;
                       }
                   }
                   // flush current word if needed...
                   wsasm_writememory_if_word(ret.mp, gen, [], []) ;
              }

              word_1 = (ret.obj[i].elto_ptr / WORD_BYTES) >>> 0 ;
              word_2 = (parseInt(gen.addr)  / WORD_BYTES) >>> 0 ;
              if (word_1 > word_2) {
                  gen.addr = "0x" + ret.obj[i].elto_ptr.toString(16) ;
              }

              // (2) if .align X then address of next elto must be multiple of 2^X
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "align")) {
                  continue ; // skip align, already memory filled if needed
              }

              // (3) instructions and data...
              gen.source   = ret.obj[i].source ;
              gen.comments = ret.obj[i].comments ;

              if ('instruction' == ret.obj[i].datatype)
              {
                    gen.track_source.push(...ret.obj[i].track_source) ;

                    valuebin = ret.obj[i].binary ;
                    n_bytes  = ret.obj[i].binary.length / BYTE_LENGTH ;
                    for (let j=0; j<n_bytes; j++)
                    {
                         candidate = ret.obj[i].firm_reference_index ;
                         candidate = ret.obj[i].firm_reference[candidate] ;
                         gen.firm_reference = candidate ;
                         gen.is_assembly    = true ;

			 // fill for little-endian by default...
			 wsasm_writememory_and_accumulate_part_for_little_endian(ret.mp, gen, ret.obj[i], valuebin, n_bytes, j) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "numeric"))
              {
                    gen.track_source.push(...ret.obj[i].track_source) ;

                    n_bytes  = wsasm_get_datatype_size(ret.obj[i].datatype) ;
                    valuebin = ret.obj[i].value.padStart(n_bytes*BYTE_LENGTH, '0') ;

                    // next: fill byte by byte
                    for (let j=0; j<n_bytes; j++)
                    {
			 // fill for little-endian by default...
			 wsasm_writememory_and_accumulate_part_for_little_endian(ret.mp, gen, ret.obj[i], valuebin, n_bytes, j) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string"))
              {
                    // next: fill byte by byte
                    for (let j=0; j<ret.obj[i].value.length; j++)
                    {
                         valuebin = ret.obj[i].value[j].toString(2) ;
                         valuebin = valuebin.padStart(BYTE_LENGTH, '0') ;

                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, ret.obj[i].track_source[j],
                                                               [], ret.obj[i].comments) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space"))
              {
                    valuebin = "0".repeat(BYTE_LENGTH) ; // TO-CHECK: ummm, share the same object for all space is right?

                    for (let j=0; j<ret.obj[i].byte_size; j++)
                    {
                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, ret.obj[i].track_source[j],
                                                               [], ret.obj[i].comments) ;
                    }
              }

              // flush current word if needed...
              wsasm_writememory_if_word(ret.mp, gen, [], []) ;
              last_assig_word[seg_name] = gen.addr ;
         }

         // flushing if there is some pending data
         wsasm_zeropadding_and_writememory(ret.mp, gen) ;

         // copy back the last asigned address
         for (let seg_name in last_assig_word) {
              ret.seg[seg_name].end = parseInt(last_assig_word[seg_name]) ;
         }

         return ret ;
}

function wsasm_src2mem ( datosCU, asm_source, options )
{
     var context = null ;
     var ret = {
                  error: i18n_get_TagFor('compiler', 'UNKNOWN 2')
               } ;

     try
     {
         context = wsasm_prepare_context(datosCU, options) ;
	 if (context.error != null) {
	     return context;
	 }

         context = wsasm_prepare_source(context, asm_source) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2mem(ret) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2mem' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;

	 ret.error = "Compilation error found !<br>" +
                     "Please review your assembly code and try another way to write your algorithm.<br>" +
                     "<br>" +
                     e.toString() ;
     }

     return ret ;
}

function wsasm_src2src ( datosCU, text, options )
{
     var context = null ;
     var ret = {
                  error: i18n_get_TagFor('compiler', 'UNKNOWN 2')
               } ;

     try
     {
         context = wsasm_prepare_context(datosCU, text) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2src(context, ret, options) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2src' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;

	 ret.error = "Compilation error found !<br>" +
                     "Please review your assembly code and try another way to write your algorithm.<br>" +
                     "<br>" +
                     e.toString() ;
     }

     return ret ;
}

