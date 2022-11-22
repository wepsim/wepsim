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
		  "<h5 class='col px-2 pt-2 pb-0'>Cache-" + (index+1) + "</h5>" +
		  "</div>" +
		  "" +
	          "<div class='row'>" +
		  "<div class='col p-2 ms-2'>" +
	          "<table class='table table-hover table-sm table-bordered m-0 border border-light'>" +
		  "<tbody>" +
		  "<tr>" +
                  "    <td class='border border-dark w-50 text-center'><strong>line/via</strong></td>" +
                  "    <td class='border border-dark w-50 text-center'><strong>offset</strong></td>" +
                  "</tr>" +
		  "<tr>" +
		  "    <td align='center'>" +
		  "    <div id='via_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           value='" + memory_cfg.cfg.via_size + "' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"via_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for line in cache" +
		  "    </td>" +
		  "    <td align='center'>" +
		  "    <div id='off_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           value='" + memory_cfg.cfg.off_size + "' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"off_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for byte inside line" +
		  "    </td>" +
                  "</tr>" +
                  "</tbody>" +
                  "</table>" +
		  "</div>" +
		  "</div>" +
		  "" +
	          "<div class='row'>" +
		  "<div class='col p-2 ms-2'>" +
                  "<form>" +
                  "  <div class='row mb-3'>" +
                  "    <label for='su_pol_" + index + "_" + this.name_str + "' " +
                  "           class='col-3 col-form-label'>Split/unified</label>" +
                  "    <div class='col'>" +
		  "    <select class='form-select form-control' " +
		  "            id='su_pol_" + index + "_" + this.name_str + "' " +
		  "            onchange='wepsim_cm_update_cfg(" + index + ", \"su_pol\", this.value);'" +
		  "            aria-label='Replace policy'>" +
		  "      <option value='unify' selected>Unified</option>" +
		  "      <option value='split_i'>Split (instruction)</option>" +
		  "      <option value='split_d'>Split (data)</option>" +
		  "    </select>" +
                  "    </div>" +
                  "  </div>" +
                  "  " +
                  "  <div class='row mb-3'>" +
                  "    <label for='replace_pol_" + index + "_" + this.name_str + "' " +
                  "           class='col-3 col-form-label'>Replace policy</label>" +
                  "    <div class='col'>" +
		  "    <select class='form-select' " +
		  "            id='replace_pol_" + index + "_" + this.name_str + "' " +
		  "            onchange='wepsim_cm_update_cfg(" + index + ", \"replace_pol\", this.value);'" +
		  "            aria-label='Replace policy'>" +
		  "      <option value='lfu' selected>LFU</option>" +
		  "      <option value='fifo'>FIFO</option>" +
		  "    </select>" +
                  "    </div>" +
                  "  </div>" +
                  "  " +
                  "  <div class='row mb-3'>" +
                  "    <label for='replace_cpp_" + index + "_" + this.name_str + "' " +
                  "           class='col-3 col-form-label'>Cache placement policy</label>" +
                  "    <div class='col'>" +
		  "    <select class='form-select' " +
		  "            id='replace_cpp_" + index + "_" + this.name_str + "' " +
		  "            onchange='wepsim_cm_update_placement(" + index + ", this.value);'" +
		  "            aria-label='Cache placement policy'>" +
		  "      <option value='fa' selected>Fully associative</option>" +
		  "      <option value='sa'         >Set-associative</option>" +
		  "      <option value='dm'         >Direct-mapped</option>" +
		  "    </select>" +
		  "    " +
                  "<div class='accordion-group'>" +
                  "    <div class='collapse show' id='cpp_fa'>" +
	          "      <table class='table table-hover table-sm table-bordered m-0'>" +
		  "      <tbody>" +
		  "      <tr>" +
		  "          <td align='center' class='border border-dark w-50'>tag</td>" +
		  "          <td align='center' class='border border-dark w-50'>offset</td>" +
		  "      </tr>" +
		  "      </tbody>" +
		  "      </table>" +
                  "    </div>" +
                  "    <div class='collapse' id='cpp_sa'>" +
	          "      <table class='table table-hover table-sm table-bordered m-0'>" +
		  "      <tbody>" +
		  "      <tr>" +
		  "          <td align='center' class='border border-dark w-25'>tag</td>" +
		  "          <td align='center' class='border border-dark w-25'><strong>set</strong></td>" +
		  "          <td align='center' class='border border-dark w-50'>offset</td>" +
		  "      </tr>" +
		  "      <tr>" +
		  "          <td align='center' colspan='3'>" +
                  "          <input type='range' class='form-range pt-1' min='0' max='5' id='cmcfg_range' " +
                  "             onchange='wepsim_cm_update_cfg(" + index + ", \"set_size\", parseInt(this.value));'>" +
                  "          <label for='cmcfg_range' class='form-label my-0 pt-2 pb-0'># bits for set in cache &nbsp;(0: full-assoc., max:direct)</label>" +
		  "          </td>" +
		  "      </tr>" +
		  "      </tbody>" +
		  "      </table>" +
                  "    </div>" +
                  "    <div class='collapse' id='cpp_dm'>" +
	          "      <table class='table table-hover table-sm table-bordered m-0'>" +
		  "      <tbody>" +
		  "      <tr>" +
		  "          <td align='center' class='border border-dark w-25'>tag</td>" +
		  "          <td align='center' class='border border-dark w-25'>index</td>" +
		  "          <td align='center' class='border border-dark w-50'>offset</td>" +
		  "      </tr>" +
		  "      </tbody>" +
		  "      </table>" +
                  "    </div>" +
                  "</div>" +
                  "    " +
                  "    </div>" +
                  "  </div>" +
                  "</form>" +
		  "</div>" +
		  "</div>" ;

	   return o ;
        }

        function wepsim_show_cache_memory_cfg ( memory_cfg )
        {
	      var o = '' ;
	      var i = 0 ;
              var memory_cfg_zero = cache_memory_init(12, 5, 6, "fifo", "unified", null) ;

	         o += "<div class='container container-fluid'>" ;
	              "<div class='row'>" +
		      "<div class='col'>" ;
	      for (i=0; i<memory_cfg.length; i++) {
                 o += wepsim_show_cm_level_cfg(memory_cfg[i], i) ;
	      }
                 o += wepsim_show_cm_level_cfg(memory_cfg_zero, i) ; // add extra option to add a new cache-level
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
              if ( (('via_size' == field) || ('set_size' == field)) &&
                   (curr_cfg[index]['set_size'] > curr_cfg[index]['via_size']) ) {
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

        function wepsim_cm_update_placement ( index, value )
        {
              $("#cpp_fa").hide();
              $("#cpp_sa").hide();
              $("#cpp_dm").hide();

	      // Fully associative
              if ('fa' == value)
              {
                  wepsim_cm_update_cfg(index, "set_size", 0) ;
                  $("#cpp_fa").show();
              }

	      // Set-associative
              if ('sa' == value)
              {
                  wepsim_cm_update_cfg(index, "set_size", parseInt(this.value)) ;
                  $("#cpp_sa").show();
              }

	      // Direct-mapped
              if ('dm' == value)
              {
                  var curr_cfg = simhw_internalState('CM_cfg') ;
                  var curr_sz  = 0 ;
                  if (typeof curr_cfg[index] != "undefined") {
                      curr_sz  = parseInt(curr_cfg[index]['via_size']) ;
                  }

                  wepsim_cm_update_cfg(index, "set_size", curr_sz) ;
                  $("#cpp_dm").show();
              }
        }

