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

                    // default content
                    var curr_cfg = simhw_internalState('CM_cfg') ;
                    if (typeof curr_cfg == "undefined") {
                        $(div_hash).html('') ;
                        return ;
                    }

		    // html holder
		    var o1 = this.render_populate_as_table(curr_cfg) ;
                    $(div_hash).html(o1) ;

		    // vue binding
                    for (var i=0; i<curr_cfg.length; i++)
                    {
                         if (false == (curr_cfg[i].tag_size instanceof Vuex.Store)) {
                             curr_cfg[i].tag_size = vue_observable(curr_cfg[i].tag_size) ;
                         }
                         if (false == (curr_cfg[i].set_size instanceof Vuex.Store)) {
                             curr_cfg[i].set_size = vue_observable(curr_cfg[i].set_size) ;
                         }
                         if (false == (curr_cfg[i].off_size instanceof Vuex.Store)) {
                             curr_cfg[i].off_size = vue_observable(curr_cfg[i].off_size) ;
                         }
                         if (false == (curr_cfg[i].replace_pol instanceof Vuex.Store)) {
                             curr_cfg[i].replace_pol = vue_observable(curr_cfg[i].replace_pol) ;
                         }

                         vue_appyBinding(curr_cfg[i].tag_size,
                                         '#tag_size_'+i+'_'+this.name_str,
                                         function(value) { return value; }) ;
                         vue_appyBinding(curr_cfg[i].set_size,
                                         '#set_size_'+i+'_'+this.name_str,
                                         function(value) { return value; }) ;
                         vue_appyBinding(curr_cfg[i].off_size,
                                         '#off_size_'+i+'_'+this.name_str,
                                         function(value) { return value; }) ;
                         vue_appyBinding(curr_cfg[i].replace_pol,
                                         '#replace_pol_'+i+'_'+this.name_str,
                                         function(value) { return value; }) ;
                    }

                    simhw_internalState_reset('CM_cfg', curr_cfg) ;
	      }

	      render_populate_as_table ( curr_cfg )
	      {
		     var o = '' ;

		     o += "<div class='container container-fluid'>" +
			  "<div class='row'>" +
		          "<div class='col p-2'>" ;

                   for (var i=0; i<curr_cfg.length; i++)
                   {
		     o += "<table class='table table-hover table-sm table-bordered m-0'>" +
			  "<tbody>" +
			  "<tr><td align=center'>Cache active</td>" +
			  "    <td align=center'>" +
			  "<div id='cm_on_" + i + "_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value' min='0' max='1'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Tag size</td>" +
			  "    <td align=center'>" +
			  "<div id='tag_size_" + i + "_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value' min='0' max='32'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Set size</td>" +
			  "    <td align=center'>" +
			  "<div id='set_size_" + i + "_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value' min='0' max='32'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Offset size</td>" +
			  "    <td align=center'>" +
			  "<div id='off_size_" + i + "_" + this.name_str + "'>" +
			  "<input type='number' v-model.lazy='value' min='0' max='32'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "<tr><td align=center'>Replace policy</td>" +
			  "    <td align=center'>" +
			  "<div id='replace_pol_" + i + "_" + this.name_str + "'>" +
			  "<input type='text' v-model.lazy='value'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "</tbody>" +
			  "</table>" ;
                   }

		     o += "</div>" +
			  "</div>" +
			  "<div class='row'>" +
		          "<div class='col p-2'>" +
			  "<button class='btn btn-info' onclick='wepsim_apply_cacheconfig();'>Apply</button>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;

		     return o ;
              }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cache-config', ws_cache_config) ;
        }


        /*
         *  Cache config UI
         */

        function wepsim_apply_cacheconfig ( )
        {
              var curr_cfg = simhw_internalState('CM_cfg') ;
              var curr_cm  = cache_memory_init2(curr_cfg[0], null) ;
              simhw_internalState_reset('CM', curr_cm) ;
        }

