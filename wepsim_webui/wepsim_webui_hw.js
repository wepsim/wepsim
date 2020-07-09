/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
        class ws_hw extends HTMLElement
        {
              constructor ()
              {
                    // parent
                    super();
              }

              render ( )
              {
                    var ahw = simhw_active() ;

                    // if no active hardware -> empty 
                    if (ahw === null) {
                        return '<div id="config_HW" ' + 
                               '     style="height:58vh; width: inherit; overflow-y: scroll; -webkit-overflow-scrolling: touch;"></div>' ;
                    }

                    // default content
                    var o1 = '<div id="config_HW" ' + 
                             '     style="height:58vh; width: inherit; overflow-y: scroll; -webkit-overflow-scrolling: touch;">' ;
                    o1 += this.simcoreui_hw_summary_init(ahw) ;
                    o1 += this.simcoreui_hw_signals_init(ahw) ;
                    o1 += this.simcoreui_hw_states_init(ahw) ;
                    o1 += this.simcoreui_hw_behaviors_init(ahw) ;
                    o1 += '</div>' ; 
      
                    // set and go
                    this.innerHTML = o1 ;
      
                    $('[data-toggle="tooltip"]').tooltip({
                          trigger:   'hover',
                        sanitizeFn: function (content) {
                                       return content ; // DOMPurify.sanitize(content) ;
                                    }
                    }) ;
      
                    $('.popover_hw').popover({
                        trigger:    'hover click',
                        container:  'body',
                        placement:  'auto',
                        template:   '<div class="popover" role="tooltip">' +
                                    '<div class="arrow border-dark" ' + 
                                    '     style="border-right-color:black !important;"></div>' +
                                    '<h3 class="popover-header"></h3>' +
                                    '<div class="popover-body bg-dark text-white border-dark"></div>' +
                                    '</div>',
                        sanitizeFn: function (content) {
                                       return content ; // DOMPurify.sanitize(content) ;
                                    }
                    }) ;
      
                    return o1 ;
              }

              connectedCallback ()
              {
                    this.render() ;
              }

              //
              // init for summary, signals, states, and behaviours
              //

              simcoreui_hw_summary_init ( ahw )
              {
                    // list of components
                    var c = '<span class="row justify-content-between">' ;
                    for (var elto in ahw.components)
                    {
                         c = c + '<span class="col-auto">' +
                                 '<a href="#" class="popover_hw" data-toggle="popover" data-html="true" onclick="event.preventDefault();" title="" data-content="' +
                                 'name: '            + ahw.components[elto].name + '<br> ' +
                                 'version: '         + ahw.components[elto].version + '<br> ' +
                                 'abilities: '       + ahw.components[elto].abilities.join(" + ") +
                                 '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                                 '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                                 '        onclick=$(\'.popover_hw\').popover(\'hide\');><span data-langkey=\'Close\'>Close</span></button>' +
                                 '">' + elto + '</a></span>' ;
                    }
                    c = c + '</span>' ;
      
                    // card with signal list
                    var o = '' ;
                    o += '<div class="card m-2">' +
                         '    <div class="card-header border border-light p-2" style="background-color:#E8E8E8">' +
                         '      <h5 class="card-title">' +
                         '        <span class="row">' +
                         '          <span class="col-6">' + ahw.sim_name + ' (' + ahw.sim_short_name + ')</span>' +
                         '          <a data-toggle="collapse" href="#th_processor" role="button"   class="col w-25" ' +
                         'aria-expanded="false" aria-controls="th_processor">' +
                         '<img src="' + ahw.sim_img_processor + '" class="img-thumbnail" alt="sim_img_processor"></a>' +
                         '          <a data-toggle="collapse" href="#th_controlunit" role="button" class="col w-25" ' +
                         'aria-expanded="false" aria-controls="th_controlunit">' +
                         '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail" alt="sim_img_controlunit"></a>' +
                         '        </span>' +
                         '      </h5>' +
                         '    </div>' +
                         '    <div class="card-body border border-light p-2">' +
                         '      <p class="card-text">' +
                         '      <span class="collapse multi-collapse" id="th_processor">' +
                         '<img src="' + ahw.sim_img_processor + '"   class="img-thumbnail mb-2" alt="sim_img_processor"></a>' +
                         '      </span>' +
                         '      <span class="collapse multi-collapse" id="th_controlunit">' +
                         '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail mb-2" alt="sim_img_controlunit"></a>' +
                         '      </span>' +
                                c +
                         '      </p>' +
                         '    </div>' +
                         '</div>' ;
      
                    return o ;
              }

              simcoreui_hw_signals_init ( ahw )
              {
                    // list of signals
                    var elto_v  = '' ;
                    var elto_dv = '' ;
                    var elto_c  = '' ;
      
                    var e = '' ;
                    var c = '<span class="row justify-content-between">' ;
                    for (var elto in ahw.signals)
                    {
                         // value
                         elto_v  = ahw.signals[elto].value ;
                         elto_dv = ahw.signals[elto].default_value ;
      
                         elto_v  = '0x' +  elto_v.toString(16) ;
                         elto_dv = '0x' + elto_dv.toString(16) ;
      
                         // v != dv
                         elto_c = (elto_v != elto_dv) ? 'font-weight-bold' : 's-ina font-weight-normal' ;
      
                         e =     '<span style=\'text-align:left\'>' +
                                 'name: '            + ahw.signals[elto].name  + '<br>' +
                                 'value: '           + '<span' +
                                                       ' onclick=simcoreui_signal_dialog(\'' + ahw.signals[elto].name + '\'); ' +
                                                       ' class=\'font-weight-bold\'>' + elto_v +
                                                       '</span><br>' +
                                 'default_value: '   + elto_dv                 + '<br>' +
                                 'nbits: '           + ahw.signals[elto].nbits + '<br>' +
                                 'type: '            + ahw.signals[elto].type  + '<br>' +
                                 'visible: '         + ahw.signals[elto].visible +
                                 '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                                 '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                                 '        onclick=$(\'.popover_hw\').popover(\'hide\');><span data-langkey=\'Close\'>Close</span></button>' +
                                 '</span>' ;
                         c = c + '<span class="col-auto">' +
                                 '<a href="#" id="hw_signal_tt_' + elto + '" ' +
                                 '   aria-hidden="false" ' +
                                 '   class="popover_hw" data-toggle="popover" onclick="event.preventDefault();" ' +
                                 '   data-html="true" title="" data-content="' + e + '">' +
                                 '<span id="hw_signal_strong_' + elto + '" class="' + elto_c + '">' +
                                 elto +
                                 '</span></a>' +
                                 '</span>' ;
                    }
                    c = c + '</span>' ;
      
                    // card with signal list
                    var o = '  <div class="card m-2">' +
                            '    <div class="card-header border border-light p-2" style="background-color:#E8E8E8">' +
                            '      <h5 class="card-title m-0">' +
                            '       <div class="container">' +
                            '       <span class="row">' +
                            '        <span class="col-auto pl-0" ' + 
                            '              data-langkey="Signals">Signals</span>' +
                            '        <span class="btn-group col-auto ml-auto p-0" role="btn group" ' + 
                            '              arial-label="active and dependencies">' +
                            '          <span class="col-auto btn btn-sm btn-outline-secondary mr-2" ' +
                            '                data-toggle="tooltip" data-html="true" ' + 
                            '                title="Shows/Hide inactive signals"' +
                            '                onclick="ws_signals_show_inactive = !ws_signals_show_inactive;' + 
                            '                         $(\'.s-ina\').toggle();' +
                            '                         return false;" ' +
                            '                data-langkey="Active">Active</span>' +
                            '          <span class="col-auto btn btn-sm btn-outline-secondary" ' +
                            '                data-toggle="tooltip" data-html="true" ' + 
                            '                title="Graph of the signal dependencies <br>(it needs several seconds to be displayed)."' +
                            '                onclick="$(\'#depgraph1c\').collapse(\'toggle\'); ' +
                            '                         show_visgraph(jit_fire_dep, jit_fire_order);" ' + 
                            '                data-langkey="Dependencies">Dependencies</span>' +
                            '        </span>' + 
                            '       </span>' +
                            '       </div>' +
                            '      </h5>' +
                            '    </div>' +
                            '    <div class="card-body border border-light p-2">' +
                            '      <div id="depgraph1c" class="m-2 p-0 border collapse h-100" ' +
                            '           style="max-height:65vh; overflow:auto; resize:both;">' +
                            '         <span id="depgraph1">Loading...</span>' +
                            '      </div>' +
                            '      <p class="card-text">' + c + '</p>' +
                            '    </div>' +
                            '  </div>' ;
      
                    return o ;
              }

              simcoreui_hw_states_init ( ahw )
              {
                    // list of states
                    var elto_v  = '' ;
                    var elto_dv = '' ;
                    var elto_c  = '' ;
                    var elto_nb = '' ;
                    var elto_vi = '' ;
      
                    var e = '' ;
                    var c = '<span class="row justify-content-between">' ;
                    for (var elto in ahw.states)
                    {
                         // value
                         elto_v  = "-" ;
                         elto_dv = "-" ;
                         if (typeof ahw.states[elto].value != 'undefined')
                         {
                             elto_v  = ahw.states[elto].value ;
                             elto_dv = ahw.states[elto].default_value ;
      
                             if (typeof elto_v == 'object')
                             {
                                 elto_v  = 'object' ;
                                 elto_dv = 'object' ;
                             }
                             else
                             {
                                 if (typeof elto_v == 'function') {
                                     elto_v  = elto_v() ;
                                 }
      
                                 elto_v  = '0x' +  elto_v.toString(16) ;
                                 elto_dv = '0x' + elto_dv.toString(16) ;
                             }
                         }
      
                         // v != dv
                         elto_c = (elto_v != elto_dv) ? 'font-weight-bold' : 't-ina font-weight-normal' ;
      
                         // nbits, and visible
                         if (typeof ahw.states[elto].nbits != 'undefined')
                              elto_nb = ahw.states[elto].nbits ;
                         else elto_nb = "-" ;
      
                         if (typeof ahw.states[elto].visible != 'undefined')
                              elto_vi = ahw.states[elto].visible ;
                         else elto_vi = "-" ;
      
                         // compound
                         e =     '<span style=\'text-align:left\'>' +
                                 'name: '                                       + elto + '<br>' +
                                 'value: <span id=hw_state_value_' + elto + '>' + elto_v + '</span><br>' +
                                 'default_value: '                              + elto_dv + '<br>' +
                                 'nbits: '                                      + elto_nb + '<br>' +
                                 'visible: '                                    + elto_vi +
                                 '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                                 '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                                 '        onclick=$(\'.popover_hw\').popover(\'hide\');><span data-langkey=\'Close\'>Close</span></button>' +
                                 '</span>' ;
                         c = c + '<span class="col-auto">' +
                                 '<a href="#" id="hw_state_tt_' + elto + '" ' + 
                                 '   class="popover_hw" data-toggle="popover" onclick="event.preventDefault();" ' +
                                 '   data-html="true" title="" data-content="' + e + '"><span id="hw_state_strong_' + elto + '" class="' + elto_c + '">' + elto + '</span></a>' +
                                 '</span>' ;
                    }
                    c = c + '</span>' ;
      
                    // card with state list
                    var o = '  <div class="card m-2">' +
                            '    <div class="card-header border border-light p-2" style="background-color:#E8E8E8">' +
                            '      <h5 class="card-title m-0">' +
                            '       <div class="container">' +
                            '       <span class="row">' +
                            '        <span class="col-auto pl-0" ' + 
                            '              data-langkey="States">States</span>' +
                            '        <span class="btn-group col-auto ml-auto p-0" role="btn group" ' + 
                            '              arial-label="active and dependencies">' +
                            '          <span class="col-auto btn btn-sm btn-outline-secondary mr-2" ' +
                            '                data-toggle="tooltip" data-html="true" ' + 
                            '                title="Shows/Hide inactive signals"' +
                            '                onclick="ws_states_show_inactive = !ws_states_show_inactive;' + 
                            '                         $(\'.t-ina\').toggle();' +
                            '                         return false;" ' +
                            '                data-langkey="Active">Active</span>' +
                            '          <span class="col-auto btn btn-sm btn-outline-secondary mr-2" ' +
                            '                data-toggle="tooltip" data-html="true" ' + 
                            '                title="It shows the control states: PC, IR, and SP."' +
                            '                onclick="$(\'#ctrlstates1\').collapse(\'toggle\');" ' + 
                            '                data-langkey="Control States">Control States</span>' +
                            '        </span>' + 
                            '       </span>' +
                            '       </div>' +
                            '      </h5>' +
                            '    </div>' +
                            '    <div class="card-body border border-light p-2">' +
                            '      <div id="ctrlstates1" class="m-2 p-0 border collapse" ' +
                            '           style="max-height:65vh; overflow:auto; resize:both;">' +
                            '         <span id="ctrlstates1" class="container p-0">' +
                            '         <span class="row">' +
                            '         <span class="col-auto">Program Counter      (PC) &rarr;</span>' + 
                            '         <span class="col-auto">' + ahw.ctrl_states.pc.state + '</span>' +
                            '         </span>' +
                            '         <span class="row">' +
                            '         <span class="col-auto">Instruction Register (IR) &rarr;</span>' + 
                            '         <span class="col-auto">' + ahw.ctrl_states.ir.state + '</span>' +
                            '         </span>' +
                            '         <span class="row">' +
                            '         <span class="col-auto">Stack Pointer        (SP) &rarr;</span>' + 
                            '         <span class="col-auto">' + ahw.ctrl_states.sp.state + '</span>' +
                            '         </span>' +
                            '      </span>' +
                            '      </div>' +
                            '      <p class="card-text">' + c + '</p>' +
                            '    </div>' +
                            '  </div>' ;
      
                    return o ;
              }

              simcoreui_hw_behaviors_init ( ahw )
              {
                  // list of behaviors
                  var c = '<span class="row justify-content-between">' ;
                  for (var elto in ahw.behaviors)
                  {
                       c = c + '<span class="col-auto">' +
                               '<a href="#" class="popover_hw" data-toggle="popover" onclick="event.preventDefault();" ' +
                               '   data-html="true" title="" data-content="' +
                               '<span style=\'text-align:left\'>' +
                               'name: '            + elto + '<br> ' +
                               'nparameters: '     + ahw.behaviors[elto].nparameters + '<br> ' +
                            // 'operation: '       + ahw.behaviors[elto].operation.toString() + '<br> ' +
                            // 'verbal: '          + ahw.behaviors[elto].verbal.toString() + '<br> ' +
                               '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                               '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                               '        onclick=$(\'.popover_hw\').popover(\'hide\');><span data-langkey=\'Close\'>Close</span></button>' +
                               '</span>' +
                               '">' + elto + '</a></span>' ;
                  }
                  c = c + '</span>' ;
    
                  // card with behaviors list
                  var o = '  <div class="card m-2">' +
                          '    <div class="card-header border border-light p-2" style="background-color:#E8E8E8">' +
                          '      <h5 class="card-title m-0"><span data-langkey="Behaviors">Behaviors</span></h5>' +
                          '    </div>' +
                          '    <div class="card-body border border-light p-2">' +
                          '      <p class="card-text">' + c + '</p>' +
                          '    </div>' +
                          '  </div>' ;
    
                  return o ;
              }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-hw', ws_hw) ;
        }


        //  Init Hardware Information Panel

        var ws_signals_show_inactive = true ;
        var ws_states_show_inactive  = true ;

        function simcoreui_signal_dialog ( ahw_elto_name )
        {
              wepsim_update_signal_dialog(ahw_elto_name) ;
              $(".popover_hw").popover("hide") ;
        }


        //  Update Hardware Information Panel

        function simcoreui_show_hw ( )
        {
              var ahw = simhw_active() ;

              // set new make-up
              simcoreui_hw_signals_update(ahw) ;
              simcoreui_hw_states_update(ahw) ;

              return true ;
        }

        function simcoreui_hw_signals_update ( ahw )
        {
              // list of signals
              var elto_v  = '' ;
              var elto_dv = '' ;
              var elto_c  = '' ;
              var e       = '' ;

              for (var elto in ahw.signals)
              {
                   // value
                   elto_v  = ahw.signals[elto].value ;
                   elto_dv = ahw.signals[elto].default_value ;

                   // v != dv
                   elto_c = (elto_v != elto_dv) ? 'font-weight-bold' : 's-ina font-weight-normal' ;

                   // value (hex)
                   elto_v  = '0x' +  elto_v.toString(16) ;
                   elto_dv = '0x' + elto_dv.toString(16) ;

                   e =  '<span style=\'text-align:left\'>' +
                        'name: '          + ahw.signals[elto].name  + '<br>' +
                        'value: '         + '<span' +
                                            ' onclick=simcoreui_signal_dialog(\'' + ahw.signals[elto].name + '\'); ' +
                                            ' class=\'font-weight-bold\'>' + elto_v +
                                            '</span><br>' +
                        'default_value: ' + elto_dv                 + '<br>' +
                        'nbits: '         + ahw.signals[elto].nbits + '<br>' +
                        'type: '          + ahw.signals[elto].type  + '<br>' +
                        'visible: '       + ahw.signals[elto].visible +
                        '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                        '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                        '        onclick=$(\'.popover_hw\').popover(\'hide\');>' + 
                        '<span data-langkey=\'Close\'>Close</span></button>' +
                        '</span>' ;

                   $("#hw_signal_strong_" + elto).attr('class',        elto_c) ;
                   $("#hw_signal_tt_"     + elto).attr('data-content', e) ;
                   $("#hw_signal_tt_"     + elto).attr('aria-hidden',  'false') ;
                   $("#hw_signal_strong_" + elto).show() ;
                   if (elto_v == elto_dv) 
                   {
                       $("#hw_signal_tt_" + elto).attr('aria-hidden', 'true') ;
                       if (ws_signals_show_inactive)
                            $("#hw_signal_strong_" + elto).show() ;
                       else $("#hw_signal_strong_" + elto).hide() ;
                   }
              }

              return true ;
        }

        function simcoreui_hw_states_update ( ahw )
        {
              // list of states
              var elto_v  = '' ;
              var elto_dv = '' ;
              var elto_c  = '' ;
              var elto_nb = '' ;
              var elto_vi = '' ;
              var e       = '' ;

              for (var elto in ahw.states)
              {
                   // value
                   elto_v  = "-" ;
                   elto_dv = "-" ;
                   if (typeof ahw.states[elto].value != 'undefined')
                   {
                       elto_v  = ahw.states[elto].value ;
                       elto_dv = ahw.states[elto].default_value ;

                       if (typeof elto_v == 'object')
                       {
                           elto_v  = 'object' ;
                           elto_dv = 'object' ;
                       }
                       else
                       {
                           if (typeof elto_v == 'function') {
                               elto_v  = elto_v() ;
                           }

                           elto_v  = '0x' +  elto_v.toString(16) ;
                           elto_dv = '0x' + elto_dv.toString(16) ;
                       }
                   }

                   // v != dv
                   elto_c = (elto_v != elto_dv) ? 'font-weight-bold' : 't-ina font-weight-normal' ;

                   // nbits, and visible
                   if (typeof ahw.states[elto].nbits != 'undefined')
                        elto_nb = ahw.states[elto].nbits ;
                   else elto_nb = "-" ;

                   if (typeof ahw.states[elto].visible != 'undefined')
                        elto_vi = ahw.states[elto].visible ;
                   else elto_vi = "-" ;

                   // compound
                   e =     '<span style=\'text-align:left\'>' +
                           'name: '                                       + elto + '<br>' +
                           'value: <span id=hw_state_value_' + elto + '>' + elto_v + '</span><br>' +
                           'default_value: '                              + elto_dv + '<br>' +
                           'nbits: '                                      + elto_nb + '<br>' +
                           'visible: '                                    + elto_vi +
                           '<button type=\'button\' id=\'close\' data-role=\'none\' ' +
                           '        class=\'btn btn-sm btn-danger w-100 p-0 mt-2\' ' +
                           '        onclick=$(\'.popover_hw\').popover(\'hide\');><span data-langkey=\'Close\'>Close</span></button>' +
                           '</span>' ;

                   $("#hw_state_strong_" + elto).attr('class',        elto_c) ;
                   $("#hw_state_tt_"     + elto).attr('data-content', e) ;
                   $("#hw_state_tt_"     + elto).attr('aria-hidden',  'false') ;
                   $("#hw_state_strong_" + elto).show() ;
                   if (elto_v == elto_dv) 
                      {
                          $("#hw_state_tt_" + elto).attr('aria-hidden', 'true') ;
                          if (ws_states_show_inactive)
                               $("#hw_state_strong_" + elto).show() ;
                          else $("#hw_state_strong_" + elto).hide() ;
                      }
              }

              return true ;
        }

