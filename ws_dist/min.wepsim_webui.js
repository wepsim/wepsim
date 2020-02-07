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
         *  I/O device
         */

        class ws_cpu extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // stats holder
		    var o1 = "<div class='col-12'>" +
			     "<table class='table table-hover table-sm table-bordered'>" +
			     "<tr>" +
			     "<td align=center width=50%>Instructions</td>" +
			     "<td align=center width=50%>" +
			     "<div id='ins_context'>" + "<span data-bind='text: value'>&nbsp;</span>" + "</div>" +
			     "</td>" +
			     "</tr>" +
			     "<tr>" +
			     "<td align=center width=50%>CLK ticks</td>" +
			     "<td align=center width=50%>" +
			     "<div id='clk_context'>" + "<span data-bind='text: value'>&nbsp;</span>" + "</div>" +
			     "</td>" +
			     "</tr>" +
			     "</table>" +
			     "</div>" ;

		    this.innerHTML = "<div class='row'>" + o1 + "</div>" ;

		    // knockout binding
		    ko_rebind_state('CLK',      'clk_context') ;
		    ko_rebind_state('DECO_INS', 'ins_context') ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-cpu', ws_cpu);

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
         *  I/O device
         */

        class ws_mem_config extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
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

		    this.innerHTML = o1 ;

		    // knockout binding
		    simhw_internalState_reset('MP_wc', ko_observable(0)) ;
		    var ko_context = document.getElementById('mp_wc');
		    ko.applyBindings(simhw_internalState('MP_wc'), ko_context);
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-mem-config', ws_mem_config);

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
         *  I/O device
         */

        class ws_console extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    var o1 = '<label class="my-0" for="kdb_con" style="min-width:95%">' +
			     '   <img alt="monitor" height="55" src="images/monitor2.png" />' +
			     '</label>' +
			     '<textarea aria-label="monitor"' +
			     '          style="width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; margin:0 0 8 0"' +
			     '          placeholder="WepSIM" id="kdb_con" rows="8" readonly></textarea>' +
                             '' +
                             '<label class="my-0" for="kdb_key" style="min-width:95%">' +
                             '   <img alt="keyboard" height="35" src="images/keyboard1.png" />' +
                             '</label>' +
                             '<textarea aria-label="keyboard"' +
                             '          style="min-width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; margin:0 0 0 0"' +
                             '          placeholder="WepSIM" id="kdb_key" rows="2"></textarea>' ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-console', ws_console);


        //
        // Screen / Keyboard
        //

	function wepsim_get_screen_content ( )
	{
	      var screen_content = "" ;

	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  screen_content = scrobj.value ;
	      }

              simcore_native_set_value("SCREEN", "content", screen_content) ;

	      return screen_content ;
	}

	function wepsim_set_screen_content ( screen_content )
	{
	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  scrobj.value = screen_content ;
	      }

              simcore_native_set_value("SCREEN", "content", screen_content) ;

	      return screen_content ;
	}

	function wepsim_get_keyboard_content ( )
	{
	      var keystrokes = "" ;

	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keystrokes = keyobj.value ;
	      }

              simcore_native_set_value("KBD", "keystrokes", keystrokes) ;

	      return keystrokes ;
	}

	function wepsim_set_keyboard_content ( keystrokes )
	{
	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keyobj.value = keystrokes ;
	      }

              simcore_native_set_value("KBD", "keystrokes", keystrokes) ;

	      return true ;
	}

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
         *  I/O device
         */

        class ws_io_info extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // default content
		    this.innerHTML = msg_default ;

		    var curr_iointfactory = simhw_internalState('io_int_factory') ;
		    if (typeof curr_iointfactory == "undefined") {
			return ;
		    }

		    // stats holder
		    var i = 0 ;

		    var o1 = "<div class='container'>" +
			     "<div class='row'>" +
			     "<div class='col-12'>" +
			     "<table class='table table-hover table-sm table-bordered'>" ;
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
		       o1 += "<tr id='int" + i + "_context'>" +
			     "<td align=center width=50%>" +
			     "<span data-bind=\"style: {fontWeight: active() ? 'bold' : ''}\">" + "Interrupt " + i + "</span>" +
			     "</td>" +
			     "<td align=center width=50%>" +
			     "<span data-bind='text: accumulated'>&nbsp;</span>" +
			     "</td>" +
			     "</tr>" ;
		    }
		    o1 += "</table>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;

		    this.innerHTML = o1 ;

		    // knockout binding
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
			 if (typeof curr_iointfactory[i].accumulated != "function")
			     curr_iointfactory[i].accumulated = ko_observable(curr_iointfactory[i].accumulated) ;
			 if (typeof curr_iointfactory[i].active != "function")
			     curr_iointfactory[i].active      = ko_observable(curr_iointfactory[i].active) ;
			 var ko_context = document.getElementById('int' + i + '_context');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(curr_iointfactory[i], ko_context);
		    }
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-io-info', ws_io_info);

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
         *  I/O device
         */

        class ws_io_config extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // default content
		    this.innerHTML = msg_default ;

		    var curr_iointfactory = simhw_internalState('io_int_factory') ;
		    if (typeof curr_iointfactory == "undefined") {
			return ;
		    }

		    // html holder
		    var i = 0 ;

		    var o1 = "<div class='container-fluid'>" +
			     "<div class='row'>" +
		             "<div class='col-12 p-0'>" +
			     "<div class='card bg-light m-0'>" +
			     "<div class='card-body p-0' id='iopanel'>" +
		             "<center>" +
			     "<table class='table table-hover table-sm table-bordered m-0'>" +
			     "<tbody class='no-ui-mini'>" +
			     "<tr>" +
			     "<td align=center width='33%'>" +
			     "  <span class='d-none d-sm-inline-flex'>Interrupt identificator</span>" +
			     "  <span class='d-sm-none'>Int. Id.<br>(0 - 7)</span>" +
			     "</td>" +
			     "<td align=center width='33%'>" +
			     "  <span class='d-none d-sm-inline-flex'>CLK period (<b>0</b> - &infin;)</span>" +
			     "  <span class='d-sm-none'>CLK ticks <br>(<b>0</b> - &infin;)</span>" +
			     "</td>" +
			     "<td align=center width='33%'>" +
			     "  <span class='d-none d-sm-inline-flex'>Probability (0 - 1)</span>" +
			     "  <span class='d-sm-none'>Probability <br>(0 - 1)</span>" +
			     "</td>" +
			     "</tr>" ;
		    for (i=0; i<8; i++)
		    {
		       o1 += "<tr>" +
			     "<td align='center' style='padding:0 0 0 0; vertical-align: middle !important'>" +
			     "<span class='p-0 m-0'>" + i + "</span>" +
			     "</td>" +
			     "<td align='center' class='p-0'>" +
			     "<div id='int" + i + "_per' style='margin:0 3 0 3'>" +
			     "<input type=number data-bind='value: period' min='0' max='99999999' class='form-control p-0'>" +
			     "</div>" +
			     "</td>" +
			     "<td align='center' class='p-0'>" +
			     "<div id='int" + i + "_pro' style='margin:0 3 0 3'>" +
			     "<input type='number' data-bind='value: probability' min='0' max='1' step='.05' class='form-control p-0'>" +
			     "</div>" +
			     "</td>" +
			     "</tr>" ;
		    }
		       o1 += "</tbody>" +
			     "</table>" +
			     "</center>" +
		             "</div>" +
			     "</div>" +
			     "</div>" ;

		    this.innerHTML = o1 ;

		    // knockout binding
		    var ko_context = {} ;
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
			 if (typeof curr_iointfactory[i].period != "function")
			     curr_iointfactory[i].period = ko_observable(curr_iointfactory[i].period) ;
			 ko_context = document.getElementById('int' + i + '_per');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(curr_iointfactory[i], ko_context);
	
			 if (typeof curr_iointfactory[i].probability != "function")
			     curr_iointfactory[i].probability = ko_observable(curr_iointfactory[i].probability) ;
			 ko_context = document.getElementById('int' + i + '_pro');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(curr_iointfactory[i], ko_context);
		    }
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-io-config', ws_io_config);

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
         *  I/O device
         */

        class ws_authors extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		 var o1 = '<div class="card-desk row"' +
                          '     style="max-width:512px;">' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-1"' +
                          '             src="images/author_fgarcia.png" alt="Felix Garcia Carballeira" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="fgarcia">F&eacute;lix Garc&iacute;a Carballeira</a>' +
                          '        </div>' +
			  '        <div id="cf-fgarcia" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             ><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Felix_Garcia-Carballeira"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-2"' +
                          '             src="images/author_acaldero.png" alt="Alejandro Calder&oacute;n Mateos" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="acaldero">Alejandro Calder&oacute;n Mateos</a>' +
                          '        </div>' +
			  '        <div id="cf-acaldero" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/alejandro-calderon-mateos/"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Alejandro_Calderon2"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://github.com/acaldero/"><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-3"' +
                          '             src="images/author_jprieto.png" alt="Javier Prieto Cepeda" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="jprieto">Javier Prieto Cepeda</a>' +
                          '        </div>' +
			  '        <div id="cf-jprieto" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/javier-prieto-cepeda"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-4"' +
                          '             src="images/author_salonso.png" alt="Sa&uacute;l Alonso Monsalve" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="salonso">Sa&uacute;l Alonso Monsalve</a>' +
                          '        </div>' +
			  '        <div id="cf-salonso" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/salonsom/"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Saul_Alonso_Monsalve"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://github.com/saulam/"><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-authors', ws_authors);

