// this script loads and evaluates answers submitted by students from a JSON file (exported from firebase)

var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./exercice.evaluator.js');

var filePath = './' + (process.argv[2] || 'classe1.json');

console.log('Reading from:', filePath, '...');

var submissionSet = require(filePath).submissions;

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

//console.log(submissions);
/*
var evaluateStudent = function(task, cb) {
  console.log(task);
  cb();
}
*/
async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
