/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


function firm_fields_v2_write ( elto_fields )
{
	var o = "" ;

        // no fields -> return empty
	if (typeof elto_fields == "undefined") {
            return o ;
        }

	// fields:
	//   reg(25:21)=field1,
	//   address-rel(19|18:0)=field2,
	for (j=0; j<elto_fields.length; j++)
	{
		 o += '\t' + elto_fields[j].type ;
		 if ("address" == elto_fields[j].type) {
		     o += '-' + elto_fields[j].address_type ;
		 }

		 o += "(" ;
		 for (k=0; k<elto_fields[j].bits_start.length; k++)
		 {
		      if (elto_fields[j].bits_start[k] != elto_fields[j].bits_stop[k])
			   o += elto_fields[j].bits_start[k] + ":" + elto_fields[j].bits_stop[k] ;  // 18:0
		      else o += elto_fields[j].bits_start[k] ; // 19

		      if (k != (elto_fields[j].bits_start.length-1)) {
			  o += '|' ; // if not last field then add a '|'
		      }
		 }
		 o += ")" ;

                 if (["oc", "eoc"].includes(elto_fields[j].type))
		      o += " = " + elto_fields[j].value + "," + '\n';
		 else o += " = " + elto_fields[j].name  + "," + '\n';
	}

        // return string
	return o ;
}


function firm_instruction_check_oc ( context, instruccionAux, xr_info, all_ones_oc )
{
       // semantic check: valid value
       if ( (instruccionAux.oc.match("[01]*")[0] != instruccionAux.oc) ||
	    (instruccionAux.oc.length !== xr_info.ir.default_eltos.oc.length) )
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'INCORRECT OC BIN.') +
			        "'" + instruccionAux.oc + "'") ;
       }

       // semantic check: 'oc' is not already used
       if (instruccionAux.oc != all_ones_oc)
       {
	   if ( (typeof context.oc_eoc[instruccionAux.oc] !== "undefined") &&
		       (context.oc_eoc[instruccionAux.oc].eoc === null) )
	   {
		 return frm_langError(context,
			    	      i18n_get_TagFor('compiler', 'OC ALREADY USED') +
				      context.oc_eoc[instruccionAux.oc].signature) ;
	   }

	   if (typeof context.oc_eoc[instruccionAux.oc] == "undefined")
	   {
	       context.oc_eoc[instruccionAux.oc] = {} ;
	       context.oc_eoc[instruccionAux.oc].signature = instruccionAux.signature ;
	       context.oc_eoc[instruccionAux.oc].eoc       = null ;
	   }
       }

       return {} ;
}

function firm_instruction_check_eoc ( context, instruccionAux, xr_info, all_ones_oc )
{
	// semantic check: valid value
/*
	if (
             (instruccionAux.eoc.match("[01]*")[0] != instruccionAux.eoc) ||
	     (instruccionAux.eoc.length !== xr_info.ir.default_eltos.eoc.length     &&
	      instruccionAux.eoc.length !== xr_info.ir.default_eltos.eoc.lengths[0] &&
	      instruccionAux.eoc.length !== xr_info.ir.default_eltos.eoc.lengths[1])
           )
*/
	if (instruccionAux.eoc.match("[01]*")[0] != instruccionAux.eoc)
        {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'INCORRECT EOC BIN.') +
			         "'" + instruccionAux.eoc + "'") ;
	}

	if (context.oc_eoc[instruccionAux.oc].eoc == null) {
	    context.oc_eoc[instruccionAux.oc].eoc = {} ;
        }

	// semantic check: 'oc+eoc' is not already used
        if (instruccionAux.oc != all_ones_oc)
        {
	    if (        (context.oc_eoc[instruccionAux.oc].eoc != null) &&
	         (typeof context.oc_eoc[instruccionAux.oc].eoc[instruccionAux.eoc] != "undefined") )
	    {
	          return frm_langError(context,
			               i18n_get_TagFor('compiler', 'OC+EOC ALREADY USED') +
			               "'" + context.oc_eoc[instruccionAux.oc].eoc[instruccionAux.eoc] + "'") ;
	    }

	    context.oc_eoc[instruccionAux.oc].eoc[instruccionAux.eoc] = instruccionAux.signature ;
        }

        return {} ;
}

