
#
# Import
#

from fastapi  import FastAPI
from fastmcp  import FastMCP
from pydantic import BaseModel
import uvicorn
import os, sys, subprocess


#
# Auxiliar functions
#
frm_name = '/tmp/firm.mc'
asm_name = '/tmp/app.asm'
ws_path  = '../ws_dist/wepsim.sh'

def ws_save2file(filename:str, mode: str, value: str) -> bool:
    try:
       f = open(filename, 'w')
       f.write(value)
       f.close()
       return True
    except:
       return False

def ws_helper(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    # save firmware and assembly on files
    ret = ws_save2file(frm_name, 'w', firm)
    if (False == ret):
        return -1, "firmware file cannot be written"
    ret = ws_save2file(asm_name, 'w', asm)
    if (False == ret):
        return -1, "assembly file cannot be written"

    # build associated command
    cmd = ws_path + " -a " + action + " -m " + model + " -f " + frm_name + " -s " + asm_name

    # code inspired from https://stackoverflow.com/questions/89228/how-do-i-execute-a-program-or-call-a-system-command
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    ret_val  = p.stdout.readlines()
    ret_code = p.wait()

    # return status and output
    return ret_code, ret_val


#
# Definition of the "mcp" object
#

## Initialize FastMCP
mcp = FastMCP("wepsim")

## Define utilidades (*tools*)
@mcp.tool()
def wepsim(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    """WepSIM is instructed to perform an action with a model, a firmware and an assembly code."""
    return ws_helper(action, model, firm, asm)


## Define entradas (*prompts*)
@mcp.prompt()
def prompt(action: str, model: str, firm: str, asm: str) -> str:
    """Prompt for wepsim."""
    if   action == "run":
         return f"The result of executing                        the assembly with firmware is {wepsim('run', model, firm, asm)}"
    elif action == "stepbystep":
         return f"The result of executing step by step           the assembly with firmware is {wepsim('stepbystep', model, firm, asm)}"
    elif action == "microstepbymicrostep":
         return f"The result of executing microstep by microstep the assembly with firmware is {wepsim('microstepbymicrostep', model, firm, asm)}"
    else:
         return "Invalid operation. Please choose run, stepbystep, and microstepbymicrostep."


#
# Definition of the "api" object
#

## Initialize FastAPI
mcp_app = mcp.http_app(path="/")
api = FastAPI(lifespan=mcp_app.lifespan)

## Monta MCP Streamable HTTP en "/mcp"
api.mount("/mcp", mcp_app)

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
    status, output = ws_helper(item.action, item.model, item.firmware, item.assembly)
    return { "status": status, "output": output }


##
## Main
##

if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=8008)

