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
         *  Simulated HW
         */

        /* jshint esversion: 6 */
        class ws_hw extends ws_uielto
        {
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
                    // default content
                    this.innerHTML = '<div id="' + 'config_HW_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:scroll; -webkit-overflow-scrolling:touch;"></div>' ;
              }

	      render_populate ( )
	      {
                    var div_hash = '#' + 'config_HW_' + this.name_str ;

                    // if no active hardware -> empty
                    var ahw = simhw_active() ;
                    if (ahw === null) {
                        $(div_hash).html('') ;
                        return ;
                    }

                    // if no visible -> skip data population
/*
		    if ($(div_hash).is(':visible') == false) {
                        $(div_hash).html('') ;
                        return ;
                    }
*/

                    // set and go
	            simcoreui_init_hw(div_hash, this.components_arr) ;
              }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-hw', ws_hw) ;
        }


        //
        //  Hardware Information Panel
        //

        var ws_signals_show_inactive = true ;
        var ws_states_show_inactive  = true ;

        var simcoreui_hwui_fn = {} ;
        simcoreui_hwui_fn.summary   = simcoreui_hw_summary_init ;
        simcoreui_hwui_fn.elements  = simcoreui_hw_elements_init ;  // simulated
        simcoreui_hwui_fn.signals   = simcoreui_hw_signals_init ;   // simulation
        simcoreui_hwui_fn.states    = simcoreui_hw_states_init ;    // simulation
        simcoreui_hwui_fn.behaviors = simcoreui_hw_behaviors_init ; // simulation

        function simcoreui_init_hw ( div_name, components_arr )
        {
              // get active hardware
              var ahw = simhw_active() ;

              // prepare hash (if not done before)
              if (typeof ahw.elements_hash == "undefined") {
                  simhwelto_prepare_hash(ahw) ;
              }

              // build HTML...
              var o = '' ;
              var framed = (components_arr.length > 1) ;
              for (var i=0; i < components_arr.length; i++)
              {
                   var cname = components_arr[i] ;
                   if (typeof simcoreui_hwui_fn[cname] !== "undefined") {
                       o += simcoreui_hwui_fn[cname](ahw, framed) ;
                   }
              }

              // ...load HTML
	      $(div_name).html(o) ;

              // initialization of recent HTML added components
	      popover_cfg = {
	  	      trigger:    'hover click',
		      container:  'body',
		      placement:  'auto',
		      template:   '<div class="popover py-2 px-3 bg-dark text-white" role="tooltip">' +
		    	          '<div class="arrow border-dark" ' +
			          '     style="border-right-color:black !important;"></div>' +
			          '<h3 class="popover-header"></h3>' +
			          '<div class="popover-body text-white border-dark p-0"></div>' +
			          '</div>',
		      sanitizeFn: function (content) {
			             return content ; // DOMPurify.sanitize(content) ;
			          }
	          } ;

              var popover_on_show = function (e) {
                                        var ahw = simhw_active() ;
					if (typeof ahw == "undefined")
					    return ;

                                        var elto_ref = e.currentTarget.dataset.hwid ;
					if (typeof elto_ref == "undefined")
					    return ;

                                        var pid = e.target.getAttribute('aria-describedby') ;
                                        var p   = $('#' + pid).html() ;

                                        var elto_type = e.currentTarget.dataset.hwclass ;
                                        switch (elto_type)
					{
					   case "state":
                                                p = simcoreui_hw_states_popup(ahw.states,  elto_ref) ;
						break;
					   case "signal":
                                                p = simcoreui_hw_signals_popup(ahw.signals, elto_ref) ;
						break;
					   default:
						break;
					}

                                        // e.currentTarget.dataset.bsContent = p ;
                                        $('#' + pid).html(p) ;
                                    } ;

              wepsim_popovers_init('.popover_hw', popover_cfg, popover_on_show) ;
        }

        function simcoreui_show_hw ( )
        {
              var ahw = simhw_active() ;

              simcoreui_hw_signals_update(ahw) ;
              simcoreui_hw_states_update(ahw) ;

              return true ;
        }

        function simcoreui_signal_dialog ( ahw_elto_name )
        {
              wepsim_update_signal_dialog(ahw_elto_name) ;
              wepsim_popovers_hide(".popover_hw") ;
        }

        // hw_summary

        function simcoreui_hw_summary_init ( ahw, framed )
        {
	    // card with list
	    var o = '' ;
	    o += '<div class="card m-2">' +
		 '    <div class="card-header border border-tertiary p-2" style="background-color:#E8E8E8">' +
		 '      <h5 class="card-title">' +
		 '        <span class="row">' +
		 '          <span class="col-6">' + ahw.sim_name + ' (' + ahw.sim_short_name + ')</span>' +
		 '          <a data-bs-toggle="collapse" href="#th_processor" role="button"   class="col w-25" ' +
		 'aria-expanded="false" aria-controls="th_processor">' +
		 '<img src="' + ahw.sim_img_processor + '" class="img-thumbnail" alt="sim_img_processor"></a>' +
		 '          <a data-bs-toggle="collapse" href="#th_controlunit" role="button" class="col w-25" ' +
		 'aria-expanded="false" aria-controls="th_controlunit">' +
		 '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail" alt="sim_img_controlunit"></a>' +
		 '        </span>' +
		 '      </h5>' +
		 '    </div>' +
		 '    <div class="card-body border border-tertiary p-0">' +
		 '      <p class="card-text">' +
		 '      <span class="collapse multi-collapse" id="th_processor">' +
		 '<img src="' + ahw.sim_img_processor + '"   class="img-thumbnail mb-2" alt="sim_img_processor"></a>' +
		 '      </span>' +
		 '      <span class="collapse multi-collapse" id="th_controlunit">' +
		 '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail mb-2" alt="sim_img_controlunit"></a>' +
		 '      </span>' +
		 '      </p>' +
		 '    </div>' +
		 '</div>' ;

	    return o ;
        }

        // signal

        function simcoreui_hw_signals_init ( ahw, framed )
        {
	    var elto_c  = '' ;
	    var e = '' ;
	    var c = '' ;

	    // list of signals
	    c = '<span class="row justify-content-between">' ;
	    for (var elto in ahw.signals)
	    {
		 elto_c = 'hw_signal_strong_' + elto ;
		 e      = 'signal ' + elto ; // simcoreui_hw_signals_popup(ahw.signals, elto) ;

		 c += '<span class="' + elto_c + ' s-ina col fw-normal">' +
		      '<a href="#" id="hw_signal_tt_' + elto + '" ' +
		      '   aria-hidden="false" ' +
		      '   class="popover_hw" data-bs-toggle="popover" onclick="event.preventDefault();" ' +
                      '   data-hwclass="signal" data-hwid="' + elto + '"' +
                      '   data-content="' + e + '"' +
		      '   data-bs-html="true" title="">' + elto + '</a>' +
		      '</span>' ;
	    }
	    c += '</span>' ;

	    // card with signal list
            if (framed) {
                c = simcoreui_hw_init_signals_card(c) ;
            }

            // return signals
            return c ;
        }

        function simcoreui_hw_init_signals_card ( content )
        {
	    var o = '  <div class="card m-2">' +
		    '    <div class="card-header border border-tertiary p-2" style="background-color:#E8E8E8">' +
		    '      <h5 class="card-title m-0">' +
		    '       <div class="container">' +
		    '       <span class="row">' +
		    '        <span class="col-auto ps-0" ' +
		    '              data-langkey="Signals">Signals</span>' +
		    '        <span class="btn-group col-auto ms-auto p-0" role="btn group" ' +
		    '              arial-label="active and dependencies">' +
                                simcoreui_hw_btn_active_signals_toggle() +
                                simcoreui_hw_btn_signals_dependencies_toggle() +
		    '        </span>' +
		    '       </span>' +
		    '       </div>' +
		    '      </h5>' +
		    '    </div>' +
		    '    <div class="card-body border border-tertiary p-2">' +
		    '      <div id="depgraph1c" class="m-2 p-0 border collapse h-100" ' +
		    '           style="max-height:65vh; overflow:auto; resize:both;">' +
		    '         <span id="depgraph1">Loading...</span>' +
		    '      </div>' +
		    '      <p class="card-text">' + content + '</p>' +
		    '    </div>' +
		    '  </div>' ;

	    return o ;
        }

        function simcoreui_hw_btn_active_signals_toggle ( )
        {
            var o = '<span class="col-auto btn btn-sm btn-outline-secondary me-2" ' +
		    '      data-bs-toggle="tooltip" data-bs-html="true" ' +
		    '      title="Shows/Hide inactive signals"' +
		    '      onclick="ws_signals_show_inactive = !ws_signals_show_inactive;' +
		    '               $(\'.s-ina\').toggle();' +
		    '               return false;" ' +
		    '      data-langkey="Active">Active</span>' ;

	    return o ;
        }

        function simcoreui_hw_btn_signals_dependencies_toggle ( )
        {
            var o = '<span class="col-auto btn btn-sm btn-outline-secondary" ' +
		    '      data-bs-toggle="tooltip" data-bs-html="true" ' +
		    '      title="Graph of the signal dependencies <br>(it needs several seconds to be displayed)."' +
		    '      onclick="$(\'#depgraph1c\').collapse(\'toggle\'); ' +
		    '               show_visgraph(jit_fire_dep, jit_fire_order);" ' +
		    '      data-langkey="Dependencies">Dependencies</span>' ;

	    return o ;
        }

        function simcoreui_hw_signals_popup ( ahw_signals, elto )
        {
              var e = '' ;

	      // checks
	      if (typeof ahw_signals[elto] == "undefined") {
	          return e ;
	      }

              // value
              var elto_v  = ahw_signals[elto].value ;
              var elto_dv = ahw_signals[elto].default_value ;

              // v != dv
              var elto_c = (elto_v != elto_dv) ? '      col fw-bold' :
						 's-ina col fw-normal' ;

              // value (hex)
              elto_v  = '0x' +  elto_v.toString(16) ;
              elto_dv = '0x' + elto_dv.toString(16) ;

              e = '<span style=\'text-align:left\'>' +
                  '<span data-langkey=\'name\'>name</span>: ' + ahw_signals[elto].name  + '<br>' +
                  '<span data-langkey=\'value\'>value</span>: ' +
                  '<span onclick=simcoreui_signal_dialog(\'' + ahw_signals[elto].name + '\'); ' +
                  '      class=\'fw-bold\'>' + elto_v +
                  '</span><br>' +
                  '<span data-langkey=\'default_value\'>default_value</span>: ' + elto_dv + '<br>' +
                  '<span data-langkey=\'nbits\'>nbits</span>: '           + ahw_signals[elto].nbits + '<br>' +
                  '<span data-langkey=\'type\'>type</span>: '             + ahw_signals[elto].type  + '<br>' +
                  '<span data-langkey=\'visible\'>visible</span>: '       + ahw_signals[elto].visible +
                  '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                  '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                  "        onclick='wepsim_popovers_hide(\".popover_hw\");'>" +
                  '<span data-langkey=\'Close\'>Close</span></button>' +
                  '</span>' ;

              return e ;
        }

        function simcoreui_hw_signals_update ( ahw, framed )
        {
              var elto_v  = '' ;
              var elto_dv = '' ;
              var e = '' ;

              // list of signals
              for (var elto in ahw.signals)
              {
                   e = '' ; // simcoreui_hw_signals_popup(ahw.signals, elto) ;

                   id_tt     = "hw_signal_tt_"     + elto ;
                   id_strong = "hw_signal_strong_" + elto ;

                   // reset
                   $("." + id_tt).attr('data-content', e) ;
                   $("." + id_tt).attr('aria-hidden',  'false') ;
                   $("." + id_strong).attr('class', 'col fw-bold ' + id_strong) ;
                   $("." + id_strong).show() ;

                   // set
                   elto_v  = ahw.signals[elto].value ;
                   elto_dv = ahw.signals[elto].default_value ;
                   if (elto_v == elto_dv)
                   {
                       $("." + id_tt).attr('aria-hidden', 'true') ;

                       $("." + id_strong).attr('class', 's-ina col fw-normal ' + id_strong) ;
                       if (ws_signals_show_inactive == false) {
                           $("." + id_strong).hide() ;
                       }
                   }
              }

              return true ;
        }

        // hw_states

        function simcoreui_hw_states_init ( ahw, framed )
        {
	    var elto_c  = '' ;
	    var e = '' ;
	    var c = '' ;

	    // list of states
	    c = '<span class="row justify-content-between">' ;
	    for (var elto in ahw.states)
	    {
		 elto_c = 'hw_state_strong_' + elto ;
		 e      = 'state ' + elto ; // simcoreui_hw_states_popup(ahw.states, elto) ;

		 c += '<span class="' + elto_c + ' t-ina col fw-normal">' +
		      '<a href="#" ' +
                      '   class="hw_state_tt_' + elto + ' popover_hw" ' +
		      '   data-bs-toggle="popover" onclick="event.preventDefault();" ' +
                      '   data-hwclass="state" data-hwid="' + elto + '"' +
                      '   data-bs-content="' + e + '"' +
		      '   data-bs-html="true" title="">' + elto + '</a>' +
		      '</span>' ;
	    }
	    c += '</span>' ;

	    // card with state list
            if (framed) {
                c = simcoreui_hw_init_states_card(c, ahw) ;
            }

            // return states
            return c ;
        }

        function simcoreui_hw_init_states_card ( content, ahw )
        {
	    var o = '<div class="card m-2">' +
		    ' <div class="card-header border border-tertiary p-2" style="background-color:#E8E8E8">' +
		    '      <h5 class="card-title m-0">' +
		    '       <div class="container">' +
		    '       <span class="row">' +
		    '        <span class="col-auto ps-0" ' +
		    '              data-langkey="States">States</span>' +
		    '        <span class="btn-group col-auto ms-auto p-0" role="btn group" ' +
		    '              arial-label="active and dependencies">' +
                               simcoreui_hw_btn_active_states_toggle() +
		    '          <span class="col-auto btn btn-sm btn-outline-secondary me-2" ' +
		    '                data-bs-toggle="tooltip" data-bs-html="true" ' +
		    '                title="It shows the control states: PC, IR, and SP."' +
		    '                onclick="$(\'#ctrlstates1\').collapse(\'toggle\');" ' +
		    '                data-langkey="Control States">Control States</span>' +
		    '        </span>' +
		    '       </span>' +
		    '       </div>' +
		    '      </h5>' +
		    '    </div>' +
		    '    <div class="card-body border border-tertiary p-2">' +
		    '      <div id="ctrlstates1" class="m-2 p-0 border collapse" ' +
		    '           style="max-height:65vh; overflow:auto; resize:both;">' +
		    '      <table id="ctrlstates1" class="table table-sm table-bordered p-0">' +
		    '         <tr>' +
		    '         <td>' + ahw.ctrl_states.pc.state + '</td>' +
                    '         <td>&rarr;</td>' +
		    '         <td>Program Counter (PC)</td>' +
		    '         </tr>' +
		    '         <tr>' +
		    '         <td>' + ahw.ctrl_states.ir.state + '</td>' +
                    '         <td>&rarr;</td>' +
		    '         <td>Instruction Register (IR)</td>' +
		    '         </tr>' +
		    '         <tr>' +
		    '         <td>' + ahw.ctrl_states.sp.state + '</td>' +
                    '         <td>&rarr;</td>' +
		    '         <td>Stack Pointer (SP)</td>' +
		    '         </tr>' +
		    '      </table>' +
		    '      </div>' +
		    '      <p class="card-text">' + content + '</p>' +
		    ' </div>' +
		    '</div>' ;

	    return o ;
        }

        function simcoreui_hw_btn_active_states_toggle ( )
        {
            var o = '<span class="col-auto btn btn-sm btn-outline-secondary me-2" ' +
		    '      data-bs-toggle="tooltip" data-bs-html="true" ' +
		    '      title="Shows/Hide inactive states"' +
		    '      onclick="ws_states_show_inactive = !ws_states_show_inactive;' +
		    '               $(\'.t-ina\').toggle();' +
		    '               return false;" ' +
		    '      data-langkey="Active">Active</span>' ;

	    return o ;
        }

        function simcoreui_hw_states_popup ( ahw_states, elto )
        {
              var e = '' ;

	      // checks
	      if (typeof ahw_states[elto] == "undefined") {
	          return e ;
	      }

	      // get value and default value
              var elto_v  = value_toString(ahw_states[elto].value) ;
              var elto_dv = value_toString(ahw_states[elto].default_value) ;

              // v != dv
              var elto_c = (elto_v != elto_dv) ? '      col fw-bold' :
						 't-ina col fw-normal' ;

              // nbits, and visible
              var elto_nb = '-' ;
              if (typeof ahw_states[elto].nbits != 'undefined') {
                  elto_nb = ahw_states[elto].nbits ;
	      }

              var elto_vi = '-' ;
              if (typeof ahw_states[elto].visible != 'undefined') {
                  elto_vi = ahw_states[elto].visible ;
	      }

              // compound
              e = '<span style=\'text-align:left\'>' +
                  '<span data-langkey=\'name\'>name</span>: '                   + elto + '<br>' +
                  '<span data-langkey=\'value\'>value</span>: ' +
                  '<span id=\'hw_state_value_' + elto + '\' ' +
                  '      class=\'fw-bold\'>' + elto_v +
                  '</span><br>' +
                  '<span data-langkey=\'default_value\'>default_value</span>: ' + elto_dv + '<br>' +
                  '<span data-langkey=\'nbits\'>nbits</span>: '                 + elto_nb + '<br>' +
                  '<span data-langkey=\'visible\'>visible</span>: '             + elto_vi +
                  '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                  '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                  '        onclick=wepsim_popovers_hide(\'.popover_hw\');>' +
                  '<span data-langkey=\'Close\'>Close</span></button>' +
                  '</span>' ;

              return e ;
        }

        function simcoreui_hw_states_update ( ahw )
        {
              var e = '' ;
              var elto_v  = '' ;
              var elto_dv = '' ;
              var elto_c  = '' ;
              var id_tt     = '' ;
              var id_strong = '' ;

              // list of states
              for (var elto in ahw.states)
              {
                   // popup
                   e = '' ; // simcoreui_hw_states_popup(ahw.states, elto) ;

                   id_tt     = "hw_state_tt_"     + elto ;
                   id_strong = "hw_state_strong_" + elto ;

                   // reset
                   $("." + id_tt).attr('data-content', e) ;
                   $("." + id_tt).attr('aria-hidden', 'false') ;
                   $("." + id_strong).show() ;
                   $("." + id_strong).attr('class', 'col-auto fw-bold ' + id_strong) ;

                   // set if equal
                   elto_v  = value_toString(ahw.states[elto].value) ;
                   elto_dv = value_toString(ahw.states[elto].default_value) ;
                   if (elto_v == elto_dv)
                      {
                          $("." + id_tt).attr('aria-hidden', 'true') ;

                          if (ws_states_show_inactive == false) {
                              $("." + id_strong).hide() ;
                          }

                          $("." + id_strong).attr('class', 't-ina col fw-normal ' + id_strong) ;
                      }
              }

              return true ;
        }

        // behaviors

        function simcoreui_hw_behaviors_init ( ahw, framed )
        {
              // list of behaviors
              var c = '<span class="row justify-content-between">' ;
              for (var elto in ahw.behaviors)
              {
                   c = c + '<span class="col-auto">' +
                           '<a href="#" class="popover_hw" data-bs-toggle="popover" onclick="event.preventDefault();" ' +
                           '   data-hwclass="behavior" data-hwid="' + elto + '"' +
                           '   data-bs-content="' +
                           '<span style=\'text-align:left\'>' +
                           '<span data-langkey=\'name\'>name</span>: '               + elto + '<br> ' +
                           '<span data-langkey=\'nparameters\'>nparameters</span>: ' + ahw.behaviors[elto].nparameters + '<br> ' +
                        // 'operation: '       + ahw.behaviors[elto].operation.toString() + '<br> ' +
                        // 'verbal: '          + ahw.behaviors[elto].verbal.toString() + '<br> ' +
                           '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                           '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                           '        onclick=wepsim_popovers_hide(\'.popover_hw\');><span data-langkey=\'Close\'>Close</span></button>' +
                           '</span>' +
                           '"' +
                           '   data-bs-html="true" title="">' + elto + '</a></span>' ;
              }
              c = c + '</span>' ;

              // card with behaviors list
              var o = '  <div class="card m-2">' +
                      '    <div class="card-header border border-tertiary p-2" style="background-color:#E8E8E8">' +
                      '      <h5 class="card-title m-0"><span data-langkey="Behaviors">Behaviors</span></h5>' +
                      '    </div>' +
                      '    <div class="card-body border border-tertiary p-2">' +
                      '      <p class="card-text">' + c + '</p>' +
                      '    </div>' +
                      '  </div>' ;

              return o ;
        }

        // list subcomponents (component, name, states, signals)

        function simcoreui_hw_components_popup ( ahw, elto )
        {
	      var e = '<span data-langkey=\'name\'>name</span>: '            + ahw.components[elto].name + '<br> ' +
		      '<span data-langkey=\'version\'>version</span>: '      + ahw.components[elto].version + '<br> ' +
		      '<span data-langkey=\'abilities\'>abilities</span>: '  + ahw.components[elto].abilities.join(" + ") +
		      '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
		      '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
		      '        onclick=wepsim_popovers_hide(\'.popover_hw\');>' +
		      '<span data-langkey=\'Close\'>Close</span></button>' ;

              return e ;
        }

        function simcoreui_hw_elements_popup ( elto_path, elto )
        {
	      var e = simhwelto_describe_component(elto_path, elto, 'html') +
		      '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
		      '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
		      '        onclick=wepsim_popovers_hide(\'.popover_hw\');>' +
		      '<span data-langkey=\'Close\'>Close</span></button>' ;

              return e ;
        }

        function simcoreui_hw_elements_init ( ahw, framed )
        {
	    var i = 0 ;
	    var o = '' ;
	    var c = '' ;
	    var p = '' ;
	    var elto_c         = '' ;
	    var last_belongs   = '' ;
	    var state_ref      = '' ;
	    var state_ref_orig = '' ;

	    // header
            o += '<div class="table-responsive">' +
                 '<table class="table table-sm table-bordered table-striped m-0">' +
                 '<thead><tr>' +
                 '<th class="sticky-top col-2 p-1"><span data-langkey="Component">Component</span></th>' +
                 '<th class="sticky-top col-2 p-1"><span data-langkey="Element">Element</span></th>' +
                 '<th class="sticky-top col-3 p-1"><span data-langkey="States (In)">States (In)</span></th>' +
                 '<th class="sticky-top col-3 p-1"><span data-langkey="States (Out)">States (Out)</span></th>' +
                 '<th class="sticky-top col-2 p-1"><span data-langkey="Signals">Signals</span></th>' +
                 '</tr></thead>' ;

	    // rows of elements (name + states + signals)
            o += '<tbody>' ;
	    for (var b in ahw.elements_hash.by_belong)
	    {
                 p = simcoreui_hw_components_popup(ahw, b) ;

	         o += '<tr>' +
                      '<td class="col-2" rowspan="' + ahw.elements_hash.by_belong[b].length + '">' +
		      '<span class="row"><span class="col">' +
		      '<a href="#" class="popover_hw" data-bs-toggle="popover" data-bs-html="true" ' +
                      '   data-hwclass="component" data-hwid="' + b + '"' +
                      '   data-bs-content="' + p + '"' +
		      '   onclick="event.preventDefault();" title="">' + b + '</a></span></span>' +
                      '</td>' ;

	         for (var j=0; j<ahw.elements_hash.by_belong[b].length; j++)
	         {
		         // new row
                         elto = ahw.elements_hash.by_belong[b][j] ;
                         elto_path = ahw.sim_short_name + ':' + elto.key ;

			 // 1) name
			 o += '<td class="col-2"><span class="row w-100">' +
		              '<span class="col">' +
                              '<a href="#" id="belongs_id_' + j + '" ' +
			      '   class="popover_hw" data-bs-toggle="popover" ' +
			      '   onclick="event.preventDefault();" ' +
                              '   data-hwclass="element" data-hwid="' + elto + '"' +
                              '   data-bs-content="' + simcoreui_hw_elements_popup(elto_path, elto) + '"' +
			      '   data-bs-html="true" title="">' + elto.name + '</a></span></span>' +
                              '</td>' ;

			 // 2) list of input states
			 o += '<td class="col-3"><span class="row w-100">' ;
			 for (i=0; i<elto.states_inputs.length; i++)
			 {
				 state_ref_orig = elto.states[elto.states_inputs[i]].ref ;
				 state_ref      = state_ref_orig.split('/')[0] ;

				 elto_c = 'hw_state_strong_' + state_ref ;
				 p = 'state ' + state_ref; // simcoreui_hw_states_popup(ahw.states, state_ref) ;

				 o += '<span class="' + elto_c + ' t-ina col fw-normal">' +
				      '<a href="#" ' +
                                      '   class="hw_state_tt_' + state_ref + ' popover_hw text-wrap" ' +
				      '   data-bs-toggle="popover" ' +
				      '   onclick="event.preventDefault();" ' +
				      '   data-bs-html="true" title="" ' +
                                      '   data-hwclass="state" data-hwid="' + state_ref + '"' +
                                      '   data-bs-content="' + p + '">' +
                                      state_ref_orig + '</a>' +
				      '</span>' + '<span class="w-100"></span>' ;
			 }
			 o += '</span></td>' ;

			 // 3) list of output states
			 o += '<td class="col-3"><span class="row w-100">' ;
			 for (i=0; i<elto.states_outputs.length; i++)
			 {
				 state_ref = elto.states[elto.states_outputs[i]].ref ;

				 elto_c = 'hw_state_strong_' + state_ref ;
				 p = 'state ' + state_ref ; // simcoreui_hw_states_popup(ahw.states, state_ref) ;

				 o += '<span class="' + elto_c + ' t-ina col fw-normal">' +
				      '<a href="#" ' +
                                      '   class="hw_state_tt_' + state_ref + ' popover_hw text-wrap" ' +
				      '   data-bs-toggle="popover" ' +
				      '   onclick="event.preventDefault();" ' +
				      '   data-bs-html="true" title="" ' +
                                      '   data-hwclass="state" data-hwid="' + state_ref + '"' +
                                      '   data-bs-content="' + p + '">' +
                                      state_ref + '</a>' +
				      '</span>' + '<span class="w-100"></span>' ;
			 }
			 o += '</span></td>' ;

			 // 4) list of signals
			 o += '<td class="col-2"><span class="row w-100">' ;
			 for (var es in elto.signals)
			 {
				 signal_ref = elto.signals[es].ref ;

				 elto_c = 'hw_signal_strong_' + signal_ref ;
				 e = 'signal ' + signal_ref ; // simcoreui_hw_signals_popup(ahw.signals, signal_ref) ;

				 // value
				 o += '<span class="' + elto_c + ' s-ina col fw-normal">' +
				      '<a href="#" id="hw_signal_tt_' + signal_ref + '" ' +
				      '   aria-hidden="false" ' +
				      '   class="popover_hw text-wrap" data-bs-toggle="popover" ' +
				      '   onclick="event.preventDefault();" ' +
				      '   data-bs-html="true" title="" ' +
                                      '   data-hwclass="signal" data-hwid="' + signal_ref + '"' +
                                      '   data-bs-content="' + e + '">' +
                                      signal_ref + '</a>' +
				      '</span>' + '<span class="w-100"></span>' ;
			 }
			 o += '</span></td>' ;

			 // end of row
			 o += '</tr>' ;
	         }
	    }
            o += '</tbody></table></div>' ;

	    // card with element list
            if (framed) {
                o = simcoreui_hw_init_elements_card(o) ;
            } else {
                o = '<div class="px-2">' + o + '</div>' ;
            }

            // return list
            return o ;
        }

        function simcoreui_hw_init_elements_card ( content )
        {
            var o = '' ;

	    o = '  <div class="card m-2">' +
		'    <div class="card-header border border-tertiary p-2" style="background-color:#E8E8E8">' +
		'      <h5 class="card-title m-0">' +
		'       <div class="container">' +
		'       <span class="row">' +
		'        <span class="col-auto ps-0" ' +
		'              data-langkey="Components">Components</span>' +
		'        <span class="btn-group col-auto ms-auto p-0" role="btn group" ' +
		'              arial-label="active and dependencies">' +
		'        </span>' +
		'       </span>' +
		'       </div>' +
		'      </h5>' +
		'    </div>' +
		'    <div class="card-body border border-tertiary p-2">' +
		'      <p class="card-text">' + content + '</p>' +
		'    </div>' +
		'  </div>' ;

	    return o ;
        }

