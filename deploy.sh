#!/bin/bash

# This script deploys this app to the following *.firebaseapp.com subdomains:
instances=( linus eich douglas )

# ...by temporarily altering the corresponding mentions to js-exam in the following files:
files=( ./firebase.json ./public/scripts/app.js )

for i in "${instances[@]}"
do
  echo "Deploying to instance: $i.firebaseapp.com ..."

  for f in "${files[@]}"
  do
    echo "- replacing mentions to js-exam in file: $f"
    mv $f $f.bak
    replacement="s/js-exam/$i/g"
    sed $replacement $f.bak > $f
  done

  npm run deploy

  for f in "${files[@]}"
  do
    echo "- restoring mentions to js-exam in file: $f"
    rm $f
    mv $f.bak $f
  done

done
