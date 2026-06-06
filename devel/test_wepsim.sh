#!/bin/bash
#set -x


#*
#*  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
	echo "  -> Run tests, Short version..."

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
	echo "  -> Make tests Output..."

	N=${#TEST_ARR[*]}
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    T="${TEST_ARR[$I]}"
	    D="${DESC_ARR[$I]}"

	    echo "$I.txt - $D"
	    $T >& ./devel/test_output/$I.txt
	done

	rm -fr  ./devel/test_output/*.txt.gz
	gzip -9 ./devel/test_output/*.txt
}

test_wepsimnode_ckoutput_single ()
{
	I=$1
	T="${TEST_ARR[$I]}"
	D="${DESC_ARR[$I]}"

	# expected...
	gunzip -c ./devel/test_output/$I.txt.gz >& ./devel/test_output/test-expect-$I.txt

	# obtained...
	$T >& ./devel/test_output/test-obtained-$I.txt

	# diff...
	diff   ./devel/test_output/test-expect-$I.txt ./devel/test_output/test-obtained-$I.txt >& ./devel/test_output/diff-$I.txt
	if [ $? -eq 0 ]; then
	    echo "$I: OK: $D" >& ./devel/test_output/result-$I.txt
	else
	    echo "$I: KO: $D" >& ./devel/test_output/result-$I.txt

	    echo "***********************"      >> ./devel/test_output/result-$I.txt
	    echo $T                             >> ./devel/test_output/result-$I.txt
	    cat ./devel/test_output/diff-$I.txt >> ./devel/test_output/result-$I.txt
	    echo "***********************"      >> ./devel/test_output/result-$I.txt
	fi

	# cleanup...
	rm -fr ./devel/test_output/test-expect-$I.txt ./devel/test_output/test-obtained-$I.txt ./devel/test_output/diff-$I.txt
}

test_wepsimnode_ckoutput ()
{
	N=${#TEST_ARR[*]}
	NC=$(nproc)

	# (1/2) run in parallel
        echo -n "  -> Running tests... "
	for (( I=0; I<=$(( N -1 )); I++ )); do
               test_wepsimnode_ckoutput_single $I &

	       if (( I % $NC == 0 )); then
                     echo -en "🏃"
	             wait $(jobs -p)
	       fi
	done
	wait $(jobs -p)
        echo " Done"

	# (2/2) show results
	echo ""
	echo "  -> Check tests output..."
	echo ""
        echo "Id: Status: Description"
	for (( I=0; I<=$(( N -1 )); I++ )); do
	    cat    ./devel/test_output/result-$I.txt
	    rm -fr ./devel/test_output/result-$I.txt
	done
}

test_wepsimnode_load ()
{
	I=0
	NC=$(nproc)

	echo -n "  -> Loading tests... "
        while IFS=$'\t' read -r T P D; do
             TEST_ARR+=("$T")
             DESC_ARR+=("$P - $D")

	     I=$((I+1))
	     if (( I % $NC == 0 )); then
	           echo -n "🛠️ "
	           wait $(jobs -p)
	     fi
        done < <(jq -r '.[] | [.test, .pack, .description] | @tsv' ./devel/test_pack/test_wepsim_pack*.json)
	echo " Done"
}


#
# Main
#

# Welcome
echo ""
echo "  WepSIM testing"
echo " ----------------"
echo ""

# Usage
if [ $# -eq 0 ]; then
	echo ""
	echo "Usage: $0 <run|rs|mo|co>"
	echo "  run -> RUN tests..."
	echo "  rs  -> Run tests, Short version (output only the 15 first lines)..."
	echo "  mo  -> Make tests Output to be used later for the 'co' option..."
	echo "  co  -> run test and Check its Output..."
	echo ""
	exit
fi

# Load Test Pack
TEST_ARR=()
DESC_ARR=()
test_wepsimnode_load

# Do requests
for arg_i in "$@"
do
        echo ""
	case $arg_i in
	     run)
		echo "  -> RUN tests..."
		test_wepsimnode_run
	     ;;
	     rs)
		test_wepsimnode_run_short
	     ;;
	     mo)
		test_wepsimnode_mkoutput
	     ;;
	     co)
		test_wepsimnode_ckoutput
	     ;;
	     *)
		echo "  -> ERROR: unknow command '$arg_i'"
	        echo "     => Usage: $0 <run|rs|mo|co>"
		echo ""
	     ;;
	esac
done

