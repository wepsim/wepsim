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
         *  Slider: CPU / Control Unit
         */

        /* jshint esversion: 6 */
        class ws_slider_cpucu extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( event_name )
	      {
                    // initialize render elements...
                    super.render() ;

		    // html holder
		    var o1 = '<form id="slider2f" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
			     '<label class="my-0 form-label" for="' + this.name_str + '" style="min-width:95%">' +
                             '<span data-langkey=\'processor\'>processor</span>:' +
                             '</label>' +
			     '  <input aria-label="Show CPU/CU" type="range" ' +
                             '         name="' + this.name_str + '" ' +
                             '           id="' + this.name_str + '"' +
			     '	  min="0" max="14" value="7" step="1"' +
			     '	  data-show-value="false"' +
                             '         class="form-range slider col mx-0 px-0"' +
                             '         oninput="wsweb_set_cpucu_size(this.value);' +
                             '                  return false;">' +
			     '</form>' ;

		    // load html
		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-slider-cpucu', ws_slider_cpucu) ;
        }

