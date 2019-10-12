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
     * Execution Modes
     */

    var ws_modes = [ 'newbie', 'intro', 'asm_mips', 'asm_rv32', 'asm_z80', 'tutorial' ] ;

    // get list of modes
    function wepsim_mode_getAvailableModes ( )
    {
        return ws_modes ;
    }

    // Change WepSIM mode -> activate_hw + UI view
    function wepsim_mode_change ( optValue )
    {
	    // switch active hardware by name...
            var hwid = -1 ;
            switch (optValue)
            {
	      case 'newbie':
	      case 'intro':
	      case 'asm_mips':
	      case 'asm_rv32':
	      case 'tutorial':
                               hwid = simhw_getIdByName('ep') ;
                               wepsim_activehw(hwid) ;
                               break;
	      default:
	                       hwid = simhw_getIdByName(optValue) ;
                               wepsim_activehw(hwid) ;
                               break;
            }

	    // show/hide microcode...
            wepsim_activeview('only_asm', false) ;
	    if ('asm_mips' == optValue)
	    {
                 wepsim_activeview('only_asm', true) ;
		 load_from_example_firmware("ep:ep_mips:ep_s1_e1", false) ;
            }
	    if ('asm_rv32' == optValue)
	    {
                 wepsim_activeview('only_asm', true) ;
		 load_from_example_firmware("ep:ep_rv32:ep_s7_e1", false) ;
            }

	    // intro mode...
	    if ('intro' == optValue)
	    {
	         wsweb_recordbar_show() ;
                 wepsim_checkpoint_loadExample('tutorial_2.txt') ;
                 return true ;
	    }

	    // newbie mode...
            if ('newbie' == optValue)
            {
                wepsim_newbie_tour() ;
                return true ;
            }

            // return ok
            return true ;
    }

