// load and evaluate answers submitted by a group of student,
// from a JSON file (database dump) exported from Firebase

var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./StudentEvaluator');

var filePath = process.argv[2] || '../student-groups/js-controle-1-classe-1.json';

console.log('Reading and evaluating answers from:', filePath, '...');

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
