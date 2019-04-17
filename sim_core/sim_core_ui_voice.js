/*     
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	 *  Voice (speak)
	 */

        function simcoreui_voice_canSpeak ( )
        {
    	    if (typeof window.speechSynthesis == "undefined") {
                return false ;
            }

            if (false == get_cfg('use_voice')) {
                return false ;
            }

            return true ;
        }

        function simcoreui_voice_speak ( msg )
        {
	    var ssu = null ;

    	    if (simcoreui_voice_canSpeak())
	    {
	         ssu = new SpeechSynthesisUtterance(msg) ;

	         ssu.lang = 'es-ES' ;
                 if ('en' == get_cfg('ws_idiom'))
		      ssu.lang = 'en-US' ;
                 if ('es' == get_cfg('ws_idiom'))
		      ssu.lang = 'es-EN' ;

	         window.speechSynthesis.speak(ssu) ;
	    }
        }

        function simcoreui_voice_stopSpeak ( )
        {
    	    if (simcoreui_voice_canSpeak())
	    {
	         window.speechSynthesis.cancel() ;
	    }
        }

        // voice information
	function get_verbal_from_current_mpc ( )
	{
	     var active_signals = "" ;
	     var active_verbal  = "" ;

	     var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	     var mins       = get_value(simhw_sim_state(maddr_name)) ;
	     for (var key in mins) 
	     {
		  active_signals = active_signals + key + " ";
	   	  active_verbal  = active_verbal  + compute_signal_verbals(key, mins[key]) ;
	     }

             return "Activated signals are: " + active_signals.trim() + ". Associated actions are: " + active_verbal ;
        }

	function get_verbal_from_current_pc ( )
	{
	     var pc_name = simhw_sim_ctrlStates_get().pc.state ;
	     var reg_pc  = get_value(simhw_sim_state(pc_name)) ;

             var pc = parseInt(reg_pc) - 4 ;
             var decins = get_deco_from_pc(pc) ;

	     if ("" == decins.trim()) {
		 decins = "not jet defined" ;
	     }

             return "Current instruction is: " + decins + " and PC points to " + show_value(pc) + ". " ;
        }

