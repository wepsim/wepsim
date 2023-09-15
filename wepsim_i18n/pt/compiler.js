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


    i18n.eltos.compiler.pt = {

	        "PROBLEM AROUND LINE":          "Problema em torno da linha",
		'NO TAG OR DIRECTIVE':		'Espera tag ou directiva, mas encontrou este token em vez disso: ',
		'NO TAG, DIR OR INS':		'Não foi encontrada uma tag válida (por exemplo: tag1 :) diretiva (por exemplo: .data) ou instrução: ',
		'INVALID TAG FORMAT':		'A tag deve seguir um formato alfanumérico (começando com uma letra ou sublinhado): ',
		'TAG OR INSTRUCTION':		'A tag não pode ter o mesmo nome que uma instrução: ',
		'REPEATED TAG':			'tag repetida: ',
		'NO NUMERIC DATATYPE':		'valor esperado para tipo de dados numérico, mas encontrou: ',
		'NO POSITIVE NUMBER':		'Espera um número positivo, mas encontrou: ',
		'NO NUMBER OF BYTES':		'Número esperado de bytes para reservar em .space mas encontrou: ',
		'INVALID ALIGN VALUE':		'Espera o parâmetro align como número positivo, mas encontrou: ',
		'REMEMBER ALIGN VAL':		'Lembre-se que o número é a potência de dois para um alinhamento, consulte a documentação MIPS.',
		'NOT CLOSED STRING':		'Cadeia não é fechado (esqueci de terminá-lo com aspas)',
		'NO QUOTATION MARKS':		'string esperado entre aspas, mas encontrado: ',
		'UNEXPECTED DATATYPE':		'Nome do tipo de dados inesperado: ',
		'INVALID SEGMENT NAME':		'Espera .data / .text / ... segmento, mas encontrou: ',
		'NO MAIN OR KMAIN':		'Tags \'principal\' ou \'kmain\' não são definidos no segmento de texto (s). É obrigatória a definir pelo menos uma dessas marcas, a fim de executar um programa',
		'UNKNOWN 1':			'Ocorreu um erro desconhecido (1) para o tipo de campo: ',
		'UNKNOWN 2':			'erro inesperado (2)',
		'REMEMBER FORMAT USED':		'Este é o formato de instrução usado para ',
		'REMEMBER I. FORMAT':		'Lembre-se que o formato de instrução tem sido definida como: ',
		'SEVERAL CANDIDATES':		'Instrução e campos de combinar com mais de um microprograma. Por favor, verifique o microcódigo. Atualmente, o formato de instrução pode ser: ',
		'NOT MATCH FORMAT':		'Instrução e campos não correspondem aos formatos definidos ',
		'NOT MATCH MICRO':		'Instrução e os campos não coincidirem com microprogram. ',
		'CHECK MICROCODE':		'Por favor, verifique o microcódigo. ',
                'CHECKS':               	'Você pode ter esquecido de adicionar/remover um campo, um número está fora do intervalo, uma instrução errada foi usada, etc.',
		'LABEL NOT DEFINED':		'Rótulo usado mas não definido no código de montagem: ',
		'INS. MISSING FIELD':		'Campo faltando na instrução',
		'UNEXPECTED (REG)':		'Espera registo mas não encontrou registo entre parênteses.',
		'EXPECTED (REG)':		'Registo esperada entre parêntese, mas encontrou: ',
		'EXPECTED REG':			'Registo esperado (por exemplo: $1/$a0/...), mas encontrado: ',
                'UNKNOWN ESCAPE CHAR':          'Carácter de escape desconhecido',
                'SPACE FOR # BITS':             " bits em binário, mas há espaço apenas para ",
                'NEEDS':                        ' precisa ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'Esperado \'<label>:\' não encontrado, encontrado token: ',
		'REPEATED LABEL':		'Rótulo é repetido: ',
		'INVALID LABEL FORMAT':		'formato de etiqueta não é válida para: ',
		'OPEN BRACE NOT FOUND':		'Esperado \'{\' não encontrado',
		'CLOSE BRACE NOT FOUND':	'Esperado \'}\' não encontrado',
		'OPEN PAREN. NOT FOUND':	'Esperado \'(\' não encontrado',
		'CLOSE PAREN. NOT FOUND':	'Esperado \')\' não encontrado',
		'COMMA NOT FOUND':		'Esperado \'\' não encontrado',
		'EQUAL NOT FOUND':		'Esperado \'=\' não encontrado',
		'SIGNAL NOT EXISTS':		'Sinal não existe: ',
		'SIGNAL NO DIRECTLY':		'sinal não pode ser usado diretamente, utilize os sinais Unidade de Controle vez.',
		'INCORRECT BIN. FORMAT':	'formato binário incorreto: ',
		'OUT OF RANGE':			'Valor fora do intervalo: ',
		'EMPTY MICROCODE':		'microcódigo vazia',
		'EMPTY NAME LIST':		'lista de nomes vazio para registo: x = []',
		'DUPLICATE SP':			'definição duplicado de ponteiro de pilha',
		'NO SP':			'stack_pointer esperada não token localizado',
		'UNDEF. INSTR.':		'instrução indefinido: ',
		'MORE 100 FIELDS':		'Mais de 100 campos em uma única instrução.',
		'CO AS FIELD NAME':		'campo de instrução tem \'co\' como nome.',
		'NW AS FIELD NAME':		'campo de instrução tem \'nwords\' como nome.',
		'NO CO FIELD':			'Espera palavra-chave \'co\' não encontrado',
		'INCORRECT CO BIN.':		'formato binário incorreto no \'co\': ',
		'INCORRECT COP BIN.':		'formato binário incorreto em \'polícia\': ',
		'INVALID PARAMETER':		'Parâmetro inválido: ',
		'ALLOWED PARAMETER':		'Ele apenas permite que os seguintes campos: reg, num, inm, endereço, endereço',
		'MISSING TOKEN ON':		'\'Simbólico\' está em falta depois \'(\' em: ',
		'MISSING ) ON':			'\')\' Está faltando em: ',
		'CO ALREADY USED':		'\'Co\' já está sendo usado por: ',
		'CO+COP ALREADY USED':		'\'Co + op\' já está sendo usado por: ',
		'NO NWORDS':			'Esperados palavra-chave \'nwords\' não encontrado',
		'INCORRECT ADDRESSING':		'Tipo de endereçamento incorreto (abs ou rel)',
		'UNEXPECTED FIELD':		'Campo inesperado encontrado: ',
                'CHECK ORDER':                  'Verifique a ordem dos campos',
		'STARTBIT OoR':			'startbit fora do intervalo: ',
		'STOPBIT OoR':			'bit de paragem fora do intervalo: ',
		'OVERLAPPING FIELD':		'campo de sobreposição: ',
		'BAD COP BIN. LEN.':		'comprimento binário incorreto para \'polícia\': ',
		'SP NOT DEFINED':		'Pilha de registro ponteiro não foi definida',
		'NO LABEL FETCH':		'Etiqueta \'buscar\' não definido',
		'NO LABEL BEGIN':		'\'Começar\' não encontrado',
		'NO CO CODES':			'Não há \'co\' códigos suficientes disponíveis para instruções',
		'NO LABEL MADDR':		'etiqueta maddr não encontrado: ',
		'INS. NAME':			'nome de instrução: \'',
		'NOT VALID FOR':		'\'Não é válido para: ',
		'BIGGER THAN':			'é maior do que',
		'BITS':				'bits',
		'EXPECTED VALUE':		'valor esperado que se encaixa em um \'',
		'BUT INSERTED':			'mas inserido',
		'INSTEAD':			'em vez de',

           	"BAD EOC BIN. LEN.":			"número incorreto de bits para o campo eoc",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			": não encontrado",
           	"COLON OR PIPE NOT FOUND":		": ou | não encontrado",
           	"INCORRECT EOC BIN.":			"Binário eoc incorreto",
           	"INCORRECT OC BIN.":			"Binário  oc incorreto",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc já usado",
           	"OC+EOC ALREADY USED":			"oc+eoc já usado",

		'_last_':			'_last_'

    };

