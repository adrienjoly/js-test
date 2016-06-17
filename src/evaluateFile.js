// this script loads and evaluates answers submitted by students from a JSON file (exported from firebase)

var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./StudentEvaluator');

var filePath = process.argv[2] || '../students/albira.json';

console.log('Reading and evaluating answers from:', filePath, '...');

//var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

var submissionSet = {};
var studentName = filePath.split('/').pop().replace('.json', '');
submissionSet[studentName] = require(filePath);

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
