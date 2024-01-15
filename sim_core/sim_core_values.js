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
         *  Get/Set value
         */

        function get_value ( sim_obj )
        {
           // get value with vue
           if (sim_obj.value instanceof Vuex.Store)
           {
	       return sim_obj.value.state.value ;
           }

           // get value
	   return sim_obj.value ;
        }

        function set_value ( sim_obj, value )
        {
           // set value with vue
           if (sim_obj.value instanceof Vuex.Store)
           {
	       sim_obj.value.commit('set_value', value) ;
               return ;
           }

           // set value
	   var old_value = sim_obj.value ;
	   sim_obj.value = value ;
	   if (old_value != value) {
	       sim_obj.changed = true ;
           }
        }

        function reset_value ( sim_obj )
        {
           // reset value with vue
           if (sim_obj.value instanceof Vuex.Store)
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

        function update_value ( sim_obj )
        {
           // forceUpdate value with vue
           if (sim_obj.value instanceof Vuex.Store)
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

        function get_var ( sim_var )
        {
           // get value with vue
           if (sim_var instanceof Vuex.Store)
	   {
	       return sim_var.state.value ;
	   }

           // get value
	   return sim_var ;
        }

        function set_var ( sim_var, value )
        {
           // set value with vue
           if (sim_var instanceof Vuex.Store)
	   {
	       sim_var.commit('set_value', value) ;
               return ;
           }

           // set value
	   sim_var = value ;
        }


        /*
         *  value toString
         */

        function value_toString ( elto_v )
        {
              if (typeof elto_v == 'undefined') {
                  return '-' ;
              }

              if (elto_v instanceof Vuex.Store) {
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

        function vue_observable ( initial_value )
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

        function vue_appyBinding ( r_value, vue_context, f_computed_value )
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
     					return f_computed_value(this.$store.state.value) ;
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

        function vue_rebind_state ( ref_obj, id_elto, f_computed_value )
        {
	    // without Vue
	    if (typeof Vue === "undefined") {
                return Vue ;
            }

	    // with Vue
	    if (false == (ref_obj.value instanceof Vuex.Store)) {
		ref_obj.value = vue_observable(ref_obj.value) ;
	    }

            if (typeof f_computed_value === "undefined") {
                f_computed_value = function(value){ return value; } ;
	    }

	    vue_appyBinding(ref_obj.value, id_elto, f_computed_value) ;
        }

