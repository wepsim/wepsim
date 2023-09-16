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


    i18n.eltos.compiler.fr = {

	        "PROBLEM AROUND LINE":          "Problème autour de la ligne",
		'NO TAG OR DIRECTIVE':		'balise attendu ou directive, mais à cet jeton à la place:',
		'NO TAG, DIR OR INS':		'Pas une balise valide (par exemple: tag1 :) directive (par exemple: .data) ou instruction, trouvée: ',
		'INVALID TAG FORMAT':		'Une étiquette doit suivre un format alphanumérique (en commençant par une lettre ou un trait de soulignement):',
		'TAG OR INSTRUCTION':		'Une étiquette ne peut pas avoir le même nom qu\'une instruction:',
		'REPEATED TAG':			'tag répétée:',
		'NO NUMERIC DATATYPE':		'Valeur attendue pour le type de données numérique, mais trouvé:',
		'NO POSITIVE NUMBER':		'Attendu un nombre positif mais trouvé:',
		'NO NUMBER OF BYTES':		'Nombre prévu d\'octets à réserver à l\'.space mais a constaté:',
		'INVALID ALIGN VALUE':		'Le paramètre align prévu un nombre positif mais trouvé:',
		'REMEMBER ALIGN VAL':		'Rappelez-vous que le numéro est la puissance de deux pour l\'alignement, consultez la documentation MIPS.',
		'NOT CLOSED STRING':		'Chaîne est non fermée (oublié d\'y mettre fin avec guillemets)',
		'NO QUOTATION MARKS':		'chaîne attendue entre guillemets mais trouvé:',
		'UNEXPECTED DATATYPE':		'Unexpected Nom du type de données:',
		'INVALID SEGMENT NAME':		'Attendu .data / .text / ... segment, mais trouvé:',
		'NO MAIN OR KMAIN':		'de principal »ou « kmain » ne sont pas définis dans le segment de texte Tags (s). Il est obligatoire de définir au moins un de ces balises afin d\'exécuter un programme',
		'UNKNOWN 1':			'Une erreur inconnue est survenue (1) pour le type de terrain:',
		'UNKNOWN 2':			'Erreur inattendue (2)',
		'REMEMBER FORMAT USED':		'Il s\'agit du format d\'instruction utilisé pour', 
		'REMEMBER I. FORMAT':		'Rappelez-vous que le format d\'instruction a été définie comme suit:',
		'SEVERAL CANDIDATES':		'Instruction et champs correspondent à plus d\'un microprogrammes. S\'il vous plaît vérifier le microcode. À l\'heure actuelle, le format d\'instruction peut être:',
		'NOT MATCH FORMAT':		'Les instructions et les champs ne correspondent pas au(x) format(s) défini(s) ',
		'NOT MATCH MICRO':		'Instruction et les champs ne correspondent pas aux microprogrammes. ',
		'CHECK MICROCODE':		'S\'il vous plaît vérifier le microcode. ',
                'CHECKS':               	'Vous avez peut-être oublié d\'ajouter/supprimer un champ, un nombre est hors limites, une mauvaise instruction a été utilisée, etc.',
		'LABEL NOT DEFINED':		'Étiquette utilisée mais non définie dans le code de montage:',
		'INS. MISSING FIELD':		'Champ manquant dans l\'instruction',
		'UNEXPECTED (REG)':		'Registre attendu, mais le registre entre parenthèses.',
		'EXPECTED (REG)':		'Registre prévu entre parenthèses mais trouvé: ',
		'EXPECTED REG':			'Registre prévu (par exemple: $1/$a0/...) mais a trouvé: ',
                'UNKNOWN ESCAPE CHAR':          'Caractère d\'échappement inconnu',
                'SPACE FOR # BITS':             " bits en binaire mais il n'y a de l'espace que pour ",
                'NEEDS':                        ' nécessite ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'Attendu \'<label>:\' introuvable, a trouvé jeton:',
		'REPEATED LABEL':		'Étiquette se répète:',
		'INVALID LABEL FORMAT':		'Format d\'étiquette est pas valable pour:',
		'OPEN BRACE NOT FOUND':		'Attendu \'{\' not found',
		'CLOSE BRACE NOT FOUND':	'Attendu \'}\' not found',
		'OPEN PAREN. NOT FOUND':	'Attendu \'(\' not found',
		'CLOSE PAREN. NOT FOUND':	'Attendu \')\' not found',
		'COMMA NOT FOUND':		'Attendu \'\' not found',
		'EQUAL NOT FOUND':		'Attendu \'=\' not found',
		'SIGNAL NOT EXISTS':		'Signal n\'existe pas:',
		'SIGNAL NO DIRECTLY':		'signal ne peut pas être utilisé directement, s\'il vous plaît utiliser les signaux Unité de commande à la place.',
		'INCORRECT BIN. FORMAT':	'format binaire incorrect:',
		'OUT OF RANGE':			'Valeur hors de portée:',
		'EMPTY MICROCODE':		'vide microcode',
		'EMPTY NAME LIST':		'liste de noms vide pour le registre: x = []',
		'DUPLICATE SP':			'définition en double du pointeur de pile',
		'NO SP':			'stack_pointer prévue à jetons pas trouvé',
		'UNDEF. INSTR.':		'instruction non définie:',
		'MORE 100 FIELDS':		'Plus de 100 champs dans une seule instruction.',
		'CO AS FIELD NAME':		'champ d\'instruction a « co » comme nom.',
		'NW AS FIELD NAME':		'champ d\'instruction a « nwords » comme nom.',
		'NO CO FIELD':			'mot-clé attendu \'co\' not found',
		'INCORRECT CO BIN.':		'format binaire incorrect sur \'co\':',
		'INCORRECT COP BIN.':		'format binaire incorrect sur « flic »:',
		'INVALID PARAMETER':		'Paramètre invalide:',
		'ALLOWED PARAMETER':		'Il permet uniquement les champs suivants: reg, num, INM, adr, adresse',
		'MISSING TOKEN ON':		'« Jeton » est porté disparu après « ( » sur:',
		'MISSING ) ON':			'« ) » Est manquante sur:',
		'CO ALREADY USED':		'« Co » est déjà utilisé par:',
		'CO+COP ALREADY USED':		'« Co + op » est déjà utilisé par:',
		'NO NWORDS':			'mot-clé attendu \'nwords\' not found',
		'INCORRECT ADDRESSING':		'Type d\'adressage incorrectes (abs ou rel)',
		'UNEXPECTED FIELD':		'champ inattendu trouvé:',
                'CHECK ORDER':                  'Veuillez vérifier l\'ordre des champs',
		'STARTBIT OoR':			'startbit hors de portée:',
		'STOPBIT OoR':			'STOPBIT hors de portée:',
		'OVERLAPPING FIELD':		'terrain Chevauchement:',
		'BAD COP BIN. LEN.':		'longueur binaire incorrect pour « flic »:',
		'SP NOT DEFINED':		'registre pointeur pile n\'a pas été défini',
		'NO LABEL FETCH':		'Label « chercher » non définie',
		'NO LABEL BEGIN':		'« Commencer » introuvable',
		'NO CO CODES':			'Il n\'y a pas assez de codes « co » disponible pour les instructions',
		'NO LABEL MADDR':		'étiquette MADDR introuvable:',
		'INS. NAME':			'Nom de l\'instruction: \'',
		'NOT VALID FOR':		'\'Est pas valable pour:',
		'BIGGER THAN':			'est plus grand que',
		'BITS':				'bits',
		'EXPECTED VALUE':		'Valeur attendue qui correspond à un \'',
		'BUT INSERTED':			'mais inséré',
		'INSTEAD':			'au lieu',

           	"BAD EOC BIN. LEN.":			"nombre de bits incorrect pour le champ eoc",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			": pas trouvé",
           	"COLON OR PIPE NOT FOUND":		": ou | pas trouvé",
           	"INCORRECT EOC BIN.":			"binaire eoc incorrect",
           	"INCORRECT OC BIN.":			"binaire  oc incorrect",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc déjà utilisé",
           	"OC+EOC ALREADY USED":			"oc+eoc déjà utilisé",

		'_last_':		'_last_'

    };

