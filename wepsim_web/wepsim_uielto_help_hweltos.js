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
         *  Help on hardware elements
         */

        /* jshint esversion: 6 */
        class ws_help_hweltos extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();

		    this.info_icons = {} ;
		    this.info_icons['Inputs']  = '<i class="fas fa-sign-in-alt"></i>' ;
		    this.info_icons['Outputs'] = '<i class="fas fa-sign-out-alt"></i>' ;
		    this.info_icons['Signals'] = '<i class="fas fa-wave-square"></i>' ;
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
                    var o1 = '' ;
                    var id_search = this.name_str + '_hwe_input1' ;
                    var id_list   = this.name_str + '_hwe_list1' ;

                    // build HTML
		    o1 += '<div class="container">' +
			  '<div class="row justify-content-center w-100 my-2 mx-0 sticky-top bg-body">' +
			  '<input id="' + id_search + '" ' +
			  '       onkeyup="var value=$(this).val().toLowerCase();' +
			  '	             $(\'.table2 td\').filter(function() {' +
			  '	               $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)' +
			  '	             });"' +
			  '       class="form-control my-2" type="text" placeholder="Search...">' +
			  '</div>' +
			  '<div class="row justify-content-center" id="' + id_list + '"></div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

              describe_element ( elto_path, array_eltos, hash_eltos, enum_name )
              {
                    var o = '<tr>' +
                            '<td>' + this.info_icons[enum_name] + '</td>' +
                            '<td>' + enum_name + ': ' + array_eltos.length + '</td>' +
                            '<td>' +
	                    simhwelto_describe_component_enum_aux(elto_path, array_eltos,
								  hash_eltos, enum_name, ',<br>') +
                            '</td>' +
                            '</tr>' ;

                    return o ;
              }

	      render_populate ( )
	      {
                    var id_search = this.name_str + '_hwe_input1' ;
                    var id_list   = this.name_str + '_hwe_list1' ;

                    // if no active hardware -> empty
                    var ahw = simhw_active() ;
                    if (ahw === null)
                    {
                        $('#' + id_list).html("Sorry, no hardware available.") ;
                        return ;
                    }

		    // prepare hash (if not done before)
		    if (typeof ahw.elements_hash == "undefined") {
			simhwelto_prepare_hash(ahw) ;
	            }

		    // html holder
		    var o1 = '' ;
                    var elto_path = '' ;
                    var grid = 'col-md-12 col-lg-6 col-xxl-4' ;
                    if (this.layout == "offcanvas") {
                        grid = 'col-xs-12 w-100' ;
                    }

		    for (var b in ahw.elements_hash.by_belong)
		    {
			 for (var j=0; j<ahw.elements_hash.by_belong[b].length; j++)
			 {
			      elto = ahw.elements_hash.by_belong[b][j] ;
                         elto_path = ahw.sim_short_name + ':' + elto.key ;

			      o1 += '<div class="' + grid + ' d-flex my-2 table-responsive">' +
			 	    '<table class="table table-striped table-bordered table-hover table-sm table2">' +
				    '<thead class="thead-dark"><tr>' +
				    '<th colspan="3">' + b + ' / ' + elto.description + '</th>' +
				    '</tr></thead>' +
				    '<tbody>' +
  	                            this.describe_element(elto_path + ':states:',
                                                          elto.states_inputs,  elto.states,  'Inputs') +
                                    this.describe_element(elto_path + ':states:',
				                          elto.states_outputs, elto.states,  'Outputs') +
                                    this.describe_element(elto_path + ':signals:',
                                                          elto.signals_inputs, elto.signals, 'Signals') +
				    '</tbody>' +
				    '</table>' +
				    '</div>' ;
			 }
		    }

                    // load HTML
                    $('#' + id_list).html(o1) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-help-hweltos', ws_help_hweltos) ;
        }

