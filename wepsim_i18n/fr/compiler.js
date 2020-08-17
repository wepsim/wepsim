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


    i18n.eltos.compiler.fr = {

		'NO TAG OR DIRECTIVE':		'balise attendu (x :) ou directive (.x), mais trouve plutôt ce jeton: ',
		'INVALID TAG FORMAT':		'Une étiquette doit suivre un format alphanumérique (en commençant par une lettre ou un trait de soulignement): ',
		'TAG OR INSTRUCTION':		'Une étiquette ne peut pas avoir le même nom qu\'une instruction: ',
		'REPEATED TAG':		'tag répétée: ',
		'NO NUMERIC DATATYPE':		'Valeur attendue pour le type de données numérique, mais trouvé: ',
		'NO POSITIVE NUMBER':		'Attendu un nombre positif mais trouvé: ',
		'NO NUMBER OF BYTES':		'Nombre prévu d\'octets à la réserve dans .space (nombre naturel), mais trouvé: ',
		'INVALID ALIGN VALUE':		'Le paramètre align prévu un nombre positif mais trouvé: ',
		'REMEMBER ALIGN VAL':		'Rappelez-vous que le numéro est la puissance de deux pour l\'alignement, consultez la documentation MIPS.',
		'NOT CLOSED STRING':		'Chaîne est non fermée (oublié d\'y mettre fin avec guillemets)',
		'NO QUOTATION MARKS':		'chaîne attendue entre guillemets mais trouvé: ',
		'UNEXPECTED DATATYPE':		'Unexpected Nom du type de données: ',
		'INVALID SEGMENT NAME':		'Attendu .data / .text / ... segment, mais trouvé: ',
		'NO MAIN OR KMAIN':		'de principal »ou « kmain » ne sont pas définis dans le segment de texte Tags (s). Il est obligatoire de définir au moins un de ces balises afin d\'exécuter un programme',
		'UNKNOWN 1':		'Une erreur inconnue est survenue (1)',
		'UNKNOWN 2':		'Erreur inattendue (2)',
		'REMEMBER I. FORMAT':		'Rappelez-vous que le format d\'instruction a été définie comme suit: ',
		'SEVERAL CANDIDATES':		'Instruction et champs correspondent à plus d\'une instruction possible. S\'il vous plaît vérifier le microcode. À l\'heure actuelle, le format d\'instruction peut être: ',
		'NOT MATCH MICRO':		'Instruction et les champs ne correspondent pas au format d\'instruction défini',
		'CHECK MICROCODE':		'S\'il vous plaît vérifier le microcode. Probablement vous avez oublié d\'ajouter un champ, un certain nombre ne rentre pas dans son espace, ou vous venez d\'utiliser une instruction erronée',
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

