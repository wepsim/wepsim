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
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the
#  GNU Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public License
#  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#


from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS, cross_origin
import subprocess


# (1) Get form values
def do_get_form(request):
	try:
		return send_file('gateway.html')
	except Exception as e:
		return str(e)


# Adapt assembly file...
def creator_build(file_in, file_out):
	try:
		# open input + output files
		fin	 = open(file_in, "rt")
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
		return 0

	except Exception as e:
		print("Error adapting assembly file: ", str(e))
		return -1

def do_cmd(req_data, cmd_array):
	res_out = ''
	res_err = 0

	result = subprocess.run(cmd_array, capture_output=False)
	if result.stdout != None:
		res_out = result.stdout.decode('utf-8')
	if result.stderr != None:
		res_out = result.stderr.decode('utf-8')
	if result.returncode != None:
		res_err = result.returncode

	req_data['status'] += res_out + '\n'
	req_data['error']   = res_err

	return res_err


# (2) Flasing assembly program into target board
def do_flash_request(request):
	try:
		req_data = request.get_json()
		target_device	   = req_data['target_port']
		target_board	   = req_data['target_board']
		asm_code	   = req_data['assembly']
		req_data['status'] = ''

		# create temporal assembly file
		text_file = open("tmp_assembly.s", "w")
		ret = text_file.write(asm_code)
		text_file.close()

		# transform th temporal assembly file
		error = creator_build('tmp_assembly.s', "main/program.s");
		if error != 0:
			req_data['status'] += 'Error adapting assembly file...\n'

		# flashing steps...
		if error == 0:
			error = do_cmd(req_data, ['idf.py',  'fullclean'])
		if error == 0:
			error = do_cmd(req_data, ['idf.py',  'set-target', target_board])
		if error == 0:
			error = do_cmd(req_data, ['idf.py', 'build'])
		if error == 0:
			error = do_cmd(req_data, ['idf.py', '-p', target_device, 'flash'])
		if error == 0:
			error = do_cmd(req_data, ['idf.py', '-p', target_device, 'monitor'])

	except Exception as e:
		req_data['status'] += str(e) + '\n'

	return jsonify(req_data)


# (3) Stream results
def do_stream_output():
	try:
		fin = open("tmp_output.txt",  "rt")
		for line in fin:
			yield "data: " + line + "\n"
		fin.close()
		yield "data: \n\n"
		os.remove("tmp_output.txt")
	except Exception as e:
		return str(e)


# (4) Get cancel request
def do_get_cancel(request):
	try:
		req_data = request.get_json()
		req_data['status'] = 'Done'
		error = do_cmd(req_data, ['pkill', 'python'])
	except Exception as e:
		req_data['error']  = -1
		req_data['status'] = str(e) + '\n'

	return jsonify(req_data)


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

# (3) GET /status -> send tmp_output.txt
@app.route("/status", methods=["GET"])
@cross_origin()
def get_status():
		return Response(do_stream_output(), mimetype= 'text/event-stream') ;

# (4) POST /cancel -> pkill python
@app.route("/cancel", methods=["POST"])
@cross_origin()
def get_cancel():
		return do_get_cancel(request)

# Run
app.run(host='0.0.0.0', port=8080, debug=True)

