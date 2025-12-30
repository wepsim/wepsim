#!/bin/bash
set -x

# /api/status
echo "Testing '/api/status' ..."
curl -X 'GET' 'http://localhost:8008/api/status' \
     -s \
     -H 'accept: application/json'
echo "Done"

# /api/action
echo "Testing '/api/action' ..."
curl -X 'POST' 'http://localhost:8008/api/action/' \
     -s \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
           "action":   "run",
           "model":    "ep",
           "firmware": "begin { fetch: (T2, C0),  (TA, R, BW=11, M1=1, C1=1),  (M2, C2, T1, C3),  (A0, B=0, C=0) }  nop { co=010110, nwords=1, { (A0=1, B=1, C=0) } }  registers { 0=zero, 29=sp (stack_pointer) }",
           "assembly": ".text main: nop"
         }' | jq '.'
echo "Done"

echo "Testing '/api/action' ..."
curl -X 'POST' 'http://localhost:8008/api/action/' \
     -s \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
           "action":   "stepbystep",
           "model":    "ep",
           "firmware": "begin { fetch: (T2, C0),  (TA, R, BW=11, M1=1, C1=1),  (M2, C2, T1, C3),  (A0, B=0, C=0) }  nop { co=010110, nwords=1, { (A0=1, B=1, C=0) } }  registers { 0=zero, 29=sp (stack_pointer) }",
           "assembly": ".text main: nop"
         }' | jq '.'
echo "Done"

echo "Testing '/api/action' ..."
curl -X 'POST' 'http://localhost:8008/api/action/' \
     -s \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
           "action":   "microstepbymicrostep",
           "model":    "ep",
           "firmware": "begin { fetch: (T2, C0),  (TA, R, BW=11, M1=1, C1=1),  (M2, C2, T1, C3),  (A0, B=0, C=0) }  nop { co=010110, nwords=1, { (A0=1, B=1, C=0) } }  registers { 0=zero, 29=sp (stack_pointer) }",
           "assembly": ".text main: nop"
         }' | jq '.'
echo "Done"

echo "Testing '/api/action' ..."
curl -X 'POST' 'http://localhost:8008/api/action/' \
     -s \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{
           "action":   "microstepverbalized",
           "model":    "ep",
           "firmware": "begin { fetch: (T2, C0),  (TA, R, BW=11, M1=1, C1=1),  (M2, C2, T1, C3),  (A0, B=0, C=0) }  nop { co=010110, nwords=1, { (A0=1, B=1, C=0) } }  registers { 0=zero, 29=sp (stack_pointer) }",
           "assembly": ".text main: nop"
         }' | jq '.'
echo "Done"

