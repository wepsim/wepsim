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
 *   Constants
 */

	const BYTE_LENGTH = 8;

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
	if (n.length > 1 && n[0] == "0") 
            return false;
        
	if ( !isNaN(parseFloat(n)) && isFinite(n) ){
		var res = parseInt(n);
		if (typeof n == "string" && n.includes(".")) 
			alert("Truncating conversion has occurred: " + n + " became " + res);
		return res;
	}

	return false;
}

function isOctal ( n )
{
	if (n.substring(0,1) == "0"){
		var octal = n.substring(1).replace(/\b0+/g, '');
                var aux = parseInt(octal,8);
                return (aux.toString(8) === octal) ? aux : false;
        }

        return false;
}

function isHex ( n )
{
        if (n.substring(0,2).toLowerCase() == "0x"){
		var hex = n.substring(2).toLowerCase().replace(/\b0+/g, '');
                if (hex == "") hex = "0";
		var aux = parseInt(hex,16);
                return (aux.toString(16) === hex) ? aux : false;
        }

        return false;
}

function isChar ( n )
{
	if (n[0] == "'" && n[2] == "'")
	    return n.charCodeAt(1);
	return false;
}

function decimal2binary(number, size)
{
	var num_bits = number.toString(2);
	if(num_bits.length > 32)
		return [num_bits, size-num_bits.length];		

	num_bits = (number >>> 0).toString(2);
	if (number >= 0)
            return [num_bits, size-num_bits.length];

	num_bits = "1" + num_bits.replace(/^[1]+/g, "");
	if (num_bits.length>size)
	    return [num_bits, size-num_bits.length];

	num_bits = "1".repeat(size-num_bits.length) + num_bits;
	return [num_bits, size-num_bits.length];
}

function isValidTag ( tag )
{
	if (!(isDecimal(tag[0]) === false))
		return false;
	var myRegEx  = /[^a-z\d]/i;
	return !(myRegEx.test(tag));
}

function sum_array ( a )
{
	return a.reduce(function(a, b) { return a + b; }, 0);
}

function get_candidate ( advance, instruction )
{
	var candidate = false;
	var candidates = new Object();
	var signatures = new Object();

	for (i=0; i<advance.length; i++)
        {
		if (advance[i]) {
			candidates[i] = instruction[i].nwords;
			signatures[instruction[i].signature] = 0;
		}
	}

	if (Object.keys(signatures).length == 1)
        {
		var min = false;
		for (i in candidates)
                {
			if (min == false) {
				min = candidates[i];
				candidate = i;
			}
			else if (min == candidates[i]) {
                                 candidate = false;
			}
			else if (min > candidates[i]) {
				min = candidates[i];
				candidate = i;
			} 
		}	
	}

	return candidate ? parseInt(candidate) : candidate;
}

function reset_assembly(nwords)
{
	return "0".repeat(32*nwords);		
}

function assembly_replacement(machineCode, num_bits, startbit, stopbit, free_space)
{
	var machineCodeAux = machineCode.substring(0, machineCode.length-startbit+free_space);
	machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length-stopbit);	

	return machineCode; 
}

function assembly_co_cop(machineCode, co, cop)
{		
	if (co !== false) 
	    machineCode = assembly_replacement(machineCode, co, 32, 26, 0); 	
	if (cop !== false)
	    machineCode = assembly_replacement(machineCode, cop, 4, 0, 0);

	return machineCode;
}

function writememory_and_reset ( mp, gen, nwords )
{
	if (gen.byteWord >= 4) 
        {
	    mp["0x" + gen.seg_ptr.toString(16)] = gen.machineCode ;               			

            gen.seg_ptr     = gen.seg_ptr + 4 ;
            gen.byteWord    = 0 ;
            gen.machineCode = reset_assembly(nwords) ;
        }
}


/*
 *   Load segments
 */

