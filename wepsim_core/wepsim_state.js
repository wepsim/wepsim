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
     * Check state
     */

    function wepsim_state_get_clk ( )
    {
         var reg_maddr = get_value(simhw_sim_state('REG_MICROADDR')) ;
         var reg_clk   = get_value(simhw_sim_state('CLK')) ;
         var timestamp = new Date().getTime() ;

         return {
		   time:        timestamp,
                   title:       'clock ' + reg_clk + ' @ &#181;address ' + reg_maddr,
                   title_short: 'clock ' + reg_clk + ',<br>&#181;add '   + reg_maddr
	        } ;
    }

    var state_history = [] ;

    function wepsim_state_history_get ( )
    {
         return state_history ;
    }

    function wepsim_state_history_reset ( )
    {
	 $("[data-toggle=popover4]").popover('hide') ;

         state_history = [] ;
    }

    function wepsim_state_history_add ( )
    {
         var ret       = wepsim_state_get_clk() ;
         var state_obj = simcore_simstate_current2state() ;

         ret.content = simcore_simstate_state2checklist(state_obj, '') ;
         state_history.push(ret) ;
    }

    function wepsim_state_results_empty ( )
    {
	 var empty_results = '<span style="background-color:#FCFC00">' +
                             '&lt;Empty (only modified values are shown)&gt;' +
                             '</span>' ;

	 $('#check_results1').html(empty_results) ;
	 $('#s_clip').html('clipboard');
          $('#s_ref').html('reference');
    }

    function wepsim_state_history_empty ( )
    {
         var empty_history = '<div class="pt-2"></div>' +
                             '<span style="background-color:#FCFC00">' +
                             '&lt;<span data-langkey="Empty history">Empty history</span>&gt;' +
                             '</span>' ;

         $('#history1').html(empty_history) ;
    }

    function wepsim_state_history_list ( )
    {
         if (0 == state_history.length)
         {
	     wepsim_state_history_empty() ;
             wepsim_state_results_empty() ;

             return ;
         }

	 $("[data-toggle=popover4]").popover('hide') ;

         var  t = 0 ;
         var it = '' ;
         var tt = '' ;
         var vr = '' ;
         var  o = '' ;
         for (var i=state_history.length-1; i>=0; i--)
         {
              t = new Date(state_history[i].time) ;
             it = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '-' +
                  t.getHours()    + '-' + t.getMinutes()   + '-' + t.getSeconds() + '-' + t.getMilliseconds() ;

             tt = '<div id="popover-content-' + it + '" class="d-none bg-light">' +
                  state_history[i].title + '<br>' +
                  '<b>was inserted at:</b><br>' +
                  'Date: ' + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '<br>' +
                  'Hour: ' + t.getHours()    + ':' + t.getMinutes()   + ':' + t.getSeconds() + '-' + t.getMilliseconds() + '<br>' +
		  '<button type="button" id="close" data-role="none" ' +
                  '        class="btn btn-sm btn-danger w-100 p-0" ' +
		  '        onclick="$(\'#' + it + '\').popover(\'hide\');"><span data-langkey="Close">Close</span></button>' +
                  '</div>' ;

	     vrow = '' ;
	     if (i != 0)
                 vrow = '<div class="row h-100"><div class="col border-right border-dark">&nbsp;</div><div class="col">&nbsp;</div></div>' ;

	     o += '  <div class="row">' +
                  '       <div class="col-auto text-center flex-column d-flex pr-0">' +
                  '              <strong class="m-2">' +
		  '              <span class="badge badge-pill border-secondary border shadow">' +
		  '  		       <a data-toggle="collapse" data-target="#collapse_'+i+'" ' +
		  '                       class="col-auto p-0 text-decoration-none text-reset" target="_blank" href="#">' + state_history[i].title_short + '</a>' +
		  '              </span>' +
		  '              </strong>' +
		 	         vrow +
                  '       </div>' +
                  '       <div class="col py-2 pl-0">' +
                  '             <div class="btn-group float-none" role="group" aria-label="State information for ' + it + '">' +
                  '                   <button class="btn btn-outline-dark btn-sm col-auto float-right"' +
                  '                           onclick="wepsim_state_results_empty();  ' +
                  '                                    $(\'#collapse_' + i + '\').collapse(\'show\'); ' +
                  '                                    wepsim_clipboard_CopyFromDiv(\'state_' + i + '\');  ' +
                  '                                    $(\'#collapse_' + i + '\').collapse(\'hide\'); ' +
                  '                                    $(\'#s_clip\').html(\'' + state_history[i].title_short + '\'); ' +
                  '                                    $(\'#s_ref\').html(\'reference\'); " ' +
                  '                           type="button"><span data-langkey="Copy">Copy</span><span class="d-none d-sm-inline-flex">&nbsp;<span data-langkey="to clipboard">to clipboard</span></span></button>' +
                  '                   <button class="btn btn-outline-dark btn-sm col-auto float-right"' +
                  '                           onclick="var txt_chklst1 = get_clipboard_copy();' +
                  '                                    var obj_exp1    = simcore_simstate_checklist2state(txt_chklst1);' +
                  '                                    var txt_chklst2 = $(\'#ta_state_'+i+'\').val();' +
                  '                                    var obj_exp2    = simcore_simstate_checklist2state(txt_chklst2);' +
                  '                                    wepsim_dialog_check_state(obj_exp1, obj_exp2);' +
                  '                                    $(\'#s_ref\').html(\'' + state_history[i].title_short + '\'); ' +
                  '                                    $(\'#check_results_scroll1\').collapse(\'show\');"' +
                  '                           type="button"><span data-langkey="Check">Check</span> <span class="d-none d-md-inline-flex">differences with clipboard state</span></button>' +
                  '                   <button class="btn btn-outline-dark btn-sm col-auto float-right"' +
		  '  		              data-toggle="collapse" data-target="#collapse_'+i+'">&plusmn; <span data-langkey="Show">Show</span></button>' +
                  '             </div>' +
			        tt +
                  '             <div id="collapse_' + i + '" class="border border-secondary mt-2 collapse">' +
                  '                   <div class="card-body p-1 small" ' +
                  '                        id="state_' + i + '">' + state_history[i].content + '</div>' +
                  '                   <textarea aria-label="hidden-state"  style="display:none"' +
                  '                             id="ta_state_'+i+'" readonly>' + state_history[i].content + '</textarea>' +
                  '             </div>' +
                  '       </div>' +
                  '  </div>' ;
         }

         // update contents
         $('#history1').html(o) ;
         wepsim_state_results_empty() ;

         // initializate popover
	 $("[data-toggle=popover4]").popover({
		  html:       true,
		  placement: 'auto',
	          trigger:   'click',
	          container: 'body',
		  animation:  false,
                  content:    function() {
                                  var id = $(this).attr('id') ;
                                  return $('#popover-content-' + id).html() ;
                              },
		  sanitizeFn: function (content) {
                                  return content ; // DOMPurify.sanitize(content) ;
                              }
	 });
    }

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

         ga('send', 'event', 'state',
	    'state.dump',
	    'state.dump' + '.ci=' + get_value(simhw_sim_state('REG_IR_DECO')) +
		           ',neltos=' + neltos +
		           ga_str) ;
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
        ga('send', 'event', 'state',
	   'state.check',
	   'state.check' + ',ci=' + get_value(simhw_sim_state('REG_IR_DECO')) +
		           '.a='  + obj_result.neltos_expected +
		           ',b='  + obj_result.neltos_obtained +
		           ',sd=' + obj_result.errors) ;

	return true ;
    }

    function wepsim_dialog_check_reset ( )
    {
	$('#end_state1').val('') ;
        $('#end_state1').tokenfield('setTokens', []) ;
        $('#check_results1').html('') ;

	return true ;
    }

