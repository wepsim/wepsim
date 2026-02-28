#!/bin/bash
set -x

## /api/status
echo "Testing '/api/status' ..."

curl -X 'GET' 'http://localhost:8008/api/status' \
     -s \
     -H 'accept: application/json'

echo "Done"


## /api/action
echo "Testing '/api/action' ..."

FIRMWARE_URL="https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/microcode/rv32/ep_base.mc"
ASSEMBLY_URL="https://raw.githubusercontent.com/acaldero/wepsim/refs/heads/master/repo/assembly/rv32/s1e1.asm"

FIRMWARE_TXT="begin { fetch: (T2, C0),  (TA, R, BW=11, M1=1, C1=1),  (M2, C2, T1, C3),  (A0, B=0, C=0) }  nop { co=010110, nwords=1, { (A0=1, B=1, C=0) } }  registers { 0=zero, 29=sp (stack_pointer) }"
ASSEMBLY_TXT=".text main: nop"

ACTIONS="run stepbystep"

for ACTION in $ACTIONS; do

    curl -X 'POST' 'http://localhost:8008/api/action/' \
         -s \
         -H 'accept: application/json' \
         -H 'Content-Type: application/json' \
         -d "{
                \"action\":   \"$ACTION\",
                \"model\":    \"ep\",
                \"firmware\": \"$FIRMWARE_URL\",
                \"assembly\": \"$ASSEMBLY_URL\"
             }" | jq '.'

    echo "Done"

done

for ACTION in $ACTIONS; do

    curl -X 'POST' 'http://localhost:8008/api/action/' \
         -s \
         -H 'accept: application/json' \
         -H 'Content-Type: application/json' \
         -d "{
                \"action\":   \"$ACTION\",
                \"model\":    \"ep\",
                \"firmware\": \"$FIRMWARE_TXT\",
                \"assembly\": \"$ASSEMBLY_TXT\"
             }" | jq '.'

    echo "Done"

done

