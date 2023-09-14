/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    i18n.eltos.compiler.en = {

           // assembly
	   "PROBLEM AROUND LINE":  "Problem around line",
	   "NO TAG OR DIRECTIVE":  "Not a valid tag (e.g.: tag1:) or directive (e.g.: .data), found ",
	   "NO TAG, DIR OR INS":   "Not a valid tag (e.g.: tag1:) directive (e.g.: .data) or instruction, found ",
           "INVALID TAG FORMAT":   "A tag must follow an alphanumeric format, starting with a letter or underscore (e.g.: _tag1:) but found ",
           "TAG OR INSTRUCTION":   "A tag can not have the same name as an instruction ",
           "REPEATED TAG":         "Repeated tag ",
           "NO NUMERIC DATATYPE":  "Expected value for numeric datatype but found ",

           "NO POSITIVE NUMBER":   "Expected a positive number but found ",
	   "NO NUMBER OF BYTES":   "Expected number of bytes to reserve in .space but found ",
           "INVALID ALIGN VALUE":  "Expected the align parameter as positive number but found ",
           "REMEMBER ALIGN VAL":   "Remember that number is the power of two for alignment, see MIPS documentation.",
           "NOT CLOSED STRING":    "String is not closed (forgot to end it with quotation marks)",
           "NO QUOTATION MARKS":   "Expected string between quotation marks but found ",
           "UNEXPECTED DATATYPE":  "Unexpected datatype name ",
           "INVALID SEGMENT NAME": "Expected segment name (e.g.: .data/.text/...) but found ",
           "NO MAIN OR KMAIN":     "Tags 'main' or 'kmain' are not defined in the text segment(s). " +
                                   "It is compulsory to define at least one of those tags in order to execute a program",
           "UNKNOWN 1":            "An unknown error ocurred (1) for field type ",
           "UNKNOWN 2":            "Unexpected error (2)",
           "REMEMBER FORMAT USED": "This is the instruction format used for ",
           "REMEMBER I. FORMAT":   "Remember that the instruction format has been defined as ",
           "SEVERAL CANDIDATES":   "Instruction and fields match with more than one instruction in microcode. " +
                                   "Please check the microcode. Currently, the instruction format can be ",
           "NOT MATCH FORMAT":     "Instruction and fields don't match with defined format(s) ",
           "NOT MATCH MICRO":      "Instruction and fields don't match with microprogram. ",
           "CHECK MICROCODE":      "Please check the microcode. ",
           "CHECKS":               "You might forgot to add/remove a field, a number is out of range, a wrong instruction was used, etc.",
           "LABEL NOT DEFINED":    "Label used but not defined in the assembly code ",
           "INS. MISSING FIELD":   "Missing field in the instruction",
           "UNEXPECTED (REG)":     "Expected register but found register between parenthesis.",
           "EXPECTED (REG)":       "Expected register between parenthesis but found ",
           "EXPECTED REG":         "Expected valid register (e.g.: $1/$a0/...) but found ",
           'UNKNOWN ESCAPE CHAR':  'Unknown escape char',
           'SPACE FOR # BITS':     " bits in binary but there is space for only ",
           'NEEDS':                ' needs ',
           'UNKNOWN MC FORMAT':    "(unknown format in microcode)",

           // microcode
           "LABEL NOT FOUND":        "Expected '<label>:' not found, found token ",
           "REPEATED LABEL":         "Label is repeated ",
           "INVALID LABEL FORMAT":   "Label format is not valid for ",
           "OPEN BRACE NOT FOUND":   "Expected '{' not found",
           "CLOSE BRACE NOT FOUND":  "Expected '}' not found",
           "OPEN PAREN. NOT FOUND":  "Expected '(' not found",
           "CLOSE PAREN. NOT FOUND": "Expected ')' not found",
           "COMMA NOT FOUND":        "Expected ',' not found",
           "EQUAL NOT FOUND":        "Expected '=' not found",
           "SIGNAL NOT EXISTS":      "Signal does not exists ",
           "SIGNAL NO DIRECTLY":     "signal cannot be used directly, please use the Control Unit signals instead.",
           "INCORRECT BIN. FORMAT":  "Incorrect binary format ",
           "OUT OF RANGE":           "Value out of range ",
	   "EMPTY MICROCODE":        "Empty microcode",
           "EMPTY NAME LIST":        "Empty name list for register: x=[]",
	   "DUPLICATE SP":           "Duplicate definition of stack pointer",
	   "NO SP":                  "Expected stack_pointer token not found",
	   "UNDEF. INSTR.":          "Undefined instruction ",
           "MORE 100 FIELDS":        "More than 100 fields in a single instruction.",
	   "CO AS FIELD NAME":       "Instruction field has 'co' as name.",
	   "NW AS FIELD NAME":       "Instruction field has 'nwords' as name.",
	   "NO CO FIELD":            "Expected keyword 'co' not found",
           "INCORRECT CO BIN.":      "Incorrect binary format on 'co' field ",
           "INCORRECT COP BIN.":     "Incorrect binary format on 'cop' field ",
           "INVALID PARAMETER":      "Invalid parameter ",
           "ALLOWED PARAMETER":      "It only allows the following fields: reg, num, inm, addr, address",
           "MISSING TOKEN ON":       "'token' is missing after '(' on ",
           "MISSING ) ON":           "')' is missing on ",
           "CO ALREADY USED":        "'co' is already been used by ",
           "CO+COP ALREADY USED":    "'co+cop' is already been used by ",
           "NO NWORDS":              "Expected keyword 'nwords' not found",
           "INCORRECT ADDRESSING":   "Type of addressing incorrect (abs or rel)",
           "UNEXPECTED FIELD":       "Unexpected field found ",
           "CHECK ORDER":            "Please check the order of the fields",
           "STARTBIT OoR":           "startbit out of range ",
           "STOPBIT OoR":            "stopbit out of range ",
           "OVERLAPPING FIELD":      "Overlapping field ",
           "BAD COP BIN. LEN.":      "Incorrect binary length for 'cop' field ",
           "SP NOT DEFINED":         "Stack pointer register was not defined",
           "NO LABEL FETCH":         "Label 'fetch' not defined",
           "NO LABEL BEGIN":         "'begin' not found",
           "NO CO CODES":            "There is not enough 'co' codes available for instructions",
           "NO LABEL MADDR":         "MADDR label not found ",
           "INS. NAME":              "Instruction name: ",
           "NOT VALID FOR":          "is not valid for ",
           "BIGGER THAN":            "is bigger than ",
           "BITS":                   "bits",
           "EXPECTED VALUE":         "Expected value that fits in a '",
           "BUT INSERTED":           "but inserted ",
           "INSTEAD":                "instead",

           "BAD EOC BIN. LEN.":				"bad eoc binary length",
           "BIT OoR":					"bit OoR",
           "COLON NOT FOUND":				"colon not found",
           "COLON OR PIPE NOT FOUND":			"colon or pipe not found",
           "INCORRECT EOC BIN.":			"incorrect eoc binary",
           "INCORRECT OC BIN.":				"incorrect oc binary",
           "NO FIELD":					"no field",
           "NO OC FIELD":				"no oc field",
           "OC ALREADY USED":				"oc already used",
           "OC+EOC ALREADY USED":			"oc+eoc already used",

	   "_last_":		     "_last_"
    } ;

