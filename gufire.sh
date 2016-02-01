#!/bin/bash

echo "Step 1 of 4: GitHub Add Files"
git add --all

echo "Step 2 of 4: GitHub Commit"
echo "Commit Message: "
read input_var

git commit -m "Update GitHub $input_var"

echo "Step 3 of 4: GitHub Push"
read -s -p "Enter GitHub Password: " mypassword

git push https://justjoe22:$mypassword@github.com/justjoe22/Outage.Notify.git --all

echo "Step 4 of 4: Firebase Deploy"
firebase deploy

echo "Script Complete"
# End