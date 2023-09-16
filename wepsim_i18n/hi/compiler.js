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


    i18n.eltos.compiler.hi = {

	   "PROBLEM AROUND LINE":  "Problem around line",
		'NO TAG OR DIRECTIVE':		'उम्मीद टैग या निर्देश लेकिन यह बजाय टोकन: ',
		'NO TAG, DIR OR INS':		'वैध टैग नहीं है (उदा .: टैग 1 :) निर्देश (जैसे: .डाटा) या निर्देश, पाया गया: ',
		'INVALID TAG FORMAT':		'टैग एक अक्षरांकीय प्रारूप का पालन करना चाहिए (एक पत्र या अंडरस्कोर के साथ शुरू): ',
		'TAG OR INSTRUCTION':		'एक टैग एक निर्देश के रूप में एक ही नाम नहीं कर सकते हैं: ',
		'REPEATED TAG':			'बार-बार टैग: ',
		'NO NUMERIC DATATYPE':		'सांख्यिक डेटाप्रकार लेकिन पाया के लिए अपेक्षित मूल्य: ',
		'NO POSITIVE NUMBER':		'एक सकारात्मक संख्या की अपेक्षा थी लेकिन पाया: ',
		'NO NUMBER OF BYTES':		'बाइट्स की अपेक्षित संख्या .space में आरक्षित लेकिन पाया करने के लिए: ',
		'INVALID ALIGN VALUE':		'धनात्मक संख्या लेकिन पाया के रूप में संरेखित पैरामीटर की उम्मीद: ',
		'REMEMBER ALIGN VAL':		'याद रखें कि संख्या संरेखण के लिए दो की शक्ति है, MIPS दस्तावेज़ देखें।',
		'NOT CLOSED STRING':		'स्ट्रिंग बंद नहीं है (उद्धरण चिह्नों के साथ इसे समाप्त करना भूल गया)',
		'NO QUOTATION MARKS':		'उद्धरण चिह्नों लेकिन पाया के बीच उम्मीद की स्ट्रिंग: ',
		'UNEXPECTED DATATYPE':		'अप्रत्याशित डेटाप्रकार नाम: ',
		'INVALID SEGMENT NAME':		'उम्मीद .data / .text / ... खंड लेकिन पाया: ',
		'NO MAIN OR KMAIN':		'टैग \'मुख्य\' या \'kmain\' पाठ खंड (रों) में परिभाषित नहीं कर रहे हैं। यह आदेश एक कार्यक्रम पर अमल करने में उन टैग का कम से कम एक परिभाषित करने के लिए अनिवार्य है',
		'UNKNOWN 1':			'फ़ील्ड प्रकार के लिए एक अज्ञात त्रुटि हुई (1): ',
		'UNKNOWN 2':			'अनपेक्षित त्रुटि (2)',
		'REMEMBER FORMAT USED':		'यह निर्देश प्रारूप के लिए उपयोग किया जाता है ',
		'REMEMBER I. FORMAT':		'याद रखें कि अनुदेश प्रारूप के रूप में परिभाषित किया गया है: ',
		'SEVERAL CANDIDATES':		'निर्देश और खेतों से अधिक सूक्ष्म प्रोग्राम के साथ मेल खाते हैं। माइक्रोकोड की जांच करें। वर्तमान में, अनुदेश प्रारूप हो सकता है: ',
		'NOT MATCH FORMAT':		'निर्देश और फ़ील्ड परिभाषित प्रारूप(प्रारूपों) से मेल नहीं खाते',
		'NOT MATCH MICRO':		'निर्देश और खेतों माइक्रो प्रोग्राम के साथ मेल नहीं खाते।',
		'CHECK MICROCODE':		'कृपया माइक्रोकोड जांचें',
                'CHECKS':               	'हो सकता है कि आप फ़ील्ड जोड़ना/हटाना भूल गए हों, कोई संख्या सीमा से बाहर हो, गलत निर्देश का उपयोग किया गया हो, आदि।',
		'INS. MISSING FIELD':		'शिक्षा में क्षेत्र गुम',
		'UNEXPECTED (REG)':		'उम्मीद रजिस्टर लेकिन कोष्ठक के बीच रजिस्टर पाया।',
		'EXPECTED (REG)':		'कोष्ठक लेकिन पाया के बीच उम्मीद रजिस्टर:',
		'EXPECTED REG':			'उम्मीद रजिस्टर (उदा .: $ 1 / $ a0 / ...) लेकिन पाया:',
                'UNKNOWN ESCAPE CHAR':          'अज्ञात बच चार',
                'SPACE FOR # BITS':             " बाइनरी में बिट्स लेकिन केवल के लिए जगह है ",
                'NEEDS':                        ' इसकी जरूरत है ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT DEFINED':		'लेबल थे, लेकिन नहीं विधानसभा कोड में परिभाषित: ',
		'LABEL NOT FOUND':		'उम्मीद \'<label>:\' नहीं मिला, टोकन पाया: ',
		'REPEATED LABEL':		'लेबल दोहराया है: ',
		'INVALID LABEL FORMAT':		'लेबल प्रारूप के लिए मान्य नहीं है: ',
		'OPEN BRACE NOT FOUND':		'उम्मीद \'{\' नहीं मिला',
		'CLOSE BRACE NOT FOUND':	'उम्मीद \'}\' नहीं मिला',
		'OPEN PAREN. NOT FOUND':	'उम्मीद \'(\' नहीं मिला',
		'CLOSE PAREN. NOT FOUND':	'उम्मीद \')\' नहीं मिला',
		'COMMA NOT FOUND':		'उम्मीद \',\' नहीं मिला',
		'EQUAL NOT FOUND':		'उम्मीद \'=\' नहीं मिला',
		'SIGNAL NOT EXISTS':		'सिग्नल मौजूद नहीं करता है: ',
		'SIGNAL NO DIRECTLY':		'संकेत सीधे नहीं किया जा सकता, नियंत्रण इकाई संकेतों के बजाय का उपयोग करें।',
		'INCORRECT BIN. FORMAT':	'गलत द्विपदीय प्रारूप: ',
		'OUT OF RANGE':			'सीमा से बाहर मूल्य: ',
		'EMPTY MICROCODE':		'खाली माइक्रोकोड',
		'EMPTY NAME LIST':		'रजिस्टर के लिए खाली नाम सूची: x = []',
		'DUPLICATE SP':			'ढेर सूचक की डुप्लीकेट परिभाषा',
		'NO SP':			'उम्मीद stack_pointer नहीं मिला टोकन',
		'UNDEF. INSTR.':		'अपरिभाषित अनुदेश: ',
		'MORE 100 FIELDS':		'एक एकल अनुदेश में 100 से अधिक क्षेत्रों।',
		'CO AS FIELD NAME':		'निर्देश क्षेत्र नाम के रूप में \'सह\' है।',
		'NW AS FIELD NAME':		'निर्देश क्षेत्र नाम के रूप में \'nwords\' है।',
		'NO CO FIELD':			'उम्मीद कीवर्ड \'सह\' नहीं मिली',
		'INCORRECT CO BIN.':		'\'सह\' पर गलत द्विपदीय प्रारूप: ',
		'INCORRECT COP BIN.':		'\'पुलिस\' पर गलत द्विपदीय प्रारूप: ',
		'INVALID PARAMETER':		'अमान्य मापदंड: ',
		'ALLOWED PARAMETER':		'रेग, संख्या, INM, addr, पता: यह केवल निम्नलिखित क्षेत्रों की अनुमति देता है',
		'MISSING TOKEN ON':		'\'टोकन\' पर के बाद \'(\' याद आ रही है: ',
		'MISSING ) ON':			'\')\' पर याद आ रही है: ',
		'CO ALREADY USED':		'\'सह\' पहले से ही द्वारा इस्तेमाल किया गया है: ',
		'CO+COP ALREADY USED':		'\'सह + सेशन\' पहले से ही द्वारा इस्तेमाल किया गया है: ',
		'NO NWORDS':			'उम्मीद कीवर्ड \'nwords\' नहीं मिली',
		'INCORRECT ADDRESSING':		'गलत (पेट या rel) को संबोधित करने का टाइप करें',
		'UNEXPECTED FIELD':		'अप्रत्याशित क्षेत्र पाया: ',
                'CHECK ORDER':                  'कृपया खेतों का क्रम जांचें ',
		'STARTBIT OoR':			'सीमा से बाहर startbit: ',
		'STOPBIT OoR':			'सीमा से बाहर stopbit: ',
		'OVERLAPPING FIELD':		'ओवरलैपिंग क्षेत्र: ',
		'BAD COP BIN. LEN.':		'\'पुलिस\' के लिए गलत द्विआधारी लंबाई: ',
		'SP NOT DEFINED':		'ढेर सूचक रजिस्टर परिभाषित नहीं किया गया था',
		'NO LABEL FETCH':		'लेबल \'लाने\' को परिभाषित नहीं किया',
		'NO LABEL BEGIN':		'\'शुरू\' नहीं मिली',
		'NO CO CODES':			'वहाँ निर्देश के लिए पर्याप्त \'सह\' कोड उपलब्ध नहीं है',
		'NO LABEL MADDR':		'MADDR लेबल नहीं मिला: ',
		'INS. NAME':			'निर्देश का नाम: \'',
		'NOT VALID FOR':		'\'के लिए मान्य नहीं है: ',
		'BIGGER THAN':			'के अपेक्षा बड़ा है',
		'BITS':				'बिट्स',
		'EXPECTED VALUE':		'उम्मीद मूल्य है कि एक में फिट \'',
		'BUT INSERTED':			'लेकिन डाला',
		'INSTEAD':			'बजाय',

           	"BAD EOC BIN. LEN.":			"ईओसी फ़ील्ड के लिए बिट्स की गलत संख्या ",
           	"BIT OoR":				"Bit OoR",
           	"COLON NOT FOUND":			": नहीं मिला",
           	"COLON OR PIPE NOT FOUND":		": या | नहीं मिला",
           	"INCORRECT EOC BIN.":			"Incorrect eoc bin.",
           	"INCORRECT OC BIN.":			"Incorrect oc bin.",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"ओसी पहले से ही इस्तेमाल किया जा चुका है ",
           	"OC+EOC ALREADY USED":			"oc+eoc पहले से ही उपयोग किया जा चुका है",

		'_last_':			'_last_'

    };

