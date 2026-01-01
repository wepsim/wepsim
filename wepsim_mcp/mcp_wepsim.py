
#
# Import
#

from fastapi      import FastAPI
from fastmcp      import FastMCP
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
# Definition of the "mcp" object
#

## Initialize FastMCP
mcp = FastMCP("wepsim")

## Define utilidades (*tools*)
@mcp.tool()
def wepsim_run(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    """WepSIM is instructed to run an assembly code based on a firmware with a hardware model."""
    return wepsim_action('run', model, firm, asm)

@mcp.tool()
def wepsim_stepbystep(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    """WepSIM is instructed to run an assembly code based on a firmware with a hardware model."""
    return wepsim_action('stepbystep', model, firm, asm)

@mcp.tool()
def wepsim_microstepbymicrostep(action:str, model: str, firm: str, asm: str) -> tuple[int, str]:
    """WepSIM is instructed to run an assembly code based on a firmware with a hardware model."""
    return wepsim_action('microstepbymicrostep', model, firm, asm)

@mcp.tool()
def wepsim_help_signal(model: str, sname: str) -> tuple[int, str]:
    """WepSIM is instructed to help about signal."""

    # return help on signal
    cmd_options = " -a help -m " + model + " -s " + sname
    return wepsim_helper(cmd_options)

@mcp.tool()
def wepsim_help_component(model: str, cname: str) -> tuple[int, str]:
    """WepSIM is instructed to help about component."""

    # return help on component
    cmd_options = " -a help -m " + model + " -p " + cname
    return wepsim_helper(cmd_options)

@mcp.tool()
def wepsim_help_model(model: str) -> tuple[int, str]:
    """WepSIM is instructed to help about model."""

    # return help on model
    cmd_options = " -a help -m " + model
    return wepsim_helper(cmd_options)

@mcp.tool()
def wepsim_help_instructions(model: str, fname: str) -> tuple[int, str]:
    """WepSIM is instructed to help about instructions."""

    # return help on instructions
    cmd_options = " -a help -m " + model + " -f " + fname
    return wepsim_helper(cmd_options)


## Define recursos (*resource*)
@mcp.resource("models://")
def get_default_models_url() -> str:
    """WepSIM is instructed to obtain the full URL for the hardware models available."""
    return f"https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/hardware/hw.json"

@mcp.resource("microcode://{processor}")
def get_default_microcode_url(processor: str) -> str:
    """WepSIM is instructed to obtain the full URL for a microcode example."""
    return f"https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/microcode/{processor}/ep_bare.mc"

@mcp.resource("assembly://{processor}")
def get_default_ensamblador_url(processor: str) -> str:
    """WepSIM is instructed to obtain the full URL for an assembly example."""
    return f"https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/assembly/{processor}/s1e1.asm"

@mcp.resource("example_set://{processor}")
def get_default_exampleset_url(processor: str) -> str:
    """WepSIM is instructed to obtain the full URL for an example set."""
    return f"https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/examples_set/{processor}/default.json"


## Define entradas (*prompts*)
@mcp.prompt()
def prompt_actions() -> str:
    """Prompt for wepsim available actions."""
    return f"It is possible to execute a rv32 or mips assembly program," \
            "in a processor named ep, rv or poc," \
            "with the ep_base.mc microcode associated to the processor and assembly," \
            "in three ways: run, stepbystep, and microstepbymicrostep."

def prompt_run(model: str, firm: str, asm: str) -> str:
    """Prompt for wepsim to run asm with firm in model processor."""
    return f"The result of executing " \
            "the assembly {asm} with firmware {firm} is " \
            "{wepsim_run(model, firm, asm)}"

def prompt_stepbystep(model: str, firm: str, asm: str) -> str:
    """Prompt for wepsim to run step by step asm with firm in model processor."""
    return f"The result of executing " \
            "step by step the assembly {asm} with firmware {firm} is " \
            "{wepsim_stepbystep(model, firm, asm)}"

def prompt_microstepbymicrostep(model: str, firm: str, asm: str) -> str:
    """Prompt for wepsim to run microstep by microstep asm with firm in model processor."""
    return f"The result of executing " \
            "microstep by microstep the assembly {asm} with firmware {firm} is " \
            "{wepsim_microstepbymicrostep(model, firm, asm)}"


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

