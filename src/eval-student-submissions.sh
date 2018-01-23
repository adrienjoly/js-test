#!/bin/bash

# This script evaluates students from email submissions, to log and csv formats.
# (one student grade per line)

# Usage: ./eval-student-submissions.sh ./students/*.json

rm ./exam-data/score*.* &>/dev/null

for FILEPATH in $*;
do
  EVAL_PATH=exam-data/email-submissions
  FILENAME=$(basename "$FILEPATH")
  STUDENT_NAME="${FILENAME%.*}"

  echo "* Evaluating $FILEPATH to $EVAL_PATH/ ..."
  mkdir $EVAL_PATH &>/dev/null
  node ./src/evaluateStudentFile.js ".$FILEPATH" &>$EVAL_PATH/Eval_$STUDENT_NAME.txt
done;

mv exam-data/score*.* $EVAL_PATH/
echo "✅  Done!"
