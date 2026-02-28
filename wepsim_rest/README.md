
## REST API for WepSIM


## 1. Install required software

* We need to install ```uvicorn```:
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
* Then, the prerequisites must be installed:
    ```bash
    cd wepsim_rest
    touch pyproject.toml
    uv add --dev -r requirements.txt
    ```