function read_data ( context, datosCU, ret )
{
           var seg_name = getToken(context) ;

	   var gen = new Object();
	   gen.byteWord = 0;
	   gen.machineCode = reset_assembly(1);
           gen.seg_ptr = ret.seg[seg_name].begin ;

	   // 
	   //  .data
	   //  *.text*
	   // 

           nextToken(context) ;

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

                      // check tag
		      if ("TAG" != getTokenType(context))
			  return langError(context, "Expected tag or directive but found '" + possible_tag + "' instead" ) ;
		  
		      var tag = possible_tag.substring(0, possible_tag.length-1); 

   		      if (!isValidTag(tag))
			  return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + tag + "' instead");
		      if (context.firmware[tag])
			  return langError(context, "A tag can not have the same name as an instruction (" + tag + ")");
		      if (ret.labels2[tag])
			  return langError(context, "Repeated tag: '" + tag + "'");

		      // Store tag
		      ret.labels2[tag] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16);

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
				var label_found = false;
		
				if ((number=isOctal(possible_value)) !== false); // Octal value 072
				else if ((number=isHex(possible_value)) !== false); // Hex value 0xF12
				else if ((number=isDecimal(possible_value)) !== false); // Decimal value 634
				else if ((number=isChar(possible_value)) !== false); // Char value 'a'

				// Error	
				else{
					if (".word" == possible_datatype){
						if (!isValidTag(possible_value))
							return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + possible_value + "' instead");
						if (context.firmware[possible_value])
							return langError(context, "A tag can not have the same name as an instruction (" + possible_value + ")");
						number = 0;
						label_found = true;	
					}
					else return langError(context, "Expected value for numeric datatype but found '" + possible_value + "' instead");
				}

				// Get value size in bytes
				var size = get_datatype_size(possible_datatype);

				// Decimal --> binary	
			        var a = decimal2binary(number, size*BYTE_LENGTH);
			        num_bits = a[0] ;
                                free_space = a[1] ;

				// Check size
				if (free_space < 0)
					return langError(context, "Expected value that fits in a '" + possible_datatype + "' (" + size*BYTE_LENGTH + " bits), but inserted '" + possible_value + "' (" + num_bits.length + " bits) instead");

				// Word filled
                                writememory_and_reset(ret.mp, gen, 1) ;

				// Align to size
				while (((gen.seg_ptr+gen.byteWord)%size) != 0)
                                {
					gen.byteWord++;
					// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;
				}	
	
		                // Store tag
                                if ("" != possible_tag){
		                    ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16);
				    possible_tag = "";
				}
				
				// Label as number (later translation)
				if (label_found)
					ret.labels["0x" + gen.seg_ptr.toString(16)] = { name:possible_value, 
											addr:gen.seg_ptr, 
											startbit:31, 
											stopbit:0, 
											rel:undefined, 
											nwords:1, 
											labelContext:getLabelContext(context) };
					
				// Store number in machine code
				gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH*(size+gen.byteWord), BYTE_LENGTH*gen.byteWord, free_space); 		
				gen.byteWord+=size;

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) || "." == getToken(context)[0] )
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
			if (possible_value < 0)
			     return langError(context, "Expected positive number but found '" + possible_value + "' as positive number");

			// Fill with spaces
			for (i=0; i<possible_value; i++)
                        {
				// Word filled
                                writememory_and_reset(ret.mp, gen, 1) ;
				gen.byteWord++;
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
                        writememory_and_reset(ret.mp, gen, 1) ;

			// Calculate offset
                        var align_offset = Math.pow(2,parseInt(possible_value)) ;
                   
			switch (align_offset) {
				case 1:
					break;
				case 2:
					if (gen.byteWord & 1 == 1)
						gen.byteWord++;
					break;
				default:
					// Fill with spaces
					while (true)
                                        {
						// Word filled
                                                writememory_and_reset(ret.mp, gen, 1) ;
						if (gen.seg_ptr%align_offset == 0 && gen.byteWord == 0)
							break;	
						gen.byteWord++;
					}	
			}

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
                                writememory_and_reset(ret.mp, gen, 1) ;

				// check string
				if ("" == possible_value)
					return langError(context, "String is not closed (forgot to end it with quotation marks)")
		                if ("STRING" != getTokenType(context))
				    	return langError(context, "Expected string between quotation marks but found '" + possible_value + "' instead");

				// process characters of the string
				for (i=0; i<possible_value.length; i++)
                                {
					// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;

					if (possible_value[i] == "\"") continue;			
	
					switch (possible_value[i])
                                        {
						case "\\":
							switch (possible_value[i+1])
                                                        {
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
						default:
							num_bits = possible_value.charCodeAt(i).toString(2);
					}	
	
					// Store character in machine code
					gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH*(1+gen.byteWord), BYTE_LENGTH*gen.byteWord, BYTE_LENGTH-num_bits.length); 	
					gen.byteWord++;
				}

                                if (".asciiz" == possible_datatype)
                                {
                                	// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;
					
					num_bits = "\0".charCodeAt(0).toString(2);
			
					// Store field in machine code
					gen.machineCode = assembly_replacement(gen.machineCode, num_bits, BYTE_LENGTH*(1+gen.byteWord), BYTE_LENGTH*gen.byteWord, BYTE_LENGTH-num_bits.length); 	
					gen.byteWord++;
				}

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) || "." == getToken(context)[0] )
				     break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = getToken(context);
                        }
		   }
		   else
		   {
		        return langError(context, "Unexpected datatype name '" + possible_datatype );
		   }
		   
		   if (context.t >= context.text.length) break;
           }

	   // Fill memory
	   if (gen.byteWord > 0){
		ret.mp["0x" + gen.seg_ptr.toString(16)] = gen.machineCode ;
                gen.seg_ptr = gen.seg_ptr + 4 ;
	   }		

           ret.seg[seg_name].end = gen.seg_ptr ;  // end of segment is just last pointer value...
}

