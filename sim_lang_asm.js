/*      
 *  Copyright 2015-2016 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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

	directives = new Object() ;
	directives[".kdata"]   = { name:".kdata",  kindof:"segment",  size:0 };
	directives[".ktext"]   = { name:".ktext",  kindof:"segment",  size:0 };
	directives[".data"]    = { name:".data",   kindof:"segment",  size:0 };
	directives[".text"]    = { name:".text",   kindof:"segment",  size:0 };
	directives[".byte"]    = { name:".byte",   kindof:"datatype", size:1 };
	directives[".half"]    = { name:".half",   kindof:"datatype", size:2 };
	directives[".word"]    = { name:".word",   kindof:"datatype", size:4 };
	directives[".space"]   = { name:".space",  kindof:"datatype", size:1 };
	directives[".ascii"]   = { name:".ascii",  kindof:"datatype", size:1 };
	directives[".asciiz"]  = { name:".asciiz", kindof:"datatype", size:1 };
	directives[".align"]   = { name:".align",  kindof:"datatype", size:0 };


/*
 *   Auxiliary functions
 */

function get_datatype_size ( datatype )
{
	if (typeof directives[datatype] == "undefined") {
		console.log("data type: " + datatype + " is not defined!!!\n")
	    	return 0;
   	}

	return directives[datatype].size ;
}

function isTokenKindOf ( text, kindof )
{
        if (typeof directives[text] == "undefined") {
                //console.log("directive: " + text + " is not defined!!!\n")
                return false;
        }

        return (directives[text].kindof == kindof) ;
}

function is_directive ( text )
{
	return (typeof directives[text] != "undefined");
}

function is_directive_segment ( text )
{
        return isTokenKindOf(text,'segment') ;
}

function is_directive_datatype ( text )
{
        return isTokenKindOf(text,'datatype') ;
}

function isDecimal ( n )
{
	if(n.length > 1 && n[0] == "0") return false;
        return (!isNaN(parseFloat(n)) && isFinite(n)) ? parseInt(n) : false;
}

function isOctal( n )
{
	if(n.substring(0,1) == "0"){
		var octal = n.substring(1).replace(/\b0+/g, '');
                var aux = parseInt(octal,8);
                return (aux.toString(8) === octal) ? aux : false;
        }
        return false;
}

function isHex( n )
{
        if(n.substring(0,2).toLowerCase() == "0x"){
		var hex = n.substring(2).toLowerCase().replace(/\b0+/g, '');
                var aux = parseInt(hex,16);
                return (aux.toString(16) === hex) ? aux : false;
        }
        return false;
}

function isChar( n )
{
	if(n[0] == "'" && n[2] == "'")
		return n.charCodeAt(1);
	return false;
}

function decimal2binary(number, size){
	if(number < 0){
		var aux = number*-1;
		var num_bits = aux.toString(2);

		// calculate free space after including the value
		var num_bits_free_space = size - num_bits.length;
		if(num_bits_free_space > 0)
			var num_bits_free_space = 0;				
	}
	else{
		var num_bits = number.toString(2);
			
		// calculate free space after including the value
		var num_bits_free_space = size - num_bits.length;
	}
	
	// Check errors
	if(num_bits_free_space < 0)
		return [num_bits, num_bits_free_space];

	// Negative number --> Ca2	
	if(number < 0){
		var num_bits = (number>>>0).toString(2);
		var num_bits = num_bits.substring(num_bits.length-size); 
	}

	return [num_bits, num_bits_free_space];
}

function max( a, b )
{
	return a > b ? a : b;
}

function sum_array( a )
{
	return a.reduce(function(a, b) { return a + b; }, 0);
}

/*
 *   Load segments
 */

