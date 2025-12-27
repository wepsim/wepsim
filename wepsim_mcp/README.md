
## Sistemas Distribuidos: materiales complementarios
+ **Felix García Carballeira y Alejandro Calderón Mateos** @ arcos.inf.uc3m.es
+ [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)](https://github.com/acaldero/uc3m_sd/blob/main/LICENSE)


## Servicio distribuido JSON-RPC sobre HTTP: servidor MCP de calculadora simple

### Preparación

* Hay que ir al directorio de trabaja (si es necesario):
  ```bash
  cd mcp-jsonrpc
  ```

* Hay que instalar los prerrequisitos:
  * El programa ```uvicorn```:
    <html>
    <table>
    <tr>
    <td>Para todos los usuarios/as</td>
    <td>Para usuario/a actual</td>
    </tr>

    <tr>
    <td>

    ```bash
    sudo apt install uvicorn -y     
    ```
            
    </td>
    <td>

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh     
    ```

    </td>
    </tr>
    </table>
    </html>
  * Las bibliotecas ```fastapi``` y ```fastmcp```:
    ```bash
    touch pyproject.toml
    uv add --dev -r requirements.txt
    ```


### Ejecutar servidor ```mcp_wepsim.py``` y cliente "Visual Studio Code"

1. Primero hay que ejecutar el servidor MCP:
   ```bash
   $ python3 ./mcp_wepsim.py
   ```
2. Si no se ha hecho antes, hay que configurar el servicio MCP en el cliente "Visual Studio Code":
   <html>
   <table>
   <tr> <td>1.</td>
        <td>Hay que abrir la paleta de comandos con Ctrl-Alt-P y seleccionar "MCP: añadir servidor":<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/cfg1.png" height="125"></td> </tr>
   <tr> <td>2.</td>
        <td>A continuación, hay que seleccionar servidor HTTP:<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/cfg2.png" height="200"></td> </tr>
   <tr> <td>3.</td>
        <td>A continuación, hay que indicar la dirección URL:<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/cfg3.png" height="100"></td> </tr>
   <tr> <td>4.</td>  <td>A continuación, hay que indicar el nombre:<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/cfg4.png" height="125"></td> </tr>
   <tr> <td>5.</td>  <td>Y finalmente, hacer global (o local al espacio de trabajo):<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/cfg5.png" height="125"></td> </tr>
   </table>
   </html>
3. Una vez configurado, para usar el servicio en "Visual Studio Code":
   <html>
   <table>
   <tr> <td>1.</td>
        <td>Hay que hacer click en herramientas en el chat:<br>  
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/clt1.png" height="110"></td> </tr>
   <tr> <td>2.</td>
        <td>Hay que activar el servidor my-mcp-server (y las utilidades):<br>
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/clt2.png" height="250"></td> </tr>
   <tr> <td>3.</td>
        <td>Hay que indicar en el chat que se quiere "execute assmbly s1e1.asm with my-mcp-server":<br>
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/clt3.png" height="250"></td> </tr>
   <tr> <td>4.</td>
        <td>Puede ser necesario dar permisos ("Allow") para usar el servicio:<br>
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/clt4.png" height="250"></td> </tr>
   <tr> <td>5.</td>
        <td>Se tiene el resultado:<br>
        <img src="https://raw.githubusercontent.com/acaldero/uc3m_sd/main/materiales/mcp-jsonrpc/images/clt5.png" height="225"></td> </tr>
   </table>
   </html>


## Información adicional

* Tutorial
  * [How to Build an MCP Server in Python: A Complete Guide](https://scrapfly.io/blog/posts/how-to-build-an-mcp-server-in-python-a-complete-guide)
  * [Building a StreamableHTTP MCP server](https://mcpcat.io/guides/building-streamablehttp-mcp-server/)
  * [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
* Ejemplo
  * [Ejemplo de Servidor MCP server](https://gofastmcp.com/tutorials/create-mcp-server)
  * [MCP server (SSE) for weather information for a specified location](https://github.com/justjoehere/mcp-weather-sse)
  * [Let's write a Remote MCP Server](https://shivdeepak.com/posts/lets-write-a-remote-mcp-server/)

