#!/bin/sh
#set -x


#*
#*  Copyright 2022-2023 Felix Garcia Carballeira, Diego Alonso Camarmas, Alejandro Calderon Mateos
#*
#*  This file is part of WepSIM.
#*
#*  WepSIM is free software: you can redistribute it and/or modify
#*  it under the terms of the GNU Lesser General Public License as published by
#*  the Free Software Foundation, either version 3 of the License, or
#*  (at your option) any later version.
#*
#*  WepSIM is distributed in the hope that it will be useful,
#*  but WITHOUT ANY WARRANTY; without even the implied warranty of
#*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#*  GNU Lesser General Public License for more details.
#*
#*  You should have received a copy of the GNU Lesser General Public License
#*  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#*


# default values
ASM_FILE="tmp_assembly.s"
DEV_FILE="/dev/cu.usbserial-1110"

# get arguments
if [ "$1" != "" ]; then
     ASM_FILE=$1
fi
if [ "$2" != "" ]; then
     DEV_FILE=$2
fi

# transform tmp_assembly.s
python3 creator_build.py ${ASM_FILE}

# flashing...
idf.py build                    > tmp_output.txt 2>&1
idf.py -p ${DEV_FILE} flash    >> tmp_output.txt 2>&1
idf.py -p ${DEV_FILE} monitor  >> tmp_output.txt 2>&1