function read_data ( context, datosCU, ret )
{
           var seg_name = getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // 
	   //  .data
	   //  *.text*
	   // 

           nextToken(context) ;

	   var byteWord = 0;
	   var machineCode = "00000000000000000000000000000000";

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!is_directive_segment(getToken(context))) 
           {
		   // 
		   //  * etiq1: * 
		   //  * etiq2: *  .word 2, 4
		   // 
	
		   var possible_tag = "" ;
		   while (!is_directive_datatype(getToken(context))) 
		   {
                      // tagX
		      possible_tag = getToken(context) ;

                      // :
		      if ("TAG" != getTokenType(context))
			  return langError(context, "Expected tag or directive but found '" + possible_tag + "'" ) ;
		   
   		      if(possible_tag[0] == "$" || possible_tag[0] == "." || isDecimal(possible_tag[0]))
			  return langError(context, "Tag must not start with '.', special character, or number");

		      // Store tag
		      ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (seg_ptr+byteWord).toString(16);

		      // .<datatype> | tagX+1
		      nextToken(context) ;
		   }


		   // 
		   //    etiq1:   
		   //    etiq2: *.word* 2, 4
		   // 

		   var possible_datatype = getToken(context) ;

		   //            .word *2, 4, 0x8F, 'a', 077*
		   if ( (".word" == possible_datatype) ||
		        (".half" == possible_datatype) ||
		        (".byte" == possible_datatype) )
                   {
                        // <value> | .<directive>
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			while (!is_directive(getToken(context)))
                        {
				var number;
		
				// Octal value 072
				if((number=isOctal(possible_value)) !== false);
	
				// Hex value 0xF12
				else if((number=isHex(possible_value)) !== false);				
	
				// Decimal value 634
				else if((number=isDecimal(possible_value)) !== false);

				// Char value 'a'
				else if((number=isChar(possible_value)) !== false);		

				// Error	
				else return langError(context, "Expected number value for numeric datatype but found '" + possible_value + "' as number");

				// Get value size in bytes
				var size = get_datatype_size(possible_datatype);

				// Decimal --> binary	
			        var res = decimal2binary(number, size*8);
				num_bits = res[0];
				num_bits_free_space = res[1];

				// Check size
				if(num_bits_free_space < 0)
					return langError(context, "Expected value that fits in a '" + possible_datatype + "' (" + size*8 + " bits), but inserted '" + possible_value + "' (" + num_bits.length + " bits) instead");

				// Word filled
				if(byteWord >= 4){
					ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
               				seg_ptr = seg_ptr + 4 ;
					byteWord = 0;
					machineCode = "00000000000000000000000000000000";	
				}

				// Align to size
				while(((seg_ptr+byteWord)%size) != 0){
					byteWord++;
					
					// Word filled
					if(byteWord >= 4){
						ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
        	        			seg_ptr = seg_ptr + 4 ;
						byteWord = 0;
						machineCode = "00000000000000000000000000000000";	
					}
				}	
	
		                // Store tag
                                if ("" != possible_tag){
		                    ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (seg_ptr+byteWord).toString(16);
				    possible_tag = "";
				}

				// Store field in machine code
				var machineCodeAux = machineCode.substring(0, machineCode.length- 8*(size+byteWord) +num_bits_free_space);
				machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length - 8*(byteWord));
			
				byteWord+=size;

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) )
				    break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = getToken(context);
                        }
                   }

		   //            .space *20*
		   else if (".space" == possible_datatype)
                   {
                        // <value> 
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			// Check
			if (!isDecimal(possible_value))
			     return langError(context, "Expected number of bytes to reserve in .space but found '" + possible_value + "' as number");
			if(possible_value < 0)
			     return langError(context, "Expected positive number but found '" + possible_value + "' as positive number");

			// Fill with spaces
			for (i=0; i<possible_value; i++){
			
				// Word filled
				if(byteWord >= 4){
					ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                			seg_ptr = seg_ptr + 4 ;
					byteWord = 0;
					machineCode = "00000000000000000000000000000000";	
				}

				byteWord++;
			}

			nextToken(context) ;
                   }

		   //            .align *2*
		   else if (".align" == possible_datatype)
                   {
                        // <value> 
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			// Check if number
			if (!isDecimal(possible_value) && possible_value >=0 )
			     return langError(context, "Expected the align parameter as positive number but found '" + possible_value + "'. Remember that number is the power of two for alignment, see MIPS documentation..");

			// Word filled
			if(byteWord >= 4){
				ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                		seg_ptr = seg_ptr + 4 ;
				byteWord = 0;
				machineCode = "00000000000000000000000000000000";	
			}

			// Calculate offset
                        var align_offset = Math.pow(2,parseInt(possible_value)) ;
                   
			switch(align_offset){
				case 1:
					break;
				case 2:
					if(byteWord%2==1)
						byteWord++;
					break;
				default:
					// Fill with spaces
					while(true){
		
						// Word filled
						if(byteWord >= 4){
							ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                					seg_ptr = seg_ptr + 4 ;
							byteWord = 0;
							machineCode = "00000000000000000000000000000000";	
						}

						if(seg_ptr%align_offset == 0 && byteWord == 0)
							break;	

						byteWord++;
					}	
			}

     		//seg_ptr = seg_ptr + align_offset - (seg_ptr % align_offset)

			nextToken(context) ;
                   }

		   //  * .ascii  "hola", " mundo\n"
		   //  * .asciiz "hola mundo"
		   else if (".ascii" == possible_datatype || ".asciiz" == possible_datatype)
                   {
                        // <value> | .<directive>
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			while (!is_directive(getToken(context)))
                        {
				// Word filled
				if(byteWord >= 4){
					ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                			seg_ptr = seg_ptr + 4 ;
					byteWord = 0;
					machineCode = "00000000000000000000000000000000";	
				}

				// string
		                if ("STRING" != getTokenType(context))
				    return langError(context, "Expected string value but found '" + possible_value + "' as string");

				// process characters of the string
				for(i=0; i<possible_value.length; i++){
					
					// Word filled
					if(byteWord >= 4){
						ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                				seg_ptr = seg_ptr + 4 ;
						byteWord = 0;
						machineCode = "00000000000000000000000000000000";	
					}
				
					switch(possible_value[i]){
						case "\"":
							break;
						case "\\":
							switch(possible_value[i+1]){
							
								case "n":
									num_bits = "\n".charCodeAt(0).toString(2);
									i++;
									break;
								case "t":
									num_bits = "\t".charCodeAt(0).toString(2);
									i++;
									break;
								case "0":
									num_bits = "\0".charCodeAt(0).toString(2);
									i++;
									break;
								default:	
									num_bits = possible_value.charCodeAt(i).toString(2);
									break;
							}
							
							// calculate free space after including the value
							var num_bits_free_space = 8 - num_bits.length;
	
							// Store field in machine code
							var machineCodeAux = machineCode.substring(0, machineCode.length- 8*(1+byteWord) + num_bits_free_space );
							machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length - 8*(byteWord));	
								
							byteWord++;
							
							break;
						default:
							num_bits = possible_value.charCodeAt(i).toString(2);
	
							// calculate free space after including the value
							var num_bits_free_space = 8 - num_bits.length;

							// Store field in machine code
							var machineCodeAux = machineCode.substring(0, machineCode.length- 8*(1+byteWord) + num_bits_free_space );
							machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length - 8*(byteWord));	
							
							byteWord++;
					}	
				}

                                if (".asciiz" == possible_datatype){
                                	// Word filled
					if(byteWord >= 4){
						ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                				seg_ptr = seg_ptr + 4 ;
						byteWord = 0;
						machineCode = "00000000000000000000000000000000";	
					}
					
					num_bits = "\0".charCodeAt(0).toString(2);
			
					// calculate free space after including the value
					var num_bits_free_space = 8 - num_bits.length;

					// Store field in machine code
					var machineCodeAux = machineCode.substring(0, machineCode.length- 8*(1+byteWord) + num_bits_free_space );
					machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length - 8*(byteWord));	
					byteWord++;
				}

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) )
				     break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = getToken(context);
                        }
		   }
		   else
		   {
		        return langError(context, "UnExpected datatype name '" + possible_datatype );
		   }
		   
		   if(context.t >= context.text.length) break;
           }

	   // Fill memory
	   if(byteWord > 0){
		ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                seg_ptr = seg_ptr + 4 ;
	   }		

           ret.seg[seg_name].end = seg_ptr ;  // end of segment is just last pointer value...
}

