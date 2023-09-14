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


    i18n.eltos.compiler.ja = {

	        "PROBLEM AROUND LINE":          "ライン周辺の問題",
		'NO TAG OR DIRECTIVE':		'タグやディレクティブを期待したが、代わりにこのトークンが見つかりました：',
		'NO TAG, DIR OR INS':		'有効なタグ（例：tag1 :)ディレクティブ（例：.data）または命令が見つかりません: ',
		'INVALID TAG FORMAT':		'タグは、（文字または下線で始まる）英数字フォーマットに従わなければなりません。',
		'TAG OR INSTRUCTION':		'タグは、命令と同じ名前を持つことはできません。',
		'REPEATED TAG':			'繰り返さタグ：',
		'NO NUMERIC DATATYPE':		'数値データ型の値が期待されたが見つから：',
		'NO POSITIVE NUMBER':		'正の数を期待されたが見つから：',
		'NO NUMBER OF BYTES':		'.SPACEで予約するバイト数を期待されたが見つから：',
		'INVALID ALIGN VALUE':		'正の数として整列パラメータを期待されたが見つから：',
		'REMEMBER ALIGN VAL':		'数は、アライメント用の2つの電源であることを忘れないでください、MIPSのマニュアルを参照してください。',
		'NOT CLOSED STRING':		'文字列が閉じていない（引用符でそれを終了するのを忘れました）',
		'NO QUOTATION MARKS':		'予想引用符の間の文字列ではなくが見つかりました：',
		'UNEXPECTED DATATYPE':		'予期しないデータ型名：',
		'INVALID SEGMENT NAME':		'.dataの/の.text / ...セグメント期待されたが見つから：',
		'NO MAIN OR KMAIN':		'タグ「主」または「kmain」はテキスト・セグメント（単数または複数）で定義されていません。プログラムを実行するために、これらのタグのうちの少なくとも一つを定義することが義務付けられています',
		'UNKNOWN 1':			'不明なエラーがフィールドタイプのために（1）発生しました：',
		'UNKNOWN 2':			'予期しないエラー（2）',
		'REMEMBER FORMAT USED':		'これは、次の場合に使用される命令形式です。 ',
		'REMEMBER I. FORMAT':		'命令フォーマットは次のように定義されていることに注意してください：',
		'SEVERAL CANDIDATES':		'命令とフィールドは、複数のマイクロプログラムで一致します。マイクロコードを確認してください。現在、命令フォーマットを指定できます。',
		'NOT MATCH FORMAT':		'命令とフィールドが定義された形式と一致しません',
		'NOT MATCH MICRO':		'命令とフィールドはマイクロプログラムと一致しません。',
		'CHECK MICROCODE':		'マイクロコードを確認してください',
                'CHECKS':               	'フィールドの追加/削除を忘れた、数値が範囲外である、間違った命令が使用された、などの可能性があります。',
		'LABEL NOT DEFINED':		'ラベルは使用されるが、アセンブリコードで定義されていません。',
		'INS. MISSING FIELD':		'命令のフィールドがありません',
		'UNEXPECTED (REG)':		'予想されるレジスタが、括弧の間のレジスタを見つけました。',
		'EXPECTED (REG)':		'括弧が、見つかったの間に予想されるレジスタ：',
		'EXPECTED REG':			'予想されるレジスタ（例えば：$1/$a0/...）しかしが見つかりました：',
                'UNKNOWN ESCAPE CHAR':          '不明なエスケープ文字',
                'SPACE FOR # BITS':             " バイナリのビットですが、スペースがあります ",
                'NEEDS':                        ' が必要だ ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'予想される「<ラベル>：」が見つかりません、トークンが見つかりました：',
		'REPEATED LABEL':		'ラベルが繰り返されます。',
		'INVALID LABEL FORMAT':		'ラベルフォーマットは有効ではありません。',
		'OPEN BRACE NOT FOUND':		'予想「{」が見つかりません',
		'CLOSE BRACE NOT FOUND':	'予想「}」が見つかりません',
		'OPEN PAREN. NOT FOUND':	'予想される「（」が見つかりません',
		'CLOSE PAREN. NOT FOUND':	'予想「）」が見つかりません',
		'COMMA NOT FOUND':		'予想される「」が見つかりません',
		'EQUAL NOT FOUND':		'予想「=」が見つかりません',
		'SIGNAL NOT EXISTS':		'信号が存在しません。',
		'SIGNAL NO DIRECTLY':		'信号を直接使用することはできません、代わりに、コントロールユニットの信号を使用してください。',
		'INCORRECT BIN. FORMAT':	'不正なバイナリフォーマット：',
		'OUT OF RANGE':			'範囲外の値：',
		'EMPTY MICROCODE':		'空のマイクロコード',
		'EMPTY NAME LIST':		'レジスタのための空の名前のリスト：X = []',
		'DUPLICATE SP':			'スタックポインタの重複定義',
		'NO SP':			'トークン期待stack_pointerが見つかりません。',
		'UNDEF. INSTR.':		'未定義命令：',
		'MORE 100 FIELDS':		'単一の命令で100の以上のフィールド。',
		'CO AS FIELD NAME':		'命令フィールドは、名前として「コ」を持っています。',
		'NW AS FIELD NAME':		'命令フィールドは、名前として「NWORDS」を有します。',
		'NO CO FIELD':			'予想されるキーワード「コ」が見つかりません',
		'INCORRECT CO BIN.':		'「コ」に関する誤ったバイナリフォーマット：',
		'INCORRECT COP BIN.':		'「警官」に関する誤ったバイナリフォーマット：',
		'INVALID PARAMETER':		'無効なパラメーター：',
		'ALLOWED PARAMETER':		'REG、NUM、INM、ADDR、住所：それは次のフィールドのみを許可します',
		'MISSING TOKEN ON':		'「トークンは、」オン「（」の後に欠落しています。',
		'MISSING ) ON':			'「）」に欠落しています。',
		'CO ALREADY USED':		'「コは」は既にによって使用されています。',
		'CO+COP ALREADY USED':		'「+コープは」は既にによって使用されています。',
		'NO NWORDS':			'予想されるキーワード「NWORDS」が見つかりません',
		'INCORRECT ADDRESSING':		'間違った（absまたはREL）をアドレッシングのタイプ',
		'UNEXPECTED FIELD':		'予期しないフィールドが見つかりました：',
                'CHECK ORDER':                  'フィールドの順序を確認してください',
		'STARTBIT OoR':			'範囲外スタートビット：',
		'STOPBIT OoR':			'範囲外のストップビット：',
		'OVERLAPPING FIELD':		'オーバーラップするフィールド：',
		'BAD COP BIN. LEN.':		'「警官」の誤ったバイナリの長さ：',
		'SP NOT DEFINED':		'スタックポインタレジスタが定義されていませんでした',
		'NO LABEL FETCH':		'ラベル定義されていない「フェッチ」',
		'NO LABEL BEGIN':		'「開始」が見つかりません',
		'NO CO CODES':			'手順については、利用可能な十分な「コ」のコードはありません',
		'NO LABEL MADDR':		'MADDRラベルが見つかりません：',
		'INS. NAME':			'命令名： "',
		'NOT VALID FOR':		'\'の有効ではありません。',
		'BIGGER THAN':			'より大きい',
		'BITS':				'ビット',
		'EXPECTED VALUE':		'そのAに収まる "期待値',
		'BUT INSERTED':			'しかし挿入',
		'INSTEAD':			'その代わり',

           	"BAD EOC BIN. LEN.":			"eoc フィールドのビット数が正しくありません",
           	"BIT OoR":				"Bit OoR",
           	"COLON NOT FOUND":			"： 見つかりません",
           	"COLON OR PIPE NOT FOUND":		": または |見つかりません",
           	"INCORRECT EOC BIN.":			"不正な eoc バイナリ",
           	"INCORRECT OC BIN.":			"不正な  oc バイナリ",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"ocはすでに使用されています",
           	"OC+EOC ALREADY USED":			"oc+eocはすでに使用されています",

		'_last_':			'_last_'

    };

