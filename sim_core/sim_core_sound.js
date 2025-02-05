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

        async function simcore_sound_start ( )
        {
    	    if (simcore_sound_canPlay() == false) {
                return false ;
	    }

	    try
	    {
                await Tone.start() ;
	        if (Tone.context.state !== 'running') {
	            Tone.context.resume() ;
	        }
	    }
	    catch (e)
	    {
                // console.log('ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber) ;
                return false ;
	    }

            return true ;
        }

        async function simcore_sound_stop ( )
        {
    	    if (simcore_sound_canPlay() == false) {
                return false ;
	    }

	    try
	    {
                await Tone.stop() ;
	    }
	    catch (e)
	    {
                // console.log('ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber) ;
                return false ;
	    }

            return true ;
        }

        async function simcore_sound_playNote ( note_str, time_str )
        {
    	    if (simcore_sound_canPlay() == false) {
                return false ;
	    }

            await Tone.start() ;
	    if (Tone.context.state !== 'running') {
	        Tone.context.resume() ;
	    }

	    try
	    {
	        if ("" == note_str) {
	            note_str = null ;
	        }

	        synth1 = new Tone.Synth().toDestination() ;
	        synth1.triggerAttackRelease(note_str, time_str) ;
	    }
	    catch (e)
	    {
                // console.log('ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber) ;
                return false ;
	    }

            return true ;
        }


        //
        // word <-> note
        //

        function simcore_sound_ascii2note ( word, bytesInWord )
        {
            var n = '' ;
            var b = 0 ;

            for (var i=0; i<bytesInWord; i++)
            {
                 b = word & 0xFF ;
                 word = word >> 8 ;
                 if (b != 0) {
                     n = n + String.fromCharCode(b) ;
                 }
            }

            return n.trim() ;
        }

        function simcore_sound_word2note ( word, bytesInWord )
        {
            var n = '' ;
            var b = 0 ;

            for (var i=0; i<bytesInWord; i++)
            {
                 b = word & 0xFF ;
                 word = word >> 8 ;
                 if (b != 0) {
                     n = String.fromCharCode(b) + n ;
                 }
            }

            return n.trim() ;
        }

        function simcore_sound_note2word ( note, bytesInWord )
        {
            var w = 0 ;
            var b = 0 ;

            for (var i=0; i<bytesInWord; i++)
            {
                 b = 0x0 ;
                 if (i < note.length) {
                     b = note[i].charCodeAt(0) ;
                 }

                 w = w << 8 ;
                 w = w | b ;
            }

            return w ;
        }

