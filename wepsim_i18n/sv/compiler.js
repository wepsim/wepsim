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


    i18n.eltos.compiler.sv = {

		'NO TAG OR DIRECTIVE':		'Förväntad tag (x :) eller direktiv (.x), men tyckte att det här token istället: ',
		'INVALID TAG FORMAT':		'En tagg måste följa ett alfanumeriskt format (som börjar med en bokstav eller understreck): ',
		'TAG OR INSTRUCTION':		'En tagg kan inte ha samma namn som en instruktion: ',
		'REPEATED TAG':		'Upprepad tag: ',
		'NO NUMERIC DATATYPE':		'Förväntat värde för numerisk datatyp men fann: ',
		'NO POSITIVE NUMBER':		'Förväntat ett positivt tal men fann: ',
		'NO NUMBER OF BYTES':		'Förväntat antal byte som reserv i .space (naturligt tal) men hittade: ',
		'INVALID ALIGN VALUE':		'Förväntade align parameter som positivt tal men fann: ',
		'REMEMBER ALIGN VAL':		'Kom ihåg att numret är kraften i två för anpassning, se MIPS dokumentation.',
		'NOT CLOSED STRING':		'Strängen är inte stängd (glömde att avsluta den med citationstecken)',
		'NO QUOTATION MARKS':		'Förväntade sträng inom citattecken men fann: ',
		'UNEXPECTED DATATYPE':		'Oväntat datatyp namn: ',
		'INVALID SEGMENT NAME':		'Förväntat .data / .text / ... segment men fann: ',
		'NO MAIN OR KMAIN':		'Tags \'viktigaste\' eller \'kmain\' definieras inte i textsegmentet (s). Det är obligatoriskt att definiera åtminstone en av dessa taggar för att köra ett program',
		'UNKNOWN 1':		'Ett okänt fel inträffade (1)',
		'UNKNOWN 2':		'Oväntat fel (2)',
		'REMEMBER I. FORMAT':		'Kom ihåg att instruktionsformatet har definierats som: ',
		'SEVERAL CANDIDATES':		'Instruktion och fält matcha med mer än en möjlig instruktion. Kontrollera mikrokoden. För närvarande kan instruktionen format vara',
		'NOT MATCH MICRO':		'Instruktion och fält stämmer inte överens med den definierade instruktion format',
		'CHECK MICROCODE':		'Kontrollera mikrokoden. Förmodligen du har glömt att lägga till ett fält, inte ett nummer inte passar in i sitt utrymme, eller om du bara använt en felaktig instruktion',
                "LABEL NOT DEFINED":    "Label used but not defined in the assembly code: ",

           // microcode
           "LABEL NOT FOUND":        "Expected '<label>:' not found, found token: ",
           "REPEATED LABEL":         "Label is repeated: ",
           "INVALID LABEL FORMAT":   "Label format is not valid for: ",
           "OPEN BRACE NOT FOUND":   "Expected '{' not found",
           "CLOSE BRACE NOT FOUND":  "Expected '}' not found",
           "OPEN PAREN. NOT FOUND":  "Expected '(' not found",
           "CLOSE PAREN. NOT FOUND": "Expected ')' not found",
           "COMMA NOT FOUND":        "Expected ',' not found",
           "EQUAL NOT FOUND":        "Expected '=' not found",
           "SIGNAL NOT EXISTS":      "Signal does not exists: ",
           "SIGNAL NO DIRECTLY":     "signal cannot be used directly, please use the Control Unit signals instead.",
           "INCORRECT BIN. FORMAT":  "Incorrect binary format: ",
           "OUT OF RANGE":           "Value out of range: ",
	   "EMPTY MICROCODE":        "Empty microcode",
           "EMPTY NAME LIST":        "Empty name list for register: x=[]",
	   "DUPLICATE SP":           "Duplicate definition of stack pointer",
	   "NO SP":                  "Expected stack_pointer token not found",
	   "UNDEF. INSTR.":          "Undefined instruction: ",
           "MORE 100 FIELDS":        "More than 100 fields in a single instruction.",
	   "CO AS FIELD NAME":       "Instruction field has 'co' as name.",
	   "NW AS FIELD NAME":       "Instruction field has 'nwords' as name.",
	   "NO CO FIELD":            "Expected keyword 'co' not found",
           "INCORRECT CO BIN.":      "Incorrect binary format on 'co': ",
           "INCORRECT COP BIN.":     "Incorrect binary format on 'cop': ",
           "INVALID PARAMETER":      "Invalid parameter: ",
           "ALLOWED PARAMETER":      "It only allows the following fields: reg, num, inm, addr, address",
           "MISSING TOKEN ON":       "'token' is missing after '(' on: ",
           "MISSING ) ON":           "')' is missing on: ",
           "CO ALREADY USED":        "'co' is already been used by: ",
           "CO+COP ALREADY USED":    "'co+cop' is already been used by: ",
           "NO NWORDS":              "Expected keyword 'nwords' not found",
           "INCORRECT ADDRESSING":   "Type of addressing incorrect (abs or rel)",
           "UNEXPECTED FIELD":       "Unexpected field found: ",
           "STARTBIT OoR":           "startbit out of range: ",
           "STOPBIT OoR":            "stopbit out of range: ",
           "OVERLAPPING FIELD":      "Overlapping field: ",
           "BAD COP BIN. LEN.":      "Incorrect binary length for 'cop': ",
           "SP NOT DEFINED":         "Stack pointer register was not defined",
           "NO LABEL FETCH":         "Label 'fetch' not defined",
           "NO LABEL BEGIN":         "'begin' not found",
           "NO CO CODES":            "There is not enough 'co' codes available for instructions",
           "NO LABEL MADDR":         "MADDR label not found: ",
           "INS. NAME":              "Instruction name: '",
           "NOT VALID FOR":          "' is not valid for: ",
           "BIGGER THAN":            "is bigger than ",
           "BITS":                   " bits",
           "EXPECTED VALUE":         "Expected value that fits in a '",
           "BUT INSERTED":           "but inserted ",
           "INSTEAD":                "instead",

		'_last_':		'_last_'

    };

