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
	          "<table class='table table-hover table-sm table-bordered m-0'>" +
		  "<tbody>" +
		  "<tr>" +
                  "    <td class='w-50'>line/via: bits to identify line/via in cache</td>" +
                  "    <td class='w-50'>offset: bits to identify byte inside line/via</td>" +
                  "</tr>" +
		  "<tr>" +
		  "    <td align=center'>" +
		  "    <div id='via_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"via_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
		  "    </td>" +
		  "    <td align=center'>" +
		  "    <div id='off_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"off_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
		  "    </td>" +
                  "</tr>" +
                  "</tbody>" +
                  "</table>" +
		  "</div>" +
		  "</div>" ;

	     o += "<div class='row'>" +
		  "<div class='col p-2'>" +
	          "<table class='table table-hover table-sm table-bordered m-0 w-50'>" +
		  "<tbody>" +
                  "<tr>" +
		  "    <td class=''>bits to identify set in cache (0: direct, all: full-assoc.)</td>" +
                  "</tr>" +
                  "<tr>" +
		  "    <td>" +
		  "    <div id='set_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"set_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
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
		  "    <td align=center'>Replace policy</td>" +
		  "    <td align=center'>" +
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

	    o += "<div class='container container-fluid'>" +
		 "<div class='row'>" +
		 "<div class='col p-2'>" +
		 "<table class='table table-hover table-sm table-bordered m-0'>" +
		 "<tbody>" +
		 "<tr><td align=center'>Cache active</td>" +
		 "    <td align=center'>" +
		 "<div class='form-check'>" +
		 "  <input class='form-check-input' type='radio' name='cm_state' id='cm_enabled'>" +
		 "  <label class='form-check-label' for='cm_enabled' " +
		 "         onclick='wepsim_cm_enable();'>" +
		 "    Enabled" +
		 "  </label>" +
		 "</div>" +
		 "<div class='form-check'>" +
		 "  <input class='form-check-input' type='radio' name='cm_state' id='cm_disabled' checked>" +
		 "  <label class='form-check-label' for='cm_disabled' " +
		 "         onclick='wepsim_cm_disable();'>" +
		 "    Disabled" +
		 "  </label>" +
		 "</div>" +
		 "    </td></tr>" +
		 "</tbody>" +
		 "</table>" +
		 "</div>" +
		 "</div>" ;

	    o += "<div class='row'>" +
		 "<div class='col p-2'>" ;
            o += wepsim_show_cm_level_cfg(memory_cfg, 0) ;
	    for (var i=1; i<memory_cfg.length; i++) {
            o += wepsim_show_cm_level_cfg(memory_cfg, i) ;
	    }
	    o += "</div>" +
		 "</div>" +
		 "</div>" ;

	   return o ;
        }

        function wepsim_cm_enable ( )
        {
              var curr_cm  = [] ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              if (0 == curr_cfg.length) {
                  curr_cfg[0] = { vps_size:0, set_size:6, off_size:5, replace_pol:"first" } ;
              }

              for (var i=0; i<curr_cfg.length; i++) {
                  curr_cm[i] = cache_memory_init2(curr_cfg[i], null) ;
              }

              simhw_internalState_reset('CM_cfg', curr_cfg) ;
              simhw_internalState_reset('CM',     curr_cm) ;
        }

        function wepsim_cm_disable ( )
        {
              simhw_internalState_reset('CM', []);
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

              curr_cfg[index][field] = value ;
              curr_cm[index] = cache_memory_init2(curr_cfg[index], null) ;

              simhw_internalState_reset('CM_cfg', curr_cfg) ;
              simhw_internalState_reset('CM',     curr_cm) ;
        }

