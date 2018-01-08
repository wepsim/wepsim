/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Copy to clipboard
     */

    var clipboard_copy = '' ;

    function get_clipboard_copy ( ) 
    {
        return clipboard_copy ;
    }

    // credit for the SelectText function: 
    // https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
    function SelectText (element) 
    {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function CopyFromDiv ( element_name )
    {
	    var msg = 'successful' ;

	    try {
                 SelectText(element_name) ;
                 document.execCommand('copy') ;
		 clipboard_copy = $('#' + element_name).text() ;
	    } 
            catch (err) {
		 msg = 'unsuccessful' ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>', 
                                  'Copied ' + msg + '!.') ;
    }

    function CopyFromTextarea ( element_name )
    {
	    var msg = 'successful' ;

	    try {
		 var copyTextarea = document.getElementById(element_name);
		 copyTextarea.select();
                 document.execCommand('copy') ;
		 clipboard_copy = $('#' + element_name).val() ;
	    } 
            catch (err) {
		 msg = 'unsuccessful' ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>', 
                                  'Copied ' + msg + '!.') ;
    }


    /*
     * Check state
     */

    var state_history = [] ;

    function wepsim_state_history_reset ( )
    {
        state_history = [] ;
    }

    function wepsim_state_history_add ( )
    {
        var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
        var reg_clk   = get_value(sim_states.CLK) ;
        var state_obj = wepsim_current2state() ;
        var state_str = wepsim_state2checklist(state_obj) ;
        var timestamp = new Date().getTime() ;

        state_history.push({ time: timestamp,
                             title: 'clock ' + reg_clk + ' @ micro-address ' + reg_maddr,
                             content: state_str }) ;
    }

    function wepsim_state_history_list ( )
    {
         if (0 == state_history.length) 
         {
             $('#history1').html('&emsp;<span style="background-color:#FCFC00">Empty.</span>') ;
	     $('#check_results1').html('');
             return ;
         }

         var t = 0 ;
         var o = '<div class="panel-group" id="accordion1">' ;
         for (var i=state_history.length-1; i>=0; i--) 
         {
              t = new Date(state_history[i].time) ;

              o += '<div class="panel panel-default">' +
                   '  <div class="panel-heading" data-toggle="collapse" data-target="#collapse_'+i+'" data-parent="#accordion1">' +
                   '    <h4 class="panel-title">' +
                   '      <span>[' +
                            t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '_' +
                            t.getHours()    + '-' + t.getMinutes()   + '-' + t.getSeconds() + '_' + 
                            t.getMilliseconds() + '] ' + state_history[i].title +
                   '      </span>' +
                   '    </h4>' +
                   '  </div>' +
                   '  <div id="collapse_' + i + '" class="panel-collapse collapse">' +
                   '    <div class="panel-body">' + 
                   '      <div class="container-fluid">' + 
                   '      <div class="row">' + 
                   '      <button class="btn btn-default btn-sm col-xs-4 col-sm-3 pull-right"' + 
                   '              onclick="CopyFromTextarea(\'ta_state_' + i + '\');" ' + 
                   '              type="button">Copy <span class="hidden-xs">to clipboard</span></button>' +
                   '      <button class="btn btn-default btn-sm col-xs-4 col-sm-3 pull-right"' + 
                   '              onclick="var txt_chklst1 = get_clipboard_copy();' +
                   '                       var obj_exp1    = wepsim_checklist2state(txt_chklst1);' +
                   '                       var txt_chklst2 = $(\'#ta_state_'+i+'\').val();' +
                   '                       var obj_exp2    = wepsim_checklist2state(txt_chklst2);' +
                   '                       wepsim_dialog_check_state(\'check_results1\', obj_exp1, obj_exp2);"' +
                   '           type="button">Check <span class="hidden-xs">differences with clipboard state</span></button>' +
                   '      </div>' + 
                   '      </div>' + 
                   '      <div class="panel-body" ' + 
                   '           style="padding:5 5 5 5;" ' + 
                   '           id="state_' + i + '">' + state_history[i].content + '</div>' +
                   '      <textarea aria-label="hidden-state"  style="display:none"' +
                   '                id="ta_state_'+i+'" readonly>' + state_history[i].content + '</textarea>' +
                   '    </div>' +
                   '  </div>' +
                   '</div>' ;
         }
         o += '</div>' ;

         $('#history1').html(o) ;
	 $('#check_results1').html('');
    }

    function wepsim_dialog_current_state ( )
    {
         // show dialog
         wepsim_notify_success('<strong>INFO</strong>', 
                               'Loading, please wait...') ;
         $('#current_state1').modal('show');

	 setTimeout(function() {

	      // tab1
	      //wepsim_state_history_list() ; // called on: reset+add but not on show...

	      // tab2
	      var state_obj     = wepsim_current2state() ;
	      var txt_checklist = wepsim_state2checklist(state_obj) ;
	      $('#end_state1').tokenfield('setTokens', txt_checklist);

              wepsim_notify_close() ;
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
	         'state.dump' + '.ci=' + get_value(sim_states.REG_IR_DECO) +
		                ',neltos=' + neltos + 
		                ga_str);

         }, 80) ;
    }

    function wepsim_dialog_check_state ( id_result, obj_chklst_expected, obj_chklst_current )
    {
        var obj_result = wepsim_diff_results(obj_chklst_expected, obj_chklst_current) ;

        // dialog
        var msg = "" ;
        if (0 == obj_result.errors)
    	     msg = "&emsp;<span style='background-color:#7CFC00'>" + 
                       "Meets the specified requirements" + 
                       "</span><br>" ;
        else msg = wepsim_checkreport2html(obj_result.result, true) ;

        $('#' + id_result).html(msg);

        // ga
        ga('send', 'event', 'state', 
	   'state.check', 
	   'state.check' + ',ci=' + get_value(sim_states.REG_IR_DECO) +
		           '.a='  + obj_result.neltos_expected +
		           ',b='  + obj_result.neltos_obtained +
		           ',sd=' + obj_result.errors);

	return true ;
    }

    function wepsim_dialog_check_reset ( id_result, id_input )
    {
        $('#' + id_input).tokenfield('setTokens', []);
	$('#' + id_input).val('');
	$('#' + id_result).html('');

	return true ;
    }


    //
    //  WepSIM check API
    //

    function wepsim_checklist2state ( checklist )
    {
        var o = {} ;
	var ret = false ;

	// white-spaces...
	checklist = checklist.replace(/;|==|!=|>=|<=|=|>|</gi, 
                                      function (x){return ' ' + x + ' ';});  
        checklist = checklist.replace(/  /g,' ') ;

	// lines...
        var lines = checklist.split(";") ;
        for (var i=0; i<lines.length; i++)
        {
             var line = lines[i].trim() ;
	     if ("" == line)
		 continue ;

             var parts = line.split(" ") ;
	     if (parts.length < 4)
		 continue ;

	     var check = { "type": parts[0], 
                           "id": parts[1], 
                           "condition": parts[2], 
                           "value": decodeURI(parts[3]) } ;
             for (var index in sim_components) 
             {
	          ret = sim_components[index].read_state(o, check) ;
                  if (true == ret) break ;
             }

             if (false == ret)
                 console.log("ERROR in checklist at component " + check.type + ": " + line) ;
        }

        return o ;
    }   

    function wepsim_current2state ( )
    {
	var o = {} ;
	for (var index in sim_components) {
	     sim_components[index].write_state(o) ;
	}

        return o ;
    }

    function wepsim_state2checklist ( s_obj )
    {
	var ret = "" ;
        for (var component in s_obj) 
	{
	     for (var eltos in s_obj[component]) {
		  var elto = s_obj[component][eltos] ;
	          ret = ret + elto.type + " " + elto.id + " " + elto.op + " " + encodeURI(elto.value) + "; " ;
	     }
	}

        return ret ;
    }

    function wepsim_check_results ( expected_result, obtained_result, newones_too )
    {
        var d = {} ;
        d.result = [] ;
        d.errors = 0 ;
        d.neltos_expected = 0 ;
        d.neltos_obtained = 0 ;

        var elto = null ;
	var diff = {} ;

        var obtained_value = 0 ;
	for (var compo in sim_components)
	{
	    // if there are different values -> diff
            if (typeof expected_result[compo] != "undefined") 
	    {
		    for (elto in expected_result[compo])
		    {
                         d.neltos_expected++ ;

                         obtained_value = expected_result[compo][elto].default_value ;
			 if ( (typeof obtained_result[compo]       != "undefined") &&
			      (typeof obtained_result[compo][elto] != "undefined") ) {
                               obtained_value = obtained_result[compo][elto].value ;
                         }

			 diff = {} ;
			 diff.expected  = expected_result[compo][elto].value ;
			 diff.obtained  = obtained_value ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = expected_result[compo][elto].id ;
			 diff.elto_op   = expected_result[compo][elto].op ;

		         diff.fulfill   = false ;
			      if ("=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) == parseInt(diff.expected)) ;
			 else if (">" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  > parseInt(diff.expected)) ;
			 else if ("<" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  < parseInt(diff.expected)) ;
			 else if (">=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) >= parseInt(diff.expected)) ;
			 else if ("<=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) <= parseInt(diff.expected)) ;
			 else if ("==" == expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected == diff.obtained) ;
			 else if ("!=" == expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected != diff.obtained) ;

			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
            }

	    // if there are new elements -> diff
	    if ((newones_too) && (typeof obtained_result[compo] != "undefined"))
	    {
		    for (elto in obtained_result[compo]) 
		    {
                         d.neltos_obtained++ ;

			 if ( (typeof expected_result[compo]       != "undefined") && 
			      (typeof expected_result[compo][elto] != "undefined") ) {
			       continue ;
		         }

			 diff = {} ;
			 diff.expected  = obtained_result[compo][elto].default_value ;
			 diff.obtained  = obtained_result[compo][elto].value ;
			 diff.fulfill   = (diff.expected == diff.obtained) ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = obtained_result[compo][elto].id ;
			 diff.elto_op   = "=" ;
			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
	    }
        }

        return d ;
    }

    function wepsim_diff_results ( expected_result, obtained_result )
    {
        return wepsim_check_results(expected_result, obtained_result, true) ;
    }

    function wepsim_checkreport2txt ( checklist )
    {
        var o = "";

        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false) {
                 o += checklist[i].elto_type + "[" + checklist[i].elto_id + "]='" +
                      checklist[i].obtained + "' (expected '" + checklist[i].expected  + "'), ";
             }
        }

        return o;
    }

    function wepsim_checkreport2html ( checklist, only_errors )
    {
        var o = "" ;
        var color = "green" ;

        if (typeof only_errors === 'undefined') 
            only_errors = false ;

        o += "<table style='margin:0 0 0 0;' " + 
             "       class='table table-hover table-bordered table-condensed'>" +
             "<thead>" +
             "<tr>" +
             "<th>Type</th>" +
             "<th><span class='hidden-xs'>Identification</span><span class='visible-xs'>Id.</span></th>" +
             "<th><span class='hidden-xs'>Values in the </span>clipboard<span class='hidden-xs'> state</th>" +
             "<th><span class='hidden-xs'>Values in the </span>selected<span class='hidden-xs'> state</th>" +
             "</tr>" +
             "</thead>" +
             "<tbody>" ;
        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false)
                  color = "danger" ;
             else color = "success" ;

             if (only_errors && checklist[i].fulfill)
                 continue ;

             o += "<tr class=" + color + ">" +
                  "<td>" + checklist[i].elto_type + "</td>" +
                  "<td>" + checklist[i].elto_id   + "</td>" +
                  "<td>" + checklist[i].elto_op + "&nbsp;" + checklist[i].expected  + "</td>" +
                  "<td>" + checklist[i].obtained  + "</td>" +
                  "</tr>" ;
        }
        o += "</tbody>" + 
             "</table>" ;

        return o ;
    }

