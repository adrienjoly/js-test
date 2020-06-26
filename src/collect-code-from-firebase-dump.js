// Extracts students' code submissions from a single JSON firebase dump
// and returns them as a JSON array of `file` entries,
// for evaluate-plagiarism-post.js to consume.

const fs = require('fs');

const SUBMISSIONS_DUMP_FILE = './exam-data/eemi-own-exam-export.json';
const EXERCISE_IDENTIFIER = 'code11';

// returns [ { name, content, type } ]
async function parse(file) {
  const { submissions } = require(`./${file}`); // await fs.promises.readFile(`${path}/${dirent.name}`);
  return Object.keys(submissions).map(name => {
    const submission = submissions[name];
    return {
      name,
      contents: submission[EXERCISE_IDENTIFIER], // code
      type: 'js'
    };
  });
}

console.warn(`Parsing code submissions from ${SUBMISSIONS_DUMP_FILE}...`)
parse(SUBMISSIONS_DUMP_FILE)
  .then(files => console.log(JSON.stringify(files, null, 2)))
  .catch(console.error);
