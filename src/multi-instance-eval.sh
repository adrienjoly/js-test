#!/bin/bash

files=( package.json ./exam-data/exam-config.js )
placeholder="__INSTANCE__NUMBER__"
replacement=1

for f in "${files[@]}"
do
  echo "- replacing mentions of $placeholder in file: $f"
  sed -i.bak "s/$placeholder/$replacement/g" $f
  rm $f.bak
done

# npm run eval-student-groups
src/score-student-groups.sh ./student-data/*.json

echo "- restoring mentions to $placeholder"
for f in "${files[@]}"
do
  git checkout -- $f
done
