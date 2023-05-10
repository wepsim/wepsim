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

import subprocess, os, threading

import watchdog.events
import watchdog.observers
import time


######### Auxiliar functions #################

# Adapt assembly file, for (2)
def creator_build(file_in, file_out):
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


result = None

def do_cmd(req_data, cmd_array):
	req_data['status'] = ''
	req_data['error']  = 0

	global result
	result = subprocess.Popen(cmd_array, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

	if result.stdout != None:
		req_data['status'] = 'result: ' + str(result)
	if result.returncode != None:
		req_data['error']  = result.returncode


# Fragment based on: https://www.geeksforgeeks.org/create-a-watchdog-in-python-to-look-for-filesystem-changes/
added_dev_elto = ''
observer = None

class observerHandler(watchdog.events.PatternMatchingEventHandler):
	def __init__(self):
		watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*'],
								     ignore_directories=False, case_sensitive=False)
 
	def on_created(self, event):
		global added_dev_elto
		added_dev_elto = event.src_path
		print("detected new entry: ", event.src_path)

	def on_moved(self, event):
		global added_dev_elto
		added_dev_elto = event.src_path
		print("detected new entry: ", event.src_path)

def do_start_observer():
	event_handler = observerHandler()
	global observer
	observer = watchdog.observers.Observer()
	observer.schedule(event_handler, path=r"/dev/", recursive=True)
	observer.start()

def do_stop_observer():
	observer.stop()
 

######### Action functions ###################

# (1) Get form values
def do_get_form(request):
	try:
		return send_file('gateway.html')
	except Exception as e:
		return str(e)


# (2) Flasing assembly program into target board
def do_flash_request(request):
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
		do_cmd(req_data, ['sh', '-c', './flash.sh', target_board, target_device])

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


# (4) Get cancel request
def do_get_cancel(request):
	try:
		req_data = request.get_json()
		do_cmd(req_data, ['pkill', 'python'])

	except Exception as e:
		req_data['error']  = -1
		req_data['status'] = str(e) + '\n'

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
	def get_cancel():
		return do_get_cancel(request)


	# Observer + Flask
	do_start_observer()

	try:
		# Run flask app
		app.run(host='0.0.0.0', port=8080, debug=True)

	except KeyboardInterrupt:
		observer.stop()

		# Fragment based on: https://copyprogramming.com/howto/how-to-close-a-flask-web-server-with-python
		shutdown_func = request.environ.get('werkzeug.server.shutdown')
		if shutdown_func != None:
			shutdown_func()

	observer.join()

