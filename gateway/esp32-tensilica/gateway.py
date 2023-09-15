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
import subprocess, os, signal


# syscall - prolog
def syscall_pre(fout):
    fout.write("#### syscall ####\n")
    fout.write("addi sp, sp, -128\n")
    down_i = 120
    for up_i in range(32):
      if i != 2:
         fout.write("sw x", up_i, ",  ", down_i, "(sp)\n")
      down_i = down_i - 4

# syscall - epilog
def syscall_post(fout):
    down_i = 120
    for up_i in range(32):
      if i != 2:
         fout.write("lw x", up_i, ",  ", down_i, "(sp)\n")
      down_i = down_i - 4
    fout.write("addi sp, sp, 128\n")
    fout.write("###############\n")


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
        fin  = open(file_in, "rt")
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
                    fout.write("sw ra, 4(sp)\n")
                    fout.write("sw a0, 0(sp)\n")

                    fout.write("jal _esp_cpu_get_cycle_count\n")
                    fout.write("mv "+ data[1] +", a0\n")

                    fout.write("lw a0, 0(sp)\n")
                    fout.write("lw ra, 4(sp)\n")
                    fout.write("addi sp, sp, 8\n")
                    fout.write("####################\n")
                    continue

                if (data[0] == 'syscall'):
                    fout.write("#### syscall ####\n")
                    fout.write("addi $sp, $sp, -128\n")
                    fout.write("sw $1,  120($sp)\n")
                    fout.write("sw $3,  112($sp)\n")
                    fout.write("sw $4,  108($sp)\n")
                    fout.write("sw $5,  104($sp)\n")
                    fout.write("sw $6,  100($sp)\n")
                    fout.write("sw $7,   96($sp)\n")
                    fout.write("sw $8,   92($sp)\n")
                    fout.write("sw $9,   88($sp)\n")
                    fout.write("sw $10,  84($sp)\n")
                    fout.write("sw $11,  80($sp)\n")
                    fout.write("sw $12,  76($sp)\n")
                    fout.write("sw $13,  72($sp)\n")
                    fout.write("sw $14,  68($sp)\n")
                    fout.write("sw $15,  64($sp)\n")
                    fout.write("sw $16,  60($sp)\n")
                    fout.write("sw $17,  56($sp)\n")
                    fout.write("sw $18,  52($sp)\n")
                    fout.write("sw $19,  48($sp)\n")
                    fout.write("sw $20,  44($sp)\n")
                    fout.write("sw $21,  40($sp)\n")
                    fout.write("sw $22,  36($sp)\n")
                    fout.write("sw $23,  32($sp)\n")
                    fout.write("sw $24,  28($sp)\n")
                    fout.write("sw $25,  24($sp)\n")
                    fout.write("sw $26,  20($sp)\n")
                    fout.write("sw $27,  16($sp)\n")
                    fout.write("sw $28,  12($sp)\n")
                    fout.write("sw $29,   8($sp)\n")
                    fout.write("sw $30,   4($sp)\n")
                    fout.write("sw $31,   0($sp)\n")

                    fout.write("jal _mysyscall\n")

                    fout.write("lw $1,  120($sp)\n")
                    fout.write("lw $3,  112($sp)\n")
                    fout.write("lw $4,  108($sp)\n")
                    fout.write("lw $5,  104($sp)\n")
                    fout.write("lw $6,  100($sp)\n")
                    fout.write("lw $7,   96($sp)\n")
                    fout.write("lw $8,   92($sp)\n")
                    fout.write("lw $9,   88($sp)\n")
                    fout.write("lw $10,  84($sp)\n")
                    fout.write("lw $11,  80($sp)\n")
                    fout.write("lw $12,  76($sp)\n")
                    fout.write("lw $13,  72($sp)\n")
                    fout.write("lw $14,  68($sp)\n")
                    fout.write("lw $15,  64($sp)\n")
                    fout.write("lw $16,  60($sp)\n")
                    fout.write("lw $17,  56($sp)\n")
                    fout.write("lw $18,  52($sp)\n")
                    fout.write("lw $19,  48($sp)\n")
                    fout.write("lw $20,  44($sp)\n")
                    fout.write("lw $21,  40($sp)\n")
                    fout.write("lw $22,  36($sp)\n")
                    fout.write("lw $23,  32($sp)\n")
                    fout.write("lw $24,  28($sp)\n")
                    fout.write("lw $25,  24($sp)\n")
                    fout.write("lw $26,  20($sp)\n")
                    fout.write("lw $27,  16($sp)\n")
                    fout.write("lw $28,  12($sp)\n")
                    fout.write("lw $29,   8($sp)\n")
                    fout.write("lw $30,   4($sp)\n")
                    fout.write("lw $31,   0($sp)\n")
                    fout.write("addi $sp, $sp, 128\n")
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
        result   = subprocess.run(cmd_array, capture_output=False)

        if result.stdout != None:
            req_data['status'] += result.stdout.decode('utf-8') + '\n'
        if result.returncode != None:
            req_data['error']   = result.returncode

        return req_data['error']


# (2) Flasing assembly program into target board
def do_flash_request(request):
        try:
            req_data = request.get_json()
            target_device      = req_data['target_port']
            target_board       = req_data['target_board']
            asm_code           = req_data['assembly']
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

        except Exception as e:
            req_data['status'] += str(e) + '\n'

        return jsonify(req_data)


# (3) Run program into the target board
def do_monitor_request(request):
        try:
            req_data = request.get_json()
            target_device      = req_data['target_port']
            req_data['status'] = ''

            do_cmd(req_data, ['idf.py', '-p', target_device, 'monitor'])

        except Exception as e:
            req_data['status'] += str(e) + '\n'

        return jsonify(req_data)


# (4) Stop flashing
def do_stop_flash_request(request):
        try:
            req_data = request.get_json()
            req_data['status'] = ''
            do_cmd(req_data, ['pkill',  'idf.py'])

        except Exception as e:
            req_data['status'] += str(e) + '\n'

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
    try:
        shutil.rmtree('build')
    except Exception as e:
        pass

    return do_flash_request(request)

# (3) POST /monitor -> flash
@app.route("/monitor", methods=["POST"])
@cross_origin()
def post_monitor():
    return do_monitor_request(request)

# (4) POST /stop -> cancel
@app.route("/stop", methods=["POST"])
@cross_origin()
def post_stop_flash():
    return do_stop_flash_request(request)


# Run
app.run(host='0.0.0.0', port=8080, debug=False)
##app.run(host='0.0.0.0', port=8080, debug=True)

