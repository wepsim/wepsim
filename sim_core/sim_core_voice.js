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
	 *  Voice (speak)
	 */

        function simcore_voice_canSpeak ( )
        {
    	    if (typeof window.speechSynthesis == "undefined") {
                return false ;
            }

            if (false === get_cfg('use_voice')) {
                return false ;
            }

            return true ;
        }

        function simcore_voice_speak ( msg )
        {
	    var ssu = null ;

    	    if (simcore_voice_canSpeak())
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

        function simcore_voice_stopSpeak ( )
        {
    	    if (simcore_voice_canSpeak())
	    {
	         window.speechSynthesis.cancel() ;
	    }
        }

