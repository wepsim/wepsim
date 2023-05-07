#!/bin/bash
set -x


if ! [ -x "$(command -v idf.py)" ]; then
  echo 'Error: idf.py is not installed.' >&2
  exit 1
fi

TARGET_DEVICE="/dev/cu.usbserial-210"

# clean and reset target
if [ $? -eq 0 ]; then
     idf.py fullclean
fi

if [ $? -eq 0 ]; then
     idf.py set-target esp32s3
fi

# build, flash and execute
if [ $? -eq 0 ]; then
     idf.py build
fi

if [ $? -eq 0 ]; then
     idf.py -p ${TARGET_DEVICE} flash
fi

if [ $? -eq 0 ]; then
     idf.py -p ${TARGET_DEVICE} monitor
fi

