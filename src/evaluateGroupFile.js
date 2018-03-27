// load and evaluate answers submitted by a group of student,
// from a JSON file (database dump) exported from Firebase

var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var evaluateStudent = require('./StudentEvaluator');
var renderDistributionChart = require('./renderDistributionChart');

var filePath = process.argv[2] || '../student-groups/js-controle-1-classe-1.json';

var PATH_SOURCE = './exam-data/';
var SCORES_FILE = PATH_SOURCE + 'scores.csv';
var SCORES_DETAIL_FILE = PATH_SOURCE + 'scores-detail.csv';
var SCORES_CHART_FILE = PATH_SOURCE + 'scores-chart.txt';

function appendScoreValues(array) {
  var csvLine = array.toString() + '\n';
  fs.appendFileSync(SCORES_FILE, csvLine);
  fs.appendFileSync(SCORES_DETAIL_FILE, csvLine);
}

function sum(a, b) {
  return a + b;
}

function median(arr){
  arr = arr.sort(function(a, b){ return a - b; });
  var i = arr.length / 2;
  return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}

console.log('Reading and evaluating answers from:', filePath, '...');

var groupHeader = [ '\"GROUP FILE:\"', '\"' + filePath + '\"' ];
appendScoreValues(groupHeader);

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(err, res) {
  if (err) throw err;
  // list students' total scores
  var flatScores = res.map(function(student) {
    return student.studentTotalScore;
  });
  // compute average and median
  [
    [ '(AVERAGE)', flatScores.reduce(sum) / res.length ],
    [ '(MEDIAN)', median(flatScores) ]
  ].map(appendScoreValues);
  // generate grade/score distribution chart
  fs.appendFileSync(SCORES_CHART_FILE, renderDistributionChart({ flatScores }));
  process.exit();
});
