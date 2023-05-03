#!/usr/bin/env python3


#*
#*  Copyright 2022-2023 Felix Garcia Carballeira, Diego Carmarmas Alonso, Alejandro Calderon Mateos
#*
#*  This file is part of WepSIM.
#*
#*  WepSIM is free software: you can redistribute it and/or modify
#*  it under the terms of the GNU Lesser General Public License as published by
#*  the Free Software Foundation, either version 3 of the License, or
#*  (at your option) any later version.
#*
#*  WepSIM is distributed in the hope that it will be useful,
#*  but WITHOUT ANY WARRANTY; without even the implied warranty of
#*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#*  GNU Lesser General Public License for more details.
#*
#*  You should have received a copy of the GNU Lesser General Public License
#*  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#*


from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS, cross_origin
import subprocess, os

def do_get_form(request):
    try:
        return send_file('gateway.html')
    except Exception as e:
        return str(e)

def do_flash_request(request):
    try:
       req_data = request.get_json()

       asm_code = req_data['assembly']
       text_file = open("tmp_assembly.s", "w")
       ret = text_file.write(asm_code)
       text_file.close()

       target_device = req_data['target_port']

       result = subprocess.run(['./flash.sh', 'tmp_assembly.s', target_device])
       req_data['status'] = 'done'
    except Exception as e:
       req_data['status'] = 'error'

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
            yield "data: \n\n"
            os.remove("tmp_output.txt")
        except Exception as e:
            return str(e)
    return Response(generate(), mimetype= 'text/event-stream') ;

# Run
app.run(host='0.0.0.0', port=8080, debug=True)

