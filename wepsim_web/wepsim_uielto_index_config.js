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
         *  Configuration options
         */

        /* jshint esversion: 6 */
        class ws_config extends ws_uielto
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
		    this.innerHTML = table_config_html(ws_info.config_ui) ;

		    // ui elements
                    var m=0 ;
		    try
		    {
		        for (m=0; m<ws_info.config_ui.length; m++) {
		   	     ws_info.config_ui[m].code_init() ;
		        }
		    }
		    catch (e) {
		        reset_cfg() ;
		        for (m=0; m<ws_info.config_ui.length; m++) {
			     ws_info.config_ui[m].code_init() ;
		        }
		    }

		    $('a[data-toggle="popover1"]').popover({
		   	     placement:  'bottom',
			     trigger:    'focus, hover',
			     animation:  false,
			     delay:      { "show": 500, "hide": 100 },
			     sanitizeFn: function (content) {
					     return content ; // DOMPurify.sanitize(content) ;
				         }
		    }) ;
	      }
        }

        register_uielto('ws-config', ws_config) ;


        /*
         *  Configuration to HTML
         */

        function table_config_html ( config )
        {
     	     var e_type        = "" ;
     	     var e_u_class     = "" ;
     	     var e_code_cfg    = "" ;
     	     var e_description = "" ;
     	     var e_id          = "" ;
     
             var fmt_toggle    = "" ;
             var fmt_header    = "" ;
     
             // first pass: build data
             var row = "" ;
             var config_groupby_type = {} ;
             for (var n=0; n<config.length; n++)
             {
     		e_type        = config[n].type ;
     		e_u_class     = config[n].u_class ;
     		e_code_cfg    = config[n].code_cfg ;
     		e_description = config[n].description ;
     		e_id          = config[n].id ;
     
     		// related row
     	        if (fmt_toggle === "")
     	            fmt_toggle = "bg-light" ;
     	       else fmt_toggle = "" ;
     
     		row = '<div class="row py-1 ' + fmt_toggle + ' ' + e_u_class + '" id="' + e_type + '">' +
     		      '<div class="col-md-auto">' +
     		      '    <span class="badge badge-pill badge-light">' + (n+1) + '</span>' +
     		      '</div>' +
     		      '<div class="col-md-4">'  + e_code_cfg   + '</div>' +
     		      '<div class="col-md collapse7 show align-items-center"><c>' + e_description + '</c></div>' +
     		      '</div>' ;
     
     		// indexing row
     		if (typeof config_groupby_type[e_type] === "undefined") {
     		    config_groupby_type[e_type] = [] ;
     		}
     
     		config_groupby_type[e_type].push({'row':     row,
     			                          'u_class': e_u_class}) ;
            }
     
            // second pass: build html
            var o  = '<div class="container grid-striped border border-light">' ;
            var u  = '' ;
            var l  = '' ;
            var l1 = [] ;
            var l2 = {} ;
            for (var m in config_groupby_type)
            {
     	        u  = '' ;
     	        l2 = {} ;
                     for (n=0; n<config_groupby_type[m].length; n++)
                     {
     		     u = u + config_groupby_type[m][n].row ;
     
     	             l1 = config_groupby_type[m][n].u_class.split(' ') ;
     		     for (var li=0; li<l1.length; li++)
     	             {
     			  if (typeof l2[l1[li]] === 'undefined') {
     			      l2[l1[li]] = 0 ;
     			  }
     			  l2[l1[li]]++ ;
     		     }
                     }
     
     	        l = '' ;
     	        for (var lj in l2)
     	        {
     		     if (l2[lj] === config_groupby_type[m].length) {
     			 l += lj + ' ' ;
     		     }
     		}
     
     		o = o + "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top " + l + "'>" +
     			"<span data-langkey='" + m + "'>" + m + "</span>" +
     			"</div>" + u ;
            }
            o = o + '</div>' ;
     
            return o ;
         }

