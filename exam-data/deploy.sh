#!/bin/bash

# (forked from https://github.com/adrienjoly/js-exam/blob/master/deploy.sh)

# This script deploys this app to the following *.herokuapp.com subdomains:
instances=( 1 2 3 )
herokuprefix="js-partiel-"

# ...by temporarily altering the corresponding mentions to js-exam in the following files:
files=( package.json ./exam-data/exam-config.js )

# initial mentions to be replaced:
initial="__INSTANCE__NUMBER__"

for i in "${instances[@]}"
do
  echo "Deploying to instance: $herokuprefix $i .herokuapp.com ..."

  for f in "${files[@]}"
  do
    echo "- replacing mentions of $initial in file: $f"
    mv $f $f.bak
    replacement="s/$initial/$i/g"
    sed $replacement $f.bak > $f
  done

  npm run build
  npm run init-heroku
  git status
  git diff
  pause # give a last opportunity to cancel before actual deployment
  
  # Push them to Heroku instance, then repent of the commit (cf http://rhodesmill.org/brandon/2012/quietly-pushing-to-heroku/)
  #git add .
  git commit . -m 'Temporary Heroku-only deployment commit'
  npm run deploy #git push heroku master --force
  git reset --soft HEAD~1

  for f in "${files[@]}"
  do
    echo "- restoring mentions to $i in file: $f"
    rm $f
    mv $f.bak $f
  done

done
