# evaluate from firebase databases (1 per class), to log and csv formats (one student mark per line)

npm run build

rm scores.csv
rm scores.log

echo Evaluating students\' answers from https://linus.firebaseio.com ...
npm run eval https://linus.firebaseio.com >>scores.log 2>&1

echo Evaluating students\' answers from https://eich.firebaseio.com ...
npm run eval https://eich.firebaseio.com >>scores.log 2>&1

echo Evaluating students\' answers from https://douglas.firebaseio.com ...
npm run eval https://douglas.firebaseio.com >>scores.log 2>&1

echo Successfully wrote scores.csv and scores.log files \!
