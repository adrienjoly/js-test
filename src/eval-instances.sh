#!/bin/bash

# This script evaluates students from Firebase databases (1 instance per class),
# to log and csv formats (1 student grade per line).

CONFIG_FILE=./exam-data/exam-config.js

INSTANCES=()
ARRAY=`node -e "console.log(require('$CONFIG_FILE').instances.join(';'));"`
IFS=';' read -ra INSTANCES <<< "$ARRAY"

echo "* Cleaning up and rebuilding eval testers ..."
rm ./exam-data/score*.* &>/dev/null
npm run build >/dev/null

for INSTANCE in "${INSTANCES[@]}"
do
  INST_PATH=exam-data/$INSTANCE
  DATABASE_URL=`JS_TEST_INSTANCE=$INSTANCE node -e "console.log(require('$CONFIG_FILE').backend.FIREBASE_CONFIG.databaseURL);"`

  echo "* Evaluating students from instance $INSTANCE to $INST_PATH ..."
  mkdir $INST_PATH &>/dev/null
  JS_TEST_INSTANCE=$INSTANCE npm run eval >$INST_PATH/eval.log
  # (or) JS_TEST_INSTANCE=$INSTANCE node ./src/evaluateGroupFile.js ../exam-data/$INSTANCE.json >$INST_PATH/eval.log

  ./src/split-eval-log-per-student.sh $INST_PATH/eval.log >/dev/null
  mv Eval_*.txt $INST_PATH/
  mv exam-data/score*.* $INST_PATH/
done

echo "✅  Done!"

