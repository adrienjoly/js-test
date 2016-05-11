# evaluate from firebase exports, and provide one student mark per line, in csv format

for f in ./classe*.json;
do
  echo Reading from $f...
  node evaluateFile.js $f 2>/dev/null | grep SCORE;
done;
