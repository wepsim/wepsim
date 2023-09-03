/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
		    var helpdiv_id = 'scroller-help1' ; // -> '#scroller-' + this.name_str ;

                    // default content
		    this.innerHTML = "<div class='ui-body-d ui-content p-0' id='" + helpdiv_id + "' " +
                                     "     style='min-height:50vh; max-height:70vh; " +
                                     "            overflow-y:auto; -webkit-overflow-scrolling:touch;'>" +
                                     "</div>" ;
	      }

	      render_populate ( )
	      {
                    // id + arguments
		    var helpdiv_hash = '#scroller-help1' ; // -> '#scroller-' + this.name_str ;
	            var type_ref_arr = this.components_str.split(':') ;
                    var help_type    = type_ref_arr[0] ;
                    var help_arg     = type_ref_arr[1] ;

		    // content
		    var seg_idiom = get_cfg('ws_idiom') ;
                    var ahw       = simhw_active() ;
		    var seg_hardw = ahw.sim_short_name ;

		    var helpurl = '' ;
                    var o1 = '<br><h2>Loading...</h2>' ;
                    switch (help_type)
                    {
                         case 'relative':
		              var r = help_arg.split("#") ;
		              helpurl = 'help/' + r[0] + '-' + seg_idiom + '.html' ;
		              resolve_html_url(helpdiv_hash, helpurl, '#' + r[1], uielto_help_scrolltothetop) ;
                              simcore_ga('help', 'help.relative', 'help.relative.' + help_arg) ;
		              break ;

                         case 'absolute':
		              helpurl = 'repo/hardware/' + seg_hardw + '/help/' +
			                help_arg + '-' + seg_idiom + '.html' ;
		              resolve_html_url(helpdiv_hash, helpurl, '', uielto_help_scrolltothetop) ;
                              simcore_ga('help', 'help.absolute', 'help.absolute.' + help_arg) ;
		              break ;

                         case 'code':
                              switch (help_arg)
                              {
                                  case 'hardware_summary':
                                       o1 = uielto_help_hw_summary_image(seg_hardw) +
                                            '<br>' +
				            '<ws-help-hweltos></ws-help-hweltos><br>' ;
                                       simcore_ga('help', 'help.code', 'help.code.hardware_summary') ;
                                       break;

                                  case 'assembly_summary':
                                       o1 = '<ws-help-swset></ws-help-swset>' ;
                                       simcore_ga('help', 'help.code', 'help.code.assembly_summary') ;
                                       break;

                                  case 'index':
		                       o1 = table_helps_html(ws_info.help) ;
		                       simcore_ga('help', 'help.code', 'help.code.index') ;
                                       break;
                              }
		              break ;
                    }

		    $('#scroller-help1').html(o1) ;
	      }
        }

        register_uielto('ws-help', ws_help) ;


        /*
         *  Help to HTML
         */

	// scrolling
        function uielto_help_scrolltothetop ( )
        {
	    var helpdiv_hash_container = 'scroller-help1' ;
	    var elto = document.getElementById(helpdiv_hash_container) ;
	    if (elto != null)
	 	elto.scrollTop = 0 ;
	}

	// hardware summary image
        function uielto_help_hw_summary_image ( seg_hardw )
        {
	    var img2 = 'repo/hardware/' + seg_hardw + '/images/cpu.svg?time=20230710' ;

	    return '<button class="btn btn-secondary w-100" type="button"' +
                   '        data-bs-toggle="collapse"   data-bs-target="#hw_img_collapse1"' +
                   '        aria-expanded="false"   aria-controls="hw_img_collapse1"' +
                   '><span data-langkey="Show/Hide processor as image">Show/Hide processor as image</span>...' +
                   '</button>' +
                   '</br>' +
                   '<div class="collapse" id="hw_img_collapse1">' +
                   '<div class="card card-body px-0 pt-3 pb-0">' +
	           '<object id=svg_p2 ' + 'data=\'' + img2 + '\' ' + 'type=\'image/svg+xml\'>' +
		   'Your browser does not support SVG' +
		   '</object>' +
                   '</div>' +
                   '</div>' ;
	}

	// set help content
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
  	    var e_uclass      = "" ;
    	    var e_reference   = "" ;
    	    var e_description = "" ;
    	    var e_id          = "" ;
    	    var t_index       = "" ;
            var m = 0;

            var utypes = [] ;
            for (m=0; m<helps.length; m++)
            {
    	        if (false === array_includes(utypes, helps[m].u_type)) {
    	            utypes.push(helps[m].u_type) ;
                }
            }

            o = o + '<div class="container grid-striped border border-tertiary">' + '<div class="row py-1">' ;
            for (m=0; m<helps.length; m++)
            {
    	        fmt_header = "" ;
    	        if (e_utype != helps[m].u_type) {
    		    fmt_header = "<div class='float-none text-end text-capitalize fw-bold col-12 border-bottom border-secondary bg-body sticky-top mb-2'>" +
    			         helps[m].u_type +
    			         "</div>" ;
    		}

    		e_title       = helps[m].title ;
    		e_utype       = helps[m].u_type ;
    		e_uclass      = helps[m].u_class ;
    		e_reference   = helps[m].reference ;
    		e_description = helps[m].description ;
    		e_id          = helps[m].id ;

    		var onclick_code = "simcore_record_append_pending();" +
    		                   e_reference + ";" +
                                   "simcore_ga('help', 'help.index', 'help.index." + m + "');" ;

    	        if (fmt_toggle === "")
    	            fmt_toggle = "bg-body-tertiary" ;
    	       else fmt_toggle = "" ;

    	        if (m % 2 == 0)
                     w100_toggle = "collapse7 show" ;
    	        else w100_toggle = "" ;

                toggle_cls = fmt_toggle + ' ' + e_uclass + ' ' + e_utype ;

    	        t_index   = (m+1).toString().padStart(2, ' ').replace(/ /g, '&nbsp;') ;

    		o = o + fmt_header +
    			'<div class="col-xs-5 col-lg-4 py-1 align-self-center ' + toggle_cls + '">' +
    			'    <span class="badge rounded-pill text-secondary me-2">' + t_index + '</span>' +
    			'    <button class="btn btn-md bg-success text-white text-truncate text-wrap border p-0 w-75" ' +
                        '          style="cursor:pointer;" ' +
    			'          id="help_index_' + m + '" ' +
                        '          data-langkey="' + e_title + '" ' +
    		        '          onclick="' + onclick_code + 'return false;">' +
                             e_title + '</button>' +
    			'</div>' +
    			'<div class="col-sm collapse7 show py-1 ' + toggle_cls + '">' +
    			'    <c>' + e_description + '</c>' +
    			'</div>' +
    	                '<div class="w-100 ' + w100_toggle + ' ' + toggle_cls + '"></div>' ;
           }
           o = o + '</div></div>' ;

           return o ;
        }

