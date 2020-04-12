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
	I=0
	for T in "${TEST_LIST[@]}"; do
	    echo $I
	    $T

	    let "I=I+1"
	done
}

test_wepsimnode_run_short ()
{
	I=0
	for T in "${TEST_LIST[@]}"; do
	    echo $I
	    $T | head -15

	    let "I=I+1"
	done
}

test_wepsimnode_mkoutput ()
{
	I=0
	for T in "${TEST_LIST[@]}"; do
	    echo "$I.txt"
	    $T >& ./devel/output/$I.txt

	    let "I=I+1"
	done

	rm -fr  ./devel/output/*.txt.gz
	gzip -9 ./devel/output/*.txt
}

test_wepsimnode_ckoutput ()
{
	I=0
	for T in "${TEST_LIST[@]}"; do
	    gunzip -c ./devel/output/$I.txt.gz >& ./devel/output/test-expect.txt
	                                    $T >& ./devel/output/test-obtained.txt

	    diff   ./devel/output/test-expect.txt ./devel/output/test-obtained.txt
	    if [ $? -eq 0 ]; then
	        echo "$I: OK";
	    else
	        echo "$I: KO";
	    fi

	    rm -fr ./devel/output/test-expect.txt ./devel/output/test-obtained.txt

	    let "I=I+1"
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
echo "Load test..."
. ./devel/testlist_wepsimnode_pack1.sh

# Do requests
for arg_i in "$@"
do
	case $arg_i in
	     run)
		echo "Run test..."
		test_wepsimnode_run
	     ;;
	     rs)
		echo "Run test (output cut-off)..."
		test_wepsimnode_run_short
	     ;;
	     mo)
		echo "Make test output..."
		test_wepsimnode_mkoutput
	     ;;
	     co)
		echo "Check test output..."
		test_wepsimnode_ckoutput
	     ;;
	     *)
		echo ""
		echo "Unknow command:"
	        echo "Usage: $0 <mo|run>"
	     ;;
	esac
done


