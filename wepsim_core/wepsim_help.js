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
     * Help
     */

    function wepsim_help_refresh ( )
    {
        // add if recording
        simcore_record_append_new('Refresh help content',
	       	                  'wepsim_help_refresh();\n') ;

        // scrolling
        var helpdiv = '#scroller-help1' ;
        var scrolltothetop = function() {
        		        var helpdiv_container = 'scroller-help1' ;
				var elto = document.getElementById(helpdiv_container) ;
				if (elto != null)
				    elto.scrollTop = 0 ;
                             } ;

        // content
        var helpurl = '' ;
	var seg_idiom = get_cfg('ws_idiom') ;
	var seg_hardw = simhw_active().sim_short_name ;

        var rel = $('#help1_ref').data('relative') ;
        if ( (typeof rel != "undefined") && (rel != "") )
        {
             var r = rel.split("#") ;
             helpurl = 'help/' + r[0] + '-' + seg_idiom + '.html' ;
             resolve_html_url(helpdiv, helpurl, '#' + r[1], scrolltothetop) ;

             ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel) ;

             return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
             helpurl = 'examples/hardware/' + seg_hardw + '/help/' +
		       ab1 + '-' + seg_idiom + '.html' ;
             resolve_html_url(helpdiv, helpurl, '', scrolltothetop) ;

             ga('send', 'event', 'help', 'help.' + ab1, 'help.' + ab1 + '.*') ;

             return ;
        }

        var cod1 = $('#help1_ref').data('code') ;
        if ( (typeof cod1 != "undefined") && (cod1 === "true") )
        {
            ga('send', 'event', 'help', 'help.code', 'help.code.*') ;
            return ;
        }

        // empty rel -> show index
        if ( (typeof rel != "undefined") && (rel == "") )
        {
	     var html_index = table_helps_html(ws_info.help) ;
	     $(helpdiv).html(html_index) ;

             ga('send', 'event', 'help', 'help.index', 'help.index') ;

             return ;
        }
    }

    function wepsim_help_set_relative ( rel )
    {
        $('#help1_ref').data('relative', rel) ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

        // add if recording
        simcore_record_append_new('Update help content',
	       	                  'wepsim_help_set_relative("' + rel + '");\n') ;
    }

    function wepsim_help_set_absolute ( ab1 )
    {
        $('#help1_ref').data('relative','') ;
        $('#help1_ref').data('absolute', ab1) ;
	$('#help1_ref').data('code','false') ;

        // add if recording
        simcore_record_append_new('Update help content',
	       	                  'wepsim_help_set_absolute("' + ab1 + '");\n') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#scroller-help1').html(content) ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;
    }

    function wepsim_help_search_in_tables ( input_id )
    {
	    var o = "" ;

            o += '<div class="row justify-content-center w-100">' +
                 '<input id="' + input_id + '" ' +
		 '       onkeyup="var value=$(this).val().toLowerCase();' +
		 '	             $(\'.table2 td\').filter(function() {' +
		 '	                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)' +
		 '	             });"' +
                 '       class="form-control my-2" type="text" placeholder="Search...">' +
                 '</div">' ;

	    return o ;
    }

    function wepsim_open_help_hardware_summary ( )
    {
            var ahw2 = simhw_active() ;
	    var img2 = 'examples/hardware/' + ahw2.sim_short_name + '/images/cpu.svg?time=20210801' ;
	    var lyr2 = '<object id=svg_p2 ' +
		       '        data=\'' + img2 + '\' ' +
		       '        type=\'image/svg+xml\'>' +
		       'Your browser does not support SVG' +
		       '</object>' +
		       '<br>' +
                       wepsim_help_hardware_summary_aux(ahw2) +
                       '<br>' ;

	    wepsim_open_help_content(lyr2) ;

            // add if recording
            simcore_record_append_new('Open hardware summary',
		                      'wepsim_open_help_hardware_summary();\n') ;
    }

    function wepsim_help_hardware_summary_aux ( ahw )
    {
	    var o = "" ;
            var e_in  = '' ;
            var e_out = '' ;
            var e_sig = '' ;
            var i_in  = '<i class="fas fa-sign-in-alt"></i>' ;
            var i_out = '<i class="fas fa-sign-out-alt"></i>' ;
            var i_sig = '<i class="fas fa-wave-square"></i>' ;

            // check if empty hardware
            if (ahw == null) {
                return '<br>Sorry, no hardware available.' ;
            }

            // prepare hash (if not done before)
            if (typeof ahw.elements_hash == "undefined") {
                simhwelto_prepare_hash(ahw) ;
            }

            // make tables
            o += '<div class="container">' +
                 wepsim_help_search_in_tables("hsinput1") +
                 '<div class="row justify-content-center">' ;
            for (var b in ahw.elements_hash.by_belong)
            {
                 for (var j=0; j<ahw.elements_hash.by_belong[b].length; j++)
                 {
                    elto = ahw.elements_hash.by_belong[b][j] ;

                   e_in = simhwelto_describe_component_enum(elto.states_inputs,  elto.states, "inputs",  'html') ;
                  e_out = simhwelto_describe_component_enum(elto.states_outputs, elto.states, "outputs", 'html') ;
                  e_sig = simhwelto_describe_component_enum(elto.signals_inputs, elto.signals,"signals", 'html') ;

		      o += '<div class="col-md-6 d-flex my-2">' +
			   '<table class="table table-striped table-bordered table-hover table-sm table-responsive table2">' +
			   '<thead class="thead-dark"><tr>' +
                           '<th colspan=3>' + b + ' / ' + elto.description + '</th>' +
                           '</tr></thead>' +
			   '<tbody>' +
	                   '<tr><td>' + i_in  + '</td><td>Inputs'  + '</td><td>' + e_in  + '</td></tr>' +
	                   '<tr><td>' + i_out + '</td><td>Outputs' + '</td><td>' + e_out + '</td></tr>' +
	                   '<tr><td>' + i_sig + '</td><td>Signals' + '</td><td>' + e_sig + '</td></tr>' +
                           '</tbody>' +
			   '</table>' +
			   '</div>' ;
                 }
            }
            o += '</div>' +
                 '</div>' ;

	    return o ;
    }

    function wepsim_open_help_assembly_summary ( )
    {
	    var help_content = '<br>Sorry, No more details available for this element.<p>\n' +
	                       '<br>Did you load some firmware with instruction help?<p>\n' ;

            var simw = get_simware() ;
            if ( (typeof simw !== "undefined") && (typeof simw.firmware !== "undefined") )
            {
	          help_content = wepsim_help_assembly_summary_aux(simw.firmware) ;
            }

	    wepsim_open_help_content(help_content) ;

            // add if recording
            simcore_record_append_new('Open assembly summary',
		                      'wepsim_open_help_assembly_summary();\n') ;
    }

    function wepsim_help_assembly_summary_aux ( ws_firmware )
    {
            var o = '' ;

            // check if empty firmware
            if (ws_firmware.length == 0) {
                return '<br>Sorry, firmware without help for its instructions.' ;
            }

            // tables by first letter...
            var t = {} ;
            var ins_name = '' ;
            var ins_help = '' ;
            var first_l = '' ;
            for (var k = 0; k < ws_firmware.length; k++)
            {
                ins_name = ws_firmware[k].signatureRaw.trim() ;
                if (ins_name == "begin") {
                    continue ;
                }

                ins_help = ws_firmware[k].help ;
                if (typeof ins_help === "undefined") {
                    ins_help = '' ;
                }
                ins_help = ins_help.replace(/^'|'$/g,'') ;

                first_l = ins_name[0] ;
                if (typeof t[first_l] === "undefined") {
                    t[first_l] = '' ;
                }
                t[first_l] += '<tr><td col="col-6">' + ins_name + '</td>' + '<td>' + ins_help + '</td></tr>' ;
            }

            // join tables
            o += '<div class="container">' +
                 wepsim_help_search_in_tables("hsinput1") +
                 '<div class="row justify-content-center">' ;
            for (var i=0; i<26; i++)
            {
                k = String.fromCharCode(97 + i) ;
                if (typeof t[k] === "undefined") {
                    continue ;
                }

	        o += '<div class="col-auto d-flex justify-content-center my-2">' +
                     '<h4><span class="badge badge-pill badge-info text-monospace" ' +
                     '          style="position:relative;top:16px;left:-4px;">' + k + '</span></h4>' +
                     '<table class="table table-striped table-bordered table-hover table-sm table-responsive table2">' +
                     '<thead class="thead-dark"><tr><th>Instruction</th><th>Help</th></tr></thead>' +
                     '<tbody>' + t[k] + '</tbody>' +
                     '</table>' +
                     '</div>' ;
            }
            o += '</div>' +
                 '</div>' ;

	    return o ;
    }


    /*
     * Help URI
     */

    function request_html_url ( r_url )
    {
        var robj = null ;

	if (false === is_mobile())
        {
            if (navigator.onLine)
                 robj = fetch(r_url);
            else robj = caches.match(r_url).then() ;
        }
        else
        {
            robj = $.ajax(r_url, { type: 'GET', dataType: 'html' }) ;
        }

        return robj ;
    }

    function update_div_frompartialhtml ( helpdiv, key, data )
    {
		var default_content = '<br>Sorry, No more details available for this element.<p>\n' ;

		if ("" === data)
		     $(helpdiv).html(default_content) ;
		else $(helpdiv).html(data) ;

		if ( ("" === data) || ("" === key) || ("#" === key) ) {
                     return ;
		}

                // (key != "") && (data != "")
		var help_content = $(helpdiv).filter(key).html() ;
		if (typeof help_content === "undefined") {
		    help_content = $(helpdiv).find(key).html() ;
		}
		if (typeof help_content === "undefined") {
		    help_content = default_content ;
		}

		$(helpdiv).html(help_content) ;
    }

    function resolve_html_url ( helpdiv, r_url, key, update_div )
    {
        return request_html_url(r_url).then(function (data) {
		    if (typeof data == "object") {
			 data.text().then(function(res) {
                                             update_div_frompartialhtml(helpdiv, key, res);
                                             update_div() ;
                                          }) ;
                    }
		    else {
                         update_div_frompartialhtml(helpdiv, key, data) ;
                         update_div() ;
                    }
	       }) ;
    }

    function update_signal_loadhelp ( helpdiv, simhw, key )
    {
	 var curr_idiom = get_cfg('ws_idiom') ;

	 var help_base = 'examples/hardware/' + simhw + '/help/signals-' + curr_idiom + '.html' ;
         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         ga('send', 'event', 'help', 'help.signal', 'help.signal.' + simhw + '.' + key);
    }

    function update_checker_loadhelp ( helpdiv, key )
    {
         var curr_idiom = get_cfg('ws_idiom') ;
  	 var help_base = 'help/simulator-' + curr_idiom + '.html' ;

         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         ga('send', 'event', 'help', 'help.checker', 'help.checker.' + key);
    }

