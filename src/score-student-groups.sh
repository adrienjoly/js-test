# evaluate from firebase exports, to log and csv formats (one student mark per line)

# syntax: ./score-student-groups.sh ./student-groups/*.json

rm ./exam-data/scores.csv &>/dev/null
rm ./exam-data/scores-detail.csv &>/dev/null

for f in $*;
do
  echo Evaluating $f to $f.eval.log ...
  node ./src/evaluateGroupFile.js .$f &>$f.eval.log
done;
echo ... and appended students\' grades to ./exam-data/scores.csv
