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
         *  States
         */

        /* jshint esversion: 6 */
        class ws_states extends ws_uielto
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
                    this.innerHTML = current_state_html() +
		                     state_history_html() +
		                     state_differences_html() ;

                    // initialize UI elements
                    if (simhw_active() !== null)
                    {
                        // update state
                        $('#end_state1').tokenfield({ inputType: 'textarea' }) ;

                        //A1/ var inputEls = document.getElementById('end_state1');
                        //A1/ if (null !== inputEls)
                        //A1/     setup_speech_input(inputEls) ;

                        wepsim_state_history_list() ;
                        wepsim_dialog_current_state() ;
                    }
              }
        }

        register_uielto('ws-states', ws_states) ;


        /*
         *  States
         */

        function current_state_html ( )
        {
             o = "" ;

             o += "<div class='card mb-2 border-secondary'>" +
                  "  <div class='card-header text-white bg-dark p-1' id='state_header_1'>" +
                  "    <h5 class='m-0'>" +
                  "            <a data-bs-toggle='collapse' href='#states3' class='btn btn-sm fs-5 float-start p-0'><span class='text-white bg-dark' data-langkey='Current State'>Current State</span></a>:&nbsp;" +
                  "            <span class='btn bg-body-tertiary text-primary border-secondary btn-sm float-end'" +
                  "                  onclick='wepsim_state_history_add();" +
                  "                           wepsim_notify_success(\"<strong>INFO</strong>\", \"Added !.\");" +
                  "                           wepsim_state_history_list();" +
                  "                           wepsim_dialog_current_state();" +
                  "                           $(\"#states3\").collapse(\"show\");" +
                  "                           return false;'" +
                  "                  data-inline='true'><span data-langkey='Add'>Add</span> <span class='d-none d-sm-inline-flex'><span data-langkey=\"'Current State' to History\">'Current State' to History</span></span></span>" +
                  "    </h5>" +
                  "  </div>" +
                  "  <div id='states3b' class='collapse show' aria-labelledby='state_header_1'>" +
                  "    <div class='card-body p-1'>" +
                  "        <div class='container-fluid ms-1 pb-0 collapse show' id='states3'" +
                  "             style='max-height:50vh; width:inherit;'>" +
                  "" +
                  "             <div class='row mt-2'>" +
                  "             <div class='col-auto text-center pe-0'>" +
                  "                        <strong class='m-2'>" +
                  "                            <span class='badge badge-pill border-secondary border shadow'>" +
                  "                                    <a class='col-auto p-0 text-decoration-none'" +
                  "                                       data-bs-toggle='collapse' data-bs-target='#collapse_X'" +
                  "                                       target='_blank' href='#' id='curr_clk_maddr'>now</a>" +
                  "                            </span>" +
                  "                        </strong>" +
                  "             </div>" +
                  "             <div class='col-auto text-center pe-0 ms-2'>" +
                  "                <div class='btn-group float-start' role='group' " +
                  "                  aria-label='State information for now'>" +
                  "                          <button class='btn btn-outline-secondary btn-sm col-auto float-end'" +
                  "                                  onclick='wepsim_clipboard_CopyFromTextarea(\"end_state1\");" +
                  "                                           wepsim_state_results_empty();" +
                  "                                           var curr_tag = $(\"#curr_clk_maddr\").html();" +
                  "                                           $(\"#s_clip\").html(curr_tag);" +
                  "                                           return false;'" +
                  "                                  data-inline='true'><span data-langkey='Copy'>Copy</span><span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='to clipboard'>to clipboard</span></span></button>" +
                  "                          <button class='btn btn-outline-secondary btn-sm col-auto float-end'" +
                  "                                  onclick='var txt_chklst1 = get_clipboard_copy();" +
                  "                                           var obj_exp1    = simcore_simstate_checklist2state(txt_chklst1);" +
                  "                                           var txt_chklst2 = $(\"#end_state1\").val();" +
                  "                                           var obj_exp2    = simcore_simstate_checklist2state(txt_chklst2);" +
                  "                                           var ref_tag     = $(\"#curr_clk_maddr\").html();" +
                  "                                           $(\"#s_ref\").html(ref_tag);" +
                  "                                           wepsim_dialog_check_state(obj_exp1, obj_exp2);" +
                  "                                           $(\"#check_results_scroll1\").collapse(\"show\");'" +
                  "                                  type='button'><span data-langkey='Check'>Check</span> <span class='d-none d-md-inline-flex'><span data-langkey='differences with clipboard state'>differences with clipboard state</span></span></button>" +
                  "                          <button class='btn btn-outline-secondary btn-sm col-auto float-end'" +
                  "                                  data-bs-toggle='collapse' data-bs-target='#collapse_X'>&plusmn; <span data-langkey='Show'>Show</span></button>" +
                  "                </div>" +
                  "             </div>" +
                  "             </div>" +
                  "" +
                  "             <div class='row'>" +
                  "             <div class='col p-1'>" +
                  "                <div id='collapse_X' class='mt-2 collapse show'>" +
                  "                        <form id='end_state_form1'" +
                  "                              class='form-horizontal mb-2'" +
                  "                              style='white-space:wrap; width:100%;'>" +
                  "                           <label class='my-0' for='end_state1'>state:</label>" +
                  "                           <div style='max-height:35vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                  "                           <textarea aria-label='current_state'" +
                  "                                     placeholder='Default...'" +
                  "                                     id='end_state1'" +
                  "                                     name='end_state1'" +
                  "                                     data-allowediting='true'" +
                  "                                     data-allowpasting='false'" +
                  "                                     data-limit='0'" +
                  "                                     data-createtokensonblur='false'" +
                  "                                     data-delimiter=';'" +
                  "                                     data-beautify='true'" +
                  "                                     class='form-control input-xs'" +
                  "                                     rows='5'></textarea>" +
                  "                        </form>" +
                  "                        </div>" +
                  "                </div>" +
                  "             </div>" +
                  "             </div>" +
                  "" +
                  "        </div>" +
                  "    </div>" +
                  "  </div>" +
                  "</div>" ;

             return o ;
        }

        function state_history_html ( )
        {
             o = "" ;

             o += "<div class='card mb-2 border-secondary'>" +
                  "  <div class='card-header text-white bg-dark p-1' id='state_header_2'>" +
                  "    <h5 class='m-0'>" +
                  "          <a data-bs-toggle='collapse' href='#history3' class='btn btn-sm fs-5 float-start p-0'><span class='text-white bg-dark' data-langkey='History'>History</span></a>:&nbsp;" +
                  "" +
                  "          <div class='dropdown float-end'>" +
                  "            <button class='btn btn-sm text-danger mx-1 float-end col-auto dropdown-toggle bg-body-tertiary' " +
                  "                    type='button' id='resetyn2' data-bs-toggle='dropdown' " +
                  "                    aria-haspopup='true' aria-expanded='false' " +
                  "                    ><span data-langkey='Reset'>Reset</span><span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='history'>history</span></span></button>" +
                  "            </button>" +
                  "            <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
                  "             <a class='dropdown-item py-2 bg-body text-danger' type='button' " +
                  "                onclick='wepsim_state_history_reset();" +
                  "                         wepsim_notify_success(\"<strong>INFO</strong>\", \"Removed all !.\");" +
                  "                         wepsim_state_history_list() ;" +
                  "                         return false;'" +
                  "                 ><span data-langkey='Yes'>Yes</span></a>" +
                  "              <div class='dropdown-divider'></div>" +
                  "              <a class='dropdown-item py-2 bg-body text-info' type='button' " +
                  "                 ><span data-langkey='No'>No</span></a>" +
                  "            </div>" +
                  "          </div>" +
                  "" +
                  "    </h5>" +
                  "  </div>" +
                  "  <div id='history3b' class='collapse show' aria-labelledby='state_header_2'>" +
                  "    <div class='card-body p-1'>" +
                  "        <div class='container-fluid ms-1 pb-2 collapse show' id='history3'" +
                  "             style='max-height:40vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                  "             <div id='history1'>" +
                  "                  <div class='pt-2'></div>" +
                  "                  <span class='bg-warning text-dark bg-opacity-75'>&lt;<span data-langkey='Empty history'>Empty history</span>&gt;</span>" +
                  "             </div>" +
                  "        </div>" +
                  "    </div>" +
                  "  </div>" +
                  "</div>" ;

             return o ;
        }

        function state_differences_html ( )
        {
             o = "" ;

             o += "<div class='card mb-1 border-secondary'>" +
                  "  <div class='card-header text-white bg-dark p-1' id='state_header_3'>" +
                  "    <h5 class='m-0'>" +
                  "            <a data-bs-toggle='collapse' href='#check_results_scroll1' class='btn btn-sm fs-5 float-start p-0'><span class='text-white bg-dark' data-langkey='Differences'>Differences</span></a>:" +
                  "            <span class='btn bg-body-tertiary text-primary border-secondary btn-sm float-end'" +
                  "                  onclick='wepsim_clipboard_CopyFromDiv(\"check_results_scroll1\");" +
                  "                           return false;'" +
                  "                  data-inline='true'>" +
                  "                  <span data-langkey='Copy'>Copy</span>" +
                  "                  <span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='to clipboard'>to clipboard</span></span>" +
                  "            </span>" +
                  "    </h5>" +
                  "  </div>" +
                  "  <div id='check_results_scroll1b' class='collapse show' aria-labelledby='state_header_3'>" +
                  "    <div class='card-body p-1'>" +
                  "        <div class='container-fluid ms-1 pb-2 collapse show' id='check_results_scroll1'" +
                  "             style='max-height:40vh; width:inherit; overflow-y:auto; -webkit-overflow-scrolling:touch;' >" +
                  "             <div class='row align-items-center'>" +
                  "             <div class='col-auto text-center flex-column d-flex pe-0'>" +
                  "                  <span id='s_clip' class='badge badge-pill text-body border-secondary border m-2 shadow'>clipboard</span>" +
                  "                  <div class='row' style='max-height:16vh'><div class='col border-end border-secondary'>&nbsp;</div><div class='col'>&nbsp;</div></div>" +
                  "                  <span id='s_ref'  class='badge badge-pill text-body border-secondary border m-2 shadow'>reference</span>" +
                  "             </div>" +
                  "             <div class='col py-2 ps-2'>" +
                  "                  <div id='check_results1'>" +
                  "                       <span class='bg-warning text-dark bg-opacity-75'>&lt;<span data-langkey='Empty (only modified values are shown)'>Empty (only modified values are shown)</span>&gt;</span>" +
                  "                  </div>" +
                  "             </div>" +
                  "             </div>" +
                  "        </div>" +
                  "    </div>" +
                  "  </div>" +
                  "</div>" ;

             return o ;
        }


        //
        // State: History
        //

        function wepsim_state_history_empty ( )
        {
             var empty_history = '<div class="pt-2"></div>' +
                                 '<span class="bg-warning text-dark bg-opacity-75">' +
                                 '&lt;<span data-langkey="Empty history">Empty history</span>&gt;' +
                                 '</span>' ;

             $('#history1').html(empty_history) ;
        }

        function wepsim_state_history_list ( )
        {
             if (0 == ws_info.state_history.length)
             {
                 wepsim_state_history_empty() ;
                 wepsim_state_results_empty() ;

                 return ;
             }

             wepsim_popovers_hide("[data-bs-toggle=popover4]") ;

             var  t = 0 ;
             var it = '' ;
             var tt = '' ;
             var vr = '' ;
             var  o = '' ;
             for (var i=ws_info.state_history.length-1; i>=0; i--)
             {
                  t = new Date(ws_info.state_history[i].time) ;
                 it = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '-' +
                      t.getHours()    + '-' + t.getMinutes()   + '-' + t.getSeconds() + '-' + t.getMilliseconds() ;

                 tt = '<div id="popover-content-' + it + '" class="d-none bg-body-tertiary">' +
                      ws_info.state_history[i].title + '<br>' +
                      '<b>was inserted at:</b><br>' +
                      'Date: ' + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '<br>' +
                      'Hour: ' + t.getHours()    + ':' + t.getMinutes()   + ':' + t.getSeconds() + '-' + t.getMilliseconds() + '<br>' +
                      '<button type="button" id="close" data-role="none" ' +
                      '        class="btn btn-sm btn-danger w-100 p-0" ' +
                      '        onclick="wepsim_popover_hide("' + it + '");"><span data-langkey="Close">Close</span></button>' +
                      '</div>' ;

                 vrow = '' ;
                 if (i != 0)
                     vrow = '<div class="row h-100"><div class="col border-end border-secondary">&nbsp;</div><div class="col">&nbsp;</div></div>' ;

                 o += '  <div class="row">' +
                      '       <div class="col-auto text-center flex-column d-flex pe-0">' +
                      '              <strong class="m-2">' +
                      '              <span class="badge badge-pill border-secondary border shadow">' +
                      '                         <a data-bs-toggle="collapse" data-bs-target="#collapse_'+i+'" ' +
                      '                       class="col-auto p-0 text-decoration-none" target="_blank" href="#">' + ws_info.state_history[i].title_short + '</a>' +
                      '              </span>' +
                      '              </strong>' +
                                      vrow +
                      '       </div>' +
                      '       <div class="col py-2 ps-0">' +
                      '             <div class="btn-group float-none" role="group" aria-label="State information for ' + it + '">' +
                      '                   <button class="btn btn-outline-secondary btn-sm col-auto float-end"' +
                      '                           onclick="wepsim_state_results_empty();  ' +
                      '                                    $(\'#collapse_' + i + '\').collapse(\'show\'); ' +
                      '                                    wepsim_clipboard_CopyFromDiv(\'state_' + i + '\');  ' +
                      '                                    $(\'#collapse_' + i + '\').collapse(\'hide\'); ' +
                      '                                    $(\'#s_clip\').html(\'' + ws_info.state_history[i].title_short + '\'); ' +
                      '                                    $(\'#s_ref\').html(\'reference\'); " ' +
                      '                           type="button"><span data-langkey="Copy">Copy</span><span class="d-none d-sm-inline-flex">&nbsp;<span data-langkey="to clipboard">to clipboard</span></span></button>' +
                      '                   <button class="btn btn-outline-secondary btn-sm col-auto float-end"' +
                      '                           onclick="var txt_chklst1 = get_clipboard_copy();' +
                      '                                    var obj_exp1    = simcore_simstate_checklist2state(txt_chklst1);' +
                      '                                    var txt_chklst2 = $(\'#ta_state_'+i+'\').val();' +
                      '                                    var obj_exp2    = simcore_simstate_checklist2state(txt_chklst2);' +
                      '                                    wepsim_dialog_check_state(obj_exp1, obj_exp2);' +
                      '                                    $(\'#s_ref\').html(\'' + ws_info.state_history[i].title_short + '\'); ' +
                      '                                    $(\'#check_results_scroll1\').collapse(\'show\');"' +
                      '                           type="button"><span data-langkey="Check">Check</span> <span class="d-none d-md-inline-flex">differences with clipboard state</span></button>' +
                      '                   <button class="btn btn-outline-secondary btn-sm col-auto float-end"' +
                      '                                data-bs-toggle="collapse" data-bs-target="#collapse_'+i+'">&plusmn; <span data-langkey="Show">Show</span></button>' +
                      '             </div>' +
                                    tt +
                      '             <div id="collapse_' + i + '" class="border border-secondary mt-2 collapse">' +
                      '                   <div class="card-body p-1 small" ' +
                      '                        id="state_' + i + '">' + ws_info.state_history[i].content + '</div>' +
                      '                   <textarea aria-label="hidden-state"  style="display:none"' +
                      '                             id="ta_state_'+i+'" readonly>' + ws_info.state_history[i].content + '</textarea>' +
                      '             </div>' +
                      '       </div>' +
                      '  </div>' ;
             }

             // update contents
             $('#history1').html(o) ;
             wepsim_state_results_empty() ;
        }


        //
        // State: Current State
        //

        function wepsim_dialog_current_state ( )
        {
             // current clk+maddr
             var ret = wepsim_state_get_clk() ;
             $('#curr_clk_maddr').html(ret.title_short) ;

             // current state
             var state_obj     = simcore_simstate_current2state() ;
             var txt_checklist = simcore_simstate_state2checklist(state_obj, '') ;
             $('#end_state1').tokenfield('setTokens', txt_checklist) ;

             wepsim_notify_success('<strong>INFO</strong>',
                                   'Current state loaded !') ;

             // ga
             var neltos  = 0 ;
             var nceltos = 0 ;
             var ga_str  = "" ;
             for (var component in state_obj)
             {
                  nceltos = 0 ;
                  for (var eltos in state_obj[component]) {
                       nceltos++ ;
                  }
                  ga_str = ga_str + "," + component + "=" + nceltos ;
                  neltos = neltos + nceltos ;
             }

             simcore_ga('state', 'state.dump',
                        'state.dump' + '.ci=' + get_value(simhw_sim_state('REG_IR_DECO')) +
                                       ',neltos=' + neltos + ga_str) ;
        }


        //
        // State: Differences
        //

        function wepsim_dialog_check_reset ( )
        {
            $('#end_state1').val('') ;
            $('#end_state1').tokenfield('setTokens', []) ;
            $('#check_results1').html('') ;

            return true ;
        }

        function wepsim_state_results_empty ( )
        {
    	     var empty_results = '<span class="bg-warning text-dark bg-opacity-75">' +
                                 '&lt;Empty (only modified values are shown)&gt;' +
                                 '</span>' ;

	     $('#check_results1').html(empty_results) ;
	     $('#s_clip').html('clipboard');
              $('#s_ref').html('reference');
        }

        function wepsim_dialog_check_state ( obj_chklst_expected, obj_chklst_current )
        {
            var obj_result = simcore_simstate_diff_results(obj_chklst_expected, obj_chklst_current) ;

            // dialog
            var msg = "" ;
            if (0 == obj_result.errors)
                     msg = "&emsp;<br><span style='background-color:#7CFC00'>" +
                       "<span data-langkey='Meets the specified requirements'>Meets the specified requirements</span>" +
                       "</span><br>" ;
            else msg = simcore_simstate_checkreport2html(obj_result.result, true) ;

            $('#check_results1').html(msg) ;

            // ga
            simcore_ga('state', 'state.check',
		       'state.check' + ',ci=' + get_value(simhw_sim_state('REG_IR_DECO')) +
				       '.a='  + obj_result.neltos_expected +
				       ',b='  + obj_result.neltos_obtained +
				       ',sd=' + obj_result.errors) ;

            return true ;
        }

