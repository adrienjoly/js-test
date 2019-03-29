#!/bin/bash

# This script evaluates students from Firebase JSON exports, to log and csv formats.
# (one student grade per line)

# Usage: ./eval-firebase-dumps.sh ./exam-data/*.json

rm ./exam-data/score*.* &>/dev/null

QUESTION_IDS=$(node -e "console.log(require('./src/ExerciseEnumerator').getQuestionIdsFrom('./exam-data/').join(','));" 2>/dev/null)

docker build -t js-test-eval .

for FILEPATH in $*;
do
  FILENAME=$(basename "$FILEPATH")
  EVAL_DIR="${FILENAME%.*}"
  EVAL_PATH=exam-data/$EVAL_DIR

  echo "* Evaluating $FILEPATH to $EVAL_PATH/ ..."
  mkdir $EVAL_PATH &>/dev/null
  
  docker run -it --rm -e "FILEPATH=.$FILEPATH" --name js-test-eval js-test-eval \
    >$EVAL_PATH/eval.log
  ./src/split-eval-log-per-student.sh $EVAL_PATH/eval.log # >/dev/null
  mv Eval_*.txt $EVAL_PATH/

  echo "$FILENAME,score,$QUESTION_IDS" \
    >$EVAL_PATH/scores-detail.csv

  node src/extract-scores-from-eval-log.js <$EVAL_PATH/eval.log \
    >>$EVAL_PATH/scores-detail.csv

  # render distribution chart
  node -e "require('./src/renderDistributionChart').renderFromScoreFileStream({}, console.log);" \
    < $EVAL_PATH/scores-detail.csv \
    > $EVAL_PATH/scores-chart.txt

  # append statistics to scores-detail.csv
  node -e "require('./src/computeStats').renderCsvLinesFromScoreFileStream({}, console.log);" \
    < $EVAL_PATH/scores-detail.csv \
    >> $EVAL_PATH/scores-detail.csv

  # pad each csv column with spaces, for better lisibility
  column -t -s "," $EVAL_PATH/scores-detail.csv > $EVAL_PATH/scores-detail.txt

done;

echo "✅  Done!"
