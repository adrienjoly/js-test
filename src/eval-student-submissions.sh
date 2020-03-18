#!/bin/bash

# This script evaluates students from email submissions, to log and csv formats.
# (one student grade per line)

# Usage: ./eval-student-submissions.sh ./students/*.json

EVAL_PATH=exam-data/email-submissions

rm ./exam-data/score*.* &>/dev/null

for FILEPATH in $*;
do
  FILENAME=$(basename "${FILEPATH}")
  STUDENT_NAME="${FILENAME%.*}"

  echo "* Evaluating ${FILEPATH} to ${EVAL_PATH}/ ..."
  mkdir ${EVAL_PATH} &>/dev/null
  node ./src/evaluateStudentFile.js "../${FILEPATH}" >${EVAL_PATH}/Eval_${STUDENT_NAME}.txt
done;

mv exam-data/score*.* ${EVAL_PATH}/

# render distribution chart
node -e "require('./src/renderDistributionChart').renderFromScoreFileStream({}, console.log);" \
  < ${EVAL_PATH}/scores-detail.csv \
  > ${EVAL_PATH}/scores-chart.txt

# append statistics to scores-detail.csv
node -e "require('./src/computeStats').renderCsvLinesFromScoreFileStream({}, console.log);" \
  < ${EVAL_PATH}/scores-detail.csv \
  >> ${EVAL_PATH}/scores-detail.csv

# pad each csv column with spaces, for better lisibility
column -t -s "," ${EVAL_PATH}/scores-detail.csv > ${EVAL_PATH}/scores-detail.txt

echo "✅  Done!"
