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


     import { frm_nextToken,
              frm_isToken,
              frm_langError,
              frm_getToken }    from "./lexical.js";
     import { i18n_get_TagFor } from "../../wepsim_i18n/i18n.js";


export function firm_metadata_write ( context )
{
	var o = "" ;

        // no metadata -> return empty metadata section
	if (typeof context.metadata == "undefined") {
            return o ;
        }

        // set default metadata
        var m = {
                   version:    2,
                   rel_mult:   2,
                   pc_rel_offset: 0,
                   endian:     "little",
                   immediates: '{}'
                } ;

        // update metadata with actual values
        if (typeof context.metadata.version != "undefined") {
            m.version = context.metadata.version ;
        }

        if (typeof context.metadata.rel_mult != "undefined") {
            m.rel_mult = context.metadata.rel_mult ;
        }

        if (typeof context.metadata.pc_rel_offset != "undefined") {
            m.pc_rel_offset = context.metadata.pc_rel_offset ;
        }

        if (typeof context.metadata.endian != "undefined") {
            m.endian = context.metadata.endian ;
        }

        // **immediate = { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type, ... }**
        if (typeof context.metadata.immediates != "undefined")
	{
            m.immediates = '{\n' ;
            for (var i=0; i<context.metadata.immediates.length; i++)
            {
                 // { **ranges(31:31|19:12|20:20|30:21)**+se(1)+padding(1)=j_type, ... }
                 m.immediates += '\t\t ranges(' ;
                 for (var j=0; j<context.metadata.immediates[i].ranges.length; j++)
                 {
                      m.immediates += context.metadata.immediates[i].ranges[j][0] + ':' + context.metadata.immediates[i].ranges[j][1] ;

                      if (context.metadata.immediates[i].ranges.length > j+1) {
                          m.immediates += '|' ;
		      }
                 }
                 m.immediates += ')' ;

                 // { ranges(31:31|19:12|20:20|30:21)**+se(1)**+padding(1)=j_type, ... }
                 if (context.metadata.immediates[i].sign_extend) {
                     m.immediates += '+se(1)' ;
                 }

                 // { ranges(31:31|19:12|20:20|30:21)+se(1)**+padding(1)**=j_type, ... }
                 if (context.metadata.immediates[i].padding != 0) {
                     m.immediates += '+padding(' + context.metadata.immediates[i].padding + ')' ;
                 }

                 // { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)**=j_type**, ... }
                 m.immediates += '=' + context.metadata.immediates[i].name ;

                 // { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type**,** ... }
                 if (context.metadata.immediates.length > i+1)
                      m.immediates = m.immediates + ',\n' ;
		 else m.immediates = m.immediates +  '\n' ;
            }

            m.immediates = m.immediates + '\t\t}' ;
        }

        // return metadata as string...
        o += "\n" +
             "firmware {\n" +
             "   version       = " + m.version       + ",\n" +
             "   rel_mult      = " + m.rel_mult      + ",\n" +
             "   pc_rel_offset = " + m.pc_rel_offset + ",\n" +
             "   endian        = " + m.endian        + ",\n" +
             "   immediates    = " + m.immediates    +  "\n" +
             "}\n" +
             "\n" ;

	return o ;
}


