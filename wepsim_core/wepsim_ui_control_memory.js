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
         *  Control Memory UI
         */

        var show_control_memory_deferred = null;

        function wepsim_show_control_memory ( memory, memory_dashboard, index, redraw )
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
            var htmllabel = "" ;
            var htmlfill = 0 ;
            for (var key in memory)
            {
                value = controlmemory_lineToString(memory, key) ;
                maddr = "0x" + parseInt(key).toString(16) ;
                if (typeof revlabels[key] != "undefined")
		{
                    htmllabel = revlabels[key] ;
		    htmlfill  = 5 - htmllabel.length ;
		    if (htmlfill > 0) {
			for (var i=0; i<htmlfill; i++) {
                             htmllabel = htmllabel + "&nbsp;" ;
			}
		    }

                    maddr = '<span>' +
                            '<span class="badge badge-pill badge-info text-monospace" ' +
                            '      style="position:relative;top:4px;">' + htmllabel + '</span>' +
                            '<span style="border:1px solid gray;">' + maddr + '</span>' +
                            '</span>' ;
	        }

		trpin = "&nbsp;" ;
		if (true == memory_dashboard[key].breakpoint) {
                    trpin = sim_core_breakpointicon_get(icon_theme) ;
		}

		if (key == index)
		     o1 += "<tr id='maddr" + key + "' class='d-flex' " +
                           "    style='color:blue; font-size:small; font-weight:bold' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td             class='col-3 col-md-2 py-0' align='right'>" + maddr + "</td>" +
			   "<td width='1%'  class='col-auto py-0 px-0' id='mcpin" + key + "'>" + trpin + "</td>" +
			   "<td             class='col py-0'>" + value + "</td></tr>";
		else o1 += "<tr id='maddr" + key + "' class='d-flex' " +
                           "    style='color:black; font-size:small; font-weight:normal' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td             class='col-3 col-md-2 py-0' align='right'>" + maddr + "</td>" +
			   "<td width='1%'  class='col-auto py-0 px-0' id='mcpin" + key + "'>" + trpin + "</td>" +
			   "<td             class='col py-0'>" + value + "</td></tr>";
            }

	    if (typeof memory[index] == "undefined") {
		o1 += "<tr>" +
		      "<td width='15%'><font style='color:blue; font-size:small; font-weight:bold'>0x" +
                      parseInt(index).toString(16) +
                      "</font></td>" +
		      "<td><font style='color:blue; font-size:small; font-weight:bold'><b>&nbsp;</b></font></td></tr>";
            }

            $("#memory_MC").html("<center><table class='table table-hover table-sm'>" +
                                 "<tbody id='none'>" + o1 + "</tbody>" +
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
                var filter = simhw_internalState('filter_signals') ;

		var h = "<tr bgcolor='#FF9900'>" +
                        "<td bgcolor='white'     style='border-style: solid; border-width:0px; border-color:lightgray;'></td>" +
                        "<td bgcolor='lightblue' style='border-style: solid; border-width:1px; border-color:lightgray;'>co</td>" +
                        "<td bgcolor='#FFCC00'   style='border-style: solid; border-width:1px; border-color:lightgray;' align='center'><small><b>&#181;dir</b></small></td>" +
                        "<td bgcolor='white'     style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;&nbsp;</td>" ;
		var contSignals=1;
		for (var i=0; i<filter.length; i++) {
                     var s = filter[i].split(",")[0] ;
		     h += "<td align='center' style='border-style: solid; border-width:1px;'><small><b>" + simhw_sim_signals()[s].name + "</b></small></td>";
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

			 line += "<td align='center'  style='border-style: solid; border-width:1px; border-color:lightgray;' bgcolor='white'>" + madd + "</td>" +
                                 "<td bgcolor='white' style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" ;
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
			           line += "<td align='center' style='border-style: solid; border-width:1px;'><b>" + svalue + "</b></td>";
			      else line += "<td align='center' style='border-style: solid; border-width:1px;'><font color='grey'>" + svalue + "</font></td>";
			 }

			 o += "<tr>" + line + "</tr>" ;
		    }
		}

		o += "</table></center>";
		return o;
	}

