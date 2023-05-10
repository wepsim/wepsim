#!/usr/bin/env python3


#
#  Copyright 2022-2023 Felix Garcia Carballeira, Diego Carmarmas Alonso, Alejandro Calderon Mateos
#
#  This file is part of WepSIM.
#
#  WepSIM is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  WepSIM is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public License
#  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#


from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS, cross_origin
import subprocess, shutil, multiprocessing


######### Global variables ###################

flash_process = None
result = None


######### Auxiliar functions #################

# Adapt assembly file, for do_flashing
def creator_build(file_in, file_out):
	# open input + output files
	fi   = open(file_in, "rt")
	fout = open(file_out, "wt")

	# write header
	fout.write(".text\n");
	fout.write(".type main, @function\n")
	fout.write(".globl main\n")

	data = []
	# for each line in the input file...
	for line in fin:
		data = line.strip().split()
		if (len(data) > 0):
			if (data[0] == 'rdcycle'):
					fout.write("#### rdcycle" + data[1] + "####\n")
					fout.write("addi sp, sp, -8\n")
					fout.write("sw ra, 0(sp)\n")
					fout.write("jal _esp_cpu_set_cycle_count\n")
					fout.write("lw ra, 0(sp)\n")
					fout.write("addi sp, sp, 8\n")
					fout.write("mv "+ data[1] +" a0\n")
					fout.write("####################\n")
					continue

			if (data[0] == 'ecall'):
					fout.write("#### ecall ####\n")
					fout.write("addi sp, sp, -8\n")
					fout.write("sw ra, 0(sp)\n")
					fout.write("jal _myecall\n")
					fout.write("lw ra, 0(sp)\n")
					fout.write("addi sp, sp, 8\n")
					fout.write("###############\n")
					continue

		fout.write(line)

	# close input + output files
	fin.close()
	fout.close()


# Flasing assembly program into target board, for (2)
def do_flashing(request):
	try:
		req_data = request.get_json()
		target_device = req_data['target_port']
		target_board  = req_data['target_board']
		asm_code      = req_data['assembly']

		# create temporal assembly file
		text_file = open("tmp_assembly.s", "w")
		ret = text_file.write(asm_code)
		text_file.close()

		# transform the temporal assembly file
		creator_build('tmp_assembly.s', "main/program.s");

		# execute flashing script
		global result
		result = subprocess.Popen(['./flash.sh', target_board, target_device],
					stdout=subprocess.PIPE, stderr=subprocess.PIPE)

	except Exception as e:
		pass

	global flash_process
	flash_process = None


######### Action functions ###################

# (1) Get form values
def do_get_form(request):
	try:
		return send_file('gateway.html')
	except Exception as e:
		return str(e)


# (2) Do flash request
def do_flash_request(request):
	try:
		req_data = request.get_json()
		req_data['status'] = ''
		req_data['error']  = 0

		try:
			shutil.rmtree('build')
		except Exception as e:
			pass

		global flash_process
		if flash_process == None:
			flash_process = multiprocessing.Process(target=do_flashing, args=(request,))
			flash_process.start()
			#flash_process.join()

	except Exception as e:
		req_data['status'] = str(e) + '\n'
		req_data['error']  = -1

	return jsonify(req_data)


# (3) Stream results
def do_stream_output():
	if result == None:
		return 'data: END_OF_SSE\n\n'
	if result.stdout == None:
		return 'data: END_OF_SSE\n\n'

	for line in iter(result.stdout.readline, b''):
		try:
			yield 'data: ' + line.decode('utf-8') + '\n\n'
		except:
			yield 'data: ' + str(line) + '\n\n'

	yield  'data: END_OF_SSE\n\n'


# (4) Cancel running flash process
def do_cancel_work(request):
	req_data = request.get_json()

	global flash_process
	if flash_process != None:
		flash_process.terminate()
		req_data['status'] = 'Ok'
	else:
		req_data['status'] = 'Done!'

	flash_process = None
	result        = None
	return jsonify(req_data)


######### Main ###############################

if __name__ == "__main__":

	# Setup flask and cors:
	app  = Flask(__name__)
	cors = CORS(app)
	app.config['CORS_HEADERS'] = 'Content-Type'

	# (1) GET / -> send gateway.html
	@app.route("/", methods=["GET"])
	@cross_origin()
	def get_form():
		return do_get_form(request)

	# (2) POST /flash -> flash
	@app.route("/flash", methods=["POST"])
	@cross_origin()
	def post_flash():
		return do_flash_request(request)

	# (3) GET /status -> send output
	@app.route("/status", methods=["GET"])
	@cross_origin()
	def get_status():
		return Response(do_stream_output(), mimetype= 'text/event-stream') ;

	# (4) POST /cancel -> pkill python
	@app.route("/cancel", methods=["POST"])
	@cross_origin()
	def post_stop_flash():
		return do_cancel_work(request)

	# Run
	app.run(host='0.0.0.0', port=8080, debug=True)

