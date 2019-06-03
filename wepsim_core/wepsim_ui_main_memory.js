/*    
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Main Memory UI
         */

        var show_main_memory_deferred = null;
        var show_main_memory_redraw   = false;

        function wepsim_show_main_memory ( memory, index, redraw, updates )
        {
            if (get_cfg('DBG_delay') > 3) {
                show_main_memory_redraw  = redraw || show_main_memory_redraw ;
	    }

            if (null != show_main_memory_deferred) {
                return ;
	    }

            show_main_memory_redraw = redraw ;
            show_main_memory_deferred = setTimeout(function ()
                                                   {
						        if (show_main_memory_redraw == false)
						    	    light_refresh_main_memory(memory, index, updates);
                                                        else hard_refresh_main_memory(memory, index, updates) ;

                                                        show_main_memory_deferred = null;
                                                        show_main_memory_updates  = false;

                                                   }, cfg_show_main_memory_delay);
        }

        function hard_refresh_main_memory ( memory, index, redraw )
        {
	    if (typeof document == "undefined")
	        return ;

	    var o1 = "" ;
            var value = "" ;
            var sname = "" ;
            var taddr = "" ;

            var valkeys = new Array();

            // todo: move next block to the end of the assembler parser
            var SIMWARE = get_simware() ;

            var revlabels = new Object() ;
            for (var key in SIMWARE.labels2)
                 revlabels[SIMWARE.labels2[key]] = key ;

            var seglabels = new Object() ;
            var curr_segments = simhw_internalState('segments') ;
	    for (skey in curr_segments) {
                 seglabels[parseInt(curr_segments[skey].begin)] = skey ;
            }

            for (var key in memory)
            {
                value = main_memory_getword(revlabels, valkeys, memory, key) ;
                sname = seglabels[parseInt(key)] ;

                if (typeof sname != "undefined")
                    o1 += '<div style="position:sticky;top:0px;z-index:1;width:50%;background:#FFFFFF;"><b><small>' + sname + '</small></b></div>' ;

                taddr = '<small>0x</small>' + pack5(valkeys[3]) + '<span class="d-none d-sm-inline-flex"> </span>-' +
                        '<span class="d-none d-sm-inline-flex"><small> 0x</small></span>' + pack5(valkeys[0]) ;
		if (key == index)
		     o1 += "<div class='row' id='addr" + key + "'" +
                           "     style='color:blue; font-size:small; font-weight:bold;    border-bottom: 1px solid lightgray !important'>" +
			   "<div class='col-6 pr-2' align='right'  style='padding:5'>" + taddr + "</div>" +
                           "<div class='col-6'      align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" +
                           "</div>" ;
		else o1 += "<div class='row' id='addr" + key + "'" +
                           "     style='color:black; font-size:small; font-weight:normal; border-bottom: 1px solid lightgray !important'>" +
			   "<div class='col-6 pr-2' align='right'  style='padding:5'>" + taddr + "</div>" +
                           "<div class='col-6'      align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" +
                           "</div>" ;
            }

	    if (typeof memory[index] == "undefined")
		o1 += "<div class='row' id='addr" + index + "'" +
                      "     style='color:blue; font-size:small; font-weight:bold; border-bottom: 1px solid lightgray !important'>" +
		      "<div class='col-6 pr-2' align='right'  style='padding:5'>" + "0x" + parseInt(index).toString(16) + "</div>" +
		      "<div class='col-6'      align='left'   style='padding:5' id='mpval>" + index + "'>" + "00 00 00 00" + "</div>"+
                      "</div>";

            $("#memory_MP").html("<div class='container-fluid'>" + o1 + "</div>");

            // scroll up/down to index element...
	    var obj_byid = $('#addr' + index) ;
	    if ( (redraw) && (obj_byid.length > 0) )
            {
	        var topPos = obj_byid[0].offsetTop ;
	        var obj_byid = $('#memory_MP') ;
	        if (obj_byid.length > 0)
	            obj_byid[0].scrollTop = topPos - 100;
            }

            // update old_main_add for light_update
            old_main_addr = index ;
        }

        function main_memory_getword ( revlabels, valkeys, memory, key )
        {
                if (typeof memory[key] == "undefined")
                    return "00 00 00 00" ;

		var value  = memory[key].toString(16) ;
		    value  = pack8(value) ;

                var i = 0;
                for (i=0; i<4; i++) {
		     valkeys[i] = (parseInt(key) + i).toString(16) ;
                }

                value2 = '' ;
                for (i=0; i<4; i++)
                {
                     labeli = revlabels["0x" + valkeys[3-i]] ;
                     valuei = value[i*2] + value[i*2+1] ;

                     if (typeof labeli != "undefined")
                          value2 += '<span>' +
                                    '<span style="border:1px solid gray;">' + valuei + '</span>' +
                                    '<span class="badge badge-pill badge-info" ' +
                                    '     style="position:relative;top:-8px;">' + labeli + '</span>' +
                                    '</span>' ;
                     else value2 += valuei + ' ' ;
                }

                return value2 ;
        }

        var old_main_addr = 0;

        function light_refresh_main_memory ( memory, index, redraw )
        {
            if (redraw)
            {
                var valkeys   = new Array() ;
                var SIMWARE   = get_simware() ;
                var revlabels = new Object() ;
                for (var key in SIMWARE.labels2)
                     revlabels[SIMWARE.labels2[key]] = key ;
                var svalue = main_memory_getword(revlabels, valkeys, memory, index) ;

                o1 = $("#mpval" + index) ;
                o1.html(svalue);
            }

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_main_addr = index ;

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }


        /*
         *  obj2html
         */

	function labels2html_aux ( slebal, c )
	{
	     var clabel = "" ;
	     var wadd   = "" ;

             for (var j=3; j>=0; j--)
             {
	          wadd = "0x" + (parseInt(c)+j).toString(16);
	          if (typeof slebal[wadd] != "undefined")
                       for (var i=0; i<slebal[wadd].length; i++)
		            clabel = clabel + "<span class='badge badge-pill badge-secondary float-left'>" + slebal[wadd][i] + "</span>" ;
	          else clabel = clabel + "&nbsp;" ;
             }

	     return clabel ;
	}

	function mp2html ( mp, labels, seg )
	{
                var slebal = new Object();
                for (var l in labels)
                {
                     if (typeof slebal[labels[l]] == "undefined")
                         slebal[labels[l]] = new Array();
                     slebal[labels[l]].push(l);
                }

		var o  = "";
		    o += "<center>" +
		 	 "<table style='table-layout:auto; border-style: solid; border-width:0px;'>" +
			 "<tr>" +
			 "<th style='border-style: solid; border-width:0px;'>labels</th>" +
			 "<th style='border-style: solid; border-width:1px;'>address</th>" +
			 "<th style='border-style: solid; border-width:1px;'>" +
                         "<table border=0 width=100%>" +
                       //"<tr><td colspan=8 align=center>content </td></tr>" +
                         "<tr align=center>" +
                         "  <td width='25%' align='center'><small><b>byte 3</b></small></td>" +
                         "  <td width='25%' align='center'><small><b>byte 2</b></small></td>" +
                         "  <td width='25%' align='center'><small><b>byte 1</b></small></td>" +
                         "  <td width='25%' align='center'><small><b>byte 0</b></small></td>" +
                         "</tr>" +
                         "<tr>" +
                         "  <td width='12%' align='center' >&nbsp;<sup>31&nbsp;&nbsp;......&nbsp;&nbsp;24</sup>&nbsp;</td>" +
                         "  <td width='12%' align='center' >&nbsp;<sup>23&nbsp;&nbsp;......&nbsp;&nbsp;16</sup>&nbsp;</td>" +
                         "  <td width='12%' align='center' >&nbsp;<sup>15&nbsp;&nbsp;......&nbsp;&nbsp;8</sup>&nbsp;</td>" +
                         "  <td width='12%' align='center' >&nbsp;<sup>7&nbsp;&nbsp;......&nbsp;&nbsp;0</sup>&nbsp;</td>" +
                         "</tr>" +
                         "</table>" +
			 "<th style='border-style: solid; border-width:0px;' align='right'>&nbsp;&nbsp;segment</th>" +
			 "</tr>" ;

	   	var color="white";
	        for (var skey in seg)
	        {
                     c_begin =  parseInt(seg[skey].begin) ;
                     c_end   =  parseInt(seg[skey].end) ;
		     color   =  seg[skey].color;
                     rows    =  0 ;
                     var x   =  "" ;

		     for (var i = c_begin; i<c_end; i++)
		     {
                             c = "0x" + i.toString(16) ;
                             if (typeof mp[c] == "undefined") {
                                 continue;
                             }

                             if (0 == rows) {
			         o += "<tr style=\"font-family:'Consolas'; font-size:11pt;\">" +
				      "<td align='right'  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td                style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td                style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
                                       mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "<td rowspan=" ;
                             } else {
			         x += "<tr style=\"font-family:'Consolas'; font-size:11pt;\">" +
				      "<td align='right'  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td                style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td                style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
                                      mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "</tr>" ;
                             }

                             rows++;
	             }

		     if (0 == rows) {
			 o += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].begin).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td rowspan=" ;
			 x += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].end).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td>&nbsp;</td>" +
			      "</tr>" ;
                        rows = 2 ;
		     }

                     o += rows + " align=right>" + seg[skey].name + "&nbsp;</td></tr>" + x ;

	             if (seg[skey].name != ".stack") {
		         o += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
                              "<td>&nbsp;</td>" +
                              "<td valign='middle' align='center' height='25px'>...</td>" +
                              "<td valign='middle' align='center' height='25px'>...</td>" +
                              "<td>&nbsp;</td>" +
                              "</tr>" ;
	             }
	        }

		o += "</table>" +
		     "</center><br>" ;

		return o;
	}

        function segments2html ( segments )
        {
	   var o1 = "<br>" ;

	   o1 += " <center>" +
                 " <table height='400px'>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border='1' width='100%' height='100%'>" ;
	   for (var skey in segments)
	   {
	        if (segments[skey].name != ".stack")
	   	    o1 += "<tr><td valign='middle' align='center' height='60px' bgcolor='" + segments[skey].color + "'>" +
                          segments[skey].name +
                          "</td></tr>" +
	   	          "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign='middle' align='center' bgcolor='" + segments['.stack'].color + "'>" +
                 segments['.stack'].name +
                 "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width='20px'>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var sx = "" ;
           var sp = "" ;
	   for (skey in segments)
	   {
	       sx = "<tr>" +
	   	    "    <td valign='top' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_begin_" + segments[skey].name + "'>" + segments[skey].begin + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" +
	   	    " <tr>" +
	   	    "    <td valign='bottom' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_end_"   + segments[skey].name + "'>" + segments[skey].end + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" ;

	       if (segments[skey].name != ".stack")
	   	    o1 += sx + "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
               else sp  = sx ;
	   }
	   o1 += sp +
	         " </table>" +
	         " </td>" +
	         " </tr>" +
	         " </table>" +
	         " </center>" ;

	   return o1 ;
        }

	function assembly2html ( mp, labels, seg, asm )
	{
                var  s_label = "" ;
                var s1_instr = "" ;
                var s2_instr = "" ;
                var s3_hex   = "" ;
                var bgc = "#F0F0F0" ;
                var o = "" ;

                var a2l = new Object();
                for (l in labels) {
                     if (typeof a2l[labels[l]] == "undefined")
                         a2l[labels[l]] = new Array();
                     a2l[labels[l]].push(l);
                }

                var a2s = new Object();
                for (l in seg) {
                     laddr = "0x" + seg[l].begin.toString(16) ;
                     a2s[laddr] = l;
                }

                o += "<center>" + 
                     "<table data-role='table' class='table table-sm'>" + 
                     "<tbody>" ;
                for (l in asm)
                {
                     if  (bgc == "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // instruction
                     s1_instr = asm[l].source ;
                     s2_instr = asm[l].source_original ;
                     s3_hex   = parseInt(asm[l].binary, 2).toString(16) ;
                     s3_hex   = "0x" + "00000000".substring(0, 8 - s3_hex.length) + s3_hex ;

                     // labels
                     s_label = "" ;
                     if (typeof a2l[l] != "undefined") {
                         for (var i=0; i<a2l[l].length; i++) {
                              s_label = s_label + "<span class='badge badge-info'>" + a2l[l][i] + "</span>" ;
                         }
                     }

		     // mark pseudo + n-words
		     if (s1_instr == '') {
			 s2_instr = '<span class="text-secondary">' + s2_instr + '</span>' ;
		     }
		else if (s1_instr != s2_instr) {
			 s1_instr = '<span class="text-primary">' + s1_instr + '</span>' ;
			 s2_instr = '<span class="text-primary">' + s2_instr + '</span>' ;
		     }

                     // join the pieces...
                     if (typeof a2s[l] != "undefined") {
                         o += "<tr bgcolor='#FEFEFE'>" +
                              "<td colspan='7' style='line-height:0.3;' align='left'><small><font color='gray'>" + a2s[l] + "</font></small></td>"
                              "</tr>" ;
		     }

                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
                           "<td class='asm_label  text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;' align=right>" + s_label + "</td>" +
                           "<td class='asm_addr   text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;'>" + l + "</td>" +
                           "<td class='asm_break  text-monospace col-auto show collapse py-0 px-0' " +
                           "    style='line-height:0.9;' id='bp" + l + "' width='1%'>" + "</td>" +
                           "<td class='asm_hex    text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;'>" + s3_hex + "</td>" +
                           "<td class='asm_ins    text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;' align=left>" + s1_instr + "</td>" +
                           "<td class='asm_pins   text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;' align=left>" + s2_instr + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody>" + 
                     "</table>" + 
                     "</center>" ;

                return o ;
	}


        /*
         *  Main Memory (configuration)
         */

        function init_config_mp ( jqdiv )
        {
            // without ui
            if (jqdiv === "")
            {
                    simhw_internalState_reset('MP_wc', ko_observable(0)) ;
                    return ;
            }

            // html holder
            var o1 = "<div class='container-fluid'>" +
                     "<div class='row'>" ;

            o1 += "<div class='col-12' style='padding:0 0 10 0;'>" +
                  "<div class='card bg-light'>" +
                  "<div class='card-body p-0' id='mempanel'>" +
                  "<table class='table table-hover table-sm table-bordered' " +
                  "       style='margin:0'>" +
                  "<tbody class='no-ui-mini'>" +
                  "<tr><td align=center'>Wait cycles (<b>0</b> - &infin;)</td>" +
                  "    <td align=center'>" + 
                  "<div id='mp_wc'>" + 
                  "<input type=number data-bind='value: simhw_internalState(\"MP_wc\")' min='0' max='99999999'>" +
                  "</div>" + 
                  "    </td></tr>" +
                  "</tbody>" +
                  "</table>" +
                  "</div>" +
                  "</div>" +
                  "</div>" ;
         
            $(jqdiv).html(o1);

            // knockout binding
            simhw_internalState_reset('MP_wc', ko_observable(0)) ;
            var ko_context = document.getElementById('mp_wc');
            ko.applyBindings(simhw_internalState('MP_wc'), ko_context);
        }

