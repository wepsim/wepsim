#!/bin/bash
#set -x


#*
#*  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


#
# Auxiliar functions
#

test_wepsimnode_run ()
{
	N=${#TEST_ARR[*]}
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    T="${TEST_ARR[$I]}"
	    D="${DESC_ARR[$I]}"

	    echo "$I - $D"
	    $T
	done
}

test_wepsimnode_run_short ()
{
	N=${#TEST_ARR[*]}
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    T="${TEST_ARR[$I]}"
	    D="${DESC_ARR[$I]}"

	    echo "$I - $D"
	    $T | head -15
	done
}

test_wepsimnode_mkoutput ()
{
	N=${#TEST_ARR[*]}
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    T="${TEST_ARR[$I]}"
	    D="${DESC_ARR[$I]}"

	    echo "$I.txt - $D"
	    $T >& ./devel/output/$I.txt
	done

	rm -fr  ./devel/output/*.txt.gz
	gzip -9 ./devel/output/*.txt
}

test_wepsimnode_ckoutput ()
{
	N=${#TEST_ARR[*]}
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    T="${TEST_ARR[$I]}"
	    D="${DESC_ARR[$I]}"

	    gunzip -c ./devel/output/$I.txt.gz >& ./devel/output/test-expect.txt
	                                    $T >& ./devel/output/test-obtained.txt

	    diff   ./devel/output/test-expect.txt ./devel/output/test-obtained.txt
	    if [ $? -eq 0 ]; then
	        echo "$I: OK: $D";
	    else
	        echo "$I: KO: $D";
	    fi

	    rm -fr ./devel/output/test-expect.txt ./devel/output/test-obtained.txt
	done

}


#
# Main
#

# Usage
if [ $# -eq 0 ]; then
	echo ""
	echo "Usage: $0 <run|rs|mo|co>"
	echo ""
	exit
fi


# Load Test Pack
echo -n "Loading tests... "

TEST_ARR=()
DESC_ARR=()
cat ./devel/test_wepsim_pack*.json | jq -cr '.[]' > kk.txt
while read OBJ; do
    T=$(echo "$OBJ" | jq -r '.test')
    TEST_ARR+=("$T")
    P=$(echo "$OBJ" | jq -r '.pack')
    D=$(echo "$OBJ" | jq -r '.description')
    DESC_ARR+=("$P - $D")
    echo -n "."
done < kk.txt
rm -fr kk.txt
echo " Done"


# Do requests
for arg_i in "$@"
do
	case $arg_i in
	     run)
		echo "Run tests..."
		test_wepsimnode_run
	     ;;
	     rs)
		echo "Run tests (output cut-off)..."
		test_wepsimnode_run_short
	     ;;
	     mo)
		echo "Make tests output..."
		test_wepsimnode_mkoutput
	     ;;
	     co)
		echo "Check tests output..."
		test_wepsimnode_ckoutput
	     ;;
	     *)
		echo ""
		echo "Unknow command:"
	        echo "Usage: $0 <run|rs|mo|co>"
	     ;;
	esac
done

