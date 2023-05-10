#!/bin/bash
set -x


# Checks
if ! [ -x "$(command -v idf.py)" ]; then
  echo 'ERROR: idf.py is not detected'
  echo 'ERROR: * Please check that it is installed AND it is in the PATH environment variable.'
  exit 1
fi


# Default values
TARGET_PORT="/dev/cu.usbserial-210"
TARGET_DEVICE="esp32c3"

if [ "$1" != "" ]; then
     TARGET_PORT=$1
fi
if [ "$2" != "" ]; then
     TARGET_DEVICE=$2
fi


# Flashing process: clean, reset target, build, flash and execute
if [ $? -eq 0 ]; then
     idf.py fullclean
fi

if [ $? -eq 0 ]; then
     idf.py set-target ${TARGET_DEVICE}
fi

if [ $? -eq 0 ]; then
     idf.py build
fi

if [ $? -eq 0 ]; then
     idf.py -p ${TARGET_PORT} flash
fi

if [ $? -eq 0 ]; then
     idf.py -p ${TARGET_PORT} monitor
fi

