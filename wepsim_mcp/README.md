
## REST API for WepSIM


## 1. Install required software for your board

*  Go to the work directory (if necessary):
  ```bash
  cd wepsim_mcp
  ```

* The prerequisites must be installed:
  * The ```uvicorn``` application:
    <html>
    <table>
    <tr>
    <td>For all users</td>
    <td>For current user only</td>
    </tr>

    <tr>
    <td>

    ```bash
    sudo apt install uvicorn -y
    ```

    </td>
    <td>

    ```bash
    curl -LsSf https:/astral.sh/uv/install.sh | sh
    ```

    </td>
    </tr>
    </table>
    </html>
  * The ```fastapi``` y ```fastmcp``` libraries:
    ```bash
    touch pyproject.toml
    uv add --dev -r requirements.txt
    ```


## 2. Execute the server and connect to "Visual Studio Code"

1. First, you must run the server:
   ```bash
   $ python3 ./mcp_wepsim.py &
   ```
2. If you haven't done so already, you must configure the service on the "Visual Studio Code" client:
   * From link:
     ```python
     vscode:mcp/install?%7B%22name%22%3A%22http%3A%2F%2Flocalhost%3A8008%2Fmcp%2F%5C%22%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Facaldero%2Fwepsim%2Fblob%2Fmaster%2Fwepsim_mcp%2FREADME.md%22%7D
     ```
   * From command line:
     <pre>
     code --add-mcp "{\"servers\":{\"wepsim_mcp\":{\"url\":\"http://localhost:8008/mcp/\",\"type\":\"http\"}}}"
     </pre>
   * Manual:
     <html>
     <table>
     <tr> <td>1.</td>
          <td>Open the command palette with Ctrl-Alt-P and select "MCP: add server":<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/cfg1.png" height="125"></td> </tr>
     <tr> <td>2.</td>
          <td>Next, you must select the HTTP server:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/cfg2.png" height="200"></td> </tr>
     <tr> <td>3.</td>
          <td>Next, you must enter the URL address:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/cfg3.png" height="100"></td> </tr>
     <tr> <td>4.</td>
          <td>Next, you must provide the name:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/cfg4.png" height="125"></td> </tr>
     <tr> <td>5.</td>
          <td>And finally, make global (or local to the workspace):<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/cfg5.png" height="125"></td> </tr>
     </table>
     </html>
3. Once configured, to use the service in "Visual Studio Code":
   * Manual:
     <html>
     <table>
     <tr> <td>1.</td>
          <td>You have to click on tools in the chat:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/clt1.png" height="110"></td> </tr>
     <tr> <td>2.</td>
          <td>You must activate the wepsim-server (and utilities):<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/clt2.png" height="250"></td> </tr>
     <tr> <td>3.</td>
          <td>You must indicate in the chat that you want to perform an action:<br>
          <pre>execute for the rv32 processor with the EP model 
     the assembly from s1e1.asm with the firmware from ep_base.mc using wepsim_mcp</pre>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/clt3.png" height="250"></td> </tr>
     <tr> <td>4.</td>
          <td>You may need to grant permissions ("Allow") to use the service:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/clt4.png" height="250"></td> </tr>
     <tr> <td>5.</td>
          <td>The result is available:<br>
          <img src="https://raw.githubusercontent.com/acaldero/wepsim/master/wepsim_mcp/images/clt5.png" height="225"></td> </tr>
     </table>
     </html>


## Related information

* Tutorial
  * [Servicio distribuido JSON-RPC sobre HTTP: servidor MCP de calculadora simple](https://github.com/acaldero/uc3m_sd/tree/main/materiales/mcp-jsonrpc)

