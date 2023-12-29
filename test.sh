#!/bin/bash

for i in {1..20}
do
    echo "Run $i"
    npm run wdio > output.txt
    if grep -q "1 passed" output.txt; then
        echo "Run $i: Passed" >> results.txt
    else
        echo "Run $i: Failed" >> results.txt
    fi
done