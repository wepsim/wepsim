/*     
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


        // Console (Screen + Keyboard)
        var screen_content = "" ;
        var keyboard_content = "" ;

	function get_screen_content ( )
	{
		 var scrobj = null ;
                 if (typeof document != "undefined")
		     scrobj = document.getElementById("kdb_con") ;
                 if (scrobj != null)
		     screen_content = scrobj.value ;

		 return screen_content ;
	}

	function set_screen_content ( screen )
	{
	      screen_content = screen ;

              if (typeof document == "undefined") 
	      {
		  console.log(screen_content) ;
	          return ;
	      }

	      var scrobj = null ;
              if (typeof document != "undefined")
		  scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null)
		  scrobj.value = screen ;
	}

	function get_keyboard_content ( )
	{
              if (typeof document == "undefined") 
	      {
		  var readlineSync = require('readline-sync');
                  var keys = readlineSync.question('keyboard> ');
	          keyboard_content = keys.toString() ;
	          return keyboard_content ;
	      }

	      var keyobj = null ;
              if (typeof document != "undefined")
	          keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null)
		  keyboard_content = keyobj.value ;

	      return keyboard_content ;
	}

	function set_keyboard_content ( keystrokes )
	{
	      keyboard_content = keystrokes ;

	      var keyobj = null ;
              if (typeof document != "undefined")
		  keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null)
		  keyobj.value = keystrokes ;
	}

