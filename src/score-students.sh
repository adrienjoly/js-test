# evaluate from email submissions, to log and csv formats (one student mark per line)

# syntax: ./score-students.sh ./students/*.json

for f in $*;
do
  echo Evaluating $f to $f.eval.log ...
  node ./src/evaluateStudentFile.js .$f &>$f.eval.log
done;
echo ... and appended students\' grades to ./scores.csv
