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
         *  Examples
         */

        /* jshint esversion: 6 */
        class ws_examples extends ws_uielto
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
		    this.innerHTML = table_examples_html(ws_info.examples) ;
	      }
        }

        register_uielto('ws-examples', ws_examples) ;


        /*
         *  Examples to HTML
         */

        function table_examples_html ( examples )
        {
            // harware
            var ahw      = 'ep' ;
            var ep_modes = wepsim_mode_getAvailableModes() ;
     
            var mode = get_cfg('ws_mode') ;
            if ( (mode !== "null") && (! ep_modes.includes(mode)) ) {
                  ahw = mode ;
            }
     
            // examples
            var base_url = get_cfg('base_url') ;
     
            var fmt_toggle    = "" ;
            var w100_toggle   = "" ;
            var toggle_cls    = "" ;
            var t_hwmcasm     = "" ;
            var t_index       = "" ;
            var e_title       = "" ;
            var e_type        = "" ;
            var e_level       = "" ;
            var e_hw          = "" ;
            var e_mc          = "" ;
            var e_asm         = "" ;
            var e_description = "" ;
            var e_id          = "" ;
     
            // first pass: build data
            var u = "" ;
            var examples_groupby_type = {} ;
            for (var m=0; m<examples.length; m++)
            {
     	       // if (current_hw != example_hw) || (current_mode not in example_modes) -> continue
     	       e_modes = examples[m].modes ;
     	       if (! e_modes.split(",").includes(mode)) {
     		   continue ;
     	       }
     
     	       e_hw = examples[m].hardware ;
     	       if (e_hw !== ahw) {
     		   continue ;
     	       }
     
     	       // add example to the example summary
     	       e_title       = examples[m].title ;
     	       e_type        = examples[m].type  ;
     	       e_level       = 'actual' ;
     	       e_mc          = examples[m].microcode ;
     	       e_asm         = examples[m].assembly ;
     	       e_description = examples[m].description ;
     	       e_id          = examples[m].id ;
     
     	       t_hwmcasm = e_hw + ":" + e_mc + ":" + e_asm ;
     	       t_index   = (m+1).toString().padStart(2, ' ').replace(/ /g, '&nbsp;') ;
     
     	        if (fmt_toggle === "")
     	            fmt_toggle  = "bg-light" ;
     	       else fmt_toggle  = "" ;
     	        if (m % 2 == 0)
                         w100_toggle = "collapse7 show" ;
     	       else w100_toggle = "" ;
                    toggle_cls = fmt_toggle + ' user_' + e_level ;
     
     	            u = '<div class="col-sm-auto py-1 ' + toggle_cls + '">' +
                             '    <span class="badge badge-pill badge-light">' + t_index + '</span>' +
                             '</div>' +
                             '<div class="col-sm-4    py-1 ' + toggle_cls + '">' +
                             '     <span style="cursor:pointer;" ' +
     		        '           id="example_' + m + '" ' +
     		        '           onclick="simcore_record_append_pending();' +
     		        '                    load_from_example_firmware(\'' + t_hwmcasm + '\', true);' +
     		        '                    setTimeout(function() { wsweb_dialog_close(\'examples\'); }, 50);' +
     		        '                    return false;"' +
     		        '           class="btn-like bg-info text-white text-truncate rounded border px-1 mr-1"' +
                             '           style="cursor:pointer;" data-langkey="' + e_title + '">' +
                                  e_title + '</span>' +
     		        '<span id="example_reference_' + e_id + '" class="d-none">' + 
                                  base_url + '?mode=' + mode + 
     				        '&examples_set=' + ws_info.example_set[ws_info.example_active].name + 
     				        '&example=' + m + 
                             '</span>' +
     		        '    <div class="btn-group btn-group-md">' +
                             '           <button type="button" ' +
     		        '                   class="btn btn-md btn-outline-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                             '              <span class="sr-only">Toggle Dropdown</span>' +
                             '           </button>' +
                             '           <div class="dropdown-menu bg-info" style="z-index:1024;">' +
     		        '             <a onclick="simcore_record_append_pending();' +
     		        '                         load_from_example_firmware(\'' + t_hwmcasm + '\', true);' +
     		        '                         wsweb_dialog_close(\'examples\'); ' +
     		        '                         return false;"' +
     		        '                class="dropdown-item text-white bg-info" href="#"><c><span data-langkey="Load example">Load example</span></c></a>' +
     		        '             <a onclick="simcore_record_append_pending();' +
     		        '                         load_from_example_assembly(\'' + t_hwmcasm + '\', false);' +
     		        '                         wsweb_dialog_close(\'examples\'); ' +
     		        '                         return false;"' +
     		        '                class="dropdown-item text-white bg-info" href="#"><c><span data-langkey="Load Assembly only">Load Assembly only</span></c></a>' +
     		        '             <a onclick="simcore_record_append_pending();' +
     		        '                         load_from_example_firmware(\'' + t_hwmcasm + '\', false);' +
     		        '                         wsweb_dialog_close(\'examples\'); ' +
     		        '                         return false;"' +
     		        '                class="dropdown-item text-white bg-info" href="#"><c><span data-langkey="Load Firmware only">Load Firmware only</span></c></a>' +
     		        '             <a onclick="$(\'#example_reference_' + e_id + '\').removeClass(\'d-none\');' +
     		        '                         wepsim_clipboard_CopyFromDiv(\'example_reference_' + e_id + '\');' +
     		        '                         $(\'#example_reference_' + e_id + '\').addClass(\'d-none\');' +
     		        '                         wsweb_dialog_close(\'examples\'); ' +
                             '                         return false;"' +
     		        '                class="dropdown-item text-white bg-info" href="#"><c><span data-langkey="Copy reference to clipboard">Copy reference to clipboard</span></c></a>' +
     	                '             <a onclick="wsweb_dialog_close(\'examples\'); ' +
                             '                         share_example(\'' + m + '\', \'' + base_url + '\');' +
                             '                         return false;"' +
     		        '                class="dropdown-item text-white bg-info user_archived" href="#"><c><span data-langkey="Share">Share</span></c></a>' +
     	                '           </div>' +
     		        '    </div>' +
                             '</div>' +
                             '<div class="col-sm py-1 collapse7 show ' + toggle_cls + '">' +
                             '    <c>' + e_description + '</c>' +
                             '</div>' +
     	                '<div class="w-100 ' + w100_toggle + ' ' + toggle_cls + '"></div>' ;
     
     	       if (typeof examples_groupby_type[e_type] === "undefined") {
     		   examples_groupby_type[e_type] = [] ;
     	       }
     	       examples_groupby_type[e_type].push({ 'row':   u,
     		                                    'level': e_level }) ;
            }
     
            // second pass: build html
            var o = '' ;
                u = '' ;
            var l = '' ;
            for (m in examples_groupby_type)
            {
     	        u = '<div class="row py-1">' ;
     	        l = examples_groupby_type[m][0].level ;
                     for (var n=0; n<examples_groupby_type[m].length; n++)
                     {
     		     u = u + examples_groupby_type[m][n].row ;
     
     		     if (l !== examples_groupby_type[m][n].level) {
     			 l = '' ;
                          }
                     }
                     u = u + '</div>' ;
     
     	        o = o + "<div class='col-sm-12 border-bottom border-secondary text-right text-capitalize font-weight-bold bg-white sticky-top user_" + l + "'>" +
     			ahw.toUpperCase() + ": " + m +
     			"</div>" + u ;
            }
     
            if (o.trim() === '') {
     	   o = '&lt;<span data-langkey="No examples available...">No examples are available for the selected hardware</span>&gt;' ;
            }
     
            o = '<div class="container grid-striped border border-light">' + o + '</div>' ;
            return o ;
        }

