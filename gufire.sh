#!/bin/bash

# Define timestamp
timestamp = date +"%T"

git add --all

git commit -m "Update GitHub $timestamp"

git push

firebase deploy

# End