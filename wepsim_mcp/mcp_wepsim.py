
#
# Import
#

from fastapi import FastAPI
from fastmcp import FastMCP
import uvicorn
import os, sys, subprocess


#
# A. Defime the "mcp" object
#

## Initialize FastMCP
mcp = FastMCP("wepsim")

## Define utilidades (*tools*)
@mcp.tool()
def ws(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    """action of run with model, firmware and assembly code."""

    # firmware
    frm_name = '/tmp/firm.mc'
    f = open(f_name, 'w')
    f.write(firm)
    f.close()

    # assembly
    asm_name = '/tmp/app.asm'
    f = open(asm_name, 'w')
    f.write(asm)
    f.close()

    # assembly
    cmd = "./wepsim.sh" + " -a " + action + " -m " + model + " -f " + frm_name + " -s " + asm_name

    # https://stackoverflow.com/questions/89228/how-do-i-execute-a-program-or-call-a-system-command
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    ret_val  = p.stdout.readlines()
    ret_code = p.wait()

    return ret_code, ret_val



## Define entradas (*prompts*)
@mcp.prompt()
def ws_prompt(action: str, m: str, firm: str, asm: str) -> str:
    """Prompt for wepsim."""
    if   action == "run":
         return f"The result of executing the assembly {asm} with firmware {firm} is {ws('run', m, firm, asm)}"
    elif action == "stepbystep":
         return f"The result of executing step by step the assembly {asm} with firmware {firm} is {ws_run('stepbystep', m, firm, asm)}"
    else:
         return "Invalid operation. Please choose run, stepbystep."


#
# B. Defime "api" object
#

## Initialize FastAPI
mcp_app = mcp.http_app(path="/")
api = FastAPI(lifespan=mcp_app.lifespan)

## Obtener status del servicio como API REST
@api.get("/api/status")
def status():
    return {"status": "ok"}

## Monta MCP Streamable HTTP en "/mcp"
api.mount("/mcp", mcp_app)


##
## Main
##

if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=8000)