export function firm_metadata_read ( context )
{
        // optional:
        //   *firmware {
        //       version       = 2,
        //       rel_mult      = 2,
        //       pc_rel_offset = 0,
        //       endian        = little,
        //       immediates    = '...'
        //    }*

	frm_nextToken(context);
	// match mandatory {
	if (! frm_isToken(context, "{")) {
	      return frm_langError(context,
				   i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
	}

	frm_nextToken(context) ;
        // match "version, rel_mult, endian, ... }"
        while ( (context.t < context.text.length) && (! frm_isToken(context, "}")) )
        {
		// optional: *version* = 2,
		if (frm_isToken(context, "version"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context, "=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory FIRMWARE_VERSION
		    context.metadata.version = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context, ","))
			frm_nextToken(context);
		}

		// optional: *rel_mult* = 2,
		if (frm_isToken(context, "rel_mult"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context, "=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory relative_offset_multiplier (1, 2, 4, ...)
		    context.metadata.rel_mult = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context, ","))
			frm_nextToken(context);
		}

		// optional: *pc_rel_offset* = 0,
		if (frm_isToken(context, "pc_rel_offset"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context, "=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory pc_relative_offset (0, 4, -4, ...)
		    context.metadata.pc_rel_offset = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context, ","))
			frm_nextToken(context);
		}

                // optional: *endian* = little
		if (frm_isToken(context, "endian"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context, "=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory endian (big or little)
		    context.metadata.endian = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context, ","))
			frm_nextToken(context);
		}

                // optional: *immediate* = { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type, ... }
		if (frm_isToken(context, "immediates"))
		{
		    context.metadata.immediates = [] ;

		    frm_nextToken(context) ;
		    // match mandatory '=' -> mandatory: *=* { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type, ... }
		    if (! frm_isToken(context, "=")) {
			  return frm_langError(context,
                                               i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context) ;
		    // match mandatory '{' -> = *{* ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type, ... }
		    if (! frm_isToken(context, "{")) {
			  return frm_langError(context,
                                               i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
		    }

                    frm_nextToken(context);
                    // match optional 'ranges' -> { *ranges*(31:31|19:12|20:20|30:21)+se(1)+padding(1)=j_type, ... }
		    while (frm_isToken(context, "ranges"))
		    {
                        var range_val = '' ;
			var elto = { "name": "", "sign_extend": false, "padding": 0, "ranges": [] } ;

			frm_nextToken(context);
                        // match mandatory '('
                        if (! frm_isToken(context, "(")) {
                                return frm_langError(context,
                                                    i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
                        }

			frm_nextToken(context);
		        while (frm_isToken(context, ")") == false)
                        {
                            var range_elto = [ 0, 0 ] ;

		            // already matchs mandatory **<start-bit>**:<stop-bit>
                            range_val = frm_getToken(context) ;
                            range_elto[0] = parseInt(range_val, 10) ;

		            frm_nextToken(context) ;
		            // match mandatory : -> <start-bit>**:**<stop-bit>
		            if (! frm_isToken(context, ":")) {
                                  return frm_langError(context,
                                                       i18n_get_TagFor('compiler', 'COLON NOT FOUND')) ;
		            }

		            frm_nextToken(context) ;
		            // match mandatory <start-bit>:**<stop-bit>**
                            range_val = frm_getToken(context) ;
                            range_elto[1] = parseInt(range_val, 10) ;

			    elto.ranges.push(range_elto) ;

		            frm_nextToken(context) ;
		            // match optional '|' -> <start-bit>:<stop-bit>**|** ...
		            if (frm_isToken(context, "|"))
                                frm_nextToken(context);
                        }

			frm_nextToken(context);
		        // match optional 'se' -> { ranges(31:31|19:12|20:20|30:21)*+se(1)*+padding(1)=j_type, ... }
		        if (frm_isToken(context, "+se"))
			{
			    frm_nextToken(context) ;
                            // match mandatory '('
                            if (! frm_isToken(context, "(")) {
                                    return frm_langError(context,
                                                         i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
                            }

			    frm_nextToken(context) ;
                            // match mandatory 0|1
                            range_val = frm_getToken(context) ;
                            if (parseInt(range_val, 10) != 0)
                                 elto.sign_extend = true ;
			    else elto.sign_extend = false ;

		            frm_nextToken(context) ;
		            // match mandatory )
		            if (! frm_isToken(context, ")")) {
			          return frm_langError(context,
                                                       i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
		            }

		            frm_nextToken(context) ;
			}

                        // match optional 'padding' -> { ranges(31:31|19:12|20:20|30:21)+se(1)*+padding(1)*=j_type, ... }
		        if (frm_isToken(context, "+padding"))
			{
			    frm_nextToken(context) ;
                            // match mandatory '('
                            if (! frm_isToken(context, "(")) {
                                    return frm_langError(context,
                                                         i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
                            }

			    frm_nextToken(context) ;
                            // match mandatory 0|1
                            range_val = frm_getToken(context) ;
                            elto.padding = parseInt(range_val, 10) ;

		            frm_nextToken(context) ;
		            // match mandatory )
		            if (! frm_isToken(context, ")")) {
			          return frm_langError(context,
                                                       i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
		            }

		            frm_nextToken(context) ;
			}

		        // match mandatory = -> { ranges(31:31|19:12|20:20|30:21)+se(1)+padding(1)*=*j_type, ... }
		        if (! frm_isToken(context, "=")) {
                              return frm_langError(context,
                                                   i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		        }

			frm_nextToken(context) ;
                        // match mandatory <name>
                        elto.name = frm_getToken(context) ;

		        frm_nextToken(context);
		        // match optional ,
                        if (frm_isToken(context, ","))
		    	    frm_nextToken(context);

			// Add the new immediate element to the array
		        context.metadata.immediates.push(elto) ;
		    }

		    // match mandatory }
		    if (! frm_isToken(context, "}")) {
			  return frm_langError(context,
                                               i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context, ","))
                        frm_nextToken(context);
		}
        }

	// match mandatory }
	if (! frm_isToken(context, "}")) {
	      return frm_langError(context,
				   i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
	}
	frm_nextToken(context);

        // return context
        context.error = null ;
        return context ;
}