function firm_instruction_keynumber_read ( context, instruccionAux )
{
       var ret = {} ;

// li reg val {
//             ...
//             *key=000000*,
//             ...
// }

       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory VALUE
       ret.value = frm_getToken(context) ;

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

       return ret ;
}

function firm_instruction_keystring_read ( context, instruccionAux )
{
       var ret = {} ;

// li reg val {
//             ...
//             *key='this instruction is used for...',*
//             ...
// }

       // match optional key=string pair
       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory value
       ret.value = frm_getToken(context) ;

       // semantic check: valid value
       if ("STRING" != frm_getTokenType(context)) {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'UNKNOWN ESCAPE CHAR') +
			     "'" + frm_getToken(context) + "'") ;
       }

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

       return ret ;
}

function firm_instruction_field_read_v2 ( context, instruccionAux )
{
        var tmp_fields = {} ;
	var field_list = ["oc", "eoc", "reg", "imm", "inm", "address-rel", "address-abs"] ;
	var complex_field_list = ["eoc", "address-rel", "address-abs"] ;

        // ...
        // reg(15:19)=rs1,
        // ...

	// match mandatory FIELD-type: oc|eoc|reg|imm|address-rel|address-abs
	if ( !frm_isToken_arr(context, field_list) ) {
	      return frm_langError(context, "Incorrect type of field (oc, eoc, reg, imm, address-rel or address-abs)") ;
	}

	tmp_fields.type = frm_getToken(context) ;

	if ("address-rel" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "rel" ;
        }
	if ("address-abs" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "abs" ;
        }

	if ( !frm_isToken_arr(context, complex_field_list) )
	{
		// ...
		// reg*(start:stop)*=rs1,
		// ...

		frm_nextToken(context);
		// match mandatory (
		if (! frm_isToken(context,"(")) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
		}

		frm_nextToken(context);
		// match mandatory START_BIT
		tmp_fields.startbit = frm_getToken(context) ;
		tmp_fields.bits_start = [ tmp_fields.startbit ] ;

		// check startbit range
		var start = parseInt(tmp_fields.startbit);
		if (start > 32*parseInt(instruccionAux.nwords)-1) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'STARTBIT OoR') +
					    "'" + frm_getToken(context) + "'") ;
		}

		frm_nextToken(context);
		// match mandatory :
		if (! frm_isToken(context,":")) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'COLON NOT FOUND')) ;
		}

		frm_nextToken(context);
		// match mandatory STOP_BIT
		tmp_fields.stopbit = frm_getToken(context) ;
		tmp_fields.bits_stop = [ tmp_fields.stopbit ] ;

		// check stopbit range
		var stop  = parseInt(tmp_fields.stopbit);
		if (stop > 32*parseInt(instruccionAux.nwords)) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'STOPBIT OoR') +
					"'" + frm_getToken(context) + "'") ;
		}

		frm_nextToken(context);
		// match mandatory )
		if (! frm_isToken(context,")")) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
		}
	}
	else
	{
		// ...
		// address-rel*(...)*=rs1,
		// ...

		// Complex fields (start:end|bit|start:end) ORDER MATTERS!!

		frm_nextToken(context);
		// match mandatory (
		if (! frm_isToken(context,"(")) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
		}

		frm_nextToken(context);
		// match mandatory START_BIT
		var start = frm_getToken(context);
		var stop  = start;

		// check startbit range
		if (start > 32*parseInt(instruccionAux.nwords)-1) {
			return frm_langError(context,
					    i18n_get_TagFor('compiler', 'STARTBIT OoR') +
					"'" + frm_getToken(context) + "'") ;
		}

		frm_nextToken(context);
		// if it's shaped like (start:end|bit|start:end)
		if (frm_isToken(context,":"))
		{
			frm_nextToken(context);
			// match mandatory STOP_BIT
			// check stopbit range
			stop  = frm_getToken(context);
			if (stop > 32*parseInt(instruccionAux.nwords)) {
				return frm_langError(context,
						    i18n_get_TagFor('compiler', 'STOPBIT OoR') +
						"'" + frm_getToken(context) + "'") ;
			}

			// if it's a fixed range don't do anything more (start:end)
			frm_nextToken(context);
			if (frm_isToken(context,")"))
                        {
				tmp_fields.startbit = start;
				tmp_fields.stopbit  = stop;
		                tmp_fields.bits_start = [ tmp_fields.startbit ] ;
		                tmp_fields.bits_stop  = [ tmp_fields.stopbit  ] ;
			}
		}

		// avoid (10:20)| not selecting next token

		// if it's a normal case
		if (frm_isToken(context,"|"))
		{
			// all bit ranges
			var bits = [[ start, stop ]] ;
			var bits_start = [ start ] ;
			var bits_stop  = [ stop  ] ;

			// auxiliary to add ranges
			var bits_aux = [] ;

			while (! frm_isToken(context,")"))
			{
				frm_nextToken(context);
				if (frm_getToken(context) == ")") continue;
				bits_aux[0] = frm_getToken(context) ;
				// check bit range
				if (bits_aux[0] > 32*parseInt(instruccionAux.nwords)) {
					return frm_langError(context,
							    i18n_get_TagFor('compiler', 'BIT OoR') +
							    "'" + frm_getToken(context) + "'") ;
				}

				frm_nextToken(context);
				if (frm_getToken(context) == ")")
                                {
					bits.push([bits_aux[0], bits_aux[0]]);
			                bits_start.push(bits_aux[0]) ;
			                 bits_stop.push(bits_aux[0]) ;
					continue;
				}
				// match mandatory : or |
				if (! frm_isToken(context,":") && ! frm_isToken(context,"|")) {
					return frm_langError(context,
							    i18n_get_TagFor('compiler', 'COLON OR PIPE NOT FOUND')) ;
				}
				if (frm_isToken(context,":")) {
					frm_nextToken(context);
					bits_aux[1] = frm_getToken(context) ;
					frm_nextToken(context);
				} else if (frm_isToken(context,"|")) {
					bits_aux[1] = bits_aux[0] ;
					//frm_nextToken(context);
				}

				// check bit range
				if (bits_aux[1] > 32*parseInt(instruccionAux.nwords)) {
					return frm_langError(context,
							    i18n_get_TagFor('compiler', 'BIT OoR') +
							"'" + frm_getToken(context) + "'") ;
				}

				// bit range is added
				bits.push([bits_aux[0], bits_aux[1]]) ;
				bits_start.push(bits_aux[0]) ;
				 bits_stop.push(bits_aux[1]) ;
			}

			// count number of bits read
			var total_bits = 0;
			for (i=0; i<bits.length; i++) {
			     total_bits += bits[i][0] - bits[i][1] + 1;
			}

			tmp_fields.bits = bits ;
			tmp_fields.bits_start = bits_start ;
			tmp_fields.bits_stop  = bits_stop ;
		}
	}

	frm_nextToken(context);
	// match mandatory =
	if (! frm_isToken(context,"=")) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory FIELD
	var tmp_name = frm_getToken(context) ;

        if (["oc", "eoc"].includes(tmp_fields.type))
        {
                tmp_fields.value = tmp_name ; // oc(8,7)=*10101*
        }
        else
        {
		tmp_fields.name = tmp_name ; // reg(8,7)=*rs1*

		var index_name = -1 ;
		for (var i=0; (i<instruccionAux.fields.length) && (index_name == -1); i++)
		{
		     if (typeof instruccionAux.fields[i].type != "undefined") {
                         continue ; // skip already assigned fields
		     }

		     if (instruccionAux.fields[i].name == tmp_name)
		     {
			 instruccionAux.fields[i] = tmp_fields ;
			 index_name = i ;
		     }
		}
		if (index_name == -1) {
		     return frm_langError(context,
				          i18n_get_TagFor('compiler', 'UNEXPECTED FIELD') +
				          "'" + tmp_name + "'. " +
				          i18n_get_TagFor('compiler', 'CHECK ORDER')) ;
		}
        }

	frm_nextToken(context);
	// match optional ,
	if (frm_isToken(context, ",")) {
	       frm_nextToken(context);
	}

	// check overlapping
	for (i=stop; i<=start; i++)
	{
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') +
				     instruccionAux.fields[index_name].name) ;
		}

		instruccionAux.overlapping[i] = 1;
	}

        // add to field list (fields_all)
	instruccionAux.fields_all.push(tmp_fields) ;

        return tmp_fields ;
}