function read_text ( context, datosCU, ret )
{
	   // 
	   //  .text
	   // 

           var seg_name = getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // Fill firmware structure
	   var firmware = new Object() ;
	   for (i=0; i<datosCU.firmware.length; i++)
           {
		var aux = datosCU.firmware[i];

	   	if (typeof firmware[datosCU.firmware[i].name] == "undefined")
	   	    firmware[datosCU.firmware[i].name] = new Array();

	   	firmware[datosCU.firmware[i].name].push({ 	name:aux.name,
							nwords:parseInt(aux.nwords), 
							co:(typeof aux.co != "undefined" ? aux.co : false),
							cop:(typeof aux.cop != "undefined" ? aux.cop : false),
							fields:(typeof aux.fields != "undefined" ? aux.fields : false),
							signature:aux.signature });
	   }

	   // Fill register names
	   var registers = new Object() ;
	   for (i=0; i<datosCU.registers.length; i++)
	   {
		var aux = "$" + i;
		registers[aux] = i;
		registers[datosCU.registers[i]] = registers[aux];
	   }

           nextToken(context) ;

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!is_directive_segment(getToken(context))) 
           {
		// check tag or error
		while (typeof firmware[getToken(context)] == "undefined") 
                {
			var possible_tag = getToken(context);
			
		        if ("TAG" == getTokenType(context)) 
                        {
                                ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + seg_ptr.toString(16);
			}
			else {
				return langError(context, "Undefined instruction " + possible_tag ); 
			}
			if(possible_tag[0] == "$" || possible_tag[0] == "." || isDecimal(possible_tag[0]) || firmware[possible_tag.substring(0,possible_tag.length-1)])
		  		return langError(context, "Tag must not start with '.', special character, or number and must not have the name of an instruction");

			nextToken(context);
		}

		var instruction = getToken(context);
		
                //
                // *li, $1*, 1
                //

		var signature_fields = [];		// e.g. [[reg,reg], [reg,inm], [reg,addr,inm]]
		var advance = [];			// array that indicates wheather each signature can be considered or not
		var binaryAux = [];			// necessary parameters of the fields of each signature
		var max_length = 0;			// max number of parameters of the signatures

		// Fill parameters
		for(i=0; i<firmware[instruction].length; i++)
		{
			signature_fields[i] = firmware[instruction][i].signature.split(",");
			signature_fields[i].shift();
			advance[i] = 1;
			binaryAux[i] = [];
			max_length = max(max_length, signature_fields[i].length);
		}

		// Iterate over fields
                var s = instruction + " ";
		for (i=0; i<max_length; i++)
                {
                        // optional ','
			nextToken(context);
			if ("," == getToken(context))
			    nextToken(context);

			var value = getToken(context);	

			if("TAG" != getTokenType(context) && !firmware[value]) s = s + value + " " ;
				
			// vertical search (different signatures)
			for(j=0; j<advance.length; j++){

				// check whether explore this alternative 
				if(advance[j] == 0)
					continue;
				if(i >= signature_fields[j].length){
					// if next token is not instruction or tag
					if("TAG" != getTokenType(context) && !firmware[value])
						advance[j] = 0;
					continue;
				}

				// get field information
				var field = firmware[instruction][j].fields[i];		
				var size = field.startbit-field.stopbit+1;

				var label_found = false;

				// check field	
				switch(field.type)
                	        {	
					// 0xFFFF...
					case "address":
						if(isHex(value) !== false){
							var res = decimal2binary(isHex(value), size);
							if("rel" == field.address_type){
							    var aux = isHex(value) - seg_ptr - 4;	
                                                	    res = decimal2binary(aux, size) ;
							}
						}
						else if(isDecimal(value) !== false){
							var res = decimal2binary(isDecimal(value), size);
							if("rel" == field.address_type){
							    var aux = isDecimal(value) - seg_ptr - 4;	
                                        	            res = decimal2binary(aux, size) ;
							}
						}
						else{
							if(value[0] == "(" || value[0] == "$" || value[0] == "." || isDecimal(value[0]) || registers[value] || firmware[value]){
								var error = "Tag must not start with a number or an special character";
								advance[j] = 0;
								break;
							}
							label_found = true;
						}  	
						break;
					// 23, 'b', ...
					case "inm":
						if(isOctal(value) !== false) var res = decimal2binary(isOctal(value), size);
						else if(isHex(value) !== false) var res = decimal2binary(isHex(value), size);	
						else if(isDecimal(value) !== false) var res = decimal2binary(isDecimal(value), size);
						else if (isChar(value) !== false) var res = decimal2binary(isChar(value), size);
						else{
							if(value[0] == "(" || value[0] == "$" || value[0] == "." || isDecimal(value[0]) || registers[value] || firmware[value]){
								var error = "Tag must not start with a number or an special character";
								advance[j] = 0;
								break;
							}
							label_found = true;
						}
						break;
					// $1...
					case "reg":
						var aux = false;
						if("(" == value){
							if("(reg)" != signature_fields[j][i]){
								var error = "Expected register but found register beween parenthesis";
								advance[j] = 0;
								break;
							}
							nextToken(context);
							value = getToken(context);
							aux = true;
						}
						else{
							if("(reg)" == signature_fields[j][i]){
								var error = "Expected register between parenthesis but found '" + value + "'";
								advance[j] = 0;
								break;
							}
						}
						if(typeof registers[value] == "undefined"){	
							var error = "Expected register ($1, ...) but found '" + value + "' as register";
							advance[j] = 0;
							break;
						}
						if(aux){
							if(signature_fields[j][i-1] == "inm" && signature_fields[j][i] == "(reg)")
								s = s.substring(0,s.length-3) + "(" + value + ")" ;
							else
								s = s.substring(0,s.length-1) + value + ")";
							nextToken(context);
							if(")" != getToken(context)){
								var error = "String without end parenthesis ')'";
								advance[j] = 0;
								break;
							}
						}
						var res = decimal2binary(isDecimal(registers[value]), size);
						break;
					default:
						return langError(context, "An unknown error ocurred (53)");	
				}

				// store field
				if(advance[j] == 1)	
					binaryAux[j][i] = {num_bits:(label_found ? false : res[0]), num_bits_free_space:(label_found ? false : res[1]), startbit:field.startbit, stopbit:field.stopbit, rel:(label_found ? field.address_type : false), islabel:label_found, field_name: value };
			}
		
			if(sum_array(advance) == 0) break;

			if("TAG" == getTokenType(context) || firmware[value]) break;	
		}

		// check solution
		var sum_res = sum_array(advance);	
		if(sum_res == 0){
			if(advance.length == 1)
				return langError(context, error); 
			return langError(context, "Instruction and fields don't match with microprogram");
		}
		if(sum_res > 1) return langError(context, "Instruction and fields match with more than one microprogram");

		// Get candidate
		var candidate;
		for(i=0; i<advance.length; i++)
			if(advance[i] == 1) candidate = i;

		// Machine code (e.g. one word [ 31, 30, 29, ... , 2, 1, 0 ])
		var machineCode = "";
		for (i=0; i<firmware[instruction][0].nwords; i++)
		     machineCode+="00000000000000000000000000000000";		

		// Generate code (co and cop)	
		if (firmware[instruction][candidate].co !== false)
                {
			machineCode = firmware[instruction][candidate].co + machineCode.substring(6);
			if (firmware[instruction][candidate].cop !== false)
                        {
				var machineCodeAux = machineCode.substring(0,28);
				machineCode = machineCode.substring(32);
				machineCodeAux = machineCodeAux + firmware[instruction][candidate].cop;
				machineCode = machineCodeAux + machineCode;
			}
		}

		// Store candidate fields in machine code
		for(i=0; i<binaryAux[candidate].length; i++){
			// tag
			if(binaryAux[candidate][i].islabel){
				ret.labels["0x" + seg_ptr.toString(16)] = { name:binaryAux[candidate][i].field_name, addr:("0x" + seg_ptr.toString(16)), startbit:binaryAux[candidate][i].startbit, stopbit:binaryAux[candidate][i].stopbit, rel:binaryAux[candidate][i].rel };
			}

			// reg, addr, inm
			else{
				// check size
				var bstartbit = binaryAux[candidate][i].startbit;
				var bstopbit = binaryAux[candidate][i].stopbit;
				var size = bstartbit - bstopbit + 1;
				var bnum_bits = binaryAux[candidate][i].num_bits ; 
				var bnum_bits_free_space = binaryAux[candidate][i].num_bits_free_space;
				var value = binaryAux[candidate][i].field_name;
				if(bnum_bits_free_space < 0)
					return langError(context, "'" + value + "' needs " + num_bits.length + " bits but there is space for only " + size + " bits");
			
				// store field in machine code
				var machineCodeAux = machineCode.substring(0, machineCode.length-1-bstartbit+bnum_bits_free_space);
				machineCode = machineCodeAux + bnum_bits + machineCode.substring(machineCode.length-bstopbit);	
			}
		}

		// process machine code with several words...
		for(i=0; i<firmware[instruction][candidate].nwords; i++)
                {
			ret.assembly["0x" + seg_ptr.toString(16)] = { breakpoint:false, binary:machineCode.substring(i*32, (i+1)*32), source:s, source_original:s } ; 
			ret.mp["0x" + seg_ptr.toString(16)] = machineCode.substring(i*32, (i+1)*32) ;
                	seg_ptr = seg_ptr + 4 ;
		}

		if (max_length == signature_fields[candidate].length)
			nextToken(context);

		if(context.t >= context.text.length) break;
           }

           ret.seg[seg_name].end = seg_ptr ;  // end of segment is just last pointer value...
}


