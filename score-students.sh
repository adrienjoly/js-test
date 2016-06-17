# evaluate from email submissions, to log and csv formats (one student mark per line)

for f in ./students/*.json;
do
  echo Evaluating $f to $f.eval.log ...
  node ./src/evaluateFile.js .$f &>$f.eval.log
done;
echo ... and appended students\' grades to ./scores.csv

cd ..