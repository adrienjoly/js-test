#!/bin/bash

# (forked from https://github.com/adrienjoly/js-exam/blob/master/deploy.sh)

# This script deploys this app to the following *.herokuapp.com subdomains:
instances=( jsparta jspartb jspartc )

# ...by temporarily altering the corresponding mentions to js-exam in the following files:
files=( ./exam-data/exam-config.js )

# initial mentions to be replaced:
initial="__INSTANCE__"

for i in "${instances[@]}"
do
  echo "Deploying to instance: $instance .herokuapp.com ..."

  for f in "${files[@]}"
  do
    echo "- replacing mentions of $initial in file: $f"
    mv $f $f.bak
    replacement="s/$initial/$instance/g"
    sed $replacement $f.bak > $f
  done

  npm run build
  git status -s
  
  # Push them to Heroku instance, then repent of the commit (cf http://rhodesmill.org/brandon/2012/quietly-pushing-to-heroku/)
  #git add .
  git commit -am 'Temporary Heroku-only deployment commit'
  heroku git:remote -a $instance
  git push heroku master --force
  git reset --soft HEAD~1

  for f in "${files[@]}"
  do
    echo "- restoring mentions to $instance in file: $f"
    rm $f
    mv $f.bak $f
  done

done
