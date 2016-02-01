#!/bin/bash

# Define timestamp
mytimes = date +"%T"

git add --all

echo "Git Update Title: "
read input_var
echo "You entered: $input_var"

git commit -m "Update GitHub $input_var"

git push https://justjoe22:2Jwp0027!2010@github.com/justjoe22/Outage.Notify.git --all

firebase deploy

# End