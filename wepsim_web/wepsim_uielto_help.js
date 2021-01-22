/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


        /*
         *  Help
         */

        /* jshint esversion: 6 */
        class ws_help extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( )
	      {
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.innerHTML = table_helps_html(ws_info.help) ;
	      }
        }

        register_uielto('ws-help', ws_help) ;


        /*
         *  Help to HTML
         */

        function table_helps_html ( helps )
        {
            var o = "" ;
    
            var fmt_toggle    = "" ;
            var w100_toggle   = "" ;
            var toggle_cls    = "" ;
            var fmt_header    = "" ;
    	    var e_title       = "" ;
    	    var e_itype       = "" ;
    	    var e_utype       = "" ;
    	    var e_reference   = "" ;
    	    var e_description = "" ;
    	    var e_id          = "" ;
    	    var t_index       = "" ;
    
            var utypes = [] ;
            for (var m=0; m<helps.length; m++)
            {
    	        if (false === array_includes(utypes, helps[m].u_type)) {
    	            utypes.push(helps[m].u_type) ;
                }
            }
    
            o = o + '<div class="container grid-striped border border-light">' + '<div class="row py-1">' ;
            for (m=0; m<helps.length; m++)
            {
    	        fmt_header = "" ;
    	        if (e_utype != helps[m].u_type) {
    		    fmt_header = "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top'>" +
    			         helps[m].u_type +
    			         "</div>" ;
    		}
    
    		e_title       = helps[m].title ;
    		e_itype       = helps[m].i_type ;
    		e_utype       = helps[m].u_type ;
    		e_uclass      = helps[m].u_class ;
    		e_reference   = helps[m].reference ;
    		e_description = helps[m].description ;
    		e_id          = helps[m].id ;
    
    		var onclick_code = "" ;
    		if ("relative" === e_itype)
    		    onclick_code = 'wepsim_help_set_relative(\'' + e_reference + '\');' +
    				   'wepsim_help_refresh();' ;
    		if ("absolute" === e_itype)
    		    onclick_code = 'wepsim_help_set_absolute(\'' + e_reference + '\');' +
    				   'wepsim_help_refresh();' ;
    		if ("code" === e_itype)
    		    onclick_code = e_reference ;
    
    	        if (fmt_toggle === "")
    	            fmt_toggle = "bg-light" ;
    	       else fmt_toggle = "" ;

    	        if (m % 2 == 0)
                     w100_toggle = "collapse7 show" ;
    	        else w100_toggle = "" ;

                toggle_cls = fmt_toggle + ' ' + e_uclass + ' ' + e_utype ;
    
    	        t_index   = (m+1).toString().padStart(2, ' ').replace(/ /g, '&nbsp;') ;
    
    		o = o + fmt_header +
    			'<div class="col-sm-auto py-1 ' + toggle_cls + '">' +
    			'    <span class="badge badge-pill badge-light">' + t_index + '</span>' +
    			'</div>' +
    			'<div class="col-sm-4 py-1 ' + toggle_cls + '">' +
    			'    <span class="btn-like bg-success text-white text-truncate rounded border px-1" ' +
                        '          style="cursor:pointer;" ' +
    			'          id="help_index_' + m + '" ' +
                        '          data-langkey="' + e_title + '" ' +
    		        '          onclick="simcore_record_append_pending(); ' +
                                            onclick_code + ' ; ' +
                        '                   return false;">' +
                             e_title + '</span>' +
    			'</div>' +
    			'<div class="col-sm collapse7 show py-1 ' + toggle_cls + '">' +
    			'    <c>' + e_description + '</c>' +
    			'</div>' +
    	                '<div class="w-100 ' + w100_toggle + ' ' + toggle_cls + '"></div>' ;
           }
           o = o + '</div></div>' ;
    
           return o ;
        }

