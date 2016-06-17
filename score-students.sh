# evaluate from email submissions, to log and csv formats (one student mark per line)

mkdir ./student-evals

for f in ./student-submissions/*.json;
do
  echo Evaluating $f to ./student-evals/$f.log ...
  node ./src/evaluateFile.js $f &>./student-evals/$f.log
done;
echo ... and appended students\' grades to ./scores.csv
