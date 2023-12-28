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
              render ( event_name )
              {
                    // initialize render elements...
                    super.render() ;

                    // render current element
                    this.render_skel() ;
                    this.render_populate() ;
              }

              render_skel ( )
              {
                    var cfgdiv_id = 'config2-scroller' ; // -> this.name_str + '-scroller' ;

                    // default content
                    this.innerHTML = "<div class='ui-body-d ui-content p-0' id='" + cfgdiv_id + "' " +
                                     "     style='min-height:50vh; max-height:70vh; " +
                                     "            overflow-y:auto; overflow-x:auto; -webkit-overflow-scrolling:touch;'>" +
                                     "</div>" ;
              }

              render_populate ( )
              {
                    var cfgdiv_id = 'config2-scroller' ; // -> this.name_str + '-scroller' ;

                    // render HTML elements
                    var o1 = table_config_html(ws_info.config_ui) ;
                    $('#' + cfgdiv_id).html(o1) ;

		    // initialize UI elements
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

		    var popover_cfg = {
		   	    placement:  'bottom',
			    trigger:    'focus, hover',
			    animation:  false,
			    delay:      { "show": 500, "hide": 100 },
			    sanitizeFn: function (content) {
					     return content ; // DOMPurify.sanitize(content) ;
				        }
		        } ;
                    wepsim_popovers_init('a[data-bs-toggle="popover1"]', popover_cfg, null) ;
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
     	     var e_class_1     = "" ;
     	     var e_class_2     = "" ;
     	     var e_code_cfg    = "" ;
     	     var e_description = "" ;
     	     var e_id          = "" ;


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
     	        e_class_1 = "                " + e_u_class + " " ;
     	        e_class_2 = " collapse7 show " + e_u_class + " " ;

     		row = '<div class="w-100 p-0 m-0 border-top border-2 '   + e_class_2 + '">' +
                      '</div>' +
                      '<div class="col-md-auto py-2 ' + e_class_1 + '">' +
     		      '    <span class="badge rounded-pill text-secondary">' + (n+1) + '</span>' +
     		      '</div>' +
     		      '<div class="col-md-4    py-2 ' + e_class_1 + '">' +
                           e_code_cfg  +
                      '</div>' +
     		      '<div class="col-md      py-2 align-items-center ' + e_class_2 + '">' +
                           '<c>' + e_description + '</c>' +
                      '</div>' ;

     		// indexing row
     		if (typeof config_groupby_type[e_type] === "undefined") {
     		    config_groupby_type[e_type] = [] ;
     		}

     		config_groupby_type[e_type].push({'row':     row,
     			                          'u_class': e_u_class}) ;
            }

            // second pass: build html
            var o  = '<div class="container grid-striped border border-tertiary"><div class="row">' ;
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

                     if (n%2 == 0) {
                         u = u + '<div class="w-100 p-0 m-0"></div>' ;
                     }
                }

     	        l = '' ;
     	        for (var lj in l2)
     	        {
     		     if (l2[lj] === config_groupby_type[m].length) {
     			 l += lj + ' ' ;
     		     }
     		}

     		o = o + "<div class='float-none text-end text-capitalize fw-bold col-12 border-bottom border-secondary bg-body sticky-top " + l + "'>" +
     			"<span data-langkey='" + m + "'>" + m + "</span>" +
     			"</div>" + u ;
            }
            o = o + '</div></div>' ;

            return o ;
         }

