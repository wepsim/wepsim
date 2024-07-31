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


function firm_metadata_read ( context )
{
        // optional:
        //   *firmware {
        //       version  = 2,
        //       rel_mult = 2,
        //       endian   = little
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
        }

	// match mandatory }
	if (! frm_isToken(context,"}")) {
	      return frm_langError(context,
				   i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
	}
	frm_nextToken(context);

        // return context
        return context ;
}


