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
                    var div_hash = 'config_CACHE_' + this.name_str ;

                    // default content
                    this.innerHTML = '<div id="' + div_hash + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
                    var div_hash = '#config_CACHE_' + this.name_str ;

		    // if no active hardware -> empty
		    if (simhw_active() === null) {
                        $(div_hash).html('') ;
			return ;
		    }

		    // html holder
		    var o1 = this.render_populate_as_table() ;
                    $(div_hash).html(o1) ;

		    // vue binding
                    var curr_cfg = {
                        tag_size:    { value: vue_observable(22) },
                        set_size:    { value: vue_observable(5) },
                        off_size:    { value: vue_observable(5) },
                        replace_pol: { value: vue_observable("first") }
                    } ;
		    simhw_internalState_reset('CM_cfg', curr_cfg) ;

                    var f1 = function(value) {
                                var cm_cfg = simhw_internalState('CM_cfg') ;
                                cache_memory_init2(cm_cfg, null); // TODO: init2 -> update_cfg(...no null)
                                return value;
                             } ;
		    vue_appyBinding(curr_cfg.tag_size.value,    '#tag_size_' + this.name_str, f1) ;
		    vue_appyBinding(curr_cfg.set_size.value,    '#set_size_' + this.name_str, f1) ;
		    vue_appyBinding(curr_cfg.off_size.value,    '#off_size_' + this.name_str, f1) ;
		    vue_appyBinding(curr_cfg.replace_pol.value, '#replace_pol_' + this.name_str, f1) ;

                    var curr_on = { value: vue_observable(0) } ;
		    simhw_internalState_reset('CM_on', curr_on) ;
		    vue_appyBinding(curr_on.value, '#cm_on_' + this.name_str, f1) ;
	      }

	      render_populate_as_table ( )
	      {
		   return "<div class='container container-fluid'>" +
			  "<div class='row'>" +
		          "<div class='col p-2'>" +
			  "<table class='table table-hover table-sm table-bordered m-0'>" +
			  "<tbody>" +
			  "<tr><td align=center'>Cache active</td>" +
			  "    <td align=center'>" +
			  "<div id='cm_on_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Tag size</td>" +
			  "    <td align=center'>" +
			  "<div id='tag_size_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Set size</td>" +
			  "    <td align=center'>" +
			  "<div id='set_size_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Offset size</td>" +
			  "    <td align=center'>" +
			  "<div id='off_size_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Replace policy</td>" +
			  "    <td align=center'>" +
			  "<div id='replace_pol_" + this.name_str + "'>" +
			  "<input type='text' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "</tbody>" +
			  "</table>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;
              }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cache-config', ws_cache_config) ;
        }

