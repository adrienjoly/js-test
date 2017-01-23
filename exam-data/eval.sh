#!/bin/bash

# (forked from https://github.com/adrienjoly/js-exam/blob/master/deploy.sh)

files=( package.json ./exam-data/exam-config.js )
placeholder="__INSTANCE__NUMBER__"
replacement=1

for f in "${files[@]}"
do
  echo "- replacing mentions of $placeholder in file: $f"
  sed "s/$placeholder/$replacement/g" $f > $f
done

# npm run eval-student-groups
src/score-student-groups.sh ./student-data/*.json

git reset --soft HEAD~1

echo "- restoring mentions to $placeholder"
git reset --hard
