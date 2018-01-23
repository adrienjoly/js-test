#!/bin/bash

# This script evaluates students from Firebase JSON exports, to log and csv formats.
# (one student grade per line)

# Usage: ./eval-firebase-dumps.sh ./exam-data/*.json

rm ./exam-data/score*.* &>/dev/null

for FILEPATH in $*;
do
  FILENAME=$(basename "$FILEPATH")
  EVAL_DIR="${FILENAME%.*}"
  EVAL_PATH=exam-data/$EVAL_DIR

  echo "* Evaluating $FILEPATH to $EVAL_PATH/ ..."
  mkdir $EVAL_PATH &>/dev/null
  node ./src/evaluateGroupFile.js ".$FILEPATH" &>$EVAL_PATH/eval.log
  ./src/split-eval-log-per-student.sh $EVAL_PATH/eval.log >/dev/null
  mv Eval_*.txt $EVAL_PATH/
  mv exam-data/score*.* $EVAL_PATH/
done;

echo "✅  Done!"
