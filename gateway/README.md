# WepSIM


## 1. Pre-requisites

You need some common software first:
```
sudo apt-get install git wget flex bison gperf python3 python3-pip python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0
pip3 install flask flask_cors
```

Follow the instruction from:
* [Get started from espressif - Linux](https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/linux-setup.html)


## 2. Install gateway

1.- Download the .zip file associated with your board, for example:
```
wget https://acaldero.github.io/wepsim/ws_dist/gateway/esp32c3.zip
```

2.- unzip file, for example:
```
unzip -a esp32c3.zip
```


## 3. Execute

1.- launch gateway
```
cd gateway/esp32c3/
python3 gateway.py
```

2.- open web browser on the displayed URL:
```
firefox https://127.0.0.1:8080 &
```

3.- follow the instructions from the loaded web form


