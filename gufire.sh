#!/bin/bash

# Define a timestamp function
timestamp() {
  date +"%T"
}

$timestamp = timestamp

git add --all

git commit -m "Update GitHub $timestamp"

git push

firebase deploy

# End