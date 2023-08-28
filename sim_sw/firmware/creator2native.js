/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    /**
     * WepSIM import
     */

   // syscall
   function simlang_native_adapt_replaceSyscall ( icode )
   {
        var rc = '' ;
        var me = '' ;

        // replace syscalls
        var ff = "capi_print_char|capi_print_int|capi_print_float|capi_print_double|capi_print_string|" +
                 "capi_read_char|capi_read_int|capi_read_float|capi_read_double|capi_read_string|" +
                 "capi_sbrk|capi_exit" ;
        var re = new RegExp("(" + ff + ")\\(([^)]*)\\)", 'g') ;

        var match = re.exec(icode) ;
        while (match !== null)
        {
            var f  = match[1].trim() ;
            var p  = match[2].trim().split(",") ;

	    switch (f)
	    {
	       case 'capi_print_char':
                     rc = '// ' + f + ' \n' +
                          '\tvar tmp1 = 0x000000FF & ' + p[0] + ' ;\n' +
                          '\tset_screen_content(tmp1.toString()) ;\n' ;
	             break ;
	       case 'capi_print_int':
                     rc = '// ' + f + ' \n' +
                          '\tset_screen_content(' + p[0] + '.toString()) ;\n' ;
	             break ;
	       case 'capi_print_float':
                     rc = '// ' + f + ' \n' +
                          '\tvar tmp1 = hex2float(' + p[0] + ') ;\n' +
                          '\tset_screen_content(tmp1.toString()) ;\n' ;
	             break ;
	       case 'capi_print_double':
                     // TODO hex2double + hex2float->hex2double
                     rc = '// ' + f + ' \n' +
                          '\tvar tmp1 = hex2float(' + p[0] + ') ;\n' +
                          '\tset_screen_content(tmp1.toString()) ;\n' ;
	             break ;
               case 'capi_print_string':
                     rc = '// ' + f + ' \n' +
                          '\tvar tmp1 = "" ;\n' +
                          '\tvar tmp2 = simcore_native_get_value("MEMORY", ' + p[0] + ') ;\n' +
                          '\tfor (var k=' + p[0] + '+1; (tmp2 !== 0) && (k<8*1024); k++) {\n' +
                          '\t     tmp1 += tmp2.toString() ;\n' +
                          '\t     tmp2  = simcore_native_get_value("MEMORY", k) ;\n' +
                          '\t} ;\n' +
                          '\tset_screen_content(tmp1) ;\n' ;
	             break ;
	       case 'capi_read_char':
                     rc  = '// ' + f + ' \n' +
                           '\tvar tmp1 = get_screen_content() ;\n' +
                           '\tvar ' + p[0] + ' = 0x000000FF & parseInt(tmp1) ;\n' ;
	             break ;
	       case 'capi_read_int':
                     rc  = '// ' + f + ' \n' +
                           '\tvar tmp1 = get_screen_content() ;\n' +
                           '\tvar ' + p[0] + ' = parseInt(tmp1) ;\n' ;
	             break ;
	       case 'capi_read_float':
                     rc  = '// ' + f + ' \n' +
                           '\tvar tmp1 = get_screen_content() ;\n' +
                           '\tvar ' + p[0] + ' = parseFloat(tmp1) ;\n' ;
	             break ;
	       case 'capi_read_double':
                     rc  = '// ' + f + ' \n' +
                           '\tvar tmp1 = get_screen_content() ;\n' +
                           '\tvar ' + p[0] + ' = parseFloat(tmp1) ;\n' ;
	             break ;
	       case 'capi_read_string':
                     rc  = '// ' + f + ' \n' +
                           '\tvar tmp1 = get_screen_content() ;\n' +
                           '\tfor (var k=0; k<' + p[1] + '; k++) {\n' +
                           '\t     simcore_native_set_value("MEMORY", ' + p[0] + '+k, tmp1[k]) ;\n' +
                           '\t} ;\n' ;
	             break ;
	       case 'capi_sbrk': // sbrk(a0, v0);
                     rc  = '// ' + f + ' \n' +
                           '// TODO: _sbrk_(' + p[0] + ', ' + p[1] + ');\n' ;
	             break ;
	       case 'capi_exit': // exit();
                     rc  = '// ' + f + ' \n' +
                           '// exit by setting P.C. register outside text segment\n' +
                           '\tvar pc_name = simhw_sim_ctrlStates_get().pc.state ;\n' +
                           '\tsimcore_native_set_value("CPU", pc_name, 0x00000000) ;\n' ;
	             break ;
	       default:
                     rc = '// ' + f + ' \n' +
                          '// unknown syscall\n' ;
	             break ;
	    }

            me = new RegExp(f + "\\(([^)]*)\\)", 'g') ;
            icode = icode.replace(me, rc) ;
            match = re.exec(icode) ;
        }

        // return (transformed) pseudocode
        return icode ;
   }

   // LO, HI, PC, ...
   function simlang_native_adapt_provideRegister ( icode, reg_log, rf_phy, reg_phy )
   {
        var re = new RegExp(reg_log, "g") ;
        if (icode.search(re) != -1)
        {
            icode = "var " + reg_log + " = simcore_native_get_value('" + rf_phy + "', " + reg_phy + ") ;\n" +
                    icode + '\n' +
                    "simcore_native_set_value('" + rf_phy + "', " + reg_phy + ", " + reg_log + ") ;\n" ;
        }

        return icode ;
   }

   function simlang_native_adapt_providePC ( icode )
   {
        var re = /PC/g ;
        if (icode.search(re) != -1)
        {
            icode = "var pc_name = simhw_sim_ctrlStates_get().pc.state ;\n" +
                    "var PC = simcore_native_get_value('CPU', pc_name) ;\n" +
                    icode +
                    "simcore_native_set_value('CPU', pc_name, PC) ;\n" ;
        }

        return icode ;
   }

   function simlang_native_adapt_replaceIf ( icode )
   {
        // replace IF...
        //      if(Field.2.SIZE<=16){addi rd zero val;}
        //      else{lui at Field.2.(31,16);
        //      ori at at Field.2.(15,0);
        //      add rd rd at;}

        var re = new RegExp("[iI][fF]\\s*\\(([^\\\\)]*)\\)\\s*{([^\\\\}]*)}\\s*[eE][lL][sS][eE]{[^}]*}\\s*", "g") ;
        if (icode.search(re) != -1)
        {
                var match = re.exec(icode) ;
		try
		{
		    // TODO
		    icode = icode.replace(re, '\n') ;
		    // /TODO
		}
		catch (e)
		{
		    console.log("Syntax error that cause a run-time error: " + e.toString()) ;
		    console.log(match) ;
		}
        }

        return icode ;
   }

   function simlang_native_adapt_addInitialTabTab ( lines_code )
   {
        var code_lines ;

        // add initial \t\t...
        code_lines = lines_code.split("\n") ;
        code_lines = code_lines.map(function(x) { return "\t\t" + x; }) ;
        return code_lines.join("\n") ;
   }

   // compount replace + provide
   function simlang_native_adapt_instructionDefinition ( lines_code )
   {
        var code_lines = lines_code.split(";") ;
        if (
             (code_lines.length === 1) &&
             (!lines_code.trim().startsWith("if"))
           )
        {
              lines_code = lines_code + ";\n" ;
        }

        // transform...
        lines_code = simlang_native_adapt_replaceSyscall(lines_code) ;

        lines_code = simlang_native_adapt_provideRegister(lines_code, "HI", "CPU", "'REG_RT2'") ;
        lines_code = simlang_native_adapt_provideRegister(lines_code, "LO", "CPU", "'REG_RT1'") ;
        lines_code = simlang_native_adapt_provideRegister(lines_code, "ra", "BR", "31") ;
        lines_code = simlang_native_adapt_providePC(lines_code) ;

        // add initial \t\t...
        lines_code = simlang_native_adapt_addInitialTabTab(lines_code) ;

        return lines_code ;
   }

   function simlang_native_adapt_getField ( j, rf, reg )
   {
        return "\t\t"+ "var f_" + reg + " = " + "simcore_native_get_field_from_ir(fields, " + j + ") ;\n" +
	       "\t\t"+ "var   " + reg + " = " + "simcore_native_get_value('" + rf + "', f_" + reg + ") ;\n" ;
   }

   function simlang_native_adapt_setField ( j, rf, reg )
   {
        return "\t\t"+ "simcore_native_set_value('" + rf + "', f_" + reg + ", " + reg + ");\n" ;
   }

   function simlang_native_adapt_headerField ( fname, tname, start, stop )
   {
        return "\t" + tname + "(" + start + ":" + stop + ")=" + fname + ",\n" ;
   }

   // (1/4) instruction set -> fetch
   function simlang_native_beginMicrocode ( )
   {
       var o = "" ;

       // fetch
       o += '\n' +
            '#\n' +
            '# WepSIM (https://wepsim.github.io/wepsim/)\n' +
            '#\n' +
            '\n' +
            'firmware_version = 2\n' +
            '\n' +
            '##\n' +
            '## Microcode Section\n' +
            '##\n' +
            '\n' +
            'begin,\n' +
            'native\n' +
            '{\n' +
            '                // (once) initialize BR2 as FP register file\n' +
            '                if (typeof BR2 === "undefined")\n' +
            '                {\n' +
            '                    BR2 = [] ;\n' +
            '                    FCSR = 0 ;\n' +
            '                    for (var i=0; i<32; i++)\n' +
            '                    {\n' +
            '                         BR2[i] = {\n' +
            '                                    name:"R"+i,\n' +
            '                                    verbal:"Register "+i,\n' +
            '                                    visible:true,\n' +
            '                                    nbits:"32",\n' +
            '                                    value:0,\n' +
            '                                    default_value:0,\n' +
            '                                    draw_data:[]\n' +
            '                                  } ;\n' +
            '                    }\n' +
            '                }\n' +
            '\n' +
            '                // fetch\n' +
            '                var addr  = simcore_native_get_value("CPU", "REG_PC") ;\n' +
            '                var value = simcore_native_get_value("MEMORY", addr) ;\n' +
            '\n' +
            '                simcore_native_set_value("CPU", "REG_IR", value) ;\n' +
            '                simcore_native_set_value("CPU", "REG_PC", addr + 4) ;\n' +
            '\n' +
            '                simcore_native_deco() ;\n' +
            '                simcore_native_go_opcode() ;\n' +
            '}\n' ;

       // return 'begin' microcode
       return o ;
   }

   // (2/4) instruction set -> microcode [description + compount (native creator code)]
   function simlang_native_adapt_instructionSet ( instruction_list )
   {
       var o = "" ;

       var gfields = [] ;
       var sfields = [] ;
       var hfields = [] ;

       var io = {} ;
       var line_signature  = "" ;
       var signature_names = "" ;
       var signature_order = "" ;

       for (var i=0; i < instruction_list.length; i++)
       {
            io = instruction_list[i] ;
            var k = 0 ;

            // signature
            line_signature  = io.signatureRaw.replace(/\$/g, "") ;
            signature_names = line_signature.replace(/[\(\)]/g," ").split(" ") ;
            signature_order = [] ;
            for (k=0; k<signature_names.length; k++) {
                 signature_order[signature_names[k]] = k ;
            }

            // fields
            gfields = [] ;
            sfields = [] ;
            hfields = [] ;
            for (j=0; j<io.fields.length; j++)
            {
                 if ( (io.fields[j].type === "co") || (io.fields[j].type === "cop") ) {
                       continue ;
                 }

                 k = signature_order[io.fields[j].name] ;

                 switch (io.fields[j].type)
                 {
                     case "INT-Reg":
                     case "SFP-Reg":
                                     var rf_name = 'BR' ;
                                     if (io.fields[j].type === "SFP-Reg")
                                         rf_name = 'BR2' ;

				     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "reg",
										   io.fields[j].startbit,
                                                                                   io.fields[j].stopbit) ;
				     gfields[k] = simlang_native_adapt_getField(k-1, rf_name, io.fields[j].name) ;
				     sfields[k] = simlang_native_adapt_setField(k-1, rf_name, io.fields[j].name) ;
                                     break ;
                     case "DFP-Reg":
				     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "reg",
										   io.fields[j].startbit,
                                                                                   io.fields[j].stopbit) ;

				     gfields[k] = "\t\t"+ "var f_" + io.fields[j].name + " = " +
						  "simcore_native_get_field_from_ir(fields, " + (k-1) + ") ;\n" +
						  "\t\t"+ "var   " + io.fields[j].name + "1 = " +
						  "simcore_native_get_value('BR2', f_" + io.fields[j].name + "+0) ;\n" +
						  "\t\t"+ "var   " + io.fields[j].name + "2 = " +
						  "simcore_native_get_value('BR2', f_" + io.fields[j].name + "+1) ;\n" +
						  "\t\t"+ "var   " + io.fields[j].name + " = " +
						  "(" + io.fields[j].name + "1) | (" + io.fields[j].name + "2 << 32);\n" ;

				     sfields[k] = "\t\t " + io.fields[j].name + "1 = ((" + io.fields[j].name + " << 32) >> 32);\n" +
						  "\t\t " + io.fields[j].name + "2 = " + io.fields[j].name + "   >> 32;\n" +
						  "\t\t"+ "simcore_native_set_value('BR2', " +
						  "f_" + io.fields[j].name + "+0, " + io.fields[j].name + "1);\n" +
						  "\t\t"+ "simcore_native_set_value('BR2', " +
						  "f_" + io.fields[j].name + "+1, " + io.fields[j].name + "2);\n" ;
                                     break ;
                     case "inm":
				     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "inm",
										   io.fields[j].startbit,
                                                                                   io.fields[j].stopbit) ;

				     gfields[k] = "\t\t" + "var " + io.fields[j].name + " = " +
						  "simcore_native_get_field_from_ir(fields, " + (k-1) + ") ;\n\t" ;
                                     break ;
                 }
            }

            // co_cop
            var co_cop = "\t" + "co=111111," + "\n" ;

            // adapt elements
            var lines_code = simlang_native_adapt_instructionDefinition(io.definition) ;
            if (lines_code.trim() !== "")
            {
                lines_code = "\t\t" + "// instruction specific code" + "\n" +
                             lines_code   + "\n" ;
            }

            var gfields_str = gfields.join("") ;
            if (gfields_str.trim() !== "")
            {
                gfields_str = "\t\t" + "// get fields values..." + "\n" +
                              gfields_str + "\n" ;
            }

            var sfields_str = sfields.join("") ;
            if (sfields_str.trim() !== "")
            {
                sfields_str = "\t\t" + "// set fields values..." + "\n" +
                              sfields_str + "\n" ;
            }

            // compount elements
            o += "\n" +
                 line_signature + " {" + "\n" +
                 co_cop +
                 "\t" + "nwords=" + io.nwords + "," + "\n" +
                        hfields.join("") +
                 "\t" + "native," + "\n" +
                 "\t" + "{\n" +
                           gfields_str + "\n" +
                           lines_code  + "\n" +
                           sfields_str + "\n" +
                 "\t\t"  + "// go fetch" + "\n" +
                 "\t\t"  + "simcore_native_go_maddr(0);" + "\n" +
                 "\t" + "}" + "\n" +
                 "}\n" ;
       }

       return o ;
   }

   // (3/4) instruction set -> MIPS register names
   function simlang_native_registerSection ( register_list )
   {
       var o = "" ;
       var d = "" ;

       // register section
       var index = 0 ;
       for (index=0; index<register_list.length; index++) {
            if (register_list[index].type === 'int_registers')
                break ;
       }

       // register section
       o += '\n' +
            '##\n' +
            '## Register section\n' +
            '##\n' +
            '\n' +
            'registers\n' +
            '{\n' ;

       // register list
       if (typeof register_list[index].elements != "undefined")
       {
           for (var i=0; i<register_list[index].elements.length; i++)
           {
                d = register_list[index].elements[i].name ;
                if (i === 29) {
                    d += ' (stack_pointer)' ;
		}
                o += '\t' + i + '=$' + d + ',\n' ;
           }
       }

       // end section
       o += '}\n' +
            '\n' ;

       // return section
       return o ;
   }

   // (4/4) instruction set -> pseudo-instructions
   function simlang_native_adapt_pseudoInstructions ( pseudoinstruction_list )
   {
       var o = "" ;
       var d = "" ;
       var h = "" ;
       var hn = null ;
       var ht = null ;

       // pseudoInstruction section
       o += '\n' +
            '##\n' +
            '## Pseudo-instruction section\n' +
            '##\n' +
            '\n' +
            'pseudoinstructions\n' +
            '{\n' ;

       // pseudoInstruction list
       for (var i=0; i<pseudoinstruction_list.length; i++)
       {
            // h: header
            hn = pseudoinstruction_list[i].signatureRaw
                                          .replace(/\$/g, "")
                                          .split(" ") ;
            ht = pseudoinstruction_list[i].signature
                                          .replace(/\$/g, "")
                                          .replace(/INT-Reg/g, 'reg')
                                          .replace(/SFP-Reg/g, 'reg')
                                          .replace(/DFP-Reg/g, 'reg')
                                          .split(",") ;
            h  = hn[0] + ' ' ;
            for (var j=1; j<hn.length; j++) {
                 h += hn[j] + '=' + ht[j] + ' ' ;
            }

            // d: code
            d = pseudoinstruction_list[i].definition.replace(/\$/g, "") ;
            d = simlang_native_adapt_replaceIf(d) ;
            //d = simlang_native_adapt_replaceField(d, hn) ;
            d = simlang_native_adapt_addInitialTabTab(d) ;

            // compount
            o += '\t' + h + '\n' +
                 '\t{\n' +
                       d + '\n' +
                 '\t}\n' +
                 '\t\n' ;
       }

       // end section
       o += '}\n' +
            '\n' ;

       // return section
       return o ;
   }

   function simlang_firm_is2native ( data )
   {
       var o = "" ;

       // check params
       if (data === null) {
           return o ;
       }
       if (typeof data === "undefined") {
           return o ;
       }

       // build microcode
       o = simlang_native_beginMicrocode() +
           simlang_native_adapt_instructionSet(data.instructions) +
           simlang_native_registerSection(data.components) +
           simlang_native_adapt_pseudoInstructions(data.pseudoinstructions) ;

       // return microcode
       return o ;
   }

