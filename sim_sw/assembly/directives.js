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
 *   Directives
 */

ws_directives = {
                  // segments
                  ".kdata":     { name:".kdata",  kindof:"segment",  size:0, attrs:["data"]    },
		  ".ktext":     { name:".ktext",  kindof:"segment",  size:0, attrs:["text"]    },
		  ".data":      { name:".data",   kindof:"segment",  size:0, attrs:["data"]    },
		  ".text":      { name:".text",   kindof:"segment",  size:0, attrs:["text"]    },

                  // datatypes
		  ".byte":      { name:".byte",   kindof:"datatype", size:1, attrs:["numeric"] },
		  ".half":      { name:".half",   kindof:"datatype", size:2, attrs:["numeric"] },
		  ".word":      { name:".word",   kindof:"datatype", size:4, attrs:["numeric"] },
		  ".dword":     { name:".dword",  kindof:"datatype", size:8, attrs:["numeric"] },
		  ".float":     { name:".float",  kindof:"datatype", size:4, attrs:["numeric"] },
		  ".double":    { name:".double", kindof:"datatype", size:8, attrs:["numeric"] },
		  ".ascii":     { name:".ascii",  kindof:"datatype", size:1, attrs:["string"]  },
		  ".asciiz":    { name:".asciiz", kindof:"datatype", size:1, attrs:["string"]  },
		  ".string":    { name:".string", kindof:"datatype", size:1, attrs:["string"]  },
		  ".space":     { name:".space",  kindof:"datatype", size:1, attrs:["space"]   },
		  ".zero":      { name:".zero",   kindof:"datatype", size:1, attrs:["space"]   },

                  // modifiers
		  ".align":     { name:".align",  kindof:"datatype", size:0, attrs:["align"]   },
		  ".balign":    { name:".balign", kindof:"datatype", size:0, attrs:["align"]   }
                } ;


/*
 * API
 */

function wsasm_is_directive_kindof ( text, kindof )
{
        if (typeof ws_directives[text] === "undefined")
        {
//          console.log("ERROR: not defined directive: " + text + "\n")
            return false ;
        }

        return (ws_directives[text].kindof == kindof) ;
}

function wsasm_is_directive ( text )
{
	return (typeof ws_directives[text] !== "undefined");
}

function wsasm_is_directive_segment ( text )
{
        return wsasm_is_directive_kindof(text, 'segment') ;
}

function wsasm_is_directive_datatype ( text )
{
        return wsasm_is_directive_kindof(text, 'datatype') ;
}

function wsasm_get_datatype_size ( datatype )
{
	if (typeof ws_directives[datatype] === "undefined")
        {
	    console.log("ERROR: not defined datatype: " + datatype + "\n") ;
	    return 0 ;
   	}

	return ws_directives[datatype].size ;
}

function wsasm_has_datatype_attr ( datatype, attr )
{
        if (typeof ws_directives[datatype] === "undefined")
        {
         // console.log("ERROR: not defined directive: " + datatype + "\n")
            return false ;
        }

        return ws_directives[datatype].attrs.includes(attr) ;
}

