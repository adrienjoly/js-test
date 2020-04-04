# Fetch the Firebase project ID from exam-config.js
FIREBASE_PROJECT_ID=$(node -e 'console.log(require("./exam-data/exam-config.js").backend.FIREBASE_CONFIG.projectId)')

echo "Initializing database of Firebase project: ${FIREBASE_PROJECT_ID}..."
node_modules/.bin/firebase login --reauth
node_modules/.bin/firebase deploy --project ${FIREBASE_PROJECT_ID} --only database # will deploy database.rules.json

# Clear the database and open the exam
echo '{"active":true}' >database.data.json
node_modules/.bin/firebase --project ${FIREBASE_PROJECT_ID} database:set / database.data.json
rm database.data.json

echo "✅ Done."
