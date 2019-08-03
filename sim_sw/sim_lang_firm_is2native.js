/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

   // assert
   function simlang_native_adapt_replaceAssert ( icode )
   {
        var rc = '' ;
        var re = '' ;

        // replace assert
        re = /assert\((.*)\)/ ;
        if (icode.search(re) != -1) 
        {
		var match = re.exec(icode) ;
		try
		{
		    var params = match[1].split(";") ;
		    var p1     = params[1].trim() ;

		    rc = 'if (' + params[0] + ') {\n' +
		         '    wepsim_set_screen_content(' + p1 + ') ;\n' +
		         '}\n' ;
		    re = /assert\((.*)\)/g ;
		    icode = icode.replace(re, rc) ;
		}
		catch (e)
		{
		    console.log("Syntax error that cause a run-time error: " + e.toString()) ;
		    console.log(match) ;
		}
        }

        // return (transformed) pseudocode
        return icode ;
   }

   // check_stack_limit
   function simlang_native_adapt_replaceCheckStackLimit ( icode )
   {
        var rc = '' ;
        var re = '' ;

        // replace check_stack_limit
        re = /check_stack_limit\((.*)\)/ ;
        if (icode.search(re) != -1) 
        {
                var match  = re.exec(icode) ;
		try
		{
                    var params = match[1].split(";") ;
                    var p2     = params[2].trim() ;

                    rc = 'if (f_' + p2 + ' == simhw_sim_states().sp.name) {\n' +
                         '    if (' + p2 + ' < sim_segments.data.begin) {\n' +
                         '        wepsim_set_screen_content("Stack Overflow") ;\n' +
                         '    }\n' +
                         '    if (' + p2 + ' > sim_segments.data.end) {\n' +
                         '        wepsim_set_screen_content("Stack Underflow") ;\n' +
                         '    }\n' +
                         '}\n' ;
                    re = /check_stack_limit\((.*)\)/g ;
                    icode = icode.replace(re, rc) ;
		}
		catch (e)
		{
		    console.log("Syntax error that cause a run-time error: " + e.toString()) ;
		    console.log(match) ;
		}
        }

        // return (transformed) pseudocode
        return icode ;
   }

   // syscall
   function simlang_native_adapt_replaceSyscall ( icode )
   {
        var rc = '' ;
        var me = '' ;

        // replace syscalls
        var ff = "print_char|print_int|print_float|print_double|print_string|" +
                 "read_char|read_int|read_float|read_double|read_string|" +
                 "sbrk|exit" ;
        var re = new RegExp("(" + ff + ")\\(([^)]*)\\)", 'g') ;

        var match = re.exec(icode) ;
        while (match !== null)
        {
            var f  = match[1].trim() ;
            var p  = match[2].trim().split(",") ;

	    switch (f) 
	    {
	       case 'print_char':
                     rc = '// ' + f + ' \n' +
                          'var tmp1 = 0x000000FF & ' + p[0] + ' ;\n' +
                          'wepsim_set_screen_content(tmp1.toString()) ;\n' ;
	             break ;
	       case 'print_int':
                     rc = '// ' + f + ' \n' +
                          'wepsim_set_screen_content(' + p[0] + '.toString()) ;\n' ;
	             break ;
	       case 'print_float':
                     rc = '// ' + f + ' \n' +
                          'var tmp1 = hex2float(' + p[0] + ') ;\n' +
                          'wepsim_set_screen_content(tmp1.toString()) ;\n' ;
	             break ;
	       case 'print_double':
                     // TODO hex2double + hex2float->hex2double
                     rc = '// ' + f + ' \n' +
                          'var tmp1 = hex2float(' + p[0] + ') ;\n' +
                          'wepsim_set_screen_content(tmp1.toString()) ;\n' ;
	             break ;
               case 'print_string':
                     rc = '// ' + f + ' \n' +
                          'var tmp1 = "" ;\n' +
                          'var tmp2 = simcore_native_get_value("MEMORY", ' + p[0] + ') ;\n' +
                          'for (var k=' + p[0] + '+1; (tmp2 !== 0) && (k<8*1024); k++) {\n' +
                          '     tmp1 += tmp2.toString() ;\n' +
                          '     tmp2  = simcore_native_get_value("MEMORY", k) ;\n' +
                          '} ;\n' +
                          'wepsim_set_screen_content(tmp1) ;\n' ;
	             break ;
	       case 'read_char':
                     rc  = '// ' + f + ' \n' +
                           'var tmp1 = wepsim_get_screen_content() ;\n' +
                           'var ' + p[0] + ' = 0x000000FF & parseInt(tmp1) ;\n' ;
	             break ;
	       case 'read_int':
                     rc  = '// ' + f + ' \n' +
                           'var tmp1 = wepsim_get_screen_content() ;\n' +
                           'var ' + p[0] + ' = parseInt(tmp1) ;\n' ;
	             break ;
	       case 'read_float':
                     rc  = '// ' + f + ' \n' +
                           'var tmp1 = wepsim_get_screen_content() ;\n' +
                           'var ' + p[0] + ' = parseFloat(tmp1) ;\n' ;
	             break ;
	       case 'read_double':
                     rc  = '// ' + f + ' \n' +
                           'var tmp1 = wepsim_get_screen_content() ;\n' +
                           'var ' + p[0] + ' = parseFloat(tmp1) ;\n' ;
	             break ;
	       case 'read_string':
                     rc  = '// ' + f + ' \n' +
                           'var tmp1 = wepsim_get_screen_content() ;\n' +
                           'for (var k=0; k<' + p[1] + '; k++) {\n' +
                           '     simcore_native_set_value("MEMORY", ' + p[0] + '+k, tmp1[k]) ;\n' +
                           '} ;\n' ;
	             break ;
	       case 'sbrk': // sbrk(a0, v0);
                     rc  = '// ' + f + ' \n' +
                           '// TODO: _sbrk_(' + p[0] + ', ' + p[1] + ');\n' ;
	             break ;
	       case 'exit': // exit();
                     rc  = '// ' + f + ' \n' +
                           '// exit by setting P.C. register outside text segment\n' +
                           'var pc_name = simhw_sim_states().pc.state ;\n' +
                           'simcore_native_set_value("CPU", pc_name, 0x00000000) ;\n' ;
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

   // MP.x.(y+z)
   function simlang_native_adapt_replaceMemoryAccess ( icode, a_type, a_mask )
   {
        // replace MP.*.(val+reg2)
        var re = new RegExp("MP."  + a_type + ".\\(([^\\)]*)\\)", "g") ;
        if (icode.search(re) != -1)
        {
                var match = re.exec(icode) ;
		try
		{
		    var param = match[1] ;

		    icode = icode.replace(re, 'value') ;
		    icode = 'value = simcore_native_get_value("MEMORY", ' + param + ') ;\n' +
			    'value = value & ' + a_mask + ';\n' +
			     icode +
			    'simcore_native_set_value("MEMORY", ' + param + ', value) ;\n' ;
		}
		catch (e)
		{
		    console.log("Syntax error that cause a run-time error: " + e.toString()) ;
		    console.log(match) ;
		}
        }

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
            icode = "var pc_name = simhw_sim_states().pc.state ;\n" +
                    "var PC = simcore_native_get_value('CPU', pc_name) ;\n" +
                    icode +
                    "simcore_native_set_value('CPU', pc_name, PC) ;\n" ;
        }

        return icode ;
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
        lines_code = simlang_native_adapt_replaceAssert(lines_code) ;
        lines_code = simlang_native_adapt_replaceCheckStackLimit(lines_code) ;
        lines_code = simlang_native_adapt_replaceSyscall(lines_code) ;

        lines_code = simlang_native_adapt_provideRegister(lines_code, "HI", "CPU", "'REG_RT2'") ;
        lines_code = simlang_native_adapt_provideRegister(lines_code, "LO", "CPU", "'REG_RT1'") ;
        lines_code = simlang_native_adapt_provideRegister(lines_code, "ra", "BR", "31") ;
        lines_code = simlang_native_adapt_providePC(lines_code) ;

        lines_code = simlang_native_adapt_replaceMemoryAccess(lines_code, "w", "0xFFFFFFFF") ;
        lines_code = simlang_native_adapt_replaceMemoryAccess(lines_code, "h", "0x0000FFFF") ;
        lines_code = simlang_native_adapt_replaceMemoryAccess(lines_code, "b", "0x000000FF") ;

        // add initial \t\t...
        code_lines = lines_code.split("\n") ;
        code_lines = code_lines.map(function(x) { return "\t\t" + x; }) ;
        lines_code = code_lines.join("\n") ;

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
        return "\t" + fname + "=" + tname + "(" + start + "," + stop + "),\n" ;
   }

   // (2/3) instruction set -> microcode [description + compount (native creator code)]
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

                 if (io.fields[j].type === "INT-Reg") 
                 {
                     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "reg", 
                                                                   io.fields[j].startbit, io.fields[j].stopbit) ;
                     gfields[k] = simlang_native_adapt_getField(k-1, 'BR', io.fields[j].name) ;
                     sfields[k] = simlang_native_adapt_setField(k-1, 'BR', io.fields[j].name) ;
                 }
                 else if (io.fields[j].type === "SFP-Reg")
                 {
                     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "reg", 
                                                                   io.fields[j].startbit, io.fields[j].stopbit) ;
                     gfields[k] = simlang_native_adapt_getField(k-1, 'BR2', io.fields[j].name) ;
                     sfields[k] = simlang_native_adapt_setField(k-1, 'BR2', io.fields[j].name) ;
                 }
                 else if (io.fields[j].type === "DFP-Reg")
                 {
                     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "reg", 
                                                                   io.fields[j].startbit, io.fields[j].stopbit) ;

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
                 }
                 else if (io.fields[j].type === "inm")
                 {
                     hfields[k] = simlang_native_adapt_headerField(io.fields[j].name, "inm", 
                                                                   io.fields[j].startbit, io.fields[j].stopbit) ;

                     gfields[k] = "\t\t" + "var " + io.fields[j].name + " = " +
                                  "simcore_native_get_field_from_ir(fields, " + (k-1) + ") ;\n\t" ;
                 }
            }

            // co_cop
            var co_cop = "\t" + "co=" + io.co + "," + "\n" ;
            if ( (io.cop !== null) && (io.cop.trim() !== "") ) {
                  co_cop += "\tcop=" + io.cop + ",\n" ;
            }
            // TODO: comment this when WepSIM adds cop fragments (cop = sumatory of several cops)
            co_cop = "\t" + "co=111111," + "\n" ;
            // /TODO

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
                           gfields_str +
                           lines_code +
                           sfields_str +
                 "\t\t"  + "// go fetch" + "\n" +
                 "\t\t"  + "simcore_native_go_maddr(0);" + "\n" +
                 "\t" + "}" + "\n" +
                 "}\n" ;
       }

       return o ;
   }

   // (1/3) instruction set -> fetch
   function simlang_native_beginMicrocode ( )
   {
       var o = "" ;

       // fetch
       o += '\n' +
            'begin,\n' +
            'native\n' +
            '{\n' +
            '                // (once) initialize BR2 as FP register file\n' +
            '                if (typeof BR2 === "undefined")\n' +
            '                {\n' +
            '                    BR2 = [] ;\n' +
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

       // return initial microcode
       return o ;
   }

   // (3/3) instruction set -> MIPS register names
   function simlang_native_endMicrocode ( )
   {
       var o = "" ;

       // register naming
       o += '\n' +
            '#\n' +
            '# Register naming\n' +
            '#\n' +
            '\n' +
            'registers\n' +
            '{\n' +
            '        0=$zero,\n' +
            '        1=$at,\n' +
            '        2=$v0,\n' +
            '        3=$v1,\n' +
            '        4=$a0,\n' +
            '        5=$a1,\n' +
            '        6=$a2,\n' +
            '        7=$a3,\n' +
            '        8=$t0,\n' +
            '        9=$t1,\n' +
            '        10=$t2,\n' +
            '        11=$t3,\n' +
            '        12=$t4,\n' +
            '        13=$t5,\n' +
            '        14=$t6,\n' +
            '        15=$t7,\n' +
            '        16=$s0,\n' +
            '        17=$s1,\n' +
            '        18=$s2,\n' +
            '        19=$s3,\n' +
            '        20=$s4,\n' +
            '        21=$s5,\n' +
            '        22=$s6,\n' +
            '        23=$s7,\n' +
            '        24=$t8,\n' +
            '        25=$t9,\n' +
            '        26=$k0,\n' +
            '        27=$k1,\n' +
            '        28=$gp,\n' +
            '        29=$sp (stack_pointer),\n' +
            '        30=$fp,\n' +
            '        31=$ra\n' +
            '}\n' +
            '\n' ;

       // return initial microcode
       return o ;
   }

   function simlang_firm_is2native ( data )
   {
       if (data === null) {
           return "" ;
       }

       // build microcode
       var  o = "" ;
            o += simlang_native_beginMicrocode() ;
            o += simlang_native_adapt_instructionSet(data.instructions) ;
            o += simlang_native_endMicrocode() ;

       // return microcode
       return o ;
   }

