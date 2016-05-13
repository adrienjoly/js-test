# evaluate from firebase exports, to txt (complete log) and csv formats (one student mark per line)

for f in ./classe*.json;
do
  echo Evaluating $f...
  node evaluateFile.js $f 2>/dev/null >$f.eval.txt
  echo - wrote $f.eval.txt
  grep SCORE $f.eval.txt >$f.eval.csv
  echo - wrote $f.eval.csv
done;
