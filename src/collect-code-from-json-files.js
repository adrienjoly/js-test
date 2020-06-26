// Extracts students' code submissions from ./students/*.json
// and returns them as a JSON array of `file` entries,
// for evaluate-plagiarism-post.js to consume.

const fs = require('fs');

const SUBMISSIONS_DIRECTORY = './students';
const EXERCISE_IDENTIFIER = 'code11';

// returns [ { name, content, type } ]
async function ls(path) {
  const dir = await fs.promises.opendir(path);
  const files = []; // structure: [ { name, content, type } ]
  for await (const dirent of dir) {
    const submission = await fs.promises.readFile(`${path}/${dirent.name}`);
    files.push({
      name: `${dirent.name.split('@')[0]}.js`, // extract student name from email address, and add .js file extension
      contents: JSON.parse(submission)[EXERCISE_IDENTIFIER], // code
      type: 'js'
    });
  }
  return files;
}

console.warn(`Parsing code submissions from ${SUBMISSIONS_DIRECTORY}...`)
ls(SUBMISSIONS_DIRECTORY)
  .then(files => console.log(JSON.stringify(files, null, 2)))
  .catch(console.error);
