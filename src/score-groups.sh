# evaluate from firebase databases (1 per class), to log and csv formats (one student mark per line)

npm run build

rm ./exam-data/scores.csv
rm ./exam-data/scores.log

echo Evaluating students\' answers from https://douglas.firebaseio.com ...
npm run eval https://douglas.firebaseio.com >>./exam-data/scores.log 2>/dev/null

echo Evaluating students\' answers from https://linus.firebaseio.com ...
npm run eval https://linus.firebaseio.com >>./exam-data/scores.log 2>/dev/null

echo Evaluating students\' answers from https://eich.firebaseio.com ...
npm run eval https://eich.firebaseio.com >>./exam-data/scores.log 2>/dev/null

echo Successfully wrote ./exam-data/scores.csv and ./exam-data/scores.log files \!
