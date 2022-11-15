/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         * Cache memory (configuration)
         */

        /* jshint esversion: 6 */
        class ws_cache_config extends ws_uielto
        {
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
                    var div_id    = 'config_CACHE_' + this.name_str ;
                    var style_dim = "height:58vh; width:inherit; " ;
                    var style_ovf = "overflow:auto; -webkit-overflow-scrolling:touch; " ;

                    // default content
                    this.innerHTML = '<div id="'    + div_id    + '" ' +
                                     '     style="' + style_dim + style_ovf + '"></div>' ;
              }

	      render_populate ( )
	      {
                    var div_hash = '#config_CACHE_' + this.name_str ;

		    // if no active hardware -> empty
		    if (simhw_active() === null) {
                        $(div_hash).html('') ;
			return ;
		    }

                    // default content
                    var curr_cfg = simhw_internalState('CM_cfg') ;
                    if (typeof curr_cfg == "undefined") {
                        $(div_hash).html('') ;
                        return ;
                    }

		    // html holder
                    var o1 = wepsim_show_cache_memory_cfg(curr_cfg) ;
                    $(div_hash).html(o1) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cache-config', ws_cache_config) ;
        }


        /*
         *  Cache config UI
         */

        function wepsim_show_cm_level_cfg ( memory_cfg, index )
        {
	     var o = '' ;

	     o += "<div class='row'>" +
		  "<div class='col p-2'>" +
		  "<h5>Cache-" + (index+1) + "</h5>" +
	          "<table class='table table-hover table-sm table-bordered m-0 border border-light'>" +
		  "<tbody>" +
		  "<tr>" +
                  "    <td class='border border-dark w-50 text-center'>line/via</td>" +
                  "    <td class='border border-dark w-50 text-center'>offset</td>" +
                  "</tr>" +
		  "<tr>" +
		  "    <td align='center'>" +
		  "    <div id='via_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"via_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for line in cache" +
		  "    </td>" +
		  "    <td align='center'>" +
		  "    <div id='off_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"off_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for byte inside line" +
		  "    </td>" +
                  "</tr>" +
                  "</tbody>" +
                  "</table>" +
	          "<table class='table table-hover table-sm table-bordered m-0 w-50'>" +
		  "<tbody>" +
		  "    <td align='center' class='border border-dark'>tag</td>" +
		  "    <td align='center' class='border border-dark'>set</td>" +
                  "<tr>" +
		  "    <td align='left' colspan='2'>" +
                  "    <label for='cmcfg_range' class='form-label my-0 pt-2 pb-0'>(0: direct, max: full-assoc.)</label>" +
                  "    <input type='range' class='form-range pt-1' min='0' max='5' id='cmcfg_range' " +
                  "       onchange='wepsim_cm_update_cfg(" + index + ", \"set_size\", parseInt(this.value));'>" +
		  "    </td>" +
                  "</tr>" +
                  "<tr>" +
		  "    <td align='center' colspan='2'>" +
                  "    # bits for set in cache" +
		  "    </td>" +
                  "</tr>" +
		  "</tbody>" +
		  "</table>" +
		  "</div>" +
		  "</div>" ;

	     o += "<div class='row'>" +
		  "<div class='col p-2'>" +
	          "<table class='table table-hover table-sm table-bordered m-0'>" +
		  "<tbody>" +
		  "<tr>" +
		  "    <td class='text-center align-middle'>Replace policy</td>" +
		  "    <td class='text-center'>" +
		  "    <select class='form-select' " +
		  "            id='replace_pol_" + index + "_" + this.name_str + "'>" +
		  "            onchange='wepsim_cm_update_cfg(" + index + ", \"replace_pol\", this.value);'" +
		  "            aria-label='Replace policy'>" +
		  "      <option value='first' selected>First</option>" +
		  "      <option value='lfu'>LRF</option>" +
		  "    </select>" +
		  "    </td>" +
		  "</tr>" +
		  "</tbody>" +
		  "</table>" +
		  "</div>" +
		  "</div>" ;

	   return o ;
        }

        function wepsim_show_cache_memory_cfg ( memory_cfg )
        {
	    var o = '' ;
	    var i = 0 ;

	         o += "<div class='container container-fluid'>" ;
	              "<div class='row'>" +
		      "<div class='col'>" ;
	    for (i=0; i<memory_cfg.length; i++) {
                 o += wepsim_show_cm_level_cfg(memory_cfg, i) ;
	    }
                 o += wepsim_show_cm_level_cfg(memory_cfg, i) ; // add extra option to add a new cache-level
	         o += "</div>" +
		      "</div>" +
		      "</div>" ;

	   return o ;
        }

        function wepsim_cm_update_cfg ( index, field, value )
        {
              var curr_cm  = simhw_internalState('CM') ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              if (0 == curr_cfg.length) {
                  return ;
              }
              if ( (('via_size' == field) || ('set_size' == field)) && (curr_cfg[index]['set_size'] > curr_cfg[index]['via_size']) ) {
                  return ;
              }
              if ('via_size' == field) {
                  document.getElementById("cmcfg_range").max = value ;
              }

              curr_cfg[index][field] = value ;
              curr_cm[index] = cache_memory_init2(curr_cfg[index], null) ;

              simhw_internalState_reset('CM_cfg', curr_cfg) ;
              simhw_internalState_reset('CM',     curr_cm) ;
        }

