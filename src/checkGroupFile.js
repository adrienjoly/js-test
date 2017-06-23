// load and compare answers submitted by a group of student,
// to detect fraud based on similarity of answers

var fs = require('fs');

var filePath = process.argv[2] || '../student-groups/js-controle-1-classe-1.json';

console.log('Reading and comparing answers from:', filePath, '...');

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

// generates [ { student, qId, code } ] tuples from submissionSet
const expandCodeAnswers = submissionSet =>
  Object.keys(submissionSet).reduce((answ, student) =>
    answ.concat(Object.keys(submissionSet[student])
      .filter(field => /^code/.test(field))
      .map(qId => ({ student, qId, code: submissionSet[student][qId] }))
    ), []);

var codeAnswers = expandCodeAnswers(submissionSet);

console.log('== Exact same solutions');

var perfectMatches = {}; // { question id -> { trimmed answer -> [ students ] } }

codeAnswers.forEach(({ student, qId, code }) => {
  var trimmedCode = code.trim();
  perfectMatches[qId] = perfectMatches[qId] || {};
  perfectMatches[qId][trimmedCode] = perfectMatches[qId][trimmedCode] || [];
  perfectMatches[qId][trimmedCode].push(student);
});

for (var q in perfectMatches) {
  console.log('exercice', q, ':');
  for (var code in perfectMatches[q]) {
    console.log('-', perfectMatches[q][code]);
  }
}

// run node ./src/checkGroupFile.js ../student-groups/js-controle-ajax-ft-export.json >fraud.txt

console.log('\n== Checksums');

const computeChecksum = (str) => str.split('').reduce((cksm, char) => cksm + char.charCodeAt(0), 0);

var checksums = {}; // { question id -> [ { student, checksum } ] }

codeAnswers.forEach(({ student, qId, code }) => {
  var checksum = computeChecksum(code.trim());
  (checksums[qId] = checksums[qId] || []).push({ student, checksum });
});

for (var q in checksums) {
  console.log('\nexercice', q, ':');
  checksums[q].sort((a, b) => a.checksum - b.checksum);
  checksums[q].forEach(({ student, checksum }) =>
    console.log('-', checksum + '\t' + student)
  );
}
