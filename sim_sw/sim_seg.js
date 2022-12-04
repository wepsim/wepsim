/*
 *  Copyright 2015-2023 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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
 *   Segments
 */

 sim_segments = {
                    ".kdata": { name:".kdata", begin:0x00000, end:0x000FF,  color:"#FF99CC", kindof:"data"  },
                    ".ktext": { name:".ktext", begin:0x00100, end:0x00FFF,  color:"#A9D0F5", kindof:"text"  },

                    ".data":  { name:".data",  begin:0x01000, end:0x07FFF,  color:"#FACC2E", kindof:"data"  },
                    ".text":  { name:".text",  begin:0x08000, end:0x1FFFF,  color:"#BEF781", kindof:"text"  },
                    ".stack": { name:".stack", begin:0x1FFFF, end:0x100000, color:"#F1F2A3", kindof:"stack" }
                } ;

   function segments_addr_within_text ( address )
   {
	 return (((address >= sim_segments[".text"].begin ) && (address <= sim_segments[".text"].end ))
                  ||
		 ((address >= sim_segments[".ktext"].begin) && (address <= sim_segments[".ktext"].end))) ;
   }

   function segments_addr_within_data ( address )
   {
	 return (((address >= sim_segments[".data"].begin ) && (address <= sim_segments[".data"].end ))
                  ||
		 ((address >= sim_segments[".kdata"].begin) && (address <= sim_segments[".kdata"].end))) ;
   }

