#!/bin/bash

# Define timestamp
mytimes = date +"%T"

git add --all

echo "Git Update Title: "
read input_var
echo "You entered: $input_var"

git commit -m "Update GitHub $input_var"

read -s -p "Enter Password: " mypassword

git push https://justjoe22:$mypassword@github.com/justjoe22/Outage.Notify.git --all

firebase deploy

# End