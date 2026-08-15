/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
         *  Get/Set value
         */

        export function is_instanceof_vuex_store ( obj_val )
        {
           if (typeof Vuex != "undefined")
           {
               if (obj_val instanceof Vuex.Store)
               {
	           return true ;
               }
           }

           return false ;
        }

        export function get_value ( sim_obj )
        {
           // get value with vue
           if (is_instanceof_vuex_store(sim_obj.value))
           {
	       return sim_obj.value.state.value ;
           }

           // get value
	   return sim_obj.value ;
        }

        export function set_value ( sim_obj, value )
        {
           // set value with vue
           if (is_instanceof_vuex_store(sim_obj.value))
           {
	       sim_obj.value.commit('set_value', value) ;
               return ;
           }

           // set value
	   if (sim_obj.value != value)
	   {
	       sim_obj.value   = value ;
	       sim_obj.changed = true ;
           }
        }

        export function reset_value ( sim_obj )
        {
           // reset value with vue
           if (is_instanceof_vuex_store(sim_obj.value))
           {
	        set_value(sim_obj, sim_obj.default_value) ;
                return ;
           }

           // reset object value (e.g.: REG_MICROINS)
	   if (typeof sim_obj.default_value == "object")
	   {
	        sim_obj.changed = true ;
	        sim_obj.value = Object.create(sim_obj.default_value) ;
                return ;
           }

           // reset array (e.g.: BR)
	   if (sim_obj instanceof Array)
	   {
	        sim_obj.changed = true ;
	        for (var i=0; i<sim_obj.length; i++) {
	  	     set_value(sim_obj[i], sim_obj[i].default_value) ;
                }
                return ;
           }

           // reset value
	   var old_value = sim_obj.value ;
	   set_value(sim_obj, sim_obj.default_value) ;
	   if (old_value != sim_obj.default_value) {
	       sim_obj.changed = true ;
           }
        }

        export function update_value ( sim_obj )
        {
           // forceUpdate value with vue
           if (is_instanceof_vuex_store(sim_obj.value))
           {
	       sim_obj.value.commit('inc_updates') ;
               return ;
           }

           // forceUpdate value with vue
	   sim_obj.changed = true ;
        }


        /*
         *  Get/Set variable
         */

        export function get_var ( sim_var )
        {
           // get value with vue
           if (is_instanceof_vuex_store(sim_var))
	   {
	       return sim_var.state.value ;
	   }

           // get value
	   return sim_var.value ;
        }

        export function set_var ( sim_var, value )
        {
           // set value with vue
           if (is_instanceof_vuex_store(sim_var))
	   {
	       sim_var.commit('set_value', value) ;
               return ;
           }

           // set value
	   sim_var.value = value ;
        }


        /*
         *  value toString
         */

        export function value_toString ( elto_v )
        {
              if (typeof elto_v == 'undefined') {
                  return '-' ;
              }

              if (is_instanceof_vuex_store(elto_v)) {
                  elto_v = elto_v.state.value ;
              }

              if (typeof elto_v == 'object') {
                  return 'object' ;
              }

              elto_v = '0x' + elto_v.toString(16) ;
              return elto_v ;
        }


        /*
         *  vue binding
         */

        export function vue_observable ( initial_value )
        {
	    // without Vuex
	    if (typeof Vuex === "undefined") {
	        return Vuex ;
	    }

	    // with Vuex
	    return new Vuex.Store({
				      state: {
				          value:   initial_value,
				          updates: 0
				      },
				      mutations: {
				          set_value ( state, newValue ) {
				 	     state.value = newValue ;
				          },
				          set_value_at ( state, index, newValue ) {
				 	     state.value[index] = newValue ;
				          },
				          inc_updates ( state ) {
				 	     state.updates++ ;
				          }
				      }
				  }) ;
        }

        export function vue_observable_ifnotjetdone ( element )
        {
	    // without Vuex
	    if (typeof Vuex === "undefined") {
	        return Vuex ;
	    }

            // vue_observable if not done before
            if (is_instanceof_vuex_store(element) == false) {
                element = vue_observable(element.value) ;
            }

            return element ;
        }

        export function vue_applyBinding ( r_value, vue_context, f_computed_value )
        {
	    // without Vue
	    if (typeof Vue === "undefined") {
                return Vue ;
            }

	    // with Vue
	    return new Vue({
				el:    vue_context,
				store: r_value,
				computed: {
				    value: {
				        get () {
					   if (typeof this.$store.state == "undefined")
                                               return 0 ;
					   return this.$store.state.value ;
				        },
				        set (newValue) {
					   this.$store.commit('set_value', newValue) ;
				        }
				    },
				    computed_value () {
     					this.$store.state.updates ;
     					return f_computed_value(this.$store.state.value, vue_context) ;
				    }
				},
				methods: {
				    set_value ( newValue ) {
					this.$store.commit('set_value', newValue) ;
				    },
				    set_value_at ( index, newValue ) {
                                        // Vue.set(this, index, newValue) ;
					this.$store.commit('set_value_at', index, newValue) ;
				    },
				    inc_updates () {
					this.$store.commit('inc_updates') ;
				    }
				}
			   }) ;
        }

        export function vue_rebind_state ( ref_obj, id_elto, f_computed_value )
        {
	    // without Vue
	    if (typeof Vue === "undefined") {
                return Vue ;
            }

	    // with Vue
            if (is_instanceof_vuex_store(ref_obj.value) == false) {
		ref_obj.value = vue_observable(ref_obj.value) ;
	    }

            if (typeof f_computed_value === "undefined") {
                f_computed_value = function(value){ return value; } ;
	    }

	    vue_applyBinding(ref_obj.value, id_elto, f_computed_value) ;
        }

