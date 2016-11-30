# evaluate from firebase exports, to log and csv formats (one student mark per line)

# syntax: ./score-student-groups.sh ./student-groups/*.json

for f in $*;
do
  echo Evaluating $f to $f.eval.log ...
  node ./src/evaluateGroupFile.js .$f &>$f.eval.log
done;
echo ... and appended students\' grades to ./scores.csv
