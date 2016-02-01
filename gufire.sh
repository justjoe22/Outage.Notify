#!/bin/bash

# Define timestamp
mytimes = date +"%T"

git add --all

git commit -m "Update GitHub $mytimes"

git push https://justjoe22:2Jwp0027!2010@github.com/justjoe22/Outage.Notify.git --all

firebase deploy

# End