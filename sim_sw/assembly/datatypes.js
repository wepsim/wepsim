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
 *  Constants
 */

    BYTE_LENGTH = 8 ;
    WORD_BYTES  = 4 ;
    WORD_LENGTH = WORD_BYTES * BYTE_LENGTH ;


/*
 *  Datatypes
 */

function isDecimal ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false,
                     'format':    ''
                  } ;

        // check errors
	if ( (n.length > 1) && (n[0] == "0") ) {
            return ret ;
	}
	if ((typeof n === "string") && n.includes(".")) {
            return ret ;
	}

        // convert
	if ( !isNaN(parseFloat(n)) && isFinite(n) )
        {
             ret.isDecimal = true ;
             ret.format    = 'dec' ;
             ret.number    = parseInt(n) ;
	     return ret ;
	}

        return ret ;
}

function isOctal ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false,
                     'format':    ''
                  } ;

	if (n[0] == "0")
        {
	    var octal     = n.substring(1).replace(/\b0+/g, '') ;
            ret.number    = parseInt(octal, 8) ;
            ret.isDecimal = (ret.number.toString(8) === octal) ;
            ret.format    = 'octal' ;
            return ret ;
        }

        return ret ;
}

function isHex ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false,
                     'format':    ''
                  } ;

        if (n.substring(0,2).toLowerCase() == "0x")
        {
	    var hex = n.substring(2).toLowerCase().replace(/\b0+/g, '') ;
            if (hex == "") {
                hex = "0" ;
            }

	    ret.number    = parseInt(hex, 16) ;
            ret.isDecimal = (ret.number.toString(16) === hex) ;
            ret.format    = 'hex' ;
            return ret ;
        }

        return ret ;
}

function isChar ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false,
                     'format':    ''
                  } ;

        // check errors
        var ret1 = treatControlSequences(n) ;
	if (true == ret1.error) {
	    return ret ;
        }

        // convert
        var possible_value = ret1.string ;
	if (
              ((possible_value[0] == "'") && (possible_value[2] == "'")) ||
	      ((possible_value[0] == '"') && (possible_value[2] == '"'))
           )
        {
	    ret.number    = possible_value.charCodeAt(1);
	    ret.isDecimal = true ;
	    ret.format    = 'ascii' ;
	    return ret ;
        }

	return ret ;
}

function isFloat ( n )
{
        var ret = {
                     'number':    0.0,
                     'isFloat':   false,
                     'format':    ''
                  } ;

        // check errors
        var non_float = /[a-df-zA-DF-Z]+/ ;
        if (non_float.test(n) === true) {
            return ret ;
        }

        // convert
	ret.number  = parseFloat(n) ;
	ret.isFloat = (isNaN(ret.number) == false) ;
	ret.format  = 'ieee754' ;
	return ret ;
}


/*
 *  API Functions
 */

function dt_get_decimal_value ( possible_value )
{
        var ret = {
                     'number':    0,
                     'isDecimal': true,
                     'format':    ''
                  } ;

        // check if Octal value: 072
   	ret = isOctal(possible_value) ;
        if (ret.isDecimal) {
            return ret ;
        }

        // check if Hex value: 0xF12
	ret = isHex(possible_value) ;
        if (ret.isDecimal) {
            return ret ;
        }

        // check if Decimal value: 634
	ret = isDecimal(possible_value) ;
        if (ret.isDecimal) {
            return ret ;
        }

        // check if Char value: 'a'
	ret = isChar(possible_value) ;
        if (ret.isDecimal) {
            return ret ;
        }

        return ret ;
}

function dt_get_imm_value ( value )
{
        var ret1 = { } ;
        var ret  = {
                      'number':    0,
                      'isDecimal': false,
                      'isFloat':   false
                   } ;

	ret1 = dt_get_decimal_value(value) ;
	if (ret1.isDecimal == true) {
	    ret1.isFloat = false ;
            return ret1 ;
	}

	ret1 = isFloat(value) ;
	if (ret1.isFloat == true) {
	    ret1.isDecimal = false ;
            return ret1 ;
	}

        return ret ;
}

function dt_binary2format ( valbin, format )
{
        var val = parseInt(valbin, 2) ;
        var ret = 0 ; // ret = val.toString(10) ;

        switch (format)
        {
           case 'dec':
                ret = val.toString(10) ;
                break ;

           case 'octal':
                ret = '0' + val.toString(8) ;
                break ;

           case 'hex':
                ret = '0x' + val.toString(16) ;
                break ;

	   case 'ascii':
                ret = val.toString(10) ;  // TODO
                break ;

	   case 'ieee754':
                ret = val.toString(16) ;  // TODO
                break ;

	   default:
                ret = val.toString(10) ;
                break ;
        }

        return ret ;
}

