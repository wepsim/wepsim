
# WepSIM


## 1. Install required software for your board

For example, follow the "Get started" from espressif:
* [Linux](https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/linux-setup.html)
* [Windows](https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/windows-setup.html)
* [MacOS](https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/macos-setup.html)


## 2. Get the .zip file associated with your board with the gateway

* For ESP32-C3 board:
``` wget https://acaldero.github.io/wepsim/ws_dist/gateway/esp32c3.zip ```

* For ESP32-S2 board:
``` wget https://acaldero.github.io/wepsim/ws_dist/gateway/esp32s2.zip ```

* For ESP32-S3 board:
``` wget https://acaldero.github.io/wepsim/ws_dist/gateway/esp32s3.zip ```


## 3. Unzip the downloaded .zip file

For example, for esp32c3.zip:
```
unzip -a esp32c3.zip
```


## 4. Execute the gateway.py

For example, for esp32c3:
```
cd esp32c3
python3 gateway.py
```


## 5. Form to flash

Please open your web browser on the displayed URL while executing gateway.py.
For example:
```
firefox https://127.0.0.1:8080 &
```

Then, please follow the instructions from the loaded web page


