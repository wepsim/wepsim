/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Execution toolbar
         */

        /* jshint esversion: 6 */
        class ws_executionbar extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( )
	      {
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                    this.innerHTML = '' ;
	      }

	      render_populate ( )
	      {
                    // render toolbar elements
                    var o1 = '' ;
                    for (var i=0; i<this.components_arr.length; i++)
                    {
                         var name = this.components_arr[i] ;
                         o1 += this.render_btns(name) ;
                    }

                    this.innerHTML = o1 ;
	      }

	      render_btns ( name )
	      {
                    var o = '' ;
		    var o_style = 'style="background-color:#CCCCCC; border-color:white; border-width:1 1 1 1px;"' ;

                    // load html
                    switch (name)
                    {
                       case "btn_reset":
			     o += '<button id="btn_reset_' + this.name_str + '" ' + o_style +
				  '        class="btn btn-light col  pb-1 px-1 mr-1"' +
				  '        onclick="wsweb_execution_reset();' +
				  '                 return false;">' ;
                             o += (this.icons_str == 'no') ? ''     : '<em class="fa fa-power-off"></em>' ;
                             o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;
			     o += '<span class="font-weight-bold" data-langkey="Reset">Reset</span>' +
				  '</button>' ;
                                  break ;

                       case "btn_emins":
			     o += '<button id="btn_next_microinstruction_' + this.name_str + '"' + o_style +
		                  '        class="btn btn-light col user_microcode  pb-1 px-1 mr-1"' +
			          '        onclick="wsweb_execution_microinstruction();' +
                                  '                 return false;">' ;
                             o += (this.icons_str == 'no') ? ""     : '<em class="fa fa-step-forward"></em>' ;
                             o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;
                             o += '<span class="d-none d-sm-inline-flex font-weight-bold" data-langkey="microInstruction">&#181;Instruction</span><span class="d-sm-none font-weight-bold">&#181;Instr.</span>' +
                                  '</button>' ;
                                  break ;

                       case "btn_eins":
			     o += '<button id="btn_next_instruction_' + this.name_str + '"' + o_style +
		                  '        class="btn btn-light col  pb-1 px-1 mr-1"' +
			          '        onclick="wsweb_execution_instruction();' +
                                  '                 return false;">' ;
                             o += (this.icons_str == 'no') ? ""     : '<em class="fa fa-fast-forward"></em>' ;
                             o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;
                             o += '<span class="d-none d-sm-inline-flex font-weight-bold" data-langkey="Instruction">Instruction</span><span class="d-sm-none font-weight-bold">Instr.</span>' +
                                  '</button>' ;
                                  break ;

                       case "btn_run":
			     o += '<button id="btn_run_stop_' + this.name_str + '"' + o_style +
		                  '        class="btn btn-light col  pb-1 px-1 mr-1"' +
                                  '        onclick="wsweb_execution_run();' +
                                  '                 return false;">' ;
                             o += (this.icons_str == 'no') ? ""     : '<em class="fa fa-play"></em>' ;
                             o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;
                             o += '<span class="font-weight-bold" data-langkey="Run">Run</span>' +
                                  '</button>' ;
                                  break ;
                    }

                    return o ;
	      }
        }

        register_uielto('ws-executionbar', ws_executionbar) ;


        /*
         *  Play/Stop button
         */

        var webui_start_button_color = 'rgb(51, 136, 204)' ;
        var  webui_stop_button_color = '#CCCCCC' ;

        function webui_button_set_stop ( name )
        {
	    var wsi     = get_cfg('ws_idiom') ;
            var run_tag = i18n_get('gui',wsi,'Run') ;

	    var o = "<b>" + run_tag + "</b>" ;
            if (this.icons_str !== 'no')
	        o = "<i class='fa fa-play'></i><br>" + o ;

	    $('#btn_run_stop_' + name).html(o) ;
	    $('#btn_run_stop_' + name).css("backgroundColor", webui_stop_button_color) ;
        }

        function webui_button_set_start ( name )
        {
	    var wsi      = get_cfg('ws_idiom') ;
            var stop_tag = i18n_get('gui',wsi,'Stop') ;

            var o = "<b>" + stop_tag + "</b>" ;
            if (this.icons_str !== 'no')
                o = "<i class='fa fa-stop'></i><br>" + o ;

	    $('#btn_run_stop_' + name).css("backgroundColor", webui_start_button_color) ;
	    $('#btn_run_stop_' + name).html(o) ;
        }


        /*
         *  Start/Stop
         */

        function webui_executionbar_start ( name )
        {
            var executionbar_stop = function() {
                                       return webui_executionbar_stop(name) ;
                                    } ;

            var ret = wepsim_execute_play(executionbar_stop) ;
            if (ret !== false) {
                webui_button_set_start(name) ;
            }

            return ret ;
        }

        function webui_executionbar_stop ( name )
        {
            var ret = wepsim_execute_stop() ;
            if (ret !== false) {
                webui_button_set_stop(name) ;
            }

            return ret ;
        }

        function webui_executionbar_toggle_play ( name )
        {
            var executionbar_stop = function() {
                                       return webui_executionbar_stop(name) ;
                                    } ;

            var ret = wepsim_execute_toggle_play(executionbar_stop) ;

            if (ret == true)
                 webui_button_set_stop(name) ;
            else webui_button_set_start(name) ;
        }

