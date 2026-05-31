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


function firm_metadata_write ( context )
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
                   immediates: ''
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

        if (typeof context.metadata.immediates != "undefined")
	{
	    m.immediates = JSON.stringify(context.metadata.immediates) ;
            m.immediates = m.immediates.replace("'", "\"")
                                       .replace("[", "'")
                                       .replace("]", "'") ;
        }

        // return metadata as string...
        o += "\n" +
             "firmware {\n" +
             "   version    = " + m.version    + ",\n" +
             "   rel_mult   = " + m.rel_mult   + ",\n" +
             "   pc_rel_offset = " + m.pc_rel_offset + ",\n" +
             "   endian     = " + m.endian     + ",\n" +
             "   immediates = " + m.immediates +  "\n" +
             "}\n" +
             "\n" ;

	return o ;
}


function firm_metadata_read ( context )
{
        // optional:
        //   *firmware {
        //       version    = 2,
        //       rel_mult   = 2,
        //       pc_rel_offset = 0,
        //       endian     = little,
        //       immediates = '...'
        //    }*

	frm_nextToken(context);
	// match mandatory {
	if (! frm_isToken(context,"{")) {
	      return frm_langError(context,
				   i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
	}

	frm_nextToken(context) ;
        // match "version, rel_mult, endian, ... }"
        while ( (context.t < context.text.length) && (! frm_isToken(context,"}")) )
        {
		// optional: *version* = 2,
		if (frm_isToken(context, "version"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context,"=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory FIRMWARE_VERSION
		    context.metadata.version = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context,","))
			frm_nextToken(context);
		}

		// optional: *rel_mult* = 2,
		if (frm_isToken(context, "rel_mult"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context,"=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory relative_offset_multiplier (1, 2, 4, ...)
		    context.metadata.rel_mult = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context,","))
			frm_nextToken(context);
		}

		// optional: *pc_rel_offset* = 0,
		if (frm_isToken(context, "pc_rel_offset"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context,"=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory pc_relative_offset (0, 4, -4, ...)
		    context.metadata.pc_rel_offset = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context,","))
			frm_nextToken(context);
		}

                // optional: *endian* = little
		if (frm_isToken(context, "endian"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context,"=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory endian (big or little)
		    context.metadata.endian = frm_getToken(context) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context,","))
			frm_nextToken(context);
		}

		// optional: *immediates* = '...',
		if (frm_isToken(context, "immediates"))
		{
		    frm_nextToken(context);
		    // match mandatory =
		    if (! frm_isToken(context,"=")) {
			  return frm_langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
		    }

		    frm_nextToken(context);
		    // match mandatory FIRMWARE_IMMEDIATES (string to JSON)
		    var ifmt = frm_getToken(context) ;
		    if (ifmt[0] == "'") {
		        // '{ "key": value, ... }' -> [ {"key": value, ... ]
                        ifmt = ifmt.replaceAll(/^\'/g, "[")
                                   .replaceAll(/\'$/g, "]") ;
		    }
		    else
		    if (ifmt[0] == '"') {
		        // "{ 'key': value, ... }" -> [ {"key": value, ... ]
                        ifmt = ifmt.replaceAll(/'/g, '"')
				   .replaceAll(/^\"/g, "[")
                                   .replaceAll(/\"$/g, "]") ;
		    }
		    context.metadata.immediates = JSON.parse(ifmt) ;

		    frm_nextToken(context);
		    // match optional ,
		    if (frm_isToken(context,","))
			frm_nextToken(context);
		}
        }

	// match mandatory }
	if (! frm_isToken(context,"}")) {
	      return frm_langError(context,
				   i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
	}
	frm_nextToken(context);

        // return context
        context.error = null ;
        return context ;
}


