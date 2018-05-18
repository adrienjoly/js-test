#!/bin/bash

# This script deploys to firebase instances defined in the `instances` prop of exam-config.js

CONFIG_FILE=./exam-data/exam-config.js

INSTANCES=()
ARRAY=`node -e "console.log(require('$CONFIG_FILE').instances.join(';'));"`
IFS=';' read -ra INSTANCES <<< "$ARRAY"

git status -s # all files should have been committed

for INSTANCE in "${INSTANCES[@]}"
do

  echo # blank line
  echo "* Building config data for $INSTANCE ..."
  PROJECT_ID=`JS_TEST_INSTANCE="$INSTANCE" node -e "console.log(require('$CONFIG_FILE').backend.FIREBASE_CONFIG.projectId);"`
  URL="https://$PROJECT_ID.firebaseapp.com"
  JS_TEST_INSTANCE="$INSTANCE" npm run build --silent

  echo "* Creating temporary commit for config data ..."
  git add --force public/scripts/exam-data.js
  git commit -m 'Temporary Firebase-only deployment commit'

  echo "* Deploying to instance: $URL ..."
  firebase use $PROJECT_ID && firebase deploy

  echo "* Reverting temporary commit ..."
  git reset --mixed HEAD~1

done

echo "* Rebuilding default config data ..."
npm run build

echo # blank line
echo "✅  Done!"
