/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
                    var div_id    = 'config_CACHE_sel' ;
                    var style_dim = "height:58vh; width:inherit; " ;
                    var style_ovf = "overflow:auto; -webkit-overflow-scrolling:touch; " ;

                    // default content
                    this.innerHTML = '<div id="'    + div_id    + '" ' +
                                     '     style="' + style_dim + style_ovf + '">' +
                                     '</div>' ;
              }

	      render_populate ( )
	      {
                    var div_hash = '#config_CACHE_sel' ;

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
                    var o1 = wepsim_show_cache_memory_cfg(div_hash, curr_cfg) ;
                    $(div_hash).html(o1) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cache-config', ws_cache_config) ;
        }


        /*
         *  Cache config UI
         */

        function wepsim_show_cm_level_cfg_bits ( memory_cfg, index )
        {
          var memory_cfg_i = memory_cfg[index] ;

	  var o = "" +
	          "<table class='table table-hover table-sm table-bordered m-0'>" +
		  "<tbody>" +
		  "<tr>" +
                  "    <td class='border border-dark w-50 text-center'><strong>line/via</strong></td>" +
                  "    <td class='border border-dark w-50 text-center'><strong>offset</strong></td>" +
                  "</tr>" +
		  "<tr>" +
		  "    <td align='center' class='border border-2 border-tertiary'>" +
		  "    <div id='via_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           value='" + memory_cfg_i.cfg.via_size + "' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"via_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for line in cache" +
		  "    </td>" +
		  "    <td align='center' class='border border-2 border-tertiary'>" +
		  "    <div id='off_size_" + index + "_" + this.name_str + "'>" +
		  "    <input type='number' " +
		  "           value='" + memory_cfg_i.cfg.off_size + "' " +
		  "           onchange='wepsim_cm_update_cfg(" + index + ", \"off_size\", parseInt(this.value));' " +
		  "           min='0' max='32'>" +
		  "    </div>" +
                  "    # bits for byte inside line" +
		  "    </td>" +
                  "</tr>" +
                  "</tbody>" +
                  "</table>" ;

	   return o ;
        }

        function wepsim_show_cm_level_cfg_splitunify ( memory_cfg, index )
        {
	  var o = "  <div class='row mb-3'>" +
                  "    <label for='su_pol_" + index + "_" + this.name_str + "' " +
                  "           class='col-xs-12 col-md-4 col-form-label' " +
                  "    ><span data-langkey='Split/unified'>Split/unified</span></label>" +
                  "    <div class='col-xs-12 col-md-8'>" +
		  "    <select class='form-select form-control' " +
		  "            id='su_pol_" + index + "_" + this.name_str + "' " +
		  "            onchange='wepsim_cm_update_cfg(" + index + ", \"su_pol\", this.value);'" +
		  "            aria-label='Replace policy'>" +
		  "      <option value='unify' selected>Unified</option>" +
		  "      <option value='split_i'>Split (instruction)</option>" +
		  "      <option value='split_d'>Split (data)</option>" +
		  "    </select>" +
                  "    </div>" +
                  "  </div>" ;

	   return o ;
        }

        function wepsim_show_cm_level_cfg_replacepol ( memory_cfg, index )
        {
	  var o = "  <div class='row mb-3'>" +
                  "    <label for='replace_pol_" + index + "_" + this.name_str + "' " +
                  "           class='col-xs-12 col-md-4 col-form-label' " +
                  "    ><span data-langkey='Replace policy'>Replace policy</span></label>" +
                  "    <div class='col-xs-12 col-md-8'>" +
		  "    <select class='form-select' " +
		  "            id='replace_pol_" + index + "_" + this.name_str + "' " +
		  "            onchange='wepsim_cm_update_cfg(" + index + ", \"replace_pol\", this.value);'" +
		  "            aria-label='Replace policy'>" +
		  "      <option value='lfu' selected>LFU</option>" +
		  "      <option value='fifo'>FIFO</option>" +
		  "    </select>" +
                  "    </div>" +
                  "  </div>" ;

	   return o ;
        }

        function wepsim_show_cm_level_cfg_placepol ( memory_cfg, index )
        {
	  var o = "  <div class='row mb-3'>" +
                  "    <label for='replace_cpp_" + index + "_" + this.name_str + "' " +
                  "           class='col-xs-12 col-md-4 col-form-label'" +
                  "    ><span data-langkey='Cache placement policy'>Cache placement policy</span></label>" +
                  "    <div class='col-xs-12 col-md-8'>" +
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
                  "  </div>" ;

	   return o ;
        }

        function wepsim_show_cm_level_cfg_nextcm ( memory_cfg, index )
        {
	  var o = "<div class='row mb-3'>" +
                  "  <label for='su_pol_" + index + "_" + this.name_str + "' " +
                  "         class='col-xs-12 col-md-4 col-form-label' " +
                  "  ><span data-langkey='Next Cache'>Next Cache</span></label>" +
                  "  <div class='col-xs-12 col-md-8'>" +
		  "  <select class='form-select form-control' " +
		  "          id='su_next_" + index + "_" + this.name_str + "' " +
		  "          onchange='wepsim_cm_update_cfg(" + index + ", \"next_cache\", this.value);'" +
		  "          aria-label='Next Cache'>" ;

                  o += "<option value='None'>None</option>" ;
             for (var i=index+1; i<memory_cfg.length; i++) {
                  o += "<option value='"+i+"'>"+i+"</option>" ;
             }

	     o += "  </select>" +
                  "  </div>" +
                  "</div>" ;

	   return o ;
        }

        function wepsim_show_cm_level_cfg ( div_hash, memory_cfg, index )
        {
	     var o = '' ;

	     o += "<div class='row mb-2'>" +
		  "<div class='col-auto px-2 pt-2 pb-0'>" +
		  "<h5>Cache-" + (index+1) + "</h5>" +
		  "</div>" +
		  "<div class='col-auto px-2 pt-2 pb-0'>" +
		  "<span class='btn btn-sm btn-warning text-white py-0' " +
                  "      onclick='wepsim_cm_rm_cachelevel(\""+div_hash+"\","+index+");'>Remove</span>" +
		  "</div>" +
		  "</div>" +
		  "" +
	          "<div class='row ms-1'>" +
		  "<div class='col p-2'>" +
                  wepsim_show_cm_level_cfg_bits(memory_cfg, index) +
		  "</div>" +
		  "</div>" +
		  "" +
	          "<div class='row ms-1'>" +
                  "<form class='col'>" +
                  wepsim_show_cm_level_cfg_placepol  (memory_cfg, index) +
                  wepsim_show_cm_level_cfg_splitunify(memory_cfg, index) +
                  wepsim_show_cm_level_cfg_replacepol(memory_cfg, index) +
                  wepsim_show_cm_level_cfg_nextcm    (memory_cfg, index) +
                  "</form>" +
		  "</div>" ;

	   return o ;
        }

        function wepsim_show_cache_memory_cfg ( div_hash, memory_cfg )
        {
	    var o = '' ;
	    var i = 0 ;

	    o = '<h5><span data-langkey="Processor">Processor</span></h5>' +
	        '<div class="vr" style="width:3px"></div>' ;
	    for (i=0; i<memory_cfg.length; i++) {
                 o += wepsim_show_cm_level_cfg(div_hash, memory_cfg, i) ;
	    }

	    o = "<div class='container container-fluid'>" +
	        "<div class='row'>" +
		"<div class='col'>" + o + "</div>" +
		"</div>" +
		"<div class='row mt-2'>" +
		"<div class='col'>" +
		"<span class='btn btn-sm btn-success text-white py-0' " +
                "      onclick='wepsim_cm_add_cachelevel(\""+div_hash+"\","+i+");'>Add new</span>" +
		"</div>" +
		"</div>" +
		"</div>" ;

	     return o ;
        }

        function wepsim_cm_add_cachelevel ( div_hash, level )
        {
              var  curr_cm = simhw_internalState('CM') ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              // check arguments
              if (level < 0) {
                  return ;
              }
              if (typeof curr_cfg == "undefined") {
                  return ;
              }

              // update cm_cfg and cm
              curr_cfg[level] = cache_memory_init(level, 12, 5, 6, "fifo", "unified", -1) ;
	       curr_cm[level] = cache_memory_init2(curr_cfg[level].cfg) ;
	       curr_cm[level].cfg.next_cache = null ;

	      simhw_internalState_reset('CM_cfg', curr_cfg) ;
	      simhw_internalState_reset('CM',     curr_cm) ;

              // show new cache list
              var o1 = wepsim_show_cache_memory_cfg(div_hash, curr_cfg) ;
              $(div_hash).html(o1) ;
        }

        function wepsim_cm_rm_cachelevel ( div_hash, level )
        {
              var  curr_cm = simhw_internalState('CM') ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              // check arguments
              if (level < 0) {
                  return ;
              }
              if (typeof curr_cfg == "undefined") {
                  return ;
              }

              // update cm_cfg and cm
              curr_cfg.splice(level, 1) ;
               curr_cm.splice(level, 1) ;
	      simhw_internalState_reset('CM_cfg', curr_cfg) ;
	      simhw_internalState_reset('CM',     curr_cm) ;

              // show new cache list
              var o1 = wepsim_show_cache_memory_cfg(div_hash, curr_cfg) ;
              $(div_hash).html(o1) ;
        }

        function wepsim_cm_update_cfg ( index, field, value )
        {
              var curr_cm  = simhw_internalState('CM') ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              if (0 == curr_cfg.length) {
                  return ;
              }
              if ( (('via_size' == field) || ('set_size' == field)) &&
                   (curr_cfg[index].cfg['set_size'] > curr_cfg[index].cfg['via_size']) ) {
                    return ;
              }
              if ('via_size' == field) {
                  document.getElementById("cmcfg_range").max = value ;
              }

              curr_cfg[index].cfg[field] = value ;
               curr_cm[index] = cache_memory_init2(curr_cfg[index].cfg) ;
              if ('next_cache' == field) {
                  value = ('None' == value) ? null : curr_cm[value] ;
                  curr_cm[index].cfg.next_cache = value ;
              }

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
                  if ( (typeof curr_cfg != "undefined") &&
                       (typeof curr_cfg[index] != "undefined") )
                  {
                      curr_sz  = parseInt(curr_cfg[index].cfg['via_size']) ;
                  }

                  wepsim_cm_update_cfg(index, "set_size", curr_sz) ;
                  $("#cpp_dm").show();
              }
        }

