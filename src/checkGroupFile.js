// load and compare answers submitted by a group of student,
// to detect fraud based on similarity of answers

var fs = require('fs');

var filePath = process.argv[2] || '../student-groups/js-controle-1-classe-1.json';

console.log('Reading and comparing answers from:', filePath, '...');

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

console.log('== Exact same solutions');

var codeAnswers = {}; // { question id -> { trimmed answer -> [ students ] } }

for (var student in submissionSet) {
  for (var q in submissionSet[student]) {
    if (/^code/.test(q)) {
      var trimmedCode = submissionSet[student][q].trim();
      codeAnswers[q] = codeAnswers[q] || {};
      codeAnswers[q][trimmedCode] = codeAnswers[q][trimmedCode] || [];
      codeAnswers[q][trimmedCode].push(student);
    }
  }
}

for (var q in codeAnswers) {
  console.log('exercice', q, ':');
  for (var code in codeAnswers[q]) {
    console.log('-', codeAnswers[q][code]);
  }
}

// run node ./src/checkGroupFile.js ../student-groups/js-controle-ajax-ft-export.json >fraud.txt

/*
console.log('== Checksums');

var checksums = {}; // { question id -> [ { student, checksum } ] }

for (var student in submissionSet) {
  for (var q in submissionSet[student]) {
    if (/^code/.test(q)) {
      var trimmedCode = submissionSet[student][q].trim();
      codeAnswers[q] = codeAnswers[q] || {};
      codeAnswers[q][trimmedCode] = codeAnswers[q][trimmedCode] || [];
      codeAnswers[q][trimmedCode].push(student);
    }
  }
}
*/