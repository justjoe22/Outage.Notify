#!/bin/bash

# Define timestamp
times = date +"%T"

git add --all

git commit -m "Update GitHub $times"

git push

firebase deploy

# End