
/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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


function find_first_oceoc_v1 ( context, curr_instruction, first_oc, last_oc )
{
           var k = 0 ;
           var m = 0 ;
           var xr_info = simhw_sim_ctrlStates_get() ;
           var eoc_len = xr_info.ir.default_eltos.eoc[0].length ;

           var ret = {} ;
               ret.label_oc  = '' ;
               ret.label_eoc = '' ;

	   // analize if instruction has any field that uses eoc bits... -> m points to
           var eoc_overlaps = false ;
	   for (m=0; m<curr_instruction.fields.length; m++)
           {
	        if (curr_instruction.fields[m].stopbit === "0")
                {
                    eoc_overlaps = true ;
                    break ;
	        }
	   }

           // find first free 'oc-eoc' code
	   for (j=first_oc; j<last_oc; j++)
	   {
                // new initial oc...
		ret.label_oc = j.toString(2).padStart(6, "0") ;

                // (1/3) check for free oc-0000...
		if (typeof context.oc_eoc[ret.label_oc] === "undefined")
                {
		    context.oc_eoc[ret.label_oc]         = {} ;
		    context.oc_eoc[ret.label_oc].witheoc = false ;
		    return ret ;
                }

                // (2/3) search for free oc-eoc...
                if (typeof curr_instruction.eoc !== "undefined")
                {
                    // eoc in use... -> skip eoc
		    if (typeof context.oc_eoc[ret.label_oc].eoc[curr_instruction.eoc] !== "undefined") {
		        continue ;
		    }

                    // use eoc
		    ret.label_eoc = curr_instruction.eoc ;
		    return ret ;
                }

                // (3/3) check if skip (new instruction overlaps || existing instructions overlap)...
                if (eoc_overlaps === true) {
		    continue ;
                }
                if (typeof context.oc_eoc[ret.label_oc].witheoc === "undefined") {
		    continue ;
                }
                if (context.oc_eoc[ret.label_oc].witheoc === false) {
		    continue ;
                }

                // new initial oc-eoc...
                first_eoc = 0 ;
                last_eoc  = (1 << eoc_len) - 1 ; // Math.pow(2, eoc_len) - 1 ;
		for (k=first_eoc; k<last_eoc; k++)
		{
		     ret.label_eoc = k.toString(2).padStart(eoc_len, "0") ;

                     if (        (context.oc_eoc[ret.label_oc].eoc === null) ||
                          (typeof context.oc_eoc[ret.label_oc].eoc === 'undefined') )
                     {
		          context.oc_eoc[ret.label_oc].eoc = {};
                          return ret ;
                     }
                     if (typeof context.oc_eoc[ret.label_oc].eoc[ret.label_eoc] === "undefined")
                     {
                          return ret ;
                     }
		}
	   }

           return ret ;
}

function resolve_pending_oceoc_v1 ( context )
{
           var ret = {} ;
           var i = 0 ;

           var     xr_info = simhw_sim_ctrlStates_get() ;
	   var all_ones_oc = "1".repeat(xr_info.ir.default_eltos.oc.length) ;

	   var ir_oc_length = 6 ;
	   if (typeof xr_info !== "undefined") {
	       ir_oc_length = xr_info.ir.default_eltos.oc.length ;
	   }

	   var first_oc = 0 ;
	   var last_oc = (1 << ir_oc_length) - 1 ; // Math.pow(2, ir_oc_length) - 1 ;
	   var last_oc_str = last_oc.toString(2) ;

	   var curr_instruction = null ;
	   for (i=0; i<context.instrucciones.length; i++)
	   {
		curr_instruction = context.instrucciones[i] ;

		// skip non-111111... cases
		if ( (curr_instruction.name === "begin") || (curr_instruction.oc !== last_oc_str) ) {
                      continue ;
		}

		// find first free 'oc-eoc' code
		var r = find_first_oceoc_v1(context, curr_instruction, first_oc, last_oc) ;
		if ('' == r.label_oc) {
		    return frm_langError(context,
					 i18n_get_TagFor('compiler', 'NO OC CODES')) ;
		}

		// work with this free 'oc-eoc' code
		first_oc = parseInt(r.label_oc, 2) ;

		curr_instruction.oc = r.label_oc ;
		context.oc_eoc[r.label_oc].signature = curr_instruction.signature ;

		if (r.label_eoc !== "")
		{
		    curr_instruction.eoc = r.label_eoc ;
		    context.oc_eoc[r.label_oc].eoc[r.label_eoc] = curr_instruction.signature ;
		    context.oc_eoc[r.label_oc].witheoc = true ;
		}

		// updating the opcode pattern (e.g.: "------10101-----1100") again, with the new oc/eoc
		ret = firm_instruction_compute_opcode_pattern(context, curr_instruction) ;
                if (typeof ret.error != "undefined") {
                    return ret ;
                }
	   }

           return ret ;
}

