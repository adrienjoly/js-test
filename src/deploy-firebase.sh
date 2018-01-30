#!/bin/bash

# This script deploys the exam to the single firebase instance defined in  exam-config.js

CONFIG_FILE=./exam-data/exam-config.js

echo # blank line
echo "* Building config data ..."
URL=`node -e "console.log(require('$CONFIG_FILE').backend.FIREBASE_CONFIG.authDomain);"`
npm run build --silent

echo # blank line
echo "* Creating temporary commit for config data ..."
git add --force public/scripts/exam-data.js
git commit -am 'Temporary Firebase-only deployment commit'

echo # blank line
echo "* Deploying to instance: $URL ..."
PROJECT_ID=`node -e "console.log(require('$CONFIG_FILE').backend.FIREBASE_CONFIG.projectId);"`
firebase use $PROJECT_ID && firebase deploy

echo # blank line
echo "* Reverting temporary commit ..."
git reset --mixed HEAD~1

echo # blank line
echo "✅  Done!"
