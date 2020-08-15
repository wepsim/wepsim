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


    i18n.eltos.compiler.kr = {

		'NO TAG OR DIRECTIVE':		'예상 태그 (X :) 또는 지침 (.x를)하지만, 대신에이 토큰을 발견 :',
		'INVALID TAG FORMAT':		'태그는 (문자 나 밑줄로 시작하는) 영숫자 형식을 따라야합니다 :',
		'TAG OR INSTRUCTION':		'태그는 명령과 동일한 이름을 가질 수 없습니다 :',
		'REPEATED TAG':		'반복 태그 :',
		'NO NUMERIC DATATYPE':		'수치 데이터 만 발견에 대한 기대 값 :',
		'NO POSITIVE NUMBER':		'양수를 예상하지만, 발견',
		'NO NUMBER OF BYTES':		'.space (자연수)하지만 발견에서 예약 바이트의 예상 수 :',
		'INVALID ALIGN VALUE':		'양수하지만 발견으로 정렬 매개 변수는 예상 :',
		'REMEMBER ALIGN VAL':		'MIPS 설명서를 참조하십시오, 그 숫자는 정렬을위한 두 가지의 힘을 기억하십시오.',
		'NOT CLOSED STRING':		'문자열이 닫혀 있지 않습니다 (인용 부호로 종료하는 것을 잊었다)',
		'NO QUOTATION MARKS':		'인용 부호하지만 발견과 예상 문자열 :',
		'UNEXPECTED DATATYPE':		'예기치 않은 데이터 유형 이름 :',
		'INVALID SEGMENT NAME':		'.DATA /는 .text / ... 세그먼트 예상하지만 발견 :',
		'NO MAIN OR KMAIN':		'태그 \'주\'또는 \'KMAIN\'는 텍스트 세그먼트 (들)에 정의되어 있지 않습니다. 이 프로그램을 실행하기 위해 해당 태그 중 적어도 하나를 정의하는 의무',
		'UNKNOWN 1':		'알 수없는 오류가 발생 (1)',
		'UNKNOWN 2':		'예기치 못한 오류 (2)',
		'REMEMBER I. FORMAT':		'명령어 형식은 다음과 같이 정의되어 있는지 기억 :',
		'SEVERAL CANDIDATES':		'수업 및 필드는 둘 이상의 가능한 명령과 일치합니다. 마이크로 코드를 확인하시기 바랍니다. 현재 명령의 형식은 다음과 같습니다',
		'NOT MATCH MICRO':		'수업 및 필드는 정의 된 명령 형식과 일치하지 않습니다',
		'CHECK MICROCODE':		'마이크로 코드를 확인하시기 바랍니다. 아마 당신은 필드를 추가하는 것을 잊었다 숫자는 공간에 맞지 않는, 또는 당신은 단지 잘못된 명령을 사용',

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

