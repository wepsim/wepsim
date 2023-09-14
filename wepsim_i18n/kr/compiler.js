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


    i18n.eltos.compiler.ko = {

	        "PROBLEM AROUND LINE":          "라인 주변의 문제",
		'NO TAG OR DIRECTIVE':		'태그 또는 지시 예상하지만,이 대신 토큰을 발견 : ',
		'NO TAG, DIR OR INS':		'유효한 태그 (예 : tag1 :) 지시문 (예 : .data) 또는 명령어가 없습니다.: ',
		'INVALID TAG FORMAT':		'태그는 (문자 나 밑줄로 시작하는) 영숫자 형식을 따라야합니다 : ',
		'TAG OR INSTRUCTION':		'태그는 명령과 동일한 이름을 가질 수 없습니다 : ',
		'REPEATED TAG':			'반복 태그 : ',
		'NO NUMERIC DATATYPE':		'수치 데이터 만 발견에 대한 기대 값 : ',
		'NO POSITIVE NUMBER':		'양수를 예상하지만, 발견',
		'NO NUMBER OF BYTES':		'바이트의 예상 수는 .space에 예약 만 발견합니다 : ',
		'INVALID ALIGN VALUE':		'양수하지만 발견으로 정렬 매개 변수는 예상 : ',
		'REMEMBER ALIGN VAL':		'MIPS 설명서를 참조하십시오, 그 숫자는 정렬을위한 두 가지의 힘을 기억하십시오.',
		'NOT CLOSED STRING':		'문자열이 닫혀 있지 않습니다 (인용 부호로 종료하는 것을 잊었다)',
		'NO QUOTATION MARKS':		'인용 부호하지만 발견과 예상 문자열 : ',
		'UNEXPECTED DATATYPE':		'예기치 않은 데이터 유형 이름 : ',
		'INVALID SEGMENT NAME':		'.DATA /는 .text / ... 세그먼트 예상하지만 발견 : ',
		'NO MAIN OR KMAIN':		'태그 \'주\'또는 \'KMAIN\'는 텍스트 세그먼트 (들)에 정의되어 있지 않습니다. 이 프로그램을 실행하기 위해 해당 태그 중 적어도 하나를 정의하는 의무',
		'UNKNOWN 1':			'알 수없는 오류가 필드 유형 (1) 발생',
		'UNKNOWN 2':			'예기치 못한 오류 (2)',
		'REMEMBER FORMAT USED':		'이것은 다음에 사용되는 명령 형식입니다. ',
		'REMEMBER I. FORMAT':		'명령어 형식은 다음과 같이 정의되어 있는지 기억 : ',
		'SEVERAL CANDIDATES':		'수업 및 필드는 하나 이상의 마이크로 프로그램과 일치합니다. 마이크로 코드를 확인하시기 바랍니다. 현재 명령의 형식은 다음과 같습니다',
		'NOT MATCH FORMAT':		'지침과 필드가 정의된 형식과 일치하지 않습니다.',
		'NOT MATCH MICRO':		'수업 및 필드는 마이크로 프로그램과 일치하지 않습니다. ',
		'CHECK MICROCODE':		'마이크로코드를 확인해주세요.',
                'CHECKS':               	'필드를 추가/제거하는 것을 잊어버렸을 수도 있고, 숫자가 범위를 벗어났거나, 잘못된 명령이 사용되었을 수도 있습니다.',
		'LABEL NOT DEFINED':		'레이블 어셈블리 코드에 정의되지 않고 사용 : ',
		'INS. MISSING FIELD':		'명령어에서 필드 누락',
		'UNEXPECTED (REG)':		'레지스터를 예상하지만, 괄호 사이에 레지스터를 발견했다.',
		'EXPECTED (REG)':		'괄호하지만 발견 사이의 예상 레지스터 :',
		'EXPECTED REG':			'예상 레지스터 (예를 들어 : $1/$a0/...)하지만 발견',
                'UNKNOWN ESCAPE CHAR':          '알 수없는 이스케이프 문자',
                'SPACE FOR # BITS':             " 이진 비트이지만 공간이 있습니다 ",
                'NEEDS':                        ' 필요해 ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'\'<레이블> :\'예상 찾을 수없는 토큰 발견',
		'REPEATED LABEL':		'라벨이 반복된다 : ',
		'INVALID LABEL FORMAT':		'라벨 형식이 유효하지 않습니다 : ',
		'OPEN BRACE NOT FOUND':		'예상 \'{\'을 (를) 찾을 수 없습니다',
		'CLOSE BRACE NOT FOUND':	'\'}\'예상을 찾을 수 없습니다',
		'OPEN PAREN. NOT FOUND':	'\'(\'예상을 찾을 수 없습니다',
		'CLOSE PAREN. NOT FOUND':	'\')\'예상을 찾을 수 없습니다',
		'COMMA NOT FOUND':		'예상 \',\'을 (를) 찾을 수 없습니다',
		'EQUAL NOT FOUND':		'\'=\'예상을 찾을 수 없습니다',
		'SIGNAL NOT EXISTS':		'신호가없는 존재하지 않습니다 : ',
		'SIGNAL NO DIRECTLY':		'신호가 직접 사용할 수 없습니다, 대신 제어 장치의 신호를 사용하십시오.',
		'INCORRECT BIN. FORMAT':	'잘못된 바이너리 형식 : ',
		'OUT OF RANGE':			'값이 범위를 벗어 : ',
		'EMPTY MICROCODE':		'빈 마이크로',
		'EMPTY NAME LIST':		'레지스터 이름 빈리스트 : X = []',
		'DUPLICATE SP':			'스택 포인터의 중복 정의',
		'NO SP':			'예상 stack_pointer를 찾을 수 없습니다 토큰',
		'UNDEF. INSTR.':		'정의되지 않은 명령어 : ',
		'MORE 100 FIELDS':		'단일 명령에 100 개 이상의 필드.',
		'CO AS FIELD NAME':		'명령 필드는 이름으로 \'공동\'이있다.',
		'NW AS FIELD NAME':		'명령 필드는 \'nwords\'이름이있다.',
		'NO CO FIELD':			'발견되지 예상 키워드 \'공동\'',
		'INCORRECT CO BIN.':		'\'공동\'에 대한 잘못된 바이너리 형식 : ',
		'INCORRECT COP BIN.':		'\'경찰\'에 대한 잘못된 바이너리 형식 : ',
		'INVALID PARAMETER':		'잘못된 매개 변수: ',
		'ALLOWED PARAMETER':		'등록, NUM, INM, 요지, 주소 : 그것은 단지 다음과 같은 필드가 있습니다',
		'MISSING TOKEN ON':		'\'토큰\'에 \'(\'실종입니다 : ',
		'MISSING ) ON':			'\')을\'에 누락되었습니다',
		'CO ALREADY USED':		'\'공동\'는 이미 의해 사용된다 : ',
		'CO+COP ALREADY USED':		'\'+ 연산 공동는\'이미 의해 사용된다 : ',
		'NO NWORDS':			'발견되지 예상 키워드 \'nwords\'',
		'INCORRECT ADDRESSING':		'잘못된 (절대치 또는 REL을) 주소의 입력',
		'UNEXPECTED FIELD':		'예기치 않은 필드를 찾을 수 : ',
                'CHECK ORDER':                  '필드 순서를 확인하세요.',
		'STARTBIT OoR':			'범위를 벗어 startbit : ',
		'STOPBIT OoR':			'범위를 벗어 stopbit : ',
		'OVERLAPPING FIELD':		'필드 겹치는 : ',
		'BAD COP BIN. LEN.':		'\'경찰\'에 대한 잘못된 진 길이 : ',
		'SP NOT DEFINED':		'스택 포인터 레지스터가 정의되지 않았습니다',
		'NO LABEL FETCH':		'라벨 정의되지 않은 \'가져 오기\'',
		'NO LABEL BEGIN':		'를 찾을 수 없습니다 \'시작\'',
		'NO CO CODES':			'지침은 충분히 \'공동\'코드를 사용할 수 없다',
		'NO LABEL MADDR':		'MADDR 레이블을 찾을 수 없습니다 : ',
		'INS. NAME':			'명령 이름 \'',
		'NOT VALID FOR':		'\'유효하지 않습니다 : ',
		'BIGGER THAN':			'보다 큰',
		'BITS':				'비트',
		'EXPECTED VALUE':		'예상 값하는에 맞는 \'',
		'BUT INSERTED':			'하지만 삽입',
		'INSTEAD':			'대신',

           	"BAD EOC BIN. LEN.":			"eoc 필드의 비트 수가 잘못되었습니다.",
           	"BIT OoR":				"bit OoR",
           	"COLON NOT FOUND":			": 찾을 수 없음",
           	"COLON OR PIPE NOT FOUND":		": 또는 | 찾을 수 없음",
           	"INCORRECT EOC BIN.":			"잘못된 eoc 바이너리",
           	"INCORRECT OC BIN.":			"잘못된  oc 바이너리",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc 이미 사용됨",
           	"OC+EOC ALREADY USED":			"oc+eoc는 이미 사용되었습니다",

		'_last_':			'_last_'

    };

