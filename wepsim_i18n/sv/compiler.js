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

		'NO TAG OR DIRECTIVE':		'Förväntad tag (x :) eller direktiv (.x), men tyckte att det här token istället:',
		'INVALID TAG FORMAT':		'En tagg måste följa ett alfanumeriskt format (som börjar med en bokstav eller understreck):',
		'TAG OR INSTRUCTION':		'En tagg kan inte ha samma namn som en instruktion:',
		'REPEATED TAG':		'Upprepad tag:',
		'NO NUMERIC DATATYPE':		'Förväntat värde för numerisk datatyp men fann:',
		'NO POSITIVE NUMBER':		'Förväntat ett positivt tal men fann:',
		'NO NUMBER OF BYTES':		'Förväntat antal byte som reserv i .space (naturligt tal) men hittade:',
		'INVALID ALIGN VALUE':		'Förväntade align parameter som positivt tal men fann:',
		'REMEMBER ALIGN VAL':		'Kom ihåg att numret är kraften i två för anpassning, se MIPS dokumentation.',
		'NOT CLOSED STRING':		'Strängen är inte stängd (glömde att avsluta den med citationstecken)',
		'NO QUOTATION MARKS':		'Förväntade sträng inom citattecken men fann:',
		'UNEXPECTED DATATYPE':		'Oväntat datatyp namn:',
		'INVALID SEGMENT NAME':		'Förväntat .data / .text / ... segment men fann:',
		'NO MAIN OR KMAIN':		'Tags \'viktigaste\' eller \'kmain\' definieras inte i textsegmentet (s). Det är obligatoriskt att definiera åtminstone en av dessa taggar för att köra ett program',
		'UNKNOWN 1':		'Ett okänt fel inträffade (1)',
		'UNKNOWN 2':		'Oväntat fel (2)',
		'REMEMBER I. FORMAT':		'Kom ihåg att instruktionsformatet har definierats som:',
		'SEVERAL CANDIDATES':		'Instruktion och fält matcha med mer än en möjlig instruktion. Kontrollera mikrokoden. För närvarande kan instruktionen format vara',
		'NOT MATCH MICRO':		'Instruktion och fält stämmer inte överens med den definierade instruktion format',
		'CHECK MICROCODE':		'Kontrollera mikrokoden. Förmodligen du har glömt att lägga till ett fält, inte ett nummer inte passar in i sitt utrymme, eller om du bara använt en felaktig instruktion',

           // microcode
           "LABEL NOT FOUND":        "Expected '<label>:' not found, found token: ",
           "REPEATED LABEL":         "Label is repeated: ",
           "OPEN BRACE NOT FOUND":   "Expected '{' not found",
           "CLOSE BRACE NOT FOUND":  "Expected '}' not found",
           "OPEN PAREN. NOT FOUND":  "Expected '(' not found",
           "CLOSE PAREN. NOT FOUND": "Expected ')' not found",
           "COMMA NOT FOUND":        "Expected ',' not found",
           "EQUAL NOT FOUND":        "Expected '=' not found",

		'_last_':		'_last_'

    };

