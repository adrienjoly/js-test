// load and evaluate answers submitted by a student, from a JSON file exported from Firebase

var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./StudentEvaluator');

var filePath = process.argv[2] || '../students/albira.json';

console.log('Reading and evaluating answers from:', filePath, '...');

var submissionSet = {};
var studentName = filePath.split('/').pop().replace('.json', '');
submissionSet[studentName] = require(filePath);

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
