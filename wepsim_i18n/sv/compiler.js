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


    i18n.eltos.compiler.sv = {

	        "PROBLEM AROUND LINE":          "Problem runt linjen",
		'NO TAG OR DIRECTIVE':		'Förväntad tag eller direktiv, men tyckte att det här token istället: ',
		'NO TAG, DIR OR INS':		'Inte en giltig tagg (t.ex.: tag1 :) direktiv (t.ex.: .data) eller instruktion, hittades: ',
		'INVALID TAG FORMAT':		'En tagg måste följa ett alfanumeriskt format (som börjar med en bokstav eller understreck): ',
		'TAG OR INSTRUCTION':		'En tagg kan inte ha samma namn som en instruktion: ',
		'REPEATED TAG':			'Upprepad tag: ',
		'NO NUMERIC DATATYPE':		'Förväntat värde för numerisk datatyp men fann: ',
		'NO POSITIVE NUMBER':		'Förväntat ett positivt tal men fann: ',
		'NO NUMBER OF BYTES':		'Förväntat antal byte att reservera i .space men fann: ',
		'INVALID ALIGN VALUE':		'Förväntade align parameter som positivt tal men fann: ',
		'REMEMBER ALIGN VAL':		'Kom ihåg att numret är kraften i två för anpassning, se MIPS dokumentation.',
		'NOT CLOSED STRING':		'Strängen är inte stängd (glömde att avsluta den med citationstecken)',
		'NO QUOTATION MARKS':		'Förväntade sträng inom citattecken men fann: ',
		'UNEXPECTED DATATYPE':		'Oväntat datatyp namn: ',
		'INVALID SEGMENT NAME':		'Förväntat .data / .text / ... segment men fann: ',
		'NO MAIN OR KMAIN':		'Tags \'viktigaste\' eller \'kmain\' definieras inte i textsegmentet (s). Det är obligatoriskt att definiera åtminstone en av dessa taggar för att köra ett program',
		'UNKNOWN 1':			'Ett okänt fel inträffade (1) för fälttypen:',
		'UNKNOWN 2':			'Oväntat fel (2)',
		'REMEMBER FORMAT USED':		'Detta är instruktionsformatet som används för ',
		'REMEMBER I. FORMAT':		'Kom ihåg att instruktionsformatet har definierats som:',
		'SEVERAL CANDIDATES':		'Instruktion och fält matcha med mer än en mikro. Kontrollera mikrokoden. För närvarande kan instruktionen format vara',
		'NOT MATCH FORMAT':		'Instruktioner och fält matchar inte definierade format(er) ',
		'NOT MATCH MICRO':		'Instruktion och fält matchar inte med mikro. ',
		'CHECK MICROCODE':		'Kontrollera mikrokoden. ',
                'CHECKS':               	'Du kanske har glömt att lägga till/ta bort ett fält, ett nummer är utanför intervallet, en felaktig instruktion användes, etc. ',
		'LABEL NOT DEFINED':		'Märkning som används men inte definieras i assemblerkod:',
		'INS. MISSING FIELD':		'Saknade fält i instruktionen',
		'UNEXPECTED (REG)':		'Förväntad register men fann register inom parentes.',
		'EXPECTED (REG)':		'Förväntad register inom parentes men fann: ',
		'EXPECTED REG':			'Förväntad register (t.ex.: $1/$a0/...) men hittade: ',
                'UNKNOWN ESCAPE CHAR':          'Okänd flykt char',
                'SPACE FOR # BITS':             " bitar i binär men det finns bara plats för ",
                'NEEDS':                        ' behov ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

                // microcode
		'LABEL NOT FOUND':		'Förväntade \'<label>:\' hittades inte fann token:',
		'REPEATED LABEL':		'Label upprepas:',
		'INVALID LABEL FORMAT':		'Label-formatet är inte giltigt för:',
		'OPEN BRACE NOT FOUND':		'Förväntade \'{\' hittades inte',
		'CLOSE BRACE NOT FOUND':	'Förväntade \'}\' hittades inte',
		'OPEN PAREN. NOT FOUND':	'Förväntat \'(\' hittades inte',
		'CLOSE PAREN. NOT FOUND':	'Förväntat ") hittades inte',
		'COMMA NOT FOUND':		'Förväntat \'\' hittades inte',
		'EQUAL NOT FOUND':		'Förväntat \'=\' hittades inte',
		'SIGNAL NOT EXISTS':		'Signal inte existerar:',
		'SIGNAL NO DIRECTLY':		'signal kan inte användas direkt, använd kontrollenheten signalerna istället.',
		'INCORRECT BIN. FORMAT':	'Felaktig binärt format:',
		'OUT OF RANGE':			'Värde utom räckhåll:',
		'EMPTY MICROCODE':		'tom mikrokod',
		'EMPTY NAME LIST':		'Tom namnlistan för registret: x = []',
		'DUPLICATE SP':			'Duplicate definition av stackpekaren',
		'NO SP':			'Förväntad stack_pointer token hittades inte',
		'UNDEF. INSTR.':		'Odefinierad instruktion:',
		'MORE 100 FIELDS':		'Mer än 100 fält i en enda instruktion.',
		'CO AS FIELD NAME':		'Instruktionsfältet har \'co\' som namn.',
		'NW AS FIELD NAME':		'Instruktionsfältet har \'nwords\' som namn.',
		'NO CO FIELD':			'Förväntad sökordet \'co\' hittades inte',
		'INCORRECT CO BIN.':		'Felaktig binärt format på \'co\':',
		'INCORRECT COP BIN.':		'Felaktig binärt format på \'polis\':',
		'INVALID PARAMETER':		'Ogiltig parameter:',
		'ALLOWED PARAMETER':		'Det tillåter endast följande områden: reg, num, INM, addr, adress',
		'MISSING TOKEN ON':		'\'Token\' saknas efter \'(\' på:',
		'MISSING ) ON':			'\') Saknas på:',
		'CO ALREADY USED':		'\'Co\' redan använts av:',
		'CO+COP ALREADY USED':		'\'Co + op\' redan använts av:',
		'NO NWORDS':			'Förväntade sökordet \'nwords\' hittades inte',
		'INCORRECT ADDRESSING':		'Typ av adresse felaktiga (abs eller rel)',
		'UNEXPECTED FIELD':		'Oväntat fält hittade:',
                'CHECK ORDER':                  'Kontrollera fälternas ordning',
		'STARTBIT OoR':			'startbit utom räckhåll:',
		'STOPBIT OoR':			'stopbit utom räckhåll:',
		'OVERLAPPING FIELD':		'Överlappande fält:',
		'BAD COP BIN. LEN.':		'Felaktig binär längd för \'polis\':',
		'SP NOT DEFINED':		'Stack pekaren register inte definieras',
		'NO LABEL FETCH':		'Label \'hämta\' inte definierad',
		'NO LABEL BEGIN':		'\'Börja\' hittades inte',
		'NO CO CODES':			'Det finns inte tillräckligt med "CO koder för instruktioner',
		'NO LABEL MADDR':		'MADDR etikett hittades inte:',
		'INS. NAME':			'Instruktion namn: "',
		'NOT VALID FOR':		'"Är inte giltigt för:',
		'BIGGER THAN':			'är större än',
		'BITS':				'bitar',
		'EXPECTED VALUE':		'Förväntat värde som passar i en "',
		'BUT INSERTED':			'men införd',
		'INSTEAD':			'istället',

           	"BAD EOC BIN. LEN.":			"felaktigt antal bitar för eoc-fält",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			": hittades inte",
           	"COLON OR PIPE NOT FOUND":		": eller | hittades inte",
           	"INCORRECT EOC BIN.":			"Felaktig eoc binär",
           	"INCORRECT OC BIN.":			"Felaktig  oc binär",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc redan använt",
           	"OC+EOC ALREADY USED":			"oc+eoc används redan",

		'_last_':			'_last_'

    };

