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
     * Voice control
     */

    function wepsim_voice_init ( )
    {
	 // check if voice is available...
         if (!annyang) {
	     return false ;
         }

	 // setup annyang + speechkitt...
         annyang.addCommands(ws_info.voice_commands);
         annyang.addCallback('errorNetwork',
                             function () {
	                         annyang.abort() ;
                                 alert('Sorry but some network connection is needed in order to use the voice recognition engine.');
                             });

         // setting up SpeachKITT...
         SpeechKITT.annyang();
         SpeechKITT.setStylesheet('external/speechkitt/themes/flat.css');
         SpeechKITT.setInstructionsText('What can I help you with? (list)');
         SpeechKITT.vroom();

	 return true ;
    }

    function wepsim_voice_start ( )
    {
	 // check if voice is available...
         if (!annyang) {
              wepsim_notify_error('<h4>Warning:<br/>' + 'annyang not available' + '</h4>',
                                  'Voice support is not available in this platform.') ;
	     return false ;
         }

	 //annyang.resume() ;
         SpeechKITT.show();
	 return true ;
    }

    function wepsim_voice_stop ( )
    {
	 // check if voice is available...
         if (!annyang) {
	     return false ;
         }

         SpeechKITT.hide();
	 //annyang.pause() ;
	 return true ;
    }