/*
 *  Compile assembly
 */
function simlang_compile (text, datosCU)
{
           var context = new Object() ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= new Object() ;
	   context.labelsNotFound 	= new Array() ;
	   context.instrucciones  	= new Array() ;
	   context.co_cop         	= new Object() ;
	   context.registers      	= new Array() ;
           context.text           	= text ;
	   context.tokens         	= new Array() ;
	   context.token_types    	= new Array() ;
	   context.t              	= 0 ;
	   context.newlines       	= new Array() ;
	   context.pseudoInstructions	= new Array();
	   context.stackRegister	= null ;

           var ret = new Object(); 
           ret.seg = {
                       ".kdata": { name:".kdata",  begin:0x0000, end:0x00FF, color: "#FF99CC", kindof:"data" },
                       ".ktext": { name:".ktext",  begin:0x0100, end:0x0FFF, color: "#A9D0F5", kindof:"text" },
                       ".data":  { name:".data",   begin:0x1000, end:0x7FFF, color: "#FACC2E", kindof:"data" },
                       ".text":  { name:".text",   begin:0x8000, end:0xFF00, color: "#BEF781", kindof:"text" },
                       ".stack": { name:".stack",  begin:0xFFFF, end:0xFFFF, color: "#F1F2A3", kindof:"stack" }
                     };
          ret.mp           = new Object() ;
	  ret.labels	   = new Object() ; // [addr] = {name, addr, startbit, stopbit}
          ret.labels2      = new Object() ;
          ret.assembly     = new Object() ; // This is for the Assembly Debugger...

          // 
          // .segment
          // ...
          // 
          nextToken(context) ;
          while (context.t < context.text.length)
          {
	       var segname = getToken(context);

	       if(typeof ret.seg[segname] == "undefined")
			return langError(context, "Expected .data/.text/... segment but found '" + segname + "' as segment");

	       if("data" == ret.seg[segname].kindof)
			read_data(context, datosCU, ret);
	       if("text" == ret.seg[segname].kindof)
			read_text(context, datosCU, ret);

	       // Check errors
	       if(context.error != null){
	       	       ret.error = context.error;
		       return ret;
	       }
	 }

	 // Check that all used labels are defined in the text
         for (i in ret.labels)
         {
		// Get label value (address number)
		var value = ret.labels2[ret.labels[i].name];

		// Check if the label exists
		if(typeof value === "undefined"){
			return langError(context, "Label '" + ret.labels[i].name + "' used but not defined in the assembly code");
		}	

		// Get the word in memory where the label is used
		var machineCode = ret.mp[ret.labels[i].addr];	

		// TODO: consider two words instruction 

		var size = ret.labels[i].startbit-ret.labels[i].stopbit+1;

		// Translate the address into bits	
		if(isHex(value) !== false){
			var res = decimal2binary(isHex(value), size);
			var num_bits = res[0];
			var num_bits_free_space = res[1];
			if ("rel" == ret.labels[i].rel){
			    num_bits = isHex(value) - ret.labels[i].addr - 4;	
			    res = decimal2binary(num_bits, size);
			    num_bits = res[0];
			    num_bits_free_space = res[1];	    
			}
		}	
 		else return langError(context, "Unexpected error (54)");

		// check size
		if (num_bits_free_space < 0)
			return langError(context, "'" + value + "' needs " + num_bits.length + " bits but there is space for only " + size + " bits");
			
		// Store field in machine code
		var machineCodeAux = machineCode.substring(0, machineCode.length-1-ret.labels[i].startbit+num_bits_free_space);
		machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length-ret.labels[i].stopbit);

		// Update the machineCode
		ret.mp[ret.labels[i].addr] = machineCode; 
	 }	 

	 return ret;
}
