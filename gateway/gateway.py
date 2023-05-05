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


from flask      import Flask, request, jsonify, send_file, Response
from flask_cors import CORS, cross_origin
import subprocess, os


# (1) method to send form...
def do_get_form(request):
    try:
        return send_file('gateway.html')
    except Exception as e:
        return str(e)


# Adapt assembly file...
def creator_build(file_src, file_dst):
	try:
		fin  = open(file_src, "rt")
		fout = open(file_dst, "wt")

		# add initial header
		fout.write(".text\n");
		fout.write(".type main, @function\n")
		fout.write(".globl main\n")

		datos = []
		# for each line in the input file...
		for line in fin:
			datos = line.split()
			if (len(datos) > 0):
				if (datos[0] == 'rdcycle'):
					fout.write("####\n ")
					fout.write("addi sp, sp, -8\n")
					fout.write("sw ra, 0(sp)\n")
					fout.write("jal _esp_cpu_set_cycle_count\n")
					fout.write("lw ra, 0(sp)\n")
					fout.write("addi sp, sp, 8\n")
					fout.write("mv "+datos[1]+" a0\n")
					fout.write("####\n ")
				else:
					line2 = line.replace('ecall', '#### \n addi sp, sp, -8 \n sw ra, 0(sp) \n jal _myecall \n lw ra, 0(sp) \n addi sp, sp, 8 \n ####')
					fout.write(line2)

		# close input + output files
		fin.close()
		fout.close()
		return 0 ;

	except Exception as e:
		print("Error adapting assembly file... :-/")
		return -1 ;

# (1) method to request flashing...
def do_flash_request(request):
    try:
       # (A) preparing work space...
       req_data = request.get_json()

       asm_code      = req_data['assembly']
       target_device = req_data['target_port']
       board         = req_data['target_board']

       cmd = [
                ['idf.py', 'fullclean'],
                ['idf.py', 'set-target', board],
                ['idf.py', 'build'],
                ['idf.py', '-p', target_device, 'flash'],
                ['idf.py', '-p', target_device, 'monitor']
             ]

       # (B) save assembly in tmp_assembly.s
       text_file = open("tmp_assembly.s", "w")
       ret = text_file.write(asm_code)
       text_file.close()

       # (C) tmp_assembly.s -> main/program.s
       req_data['status'] = ''
       ret = creator_build('tmp_assembly.s', 'main/program.s');
       if ret != 0:
          req_data['status'] = 'error when building assembly'

       # (D) execute list of commands
       for i in range(len(cmd)):
           if ret == 0:
              result = subprocess.run(cmd[i])
              req_data['status'] += result.stdout + '\n'
              ret = result.returncode

    except Exception as e:
       req_data['status'] = 'error: ' + e

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
    def generate():
        try:
            fin = open("tmp_output.txt",  "rt")
            for line in fin:
                yield "data: " + line + "\n"
            fin.close()
            yield "event: end\n"
            yield "data: \n\n"
            os.remove("tmp_output.txt")
        except Exception as e:
            return str(e)
    return Response(generate(), mimetype= 'text/event-stream') ;

# Run
app.run(host='0.0.0.0', port=8080, debug=True)

