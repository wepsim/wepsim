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
         *  show_memories
         */

        var show_main_memory_deferred = null;
        var show_main_memory_redraw   = false;

        function show_main_memory ( memory, index, redraw, updates )
        {
            if (get_cfg('DBG_delay') > 5) 
                show_main_memory_redraw  = redraw || show_main_memory_redraw ;

            if (null != show_main_memory_deferred)
                return;

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
	    for (skey in segments)
                 seglabels[parseInt(segments[skey].begin)] = skey ;

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
			   "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + taddr + "</div>" + 
			   "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:0'></div>" + 
                           "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" + 
                           "</div>" ;
		else o1 += "<div class='row' id='addr" + key + "'" +
                           "     style='color:black; font-size:small; font-weight:normal; border-bottom: 1px solid lightgray !important'>" +
			   "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + taddr + "</div>" + 
			   "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:0'></div>" + 
                           "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" + 
                           "</div>" ;
            }

	    if (typeof memory[index] == "undefined")
		o1 += "<div class='row' id='addr" + index + "'" +
                      "     style='color:blue; font-size:small; font-weight:bold;    border-bottom: 1px solid lightgray !important'>" +
		      "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + "0x" + parseInt(index).toString(16) + "</div>" +
		      "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:5'></div>" + 
		      "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5' id='mpval>" + index + "'>" + "00 00 00 00" + "</div>"+ 
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

        var show_control_memory_deferred = null;

        function show_control_memory ( memory, memory_dashboard, index, redraw )
        {
            if (null != show_control_memory_deferred)
                return;

            show_control_memory_deferred = setTimeout(function () {
						         if (false == redraw)
							      light_refresh_control_memory(memory, memory_dashboard, index);
                                                         else  hard_refresh_control_memory(memory, memory_dashboard, index, redraw);
                                                         show_control_memory_deferred = null;
                                                      }, cfg_show_control_memory_delay);
        }

        function controlmemory_lineToString ( memory, key )
        {
		var value = "" ;

		for (var ks in memory[key])
		{
		     if (1 == memory[key][ks]) {
			 value += ks + " ";
			 continue;
		     }

		     if ("NATIVE" == ks) {
			 value += "&lt;native&gt; " ;
			 continue;
		     }

		     if ("NATIVE_JIT" == ks) {
			 value += "&lt;built-in&gt; " ;
			 continue;
		     }

		     value += ks + "=" + parseInt(memory[key][ks]).toString(2) + " ";
		}

		return value ;
        }

        function hard_refresh_control_memory ( memory, memory_dashboard, index, redraw )
        {
	    if (typeof document == "undefined")
	        return ;

	    var o1 = "" ;
            var value = "" ;
            var icon_theme = get_cfg('ICON_theme') ;

            var SIMWARE = get_simware() ;
            var revlabels = new Object() ;
            for (var key in SIMWARE.firmware)
                 revlabels[SIMWARE.firmware[key]["mc-start"]] = SIMWARE.firmware[key]["name"] ;

            var maddr = "" ;
            var trpin = "" ;
            for (var key in memory)
            {
                value = controlmemory_lineToString(memory, key) ;
                maddr = "0x" + parseInt(key).toString(16) ;
                if (typeof revlabels[key] != "undefined")
                    maddr = '<span>' +
                            '<span class="badge badge-pill badge-info" ' + 
                            '      style="position:relative;top:4px;">' + revlabels[key] + '</span>' +
                            '<span style="border:1px solid gray;">' + maddr + '</span>' +
                            '</span>' ;

		trpin = "&nbsp;" ;
		if (true == memory_dashboard[key].breakpoint)
		    trpin = "<img alt='stop icon' height=22 src='images/stop_" + icon_theme + ".gif'>" ;

		if (key == index)
		     o1 += "<tr id='maddr" + key + "' " +
                           "    style='color:blue; font-size:small; font-weight:bold' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td width=15% align=right>" + maddr + "</td>" +
			   "<td width=1% id='mcpin" + key + "' style='padding:5 0 0 0;'>" + trpin + "</td>" +
			   "<td>" + value + "</td></tr>";
		else o1 += "<tr id='maddr" + key + "' " +
                           "    style='color:black; font-size:small; font-weight:normal' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td width=15% align=right>" + maddr + "</td>" +
			   "<td width=1% id='mcpin" + key + "' style='padding:5 0 0 0;'>" + trpin + "</td>" +
			   "<td>" + value + "</td></tr>";
            }

	    if (typeof memory[index] == "undefined") {
		o1 += "<tr>" +
		      "<td width=15%><font style='color:blue; font-size:small; font-weight:bold'>0x" + 
                      parseInt(index).toString(16) + 
                      "</font></td>" +
		      "<td><font style='color:blue; font-size:small; font-weight:bold'><b>&nbsp;</b></font></td></tr>";
            }

            $("#memory_MC").html("<center><table class='table table-hover table-sm'>" +
                                 "<tbody id=none>" + o1 + "</tbody>" +
                                 "</table></center>");

            // scroll up/down to index element...
	    var obj_byid = $('#maddr' + index) ;
	    if ( (redraw) && (obj_byid.length > 0) )
            {
	        var topPos = obj_byid[0].offsetTop ;
	        var obj_byid = $('#memory_MC') ;
	        if (obj_byid.length > 0)
	            obj_byid[0].scrollTop = topPos;
            }

            // update old_mc_add for light_update
            old_mc_addr = index;
        }

        var old_mc_addr = 0;

        function light_refresh_control_memory ( memory, memory_dashboard, index )
        {
            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_mc_addr = index ;

            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }


        /*
         *  obj2html
         */

	function firmware2html ( fir, showBinary )
	{
		var filter =  [ "A0,0",   "B,0",    "C,0",   "SELA,5", "SELB,5", "SELC,2", "SELCOP,0",  "MR,0",  "MC,0",
				"C0,0",   "C1,0",   "C2,0",  "C3,0",   "C4,0",   "C5,0",   "C6,0",      "C7,0",
				"T1,0",   "T2,0",   "T3,0",  "T4,0",   "T5,0",   "T6,0",   "T7,0",      "T8,0",  "T9,0",  "T10,0", "T11,0",
				"M1,0",   "M2,0",   "M7,0",  "MA,0",   "MB,0", 
                                "SELP,0", "LC,0",   "SE,0",  "SIZE,0", "OFFSET,0",
                                "BW,0",   "R,0",    "W,0",   "TA,0",   "TD,0",   "IOR,0",  "IOW,0", 
                                "TEST_I,0",    "TEST_U,0"  ] ;

		var h = "<tr bgcolor=#FF9900>" +
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'></td>" +
                        "<td bgcolor=lightblue style='border-style: solid; border-width:1px; border-color:lightgray;'>co</td>" +
                        "<td bgcolor=#FFCC00   style='border-style: solid; border-width:1px; border-color:lightgray;' align=center><small><b>&#181;dir</b></small></td>" +
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;&nbsp;</td>" ;
		var contSignals=1;
		for (var i=0; i<filter.length; i++) {
                     var s = filter[i].split(",")[0] ;
		     h += "<td align=center style='border-style: solid; border-width:1px;'><small><b>" + simhw_sim_signals()[s].name + "</b></small></td>";
		     contSignals++;
		}
		h += "</tr>" ;
		
		var o  = "<center>";
		    o += "<table style='table-layout:auto; border-style: solid: border-width:0px; border-collapse:collapse;'>";

                var l = 0;
                var line = "";
		var ico  = "";
		var madd = "";
		for (var i=0; i<fir.length; i++)
		{
		    var mstart = fir[i]["mc-start"];
		    var mcode  = fir[i].microcode;
		    for (j=0; j<mcode.length; j++)
		    {
                         if (++l % 10 == 1)
		             o = o + h ;

			 ico = "";
			 if (typeof fir[i].co != "undefined")
			     ico = parseInt(fir[i].co, 2) ;
                         var isignature = fir[i].signature.split(',')[0] ;

                         line = "";
                         if (j==0)
                              line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'>" + 
				      "<span class='badge badge-pill badge-secondary float-left'>" + isignature + "</span>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>" + ico + "</td>" ;
                         else line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>&nbsp;</td>" ;

                         if (showBinary)
                              madd = "0x" + (mstart + j).toString(16) ;
                         else madd = mstart + j ;

			 line += "<td align=center  style='border-style: solid; border-width:1px; border-color:lightgray;' bgcolor=white>" + madd + "</td>" +
                                 "<td bgcolor=white style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" ;
			 var mins = mcode[j] ;
		         for (var k=0; k<filter.length; k++)
			 {
                              var s = filter[k].split(",")[0] ;

			      var svalue = parseInt(simhw_sim_signals()[s].default_value);
                              var newval = false;
			      if ( (typeof mins[s] != "undefined") && (!isNaN(parseInt(mins[s]))) )
                              {
				   svalue = parseInt(mins[s]);
                                   newval = true;
                              }

			      if ( (s == "SELA" || s == "SELB" || s == "SELC") &&
                                   (typeof mins["MADDR"] != "undefined") && (!isNaN(parseInt(mins["MADDR"]))) )
                              {
				   var fragment = parseInt(mins["MADDR"]).toString(2) ;
                                   fragment = "000000000000".substring(0, 12 - fragment.length) + fragment + "000" ;
                                   if (s == "SELA") {
                                       svalue = parseInt(fragment.substring(0,   5), 2);
                                       newval = true;
                                   }
                                   if (s == "SELB") {
                                       svalue = parseInt(fragment.substring(5,  10), 2);
                                       newval = true;
                                   }
                                   if (s == "SELC") {
                                       svalue = parseInt(fragment.substring(10, 15), 2);
                                       newval = true;
                                   }
                              }

                              if (showBinary)
                              {
			          var fragment = svalue.toString(2) ;
			          var nbits    = parseInt(simhw_sim_signals()[s].nbits);
			          svalue = "00000000000000000000000000000000".substring(0, nbits - fragment.length) + fragment;

                                  var ngreen = filter[k].split(",")[1] ;
                                  var part1  = svalue.substring(0, ngreen);
                                  var part2  = svalue.substring(ngreen);
                                  svalue     = "<font color=green>" + part1 + "</font>" + part2 ;
                              }

			      if (newval)
			           line += "<td align=center style='border-style: solid; border-width:1px;'><b>" + svalue + "</b></td>";
			      else line += "<td align=center style='border-style: solid; border-width:1px;'><font color='grey'>" + svalue + "</font></td>";
			 }

			 o += "<tr>" + line + "</tr>" ;
		    }
		}

		o += "</table></center>";
		return o;
	}

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
                         "  <td width=25% align=center><small><b>byte 3</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 2</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 1</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 0</b></small></td>" +
                         "</tr>" +
                         "<tr>" +
                         "  <td width=12% align=center >&nbsp;<sup>31&nbsp;&nbsp;......&nbsp;&nbsp;24</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>23&nbsp;&nbsp;......&nbsp;&nbsp;16</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>15&nbsp;&nbsp;......&nbsp;&nbsp;8</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>7&nbsp;&nbsp;......&nbsp;&nbsp;0</sup>&nbsp;</td>" +
                         "</tr>" +
                         "</table>" +
			 "<th style='border-style: solid; border-width:0px;' align=right>&nbsp;&nbsp;segment</th>" +
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
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
                                       mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "<td rowspan=" ;
                             } else {
			         x += "<tr style=\"font-family:'Consolas'; font-size:11pt;\">" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
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
                              "<td valign=middle align=center height=25px>...</td>" +
                              "<td valign=middle align=center height=25px>...</td>" +
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
                 " <table height=400px>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border=1 width=100% height=100%>" ;
	   for (var skey in segments)
	   {
	        if (segments[skey].name != ".stack")
	   	    o1 += "<tr><td valign=middle align=center height=60px bgcolor=" + segments[skey].color + ">" +
                          segments[skey].name +
                          "</td></tr>" +
	   	          "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign=middle align=center bgcolor=" + segments['.stack'].color + ">" +
                 segments['.stack'].name +
                 "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width=20px>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var sx = "" ;
           var sp = "" ;
	   for (skey in segments)
	   {
	       sx = "<tr>" +
	   	    "    <td valign=top align=left height=30px style=''>" +
	   	    "    <div id='compile_begin_" + segments[skey].name + "'>" + segments[skey].begin + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" +
	   	    " <tr>" +
	   	    "    <td valign=bottom align=left height=30px style=''>" +
	   	    "    <div id='compile_end_"   + segments[skey].name + "'>" + segments[skey].end + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" ;

	       if (segments[skey].name != ".stack")
	   	    o1 += sx + "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
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

                o += "<center><table data-role=table class='table ui-responsive table-sm'><tbody>" ;
                for (l in asm)
                {
                     if  (bgc == "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // instruction
                     s1_instr = asm[l].source ;
                     s2_instr = asm[l].source_original ;

                     // labels
                     s_label = "" ;
                     if (typeof a2l[l] != "undefined") {
                         for (var i=0; i<a2l[l].length; i++) {
                              s_label = s_label + "<span class='badge badge-info'>" + a2l[l][i] + "</span>" ;
                         }
                     }

                     // join the pieces...
                     if (typeof a2s[l] != "undefined")
                         o += "<tr bgcolor='#FEFEFE'>" +
                              "<td colspan='7' style='line-height:0.3;' align=left><small><font color=gray>" + a2s[l] + "</font></small></td>"
                              "</tr>" ;

                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
                           "<td                                             width='2%'></td>" +
                           "<td class='asm_break'  style='line-height:0.9; padding:5 0 0 0;' width='10%' align='center' id='bp" + l + "'>&nbsp;</td>" +
                           "<td class='asm_addr'   style='line-height:0.9;' width='15%'>" + l + "</td>" +
                           "<td class='asm_label2' style='line-height:0.9;' width='10%' align=right>" + s_label + "</td>" +
                           "<td class='asm_pins'   style='line-height:0.9;' width='20%' align=left>"  + s2_instr + "</td>" +
                           "<td class='asm_label1' style='line-height:0.9;' width='10%' align=right>" + s_label + "</td>" +
                           "<td class='asm_ins'    style='line-height:0.9;' width='25%' align=left>"  + s1_instr + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody></table></center>" ;

                return o ;
	}


        /*
         *  debug
         */

        var show_asmdbg_pc_deferred = null;

	function innershow_asmdbg_pc ( )
	{
	    fullshow_asmdbg_pc();
	    show_asmdbg_pc_deferred = null;
	}

	function show_asmdbg_pc ( )
	{
            if (get_cfg('DBG_delay') > 5)
	        return fullshow_asmdbg_pc();

            if (null == show_asmdbg_pc_deferred)
                show_asmdbg_pc_deferred = setTimeout(innershow_asmdbg_pc, cfg_show_asmdbg_pc_delay);
	}

        var old_addr = 0;

	function fullshow_asmdbg_pc ( )
	{
		if (typeof document == "undefined")
		    return ;

                var o1 = null ;
                var reg_pc    = get_value(simhw_sim_state("REG_PC")) ;
                var curr_addr = "0x" + reg_pc.toString(16) ;

                if (typeof FIRMWARE.assembly[old_addr] != "undefined")
                {
                     o1 = $("#asmdbg" + old_addr) ;
                     o1.css('background-color', FIRMWARE.assembly[old_addr].bgcolor) ;
                }
                else
                {
                     for (l in FIRMWARE.assembly)
                     {
                          o1 = $("#asmdbg" + l) ;
                          o1.css('background-color', FIRMWARE.assembly[l].bgcolor) ;
                     }
                }
                old_addr = curr_addr ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88') ;

                return o1 ;
	}

        function asmdbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;

                var hexaddr  = "0x" + addr.toString(16) ;
                var o1       = document.getElementById("bp"+hexaddr) ;
                var bp_state = FIRMWARE.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = "<img alt='stop icon' height=22 src='images/stop_" + icon_theme + ".gif'>" ;
                }

                FIRMWARE.assembly[hexaddr].breakpoint = bp_state ;
        }

        function dbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;

                var o1       = document.getElementById("mcpin" + addr) ;
                var bp_state = MC_dashboard[addr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = "<img alt='stop icon' height='22' src='images/stop_" + icon_theme + ".gif'>" ;
                }

                MC_dashboard[addr].breakpoint = bp_state ;

                if ( bp_state && ('instruction' == get_cfg('DBG_level')) )
                {
                     wepsim_notify_success('<strong>INFO</strong>', 
                                           'Please remember to change configuration to execute at microinstruction level.') ;
                }
        }

	function show_dbg_mpc ( )
	{
                show_control_memory(MC,
                                    MC_dashboard,
                                    get_value(simhw_sim_state('REG_MICROADDR')),
                                    false) ;
	}

        var show_dbg_ir_deferred = null;

	function show_dbg_ir ( decins )
	{
            if (null != show_dbg_ir_deferred)
                return;

            show_dbg_ir_deferred = setTimeout(function() {
                                                   fullshow_dbg_ir(decins);
                                                   show_dbg_ir_deferred = null;
                                              }, cfg_show_dbg_ir_delay);
	}

	function fullshow_dbg_ir ( decins )
	{
	     if (typeof document == "undefined")
	         return ;

	     var o = document.getElementById('svg_p');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('tspan3899');
	     if (o != null) o.innerHTML = decins ;

	     var o = document.getElementById('svg_cu');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('text3611');
	     if (o != null) o.innerHTML = decins ;
	}

