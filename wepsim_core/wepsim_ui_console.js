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


	function wepsim_get_screen_content ( )
	{
	      var screen_content = "" ;

	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  screen_content = scrobj.value ;
	      }

	      return screen_content ;
	}

	function wepsim_set_screen_content ( screen )
	{
	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  scrobj.value = screen ;
	      }

	      return true ;
	}

	function wepsim_get_keyboard_content ( )
	{
	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keyboard_content = keyobj.value ;
	      }

	      return keyboard_content ;
	}

	function wepsim_set_keyboard_content ( keystrokes )
	{
	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keyobj.value = keystrokes ;
	      }

	      return true ;
	}

