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
         *  Main Memory
         */

        /* jshint esversion: 6 */
        class ws_bin_mc extends ws_uielto
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
		    // html holder
		    var o1 = "   <div id='compile_bin2b' " +
                             "        class='p-3' " +
                             "        style='width:100%; height: inherit !important;'> " +
                             "        <div class='d-flex align-items-center'> " +
                             "        Loading binary, please wait... <br/> " +
                             "        WARNING: loading binary might take time on slow devices. " +
                             "        </div> " +
                             "   </div> " ;

		    this.innerHTML = o1 ;
	      }

              render_populate ( )
              {
                    // check parameters
                    var simware = get_simware() ;
                    if (null == simware) {
                        return ;
                    }

                    // get html code
                    setTimeout(function(){
	                var o = firmware2html(simware.firmware, true) ;
	                $('#compile_bin2b').html(o) ;
                    }, 15);
	      }
        }

        register_uielto('ws-bin_mc', ws_bin_mc) ;


        /*
         *  mc2html
         */

	function firmware2html ( fir, showBinary )
	{
		var i = 0 ;
		var s = "" ;
		var n = "" ;

                var filter = simhw_internalState('filter_signals') ;

		var h = "<tr>" +
                        "<td class='border-secondary'></td>" +
                        "<td class='border-secondary bg-info    text-dark'>co</td>" +
                        "<td class='                 bg-warning text-dark' align='center'><small><b>&#181;dir</b></small></td>" +
                        "<td class='border-secondary'>&nbsp;&nbsp;</td>" ;
		var contSignals=1;
		for (i=0; i<filter.length; i++)
                {
                     s = filter[i].split(",")[0] ;
                     n = simhw_sim_signals()[s] ;
                     if (typeof n == "undefined")
                         continue ;
                     n = n.name ;
		     h += "<td class='border border-secondary bg-warning-subtle' align='center'><small><b>" + n + "</b></small></td>";
		     contSignals++;
		}
		h += "</tr>" ;
		
		var o  = "<center>";
		    o += "<table class='border border-0'>";

                var l = 0;
                var line = "";
	        var fragment = "";
		var ico  = "";
		var madd = "";
		for (i=0; i<fir.length; i++)
		{
		    var mstart = fir[i]["mc-start"];
		    var mcode  = fir[i].microcode;
		    for (j=0; j<mcode.length; j++)
		    {
                         if ((++l % 10) == 1)
		             o = o + h ;

			 ico = "";
			 if (typeof fir[i].co != "undefined")
			     ico = parseInt(fir[i].co, 2) ;
                         var isignature = fir[i].signature.split(',')[0] ;

                         line = "";
                         if (j==0)
                              line += "<td class='border border-0'>" +
				      "<span class='badge rounded-pill text-bg-secondary float-start'>" + isignature + "</span>&nbsp;</td>" +
                                      "<td class='border border-secondary'>" + ico + "</td>" ;
                         else line += "<td class='border border-0'>&nbsp;</td>" +
                                      "<td class='border border-secondary'>&nbsp;</td>" ;

                         if (showBinary)
                              madd = "0x" + (mstart + j).toString(16) ;
                         else madd = mstart + j ;

			 line += "<td class='border border-secondary' align='center'>" + madd + "</td>" +
                                 "<td class='border border-0'>&nbsp;</td>" ;
			 var mins = mcode[j] ;
		         for (var k=0; k<filter.length; k++)
			 {
                              s = filter[k].split(",")[0] ;

                              n = simhw_sim_signals()[s] ;
                              if (typeof n == "undefined") {
                                  continue ;
                              }

			      var svalue = parseInt(simhw_sim_signals()[s].default_value);
                              var newval = false;
			      if ( (typeof mins[s] != "undefined") && (!isNaN(parseInt(mins[s]))) )
                              {
				   svalue = parseInt(mins[s]);
                                   newval = true;
                              }

			      if ( (s == "SELA" || s == "SELB" || s == "SELC") &&
                                   (typeof mins.MADDR != "undefined") && (!isNaN(parseInt(mins.MADDR))) )
                              {
				   fragment = parseInt(mins.MADDR).toString(2) ;
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
			          fragment = svalue.toString(2) ;
			          var nbits    = parseInt(simhw_sim_signals()[s].nbits);
			          svalue = "00000000000000000000000000000000".substring(0, nbits - fragment.length) + fragment;

                                  var ngreen = filter[k].split(",")[1] ;
                                  var part1  = svalue.substring(0, ngreen);
                                  var part2  = svalue.substring(ngreen);
                                  svalue     = "<font color=green>" + part1 + "</font>" + part2 ;
                              }

			      if (newval)
			           line += "<td class='border border-secondary' align='center'><b>" + svalue + "</b></td>";
			      else line += "<td class='border border-secondary' align='center'><font color='grey'>" + svalue + "</font></td>";
			 }

			 o += "<tr>" + line + "</tr>" ;
		    }
		}

		o += "</table></center>";
		return o;
	}

