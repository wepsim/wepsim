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
echo "  WepSIM + Apache Cordova"
echo " -------------------------"
echo ""
if [ $# -gt 0 ]; then
     set -x
fi

# preparing www
mv www www.initial.$$
cp -a ./wepsim-master/ws_dist www

# adapting paths...
sed -i .bak 's/wepsim/android_asset\/www/g' ./www/repo/hardware/ep/images/processor.svg
sed -i .bak 's/external\/cordova/cordova/g' ./www/wepsim-classic.html
sed -i .bak 's/external\/cordova/cordova/g' ./www/wepsim-compact.html

# cleaning extra files
rm -fr www/images/pwa 
rm -fr www/min.wepsim_node.js 

