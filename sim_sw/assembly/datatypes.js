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
                     'isDecimal': false
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
             ret.number    = parseInt(n) ;
	     //if ((typeof n === "string") && n.includes(".")) {
	     //	    ws_alert("Truncating conversion has occurred: " + n + " became " + ret.number) ;
	     //}
	     return ret ;
	}

        return ret ;
}

function isOctal ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false
                  } ;

	if (n.substring(0,1) == "0")
        {
	    var octal     = n.substring(1).replace(/\b0+/g, '') ;
            ret.number    = parseInt(octal, 8) ;
            ret.isDecimal = (ret.number.toString(8) === octal) ;
            return ret ;
        }

        return ret ;
}

function isHex ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false
                  } ;

        if (n.substring(0,2).toLowerCase() == "0x")
        {
	    var hex = n.substring(2).toLowerCase().replace(/\b0+/g, '') ;
            if (hex == "") {
                hex = "0" ;
            }

	    ret.number    = parseInt(hex, 16) ;
            ret.isDecimal = (ret.number.toString(16) === hex) ;
            return ret ;
        }

        return ret ;
}

function isChar ( n )
{
        var ret = {
                     'number':    0,
                     'isDecimal': false
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
	    return ret ;
        }

	return ret ;
}

function isFloat ( n )
{
        var ret = {
                     'number':  0.0,
                     'isFloat': false
                  } ;

        // check errors
        var non_float = /[a-df-zA-DF-Z]+/ ;
        if (non_float.test(n) === true) {
            return ret ;
        }

        // convert
	ret.number  = parseFloat(n) ;
	ret.isFloat = (! isNaN(ret.number)) ;
	return ret ;
}


/*
 *  Aux. Functions
 */

function get_decimal_value ( possible_value )
{
        var ret = {
                     'number':    0,
                     'isDecimal': true
                  } ;

   	ret = isOctal(possible_value) ;        // Octal value 072
        if (ret.isDecimal === false) {
	    ret = isHex(possible_value) ;      // Hex value 0xF12
        }
        if (ret.isDecimal === false) {
	    ret = isDecimal(possible_value) ;  // Decimal value 634
        }
        if (ret.isDecimal === false) {
	    ret = isChar(possible_value) ;     // Char value 'a'
        }

        return ret ;
}

function decimal2binary ( number, size )
{
	var num_bits = number.toString(2) ;
	if (num_bits.length > WORD_LENGTH) {
	    return [num_bits, size-num_bits.length] ;
        }

	num_bits = (number >>> 0).toString(2) ;
	if (number >= 0) {
            return [num_bits, size-num_bits.length] ;
        }

	num_bits = "1" + num_bits.replace(/^[1]+/g, "") ;
	if (num_bits.length > size) {
	    return [num_bits, size-num_bits.length] ;
        }

	num_bits = "1".repeat(size - num_bits.length) + num_bits ;
	return [num_bits, size-num_bits.length] ;
}

function get_inm_value ( value )
{
        var ret1 = { } ;
        var ret  = {
                      'number':    0,
                      'isDecimal': false,
                      'isFloat':   false
                   } ;

	ret1 = get_decimal_value(value) ;
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

