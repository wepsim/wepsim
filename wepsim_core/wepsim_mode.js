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
     * Execution Modes
     */

    ws_info.modes = [ 'ep', 'poc', 'rv', 'newbie', 'intro', 'asm_mips', 'asm_rv32', 'asm_z80' ] ;

    ws_info.default_example = {
	                         'ep':       'Default-MIPS',
	                         'poc':      'Default-MIPS',
	                         'rv':       'Default-RISCV',
	                         'asm_mips': 'ep:ep_bare:mips_s4e1',
	                         'asm_rv32': 'ep:ep_os:rv32_s7e2',
	                         'asm_z80':  'ep:ep_js:z80_s7e3'
	                      } ;

    ws_info.modes_ep = [ 'newbie', 'intro', 'asm_mips', 'asm_rv32', 'asm_z80' ] ;


    // get equivalent base mode
    function wepsim_mode_getBaseMode ( derive_model )
    {
        if (derive_model == null) {
            return 'ep' ;
        }

        if (ws_info.modes_ep.includes(derive_model)) {
            return 'ep' ;
        }

        return derive_model ;
    }

    // Change WepSIM mode -> activate_hw + UI view
    function wepsim_mode_change ( optValue )
    {
	    // switch active hardware by name...
            var bm   = wepsim_mode_getBaseMode(optValue) ;
            var hwid = simhw_getIdByName(bm) ;
            if (hwid != -1) {
                wepsim_activehw(hwid) ;
	    }

	    // show/hide microcode...
            wepsim_activeview('extra_mcode', true) ;
	    if (optValue.startsWith('asm_'))
	    {
                wepsim_activeview('extra_mcode', false) ;
		load_from_example_firmware(ws_info.default_example[optValue], false) ;
                return true ;
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
                 wepsim_newbie_tour('tour2') ;
                 return true ;
            }

            // load default example
            var eset_name = get_cfg('ws_examples_set') ;
            if (eset_name != 'Empty')
                 wepsim_example_load(eset_name) ;
	    else wepsim_example_load(ws_info.default_example[optValue]) ;

            return true ;
    }

