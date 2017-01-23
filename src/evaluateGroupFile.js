// load and evaluate answers submitted by a group of student,
// from a JSON file (database dump) exported from Firebase

var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./StudentEvaluator');

var filePath = process.argv[2] || '../student-groups/js-controle-1-classe-1.json';

var PATH_SOURCE = './exam-data/';
var SCORES_FILE = PATH_SOURCE + 'scores.csv';

console.log('Reading and evaluating answers from:', filePath, '...');

fs.appendFileSync(SCORES_FILE, [ '\"GROUP FILE:\"', '\"' + filePath + '\"' ].toString() + '\n');

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
