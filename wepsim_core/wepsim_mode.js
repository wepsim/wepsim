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
     * Execution Modes
     */

    ws_info.modes = [ 'newbie', 'intro', 'asm_mips', 'asm_rv32', 'asm_z80' ] ;

    ws_info.default_example = {
	                         'asm_mips': 'ep:ep_mips:ep_s4_e1',
	                         'asm_rv32': 'ep:ep_rv32:ep_s7_e2',
	                         'asm_z80':  'ep:ep_z80:ep_s7_e3'
	                      } ;


    // get list of modes
    function wepsim_mode_getAvailableModes ( )
    {
        return ws_info.modes ;
    }

    // Change WepSIM mode -> activate_hw + UI view
    function wepsim_mode_change ( optValue )
    {
            var hwid = -1 ;

	    // switch active hardware by name...
	    if (ws_info.modes.includes(optValue))
                 hwid = simhw_getIdByName('ep') ;
	    else hwid = simhw_getIdByName(optValue) ;

            if (hwid != -1) {
                wepsim_activehw(hwid) ;
	    }

	    // show/hide microcode...
            wepsim_activeview('only_asm', false) ;
	    if (optValue.startsWith('asm_'))
	    {
                wepsim_activeview('only_asm', true) ;
		load_from_example_firmware(ws_info.default_example[optValue], false) ;
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

