/*
 *  Copyright 2015-2024 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
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


/* jshint esversion: 9 */

function wsasm_mk_default_options ( )
{
           var options = {} ;

           // Initialize default options...
	   options.field_multipart_order = "backwards" ; // "backwards" | "forwards" ;
	   options.mandatory_comma       = false       ; // false  | true
           options.instruction_comma     = true        ; // true   | false
           options.relative_offset_mult  = 4           ; // 1: byte, 4: word (mips-32), 2: half(risc-v)
           options.endian                = "little"    ; // "little" | "big"

           return options ;
}

function wsasm_expand_options ( base_options )
{
           var options = wsasm_mk_default_options() ;

           // Replace default options if exits in base_options
           for (var key in options)
           {
                if (typeof base_options[key] !== "undefined") {
                    options[key] = base_options[key] ;
                }
           }

           return options ;
}