function firm_instruction_read_fields_v2 ( context, instruccionAux, xr_info, all_ones_oc )
{
       var ret = {};

// li reg val offset {
//            *[nwords=1,]
//              oc(31,26)=000000,
//             [eoc(31,26)=000000,]
//              reg(25,21)=reg,
//              imm(15,0)=val,
//              address-rel(12|10:5|4:1|11)=offset,
//             [help='this instruction is used for...',]
//             [native,]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       var campos       = instruccionAux.fields ;
       var firma        = instruccionAux.signature ;
       var firmaUsuario = instruccionAux.signatureUser ;
       var firmaGlobal  = instruccionAux.signatureGlobal ;

       var oc_inserted = 0;
       var camposInsertados = 0;
       frm_nextToken(context);
       while (! frm_isToken(context,"{"))
       {
	       // match op
	       if (frm_isToken(context,"oc"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.oc = ret.value ;

                   ret = firm_instruction_check_oc(context, instruccionAux, xr_info, all_ones_oc) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   oc_inserted = 1 ;
	       }

	       // match optional eoc
          else if (frm_isToken(context,"eoc"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.eoc = ret.value ;
		   instruccionAux.fields_eoc.push(ret.value) ;

                   ret = firm_instruction_check_eoc(context, instruccionAux, xr_info, all_ones_oc) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }
	       }

	       // match optional "nwords"
	  else if (frm_isToken(context, "nwords"))
	       {
                   ret = firm_instruction_keynumber_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.nwords = ret.value ;
	       }

	       // match optional help
	  else if (frm_isToken(context,"help"))
	       {
		   ret = firm_instruction_keystring_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.help = ret.value ;
	       }

	       // match optional 'native' + ','
	  else if (frm_isToken(context,"native"))
	       {
		   instruccionAux["is_native"] = true;
		   frm_nextToken(context);

		   if (frm_isToken(context,","))
		       frm_nextToken(context);
	       }

	       // match field...
	  else {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

		   firma = firma.replace("," + ret.name, "," + ret.type);
		   firma = firma.replace("(" + ret.name, "(" + ret.type);
		   firma = firma.replace(")" + ret.name, ")" + ret.type);
		   firmaUsuario = firmaUsuario.replace(ret.name, ret.type);

		   instruccionAux.signature     = firma;
		   instruccionAux.signatureUser = firmaUsuario;
		   firmaGlobal = firma.replace("address","num");
		   firmaGlobal = firmaGlobal.replace("imm" , "num");
		   firmaGlobal = firmaGlobal.replace("inm" , "num"); // TODO: temporal fix
		   instruccionAux.signatureGlobal = firmaGlobal;

		   camposInsertados++;
	       }
       }

       instruccionAux.fields       = campos;
       instruccionAux.signatureRaw = firmaUsuario;

       // semantic check: oc must exist
       if (1 != oc_inserted)
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'NO OC FIELD')) ;
       }

       // semantic check: number of fields
       if (camposInsertados != instruccionAux.numeroCampos)
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'NO FIELD')) ; // TODO
       }

       // semantic check: valid pending value (eoc.length if native.false)
       if ( (instruccionAux["is_native"] === false) &&
	    (typeof instruccionAux.eoc   !== 'undefined') &&
	    (instruccionAux.eoc.length   !== xr_info.ir.default_eltos.eoc.length)     &&
	    (instruccionAux.eoc.length   !== xr_info.ir.default_eltos.eoc.lengths[0]) &&
	    (instruccionAux.eoc.length   !== xr_info.ir.default_eltos.eoc.lengths[1]) )
       {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'BAD EOC BIN. LEN.') +
			     "'" + frm_getToken(context) + "'") ;
       }

       // return context
       context.error = null ;
       return context ;
}

