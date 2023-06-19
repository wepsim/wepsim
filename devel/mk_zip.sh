#!/bin/sh
#set -x


#*
#*  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


# welcome
echo ""
echo "  WepSIM zipper"
echo " ---------------"
echo ""
if [ $# -gt 0 ]; then
     set -x
fi

# add gateway.zip
mkdir -p  ./ws_dist/gateway
pushd .
cd gateway
#zip   -9qr ../ws_dist/gateway/esp32s2.zip esp32s2/
 zip   -9qr ../ws_dist/gateway/esp32s3.zip esp32s3/
 zip   -9qr ../ws_dist/gateway/esp32c3.zip esp32c3/
#zip   -9qr ../ws_dist/gateway/esp32c5.zip esp32c5/
#zip   -9qr ../ws_dist/gateway/esp32c6.zip esp32c6/
popd

echo "  Done."

