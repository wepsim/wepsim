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
 *  Alternative image description
 */

function simhwalt_get_fulldescription ( elto )
{
   var o  = "" ;

   o += elto.description + ". " ;
   o += "It has " + elto.inputs.length + " inputs (" ;
        for (var i=0; i<elto.inputs.length; i++) {
             o += elto.states[elto.inputs[i]].description ;
        }
   o += "). " ;
   o += "It has " + elto.outputs.length + " outputs (" ;
        for (var i=0; i<elto.inputs.length; i++) {
             o += elto.states[elto.inputs[i]].description ;
        }
   o += "). " ;

   return o ;
}

