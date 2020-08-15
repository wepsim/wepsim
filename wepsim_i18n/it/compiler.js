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


    i18n.eltos.compiler.it = {

		'NO TAG OR DIRECTIVE':		'tag atteso (x :) o direttiva (.x), ma ha trovato questo token invece:',
		'INVALID TAG FORMAT':		'Un tag deve seguire un formato alfanumerico (che inizia con una lettera o di sottolineatura):',
		'TAG OR INSTRUCTION':		'Un tag non può avere lo stesso nome di un\'istruzione:',
		'REPEATED TAG':		'tag ripetuta:',
		'NO NUMERIC DATATYPE':		'Valore atteso per tipo di dato numerico ma ha trovato:',
		'NO POSITIVE NUMBER':		'Previsto un numero positivo ma ha trovato:',
		'NO NUMBER OF BYTES':		'Numero previsto di byte di prenotare in .space (numero naturale) ma ha trovato:',
		'INVALID ALIGN VALUE':		'Previsto il parametro align come numero positivo ma ha trovato:',
		'REMEMBER ALIGN VAL':		'Ricordate che il numero è la potenza di due per l\'allineamento, consultare la documentazione MIPS.',
		'NOT CLOSED STRING':		'String non è chiuso (dimenticato di farla finita con le virgolette)',
		'NO QUOTATION MARKS':		'stringa prevista tra virgolette ma trovato:',
		'UNEXPECTED DATATYPE':		'Nome imprevisto tipo di dati:',
		'INVALID SEGMENT NAME':		'Previsto .data / .text / ... segmento ma ha trovato:',
		'NO MAIN OR KMAIN':		'Tag \'principale\' o \'kmain\' non sono definiti nel segmento di testo (s). E \'obbligatorio definire almeno uno di questi tag al fine di eseguire un programma',
		'UNKNOWN 1':		'Si è verificato un errore sconosciuto (1)',
		'UNKNOWN 2':		'Errore imprevisto (2)',
		'REMEMBER I. FORMAT':		'Ricordare che il formato di istruzioni è stato definito come:',
		'SEVERAL CANDIDATES':		'Istruzione e campi corrispondono con più di una possibile istruzioni. Si prega di verificare il microcodice. Attualmente, il formato delle istruzioni può essere:',
		'NOT MATCH MICRO':		'Istruzione e campi non corrispondono con il formato delle istruzioni definito',
		'CHECK MICROCODE':		'Si prega di verificare il microcodice. Probabilmente si è dimenticato di aggiungere un campo, un numero non rientra nel suo spazio, o semplicemente utilizzato un\'istruzione sbagliata',

           // microcode
           "LABEL NOT FOUND":        "Expected '<label>:' not found, found token: ",
           "REPEATED LABEL":         "Label is repeated: ",
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

		'_last_':		'_last_'

    };

