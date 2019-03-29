#!/bin/bash

# This script evaluates students from Firebase JSON exports, to log and csv formats.
# (one student grade per line)

# Usage: ./eval-firebase-dumps.sh ./exam-data/*.json

rm ./exam-data/score*.* &>/dev/null

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
  ./src/split-eval-log-per-student.sh $EVAL_PATH/eval.log >/dev/null
  mv Eval_*.txt $EVAL_PATH/
  mv exam-data/score*.* $EVAL_PATH/

  # pad each csv column with spaces, for better lisibility
  column -t -s "," $EVAL_PATH/scores-detail.csv > $EVAL_PATH/scores-detail.txt
done;

echo "✅  Done!"