function read_text ( context, datosCU, ret )
{
	   // 
	   //  .text
	   // 

           var seg_name = getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // get firmware and pseudoinstructions
	   var firmware = context.firmware;
	   var pseudoInstructions = context.pseudoInstructions;  
	   var isPseudo = false;
	   var counter = -1; 

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
		while (!isPseudo && typeof firmware[getToken(context)] == "undefined") 
                {
			var possible_tag = getToken(context);
	
			// check tag		
		        if ("TAG" != getTokenType(context)) 
				return langError(context, "Expected tag or instruction but found '" + possible_tag + "' instead" ); 
	
		        var tag = possible_tag.substring(0, possible_tag.length-1); 
   		        if (!isValidTag(tag))
				return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + tag + "' instead");
			if (firmware[tag])
				return langError(context, "A tag can not have the same name as an instruction (" + tag + ")");
			if (ret.labels2[tag])
				return langError(context, "Repeated tag: '" + tag + "'");

			// store tag
			ret.labels2[tag] = "0x" + seg_ptr.toString(16);

			nextToken(context);

			if (context.t >= context.text.length) 
                            return langError(context, "Unexpected end of file");
		}

		// get instruction
		if(!isPseudo){
			var instruction = getToken(context);
			var finish = [];
		}
		else
			var instruction = finish[candidate][counter++];

		var signature_fields = [];		// e.g. [[reg,reg], [reg,inm], [reg,addr,inm]]
		var signature_user_fields = [];		// signature user fields
		var advance = [];			// array that indicates wheather each signature can be considered or not
		var max_length = 0;			// max number of parameters of the signatures
		var binaryAux = [];			// necessary parameters of the fields of each signature		

		// Fill parameters
		for (i=0; i<firmware[instruction].length; i++)
		{
			signature_fields[i] = firmware[instruction][i].signature.split(",");
			signature_user_fields[i] = firmware[instruction][i].signatureUser.split(" ");
			signature_fields[i].shift();
			signature_user_fields[i].shift();
			advance[i] = 1;
			binaryAux[i] = [];
			max_length = Math.max(max_length, signature_fields[i].length);

			// pseudoinstruction
			if (pseudoInstructions[instruction]){
				finish[i] = firmware[instruction][i].finish.replace(/ ,/g,"").replace(/num/g,"inm").split(" ");
				finish[i].pop();
				isPseudo = true;
				var npseudoInstructions = 0;
				var pseudo_fields = new Object;
			}
		}

		// Iterate over fields
		var s = [];
                s[0] = instruction;
		for (i=0; i<max_length; i++)
                {
                        // get next field
			if(counter == -1){
				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);
				var value = getToken(context);
			}	
			else{
				var aux_fields = finish[candidate][counter++];
				if(pseudo_fields[aux_fields])
					var value = pseudo_fields[aux_fields];
				else
					var value = aux_fields;
			}

			var converted;

			if ("TAG" != getTokenType(context) && !firmware[value]) s[i+1] = value ;
				
			// vertical search (different signatures)
			for (j=0; j<advance.length; j++){

				// check whether explore this alternative 
				if (advance[j] == 0)
					continue;
				if (i >= signature_fields[j].length){
					// if next token is not instruction or tag
					if ("TAG" != getTokenType(context) && !firmware[value])
						advance[j] = 0;
					continue;
				}

				// get field information
				var field = firmware[instruction][j].fields[i];
				var size = field.startbit-field.stopbit+1;

				var label_found = false;
				var sel_found = false;

				// check field	
				switch(field.type)
                	        {	
					// 0xFFFFF,... | 23, 'b', ...
					case "address":
					case "inm":
						if (isPseudo && "sel" == value){
							counter++;
							var start = finish[candidate][counter++];
							var stop = finish[candidate][counter++];
			 				var value = pseudo_fields[finish[candidate][counter++]];
							counter++;
							sel_found = true;
						}
		
						if ((converted = isOctal(value)) !== false);
						else if ((converted = isHex(value)) !== false);	
						else if ((converted = isDecimal(value)) !== false);
						else if ((converted = isChar(value)) !== false);
						else{
							if (!isValidTag(value)){
								var error = "A tag must follow an alphanumeric format (starting with a letter) but found '" + value + "' instead";
								advance[j] = 0;
								break;
							}
							if (firmware[value]){
								var error = "A tag can not have the same name as an instruction (" + value + ")";
								advance[j] = 0;
								break;
							}
							label_found = true;
						}
				
						if(sel_found){							
							res = decimal2binary(converted, 32);
							if(res[1] < 0)
								return langError(context, "'" + value + "' is bigger than 32 bits");
							converted = "0".repeat(res[1]) + res[0];	
							converted = converted.substring(32-start-1, 32-stop);
							converted = parseInt(converted, 2);
							s[i+1] = "0x" + converted.toString(16);
						}

						if (!label_found){
							var res = decimal2binary(converted, size);
							if (field.type == "address" && "rel" == field.address_type)
								res = decimal2binary(converted - seg_ptr - 4, size);	
						}
						
						break;
					// $1...
					case "reg":
						var aux = false;
						if ("(" == value){
							if ("(reg)" != signature_fields[j][i]){
								var error = "Expected register but found register beween parenthesis";
								advance[j] = 0;
								break;
							}

 							if(counter == -1){
								nextToken(context);
								value = getToken(context);
							}
							else
                                        			value = pseudo_fields[finish[candidate][counter++]];
							aux = true;
						}
						else{
							if ("(reg)" == signature_fields[j][i]){
								var error = "Expected register between parenthesis but found '" + value + "' instead";
								advance[j] = 0;
								break;
							}
						}
						if (typeof registers[value] == "undefined"){	
							var error = "Expected register ($1, ...) but found '" + value + "' instead";
							advance[j] = 0;
							break;
						}
						if (aux){
							s[i+1] = "(" + value + ")";
							
							if(counter == -1){
								nextToken(context);
								aux = getToken(context);
							}
							else
								aux = finish[candidate][counter++];

							if (")" != aux){
								var error = "String without end parenthesis ')'";
								advance[j] = 0;
								break;
							}
						}
						converted = isDecimal(registers[value]);
						var res = decimal2binary(converted, size);
						break;
					default:
						return langError(context, "An unknown error ocurred (53)");	
				}

				// check if bits fit in the space
				if (advance[j] == 1 && !label_found){
					if (res[1] < 0){
						if (field.type == "address" && "rel" == field.address_type)
							error = "Relative value (" + (converted - seg_ptr - 4) + " in decimal) needs " + res[0].length + " bits but there is space for only " + size + " bits";
						else var error = "'" + value + "' needs " + res[0].length + " bits but there is space for only " + size + " bits";
						advance[j] = 0;						
					}
				}	

				// store field
				if (advance[j] == 1 && (!(isPseudo && counter == -1))){
					binaryAux[j][i] = {
                                                num_bits:(label_found ? false : res[0]), 
                                                free_space:(label_found ? false : res[1]), 
                                                startbit:field.startbit, 
                                                stopbit:field.stopbit, 
                                                rel:(label_found ? field.address_type : false), 
                                                islabel:label_found, 
						field_name: value 
                                	};
				}
			}
		
			if (sum_array(advance) == 0) break;

			if ("TAG" == getTokenType(context) || firmware[value]) break;	
		}

		// get candidate
		var candidate;
		for (i=0; i<advance.length; i++)
			if (advance[i] == 1) candidate = i;

		// instruction format
		var format = "";
		for (i=0; i<firmware[instruction].length; i++){
			if (i>0 && i<firmware[instruction].length-1)
				format += ", ";
			if (i>0 && i==firmware[instruction].length-1)
				format += " or ";
			format += "'" + firmware[instruction][i].signatureUser + "'";
		} 

		// check solution
		var sum_res = sum_array(advance);	
		if (sum_res == 0){
			// No candidate
			if (advance.length == 1)
				return langError(context, error + ". Remember that the instruction format has been defined as: " + format);	
			return langError(context, "Instruction and fields don't match with microprogram. Remember that the instruction formats have been defined as: " + format + ". Please check the microcode. Probably you forgot to add a field, a number does not fit in its space, or you just used a wrong instruction");
		}
		if (sum_res > 1){
			// Multiple candidates
			candidate = get_candidate(advance, firmware[instruction]);
			if (candidate === false) return langError(context, "Instruction and fields match with more than one microprogram. Please check the microcode. Currently, the instruction format can be: " + format);
		}

		// store pseudo_fields[field]=value, and continue 
		if (isPseudo){
			if(counter == -1){
				var s_ori = "";
				for (i=0; i<s.length; i++)
					s_ori = s_ori + s[i] + " " ;
				s_ori = s_ori.substring(0,s_ori.length-1);	 
				for(i=0; i<signature_fields[candidate].length; i++){
					pseudo_fields[signature_fields[candidate][i]] = s[i+1];
				}
				counter++;
				continue;
			}
			else npseudoInstructions++;
			if(npseudoInstructions > 1) 
				s_ori = "&nbsp;"; // s_ori = "---"; 
			if(finish[candidate][counter] == "\n")
				counter++;
		}

		var machineCode = reset_assembly(firmware[instruction][candidate].nwords);

		// replace CO and COP in machine code
		machineCode = assembly_co_cop(machineCode, firmware[instruction][candidate].co, firmware[instruction][candidate].cop);
	
		// store candidate fields in machine code
		for (i=0; i<binaryAux[candidate].length; i++){
			// tag
			if (binaryAux[candidate][i].islabel)
				ret.labels["0x" + seg_ptr.toString(16)] = { 	name:binaryAux[candidate][i].field_name, 
										addr:seg_ptr,
										startbit:binaryAux[candidate][i].startbit,
										stopbit:binaryAux[candidate][i].stopbit,
										rel:binaryAux[candidate][i].rel,
										nwords:firmware[instruction][candidate].nwords,
										labelContext:getLabelContext(context) };
			// replace instruction and fields in machine code
			else
				machineCode = assembly_replacement(	machineCode,
									binaryAux[candidate][i].num_bits,
									binaryAux[candidate][i].startbit-(-1), 
									binaryAux[candidate][i].stopbit,
									binaryAux[candidate][i].free_space);	
		}

		// fix instruction format
		s_def = s[0];
		for (i=0, j=1; i<signature_user_fields[candidate].length; i++, j++){
			switch(signature_user_fields[candidate][i]){
				case "address":
				case "inm":
				case "reg":
				case "(reg)":
					s_def = s_def + " " + s[j];
					break;
				default:
					s_def = s_def + " " + s[j] + s[j+1];
					j++;
			}		
		}

		if(!isPseudo)
			var s_ori = s_def;

		// process machine code with several words...
		for (i=firmware[instruction][candidate].nwords-1; i>=0; i--)
                {
			if (i<firmware[instruction][candidate].nwords-1) s_def="---";
			ret.assembly["0x" + seg_ptr.toString(16)] = { breakpoint:false, binary:machineCode.substring(i*32, (i+1)*32), source:s_def, source_original:s_ori } ; 
			ret.mp["0x" + seg_ptr.toString(16)] = machineCode.substring(i*32, (i+1)*32) ;
                	seg_ptr = seg_ptr + 4 ;
		}
	
		if (!isPseudo && max_length == signature_fields[candidate].length)
			nextToken(context);

		// pseudoinstruction finished
		if(isPseudo && counter == finish[candidate].length){
			counter = -1;
			npseudoInstructions = 0;
			isPseudo = false;
			nextToken(context);
		}

		if (context.t >= context.text.length) break;
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
	   context.firmware = new Object() ;
	   context.pseudoInstructions = new Object();
	   
	   // fill firmware
	   for (i=0; i<datosCU.firmware.length; i++)
           {
		var aux = datosCU.firmware[i];

	   	if (typeof context.firmware[aux.name] == "undefined")
	   	    context.firmware[aux.name] = new Array();

	   	context.firmware[aux.name].push({ name:aux.name,
							  nwords:parseInt(aux.nwords), 
							  co:(typeof aux.co != "undefined" ? aux.co : false),
							  cop:(typeof aux.cop != "undefined" ? aux.cop : false),
							  fields:(typeof aux.fields != "undefined" ? aux.fields : false),
							  signature:aux.signature,
							  signatureUser:(typeof aux.signatureUser != "undefined" ? aux.signatureUser : aux.name ),
							  isPseudoinstruction:false  });
	   }
	
	   // fill pseudoinstructions
	   for (i=0; i<datosCU.pseudoInstructions.length; i++)
	   {
		var initial = datosCU.pseudoInstructions[i].initial;
		var finish = datosCU.pseudoInstructions[i].finish;	

		if (typeof context.pseudoInstructions[initial.name] == "undefined"){
		    context.pseudoInstructions[initial.name] = 0;
		    context.firmware[initial.name] = new Array();
		}

		context.pseudoInstructions[initial.name]++;
                context.firmware[initial.name].push({ 	name:initial.name, 
							fields:(typeof initial.fields != "undefined" ? initial.fields : false),
							signature:initial.signature,
							signatureUser:initial.signature.replace(/,/g," "),
							finish:finish.signature,
							isPseudoinstruction:true });
	   }

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

	       if (typeof ret.seg[segname] == "undefined")
			return langError(context, "Expected .data/.text/... segment but found '" + segname + "' as segment");

	       if ("data" == ret.seg[segname].kindof)
			read_data(context, datosCU, ret);
	       if ("text" == ret.seg[segname].kindof)
			read_text(context, datosCU, ret);

	       // Check errors
	       if (context.error != null){
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
		if (typeof value === "undefined"){
			setLabelContext(context, ret.labels[i].labelContext);
			return langError(context, "Label '" + ret.labels[i].name + "' used but not defined in the assembly code");
		}	

		// Get the words in memory (machine code) where the label is used
		var machineCode = "";
		var auxAddr = ret.labels[i].addr;		
		for (j=0; j<ret.labels[i].nwords; j++){
			machineCode = ret.mp["0x" + auxAddr.toString(16)] + machineCode;
			auxAddr += 4;
		}

		var size = ret.labels[i].startbit-ret.labels[i].stopbit+1;
		var converted;

		// Translate the address into bits	
		if ((converted = isHex(value)) !== false){
			var a = decimal2binary(converted, size);
			num_bits = a[0] ;
                        free_space = a[1] ;
			var error = "'" + ret.labels[i].name + "' needs " + num_bits.length + " bits but there is space for only " + size + " bits";
			if ("rel" == ret.labels[i].rel){
			    var a = decimal2binary(converted - ret.labels[i].addr - 4, size);
			    num_bits = a[0] ;
                            free_space = a[1] ;
			    error = "Relative value (" + (converted - ret.labels[i].addr - 4) + " in decimal) needs " + num_bits.length + " bits but there is space for only " + size + " bits";
			}
		}	
 		else return langError(context, "Unexpected error (54)");

		// check size
		if (free_space < 0) {
		    setLabelContext(context, ret.labels[i].labelContext);
                    return langError(context, error);
                }
			
		// Store field in machine code
		machineCode = assembly_replacement(machineCode, num_bits, ret.labels[i].startbit-(-1), ret.labels[i].stopbit, free_space);

		// process machine code with several words...
		auxAddr = ret.labels[i].addr;
		for (j=ret.labels[i].nwords-1; j>=0; j--)
                {
			ret.mp["0x" + auxAddr.toString(16)] = machineCode.substring(j*32, (j+1)*32) ;
                	auxAddr += 4 ;
		}
	 }	 

	 // check if main or kmain in assembly code
	 if ( (typeof ret.labels2["main"] == "undefined" ) && (typeof ret.labels2["kmain"] == "undefined" ) )
		return langError(context, "Tags 'main' or 'kmain' are not defined in the assembly code");
	
	 return ret;
}

