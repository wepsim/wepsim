/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	 *  Sound (Tune.js)
	 */

        function simcore_sound_init ( )
        {
	    if (typeof window !== "undefined") {
                window.TONE_SILENCE_LOGGING = true;
	    }
        }

        function simcore_sound_canPlay ( )
        {
    	    if (typeof Tone.context == "undefined") {
                return false ;
            }

            return true ;
        }

        async function simcore_sound_playNote ( note_str, time_str )
        {
    	    if (simcore_sound_canPlay() == false) {
                return ;
	    }

            await Tone.start();
	    if (Tone.context.state !== 'running') {
	        Tone.context.resume() ;
	    }

	    synth1 = new Tone.Synth().toDestination() ;
	    synth1.triggerAttackRelease(note_str, time_str) ;
        }

