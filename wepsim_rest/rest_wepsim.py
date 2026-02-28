
#
# Import
#

from fastapi      import FastAPI
from pydantic     import BaseModel
from urllib.parse import urlparse

import uvicorn
import os, sys
import subprocess, requests


#
# Auxiliar functions
#

def wepsim_helper(cmd_options:str) -> tuple[int, str]:
    # build associated command
    ws_path = '../ws_dist/wepsim.sh'
    cmd = ws_path + ' ' + cmd_options

    # code inspired from https://stackoverflow.com/questions/89228/how-do-i-execute-a-program-or-call-a-system-command
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    ret_val  = p.stdout.readlines()
    ret_code = p.wait()

    # return status and output
    return ret_code, ret_val

def is_valid_url(url):
    # code from https://www.slingacademy.com/article/python-ways-to-check-if-a-string-is-a-valid-url/
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

def ws_save2file(filename:str, value: str) -> bool:
    try:
       # firm as url...
       if is_valid_url(value):
          response = requests.get(value)
          with open(filename, 'wb') as file:
               file.write(response.content)
          return response.ok

       # firm as text...
       with open(filename, 'w') as file:
            file.write(value)
       return True
    except Exception as error:
       print(f"ERROR: {error}")
       return False

def wepsim_action(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    # options
    fname_firm  = '/tmp/firm.mc'
    fname_asm   = '/tmp/app.asm'

    # save firmware on file
    ret = ws_save2file(fname_firm, firm)
    if (False == ret):
        return -1, "firmware file cannot be written"

    # save assembly on file
    ret = ws_save2file(fname_asm, asm)
    if (False == ret):
        return -1, "assembly file cannot be written"

    # return action on files
    cmd_options = " -a " + action + " -m " + model + " -f " + fname_firm + " -s " + fname_asm
    return wepsim_helper(cmd_options)


#
# Definition of the "api" object
#

## Initialize FastAPI
api = FastAPI()

## Get status as API REST (1: ok)
@api.get("/api/status")
def rest_status():
    return { "status": 1 }

class Item(BaseModel):
    action:   str
    model:    str
    firmware: str
    assembly: str

## Post action as REST API (-1: error)
@api.post("/api/action/")
def rest_action(item: Item):
    # options
    fname_firm  = '/tmp/firm.mc'
    fname_asm   = '/tmp/app.asm'
    cmd_options = " -a " + item.action + " -m " + item.model + " -f " + fname_firm + " -s " + fname_asm

    # save firmware on file
    ret = ws_save2file(fname_firm, item.firmware)
    if (False == ret):
        return -1, "firmware file cannot be written"

    # save assembly on file
    ret = ws_save2file(fname_asm, item.assembly)
    if (False == ret):
        return -1, "assembly file cannot be written"

    # return action on files
    status, output = wepsim_helper(cmd_options)
    return { "status": status, "output": output }


##
## Main
##

if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=8008)

