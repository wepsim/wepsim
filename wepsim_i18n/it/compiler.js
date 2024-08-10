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


    i18n.eltos.compiler.it = {

	        "PROBLEM AROUND LINE":          "Problema intorno alla linea",
		'NO TAG OR DIRECTIVE':		'Previsto tag o direttiva, ma trovato questo token invece: ',
		'NO TAG, DIR OR INS':		'Tag non valido (es .: tag1 :) direttiva (es .: .data) o istruzione, trovato: ',
		'INVALID TAG FORMAT':		'Un tag deve seguire un formato alfanumerico (che inizia con una lettera o di sottolineatura): ',
		'TAG OR INSTRUCTION':		'Un tag non può avere lo stesso nome di un\'istruzione: ',
		'REPEATED TAG':			'tag ripetuta: ',
		'NO NUMERIC DATATYPE':		'Valore atteso per tipo di dato numerico ma ha trovato: ',
		'NO POSITIVE NUMBER':		'Previsto un numero positivo ma ha trovato: ',
		'NO NUMBER OF BYTES':		'Numero previsto di byte da riservare in .space ma ha trovato: ',
		'INVALID ALIGN VALUE':		'Previsto il parametro align come numero positivo ma ha trovato: ',
		'REMEMBER ALIGN VAL':		'Ricordate che il numero è la potenza di due per l\'allineamento, consultare la documentazione MIPS.',
		'NOT CLOSED STRING':		'String non è chiuso (dimenticato di farla finita con le virgolette)',
		'NO QUOTATION MARKS':		'stringa prevista tra virgolette ma trovato: ',
		'UNEXPECTED DATATYPE':		'Nome imprevisto tipo di dati: ',
		'INVALID SEGMENT NAME':		'Previsto .data / .text / ... segmento ma ha trovato: ',
		'NO MAIN OR KMAIN':		'Tag \'principale\' o \'kmain\' non sono definiti nel segmento di testo (s). E \'obbligatorio definire almeno uno di questi tag al fine di eseguire un programma',
		'UNKNOWN 1':			'Si è verificato un errore sconosciuto (1) per il tipo di campo: ',
		'UNKNOWN 2':			'Errore imprevisto (2)',
	        'EMPTY OBJECT CODE':	        'Codice oggetto vuoto',
		'REMEMBER FORMAT USED':		'Questo è il formato delle istruzioni utilizzato per ',
		'REMEMBER I. FORMAT':		'Ricordare che il formato di istruzioni è stato definito come: ',
		'SEVERAL CANDIDATES':		'Istruzione e campi corrispondono con più di un microprogramma. Si prega di verificare il microcodice. Attualmente, il formato delle istruzioni può essere: ',
		'NOT MATCH FORMAT':		'Le istruzioni e i campi non corrispondono ai formati definiti ',
		'NOT MATCH MICRO':		'Istruzione e campi non corrispondono con microprogramma. ',
		'CHECK MICROCODE':		'Si prega di verificare il microcodice. ',
                'CHECKS':               	'Potresti aver dimenticato di aggiungere/rimuovere un campo, un numero è fuori intervallo, è stata utilizzata un\'istruzione errata, ecc.',
		'INS. MISSING FIELD':		'Campo mancante nell\'istruzione',
		'UNEXPECTED (REG)':		'Registro previsto ma trovato registro tra parentesi.',
		'EXPECTED (REG)':		'Registro previsto tra parentesi ma ha trovato: ',
		'EXPECTED REG':			'Registro previsto (e.g.: $1/$a0/...) ma ha trovato: ',
                'UNKNOWN ESCAPE CHAR':          'Carattere di fuga sconosciuto',
                'SPACE FOR # BITS':             " bit in binario ma c'è spazio solo per ",
                'NEEDS':                        ' bisogno ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT DEFINED':		'Etichetta utilizzati ma non definiti nel codice assembly: ',
		'LABEL NOT FOUND':		'Previsto \'<label>:\' non trovato, ha trovato token: ',
		'REPEATED LABEL':		'Etichetta si ripete: ',
		'INVALID LABEL FORMAT':		'formato etichetta non è valida per: ',
		'OPEN BRACE NOT FOUND':		'Previsto \'{\' non trovato',
		'CLOSE BRACE NOT FOUND':	'Previsto \'}\' non trovato',
		'OPEN PAREN. NOT FOUND':	'Previsto \'(\' non trovato',
		'CLOSE PAREN. NOT FOUND':	'Previsto \')\' non trovato',
		'COMMA NOT FOUND':		'Previsto \'\' non trovato',
		'EQUAL NOT FOUND':		'Previsto \'=\' non trovato',
		'SIGNAL NOT EXISTS':		'Segnale non esiste: ',
		'SIGNAL NO DIRECTLY':		'segnale non può essere utilizzato direttamente, utilizza i segnali Control Unit invece.',
		'INCORRECT BIN. FORMAT':	'formato binario non corretto: ',
		'OUT OF RANGE':			'Valore fuori campo: ',
		'EMPTY MICROCODE':		'microcodice vuota',
		'EMPTY NAME LIST':		'elenco dei nomi vuoto per il registro: x = []',
		'DUPLICATE SP':			'definizione duplicata di stack pointer',
		'NO SP':			'stack_pointer atteso pedina non trovata',
		'UNDEF. INSTR.':		'l\'istruzione non definita: ',
		'MORE 100 FIELDS':		'Più di 100 campi in una singola istruzione.',
		'CO AS FIELD NAME':		'campo istruzione ha \'co\' come nome.',
		'NW AS FIELD NAME':		'campo istruzione ha \'nwords\' come nome.',
		'NO CO FIELD':			'parola chiave \'co\' prevista non trovato',
		'INCORRECT CO BIN.':		'formato binario non corretto di \'co\': ',
		'INCORRECT COP BIN.':		'formato binario non corretto di \'poliziotto\': ',
		'INVALID PARAMETER':		'Parametro non valido: ',
		'ALLOWED PARAMETER':		'Esso consente solo i seguenti campi: reg, num, inm, addr, indirizzo',
		'MISSING TOKEN ON':		'\'Token\' è mancante dopo \'(\' on: ',
		'MISSING ) ON':			'\')\' Manca il: ',
		'CO ALREADY USED':		'\'Co\' è già stato utilizzato da: ',
		'CO+COP ALREADY USED':		'\'Co op +\' è già stato utilizzato da: ',
		'NO NWORDS':			'parola chiave \'nwords\' attesi non si trovano',
		'INCORRECT ADDRESSING':		'Tipo di indirizzamento non corretti (abs o rel)',
		'UNEXPECTED FIELD':		'campo imprevisto trovato: ',
                'CHECK ORDER':                  'Si prega di controllare l\'ordine dei campi',
		'STARTBIT OoR':			'startbit fuori campo: ',
		'STOPBIT OoR':			'stopbit fuori campo: ',
		'OVERLAPPING FIELD':		'campo Sovrapposizione: ',
		'BAD COP BIN. LEN.':		'lunghezza binario errato per \'cop\': ',
		'SP NOT DEFINED':		'Pila registro puntatore non è stato definito',
		'NO LABEL FETCH':		'Etichetta \'prendere\' non definita',
		'NO LABEL BEGIN':		'\'Iniziare\' non trovato',
		'NO CO CODES':			'Non c\'è abbastanza \'CO\' codici disponibili per le istruzioni',
		'NO LABEL MADDR':		'Maddr etichetta non trovato: ',
		'INS. NAME':			'Nome istruzione: \'',
		'NOT VALID FOR':		'\'Non è valido per: ',
		'BIGGER THAN':			'è più grande di',
		'BITS':				'bit',
		'EXPECTED VALUE':		'Valore atteso che si inserisce in un \'',
		'BUT INSERTED':			'ma inserito',
		'INSTEAD':			'anziché',

           	"BAD EOC BIN. LEN.":			"numero errato di bit per il campo eoc",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			": non trovato",
           	"COLON OR PIPE NOT FOUND":		": o | non trovato",
           	"INCORRECT EOC BIN.":			"binario eoc errato",
           	"INCORRECT OC BIN.":			"binario  oc errato",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc già utilizzato",
           	"OC+EOC ALREADY USED":			"oc+eoc già utilizzato",

		'_last_':			'_last_'

    };

