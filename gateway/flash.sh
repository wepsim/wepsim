#!/bin/bash
set -x

#*
#*  Copyright 2015-2023 Felix Garcia Carballeira
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
#*/

echo "./creator_prepare.sh $1"
echo "idf.py build"
echo "idf.py -p /dev/cu.usbserial-1110  flash"
echo "idf.py  p /dev/cu.usbserial-1110  monitor"

