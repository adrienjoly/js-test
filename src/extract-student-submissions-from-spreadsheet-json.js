// script to convert json file from google spreadsheet to /students/*.json submission files

const JSON_SUBMISSIONS_FILE = '../student-submissions.csv.json' // csv file exported from google spreadsheets and converted to json with https://www.csvjson.com/csv2json

const fs = require('fs');
const submissions = require(JSON_SUBMISSIONS_FILE);

try {
fs.mkdirSync('./students');
} catch(err) {}

for (const i of submissions){
  const [ time, student, submission ] = Object.values(i);
  const name = student.split('<')[0].trim().replace(/ /g, '_');
  const file = `./students/${name}.json`;
  console.log(`Extracting student submission from ${JSON_SUBMISSIONS_FILE} to ${file}`);
  fs.writeFileSync(file, JSON.stringify(submission, null, 2));
}

// now, you can `$ npm run eval-student-submissions`
