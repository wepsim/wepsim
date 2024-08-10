/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    i18n.eltos.compiler.de = {

		'PROBLEM AROUND LINE': 		"Problem um die Linie",
		'NO TAG OR DIRECTIVE':		'Erwartete Tag oder Richtlinie, sondern fanden diese Token statt: ',
		'NO TAG, DIR OR INS':		'Es wurde keine gültige Tag-Anweisung (z. B. tag1 :) (z. B. .data) oder Anweisung gefunden ',
		'INVALID TAG FORMAT':		'Ein Tag muss ein alphanumerisches Format (beginnend mit einem Buchstaben oder Unterstrich) wie folgt vor: ',
		'TAG OR INSTRUCTION':		'Ein Tag kann nicht die gleichen Namen wie ein Befehl: ',
		'REPEATED TAG':			'Wiederholte tag: ',
		'NO NUMERIC DATATYPE':		'Erwartungswert für numerischen Datentyp aber gefunden: ',
		'NO POSITIVE NUMBER':		'Erwartet eine positive Zahl aber gefunden: ',
		'NO NUMBER OF BYTES':		'Erwartete Anzahl von Bytes in .space zu reservieren, aber gefunden: ',
		'INVALID ALIGN VALUE':		'Erwartet die align Parameter als positive Zahl aber gefunden: ',
		'REMEMBER ALIGN VAL':		'Denken Sie daran, dass die Zuständigkeit dafür übertragen von zwei für die Ausrichtung ist, siehe MIPS-Dokumentation.',
		'NOT CLOSED STRING':		'String ist nicht geschlossen (vergessen Sie es mit Anführungszeichen zu beenden)',
		'NO QUOTATION MARKS':		'Erwartetes Zeichenfolge zwischen Anführungszeichen aber gefunden: ',
		'UNEXPECTED DATATYPE':		'Unerwartete Datentyp Name: ',
		'INVALID SEGMENT NAME':		'Erwartete .data/.text/... Segment aber gefunden: ',
		'NO MAIN OR KMAIN':		'Tags \'main:\' oder \'kmain:\' ist nicht im Text-Segment (en) definiert ist. Es ist Pflicht, mindestens eines dieses Tags zu definieren, um ein Programm auszuführen,',
		'UNKNOWN 1':			'Ein unbekannter Fehler aufgetreten ist (1) für den Feldtyp: ',
		'UNKNOWN 2':			'Unerwarteter Fehler (2)',
		'EMPTY OBJECT CODE':		'Leerer Objektcode',
		'REMEMBER FORMAT USED':		'Dies ist das Anweisungsformat, das für verwendet wird ', 
		'REMEMBER I. FORMAT':		'Denken Sie daran, dass das Befehlsformat hat wie definiert: ',
		'SEVERAL CANDIDATES':		'Instruktion und Felder übereinstimmen mit mehr als einem Mikro. Bitte überprüfen Sie das Mikro. Derzeit kann das Befehlsformat sein: ',
		'NOT MATCH FORMAT':		'Anweisung und Felder stimmen nicht mit den definierten Formaten überein ',
		'NOT MATCH MICRO':		'Instruktion und Felder stimmen nicht überein mit Mikro.',
		'CHECK MICROCODE':		'Bitte überprüfen Sie das Mikro. ',
                'CHECKS':               	'Möglicherweise haben Sie vergessen, ein Feld hinzuzufügen/zu entfernen, eine Zahl liegt außerhalb des gültigen Bereichs, es wurde eine falsche Anweisung verwendet usw.',
		'LABEL NOT DEFINED':		'Label verwendet, aber nicht in dem Assembler-Code definiert: ',
		'INS. MISSING FIELD':		'Fehlendes Feld in der Anweisung',
		'UNEXPECTED (REG)':		'Erwartete Register aber Register zwischen Klammer gefunden.',
		'EXPECTED (REG)':		'Erwartetes Register zwischen Klammer aber gefunden: ',
		'EXPECTED REG':			'Erwartetes Register (e.g.: $1/$a0/...), aber gefunden: ',
                'UNKNOWN ESCAPE CHAR':          'Unbekannter Fluchtcharakter',
                'SPACE FOR # BITS':             " Bits in Binärform, aber es gibt nur Platz für ",
                'NEEDS':                        ' braucht ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'Erwartete \'<label>:\' nicht gefunden, gefunden token: ',
		'REPEATED LABEL':		'Label wird wiederholt: ',
		'INVALID LABEL FORMAT':		'Label-Format ist nicht gültig für: ',
		'OPEN BRACE NOT FOUND':		'Erwartete ‚{‘ nicht gefunden',
		'CLOSE BRACE NOT FOUND':	'Erwartete ‚}‘ nicht gefunden',
		'OPEN PAREN. NOT FOUND':	'Erwartete ‚(‘ nicht gefunden',
		'CLOSE PAREN. NOT FOUND':	'Erwartete ‚)‘ nicht gefunden',
		'COMMA NOT FOUND':		'Erwartet ‚‘ nicht gefunden',
		'EQUAL NOT FOUND':		'Erwartete ‚=‘ nicht gefunden',
		'SIGNAL NOT EXISTS':		'Signal nicht vorhanden ist: ',
		'SIGNAL NO DIRECTLY':		'Signal kann nicht direkt verwendet werden, benutzen Sie bitte stattdessen die Steuereinheit Signale verwenden.',
		'INCORRECT BIN. FORMAT':	'Falsche Binärformat: ',
		'OUT OF RANGE':			'Wert außerhalb des Bereichs: ',
		'EMPTY MICROCODE':		'Leeres Mikro',
		'EMPTY NAME LIST':		'Leere Namensliste für Register: x = []',
		'DUPLICATE SP':			'Doppelte Definition des Stapelzeigers',
		'NO SP':			'Erwartete stack_pointer Token nicht gefunden',
		'UNDEF. INSTR.':		'Nicht definierte Anweisung: ',
		'MORE 100 FIELDS':		'Mehr als 100 Felder in einem einzigen Befehl.',
		'CO AS FIELD NAME':		'Befehlsfeld hat ‚Co‘ als Name.',
		'NW AS FIELD NAME':		'Befehlsfeld hat ‚nwords‘ als Name.',
		'NO CO FIELD':			'Erwartetes Stichwort ‚co‘ nicht gefunden',
		'INCORRECT CO BIN.':		'Falsche Binärformat auf ‚co‘: ',
		'INCORRECT COP BIN.':		'Falsche Binärformat auf ‚Cop‘: ',
		'INVALID PARAMETER':		'Ungültiger Parameter: ',
		'ALLOWED PARAMETER':		'Es kann nur die folgenden Felder: reg, num, inm, addr, Anschrift',
		'MISSING TOKEN ON':		'\'Token\' fehlt, nachdem \'(\' on: ',
		'MISSING ) ON':			'‚)‘ Fehlt auf: ',
		'CO ALREADY USED':		'‚Co‘ wird bereits verwendet von: ',
		'CO+COP ALREADY USED':		'‚Co + op‘ wird bereits verwendet von: ',
		'NO NWORDS':			'Erwartetes Stichwort ‚nwords‘ nicht gefunden',
		'INCORRECT ADDRESSING':		'Art der Adressierung falschen (abs oder rel)',
		'UNEXPECTED FIELD':		'Unerwartete Feld gefunden: ',
                'CHECK ORDER':                  'Bitte überprüfen Sie die Reihenfolge der Felder',
		'STARTBIT OoR':			'startbit out of range: ',
		'STOPBIT OoR':			'stopbit Reichweite aus: ',
		'OVERLAPPING FIELD':		'Überlappende Feld: ',
		'BAD COP BIN. LEN.':		'Falsche binäre Länge für ‚Polizisten‘: ',
		'SP NOT DEFINED':		'Stapelzeigerregister wurde nicht definiert',
		'NO LABEL FETCH':		'Label ‚fetch‘ nicht definiert',
		'NO LABEL BEGIN':		'‚Begin‘ nicht gefunden',
		'NO CO CODES':			'Es ist nicht genug ‚co‘ verfügbaren Codes für Anweisungen',
		'NO LABEL MADDR':		'MADDR Etikett nicht gefunden: ',
		'INS. NAME':			'Instruction Name: \'',
		'NOT VALID FOR':		'\'Ist nicht gültig für: ',
		'BIGGER THAN':			'ist größer als',
		'BITS':				'Bits',
		'EXPECTED VALUE':		'Erwartungswert, dass passt in eine \'',
		'BUT INSERTED':			'aber eingefügt',
		'INSTEAD':			'stattdessen',

           	"BAD EOC BIN. LEN.":			"falsche Anzahl von Bits für das EOC-Feld",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			"doppelpunkt nicht gefunden",
           	"COLON OR PIPE NOT FOUND":		"doppelpunkt oder Pipe nicht gefunden",
           	"INCORRECT EOC BIN.":			"falsche eoc-Binärdatei",
           	"INCORRECT OC BIN.":			"falsche  oc-Binärdatei",
           	"NO FIELD":				"no field",
           	"NO OC FIELD":				"no oc field",
           	"OC ALREADY USED":			"oc bereits verwendet",
           	"OC+EOC ALREADY USED":			"oc+eoc bereits verwendet",

		'_last_':			'_last_'

    };

