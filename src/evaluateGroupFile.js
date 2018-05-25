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
  fs.appendFileSync(SCORES_FILE, array.slice(0, 2).toString() + '\n');
  fs.appendFileSync(SCORES_DETAIL_FILE, array.toString() + '\n');
}

var renderScore = evaluateStudent.renderScore;
var nbQuestions = evaluateStudent.exercises.reduce((nb, ex) => nb + ex.questionLines.length, 0);
var questionIds = evaluateStudent.exercises.reduce(
  (ids, ex) => ids.concat(ex.questionLines.map(
    (_, q) => ex._type + (ids.length + q)
  )), []);

function sum(a, b) {
  return a + b;
}

function median(arr){
  arr = arr.sort(function(a, b){ return a - b; });
  var i = arr.length / 2;
  return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}

console.log('Reading and evaluating answers from:', filePath, '...');

// csv header
appendScoreValues([ filePath.split('/').pop(), 'score' ].concat(questionIds));
appendScoreValues([]); // (empty) line separator

var submissionSet = require(filePath).submissions; // this line allows to parse an entire firebase json export at once

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], { key: key });
});

async.mapSeries(submissions, evaluateStudent, function(err, res) {
  if (err) throw err;
  var flatScores = res.map(student => student.studentTotalScore);
  // for each student, enumerate total score followed by number of points for each question
  var studentScores = res.map(student => [ student.studentTotalScore ].concat(student.studentScoreArray));
  // rotate this score matrix to get scores per student per question, cf https://stackoverflow.com/a/17428705/592254
  var scoresPerQ = studentScores[0].map((col, i) => studentScores.map(row => row[i]));
  // compute statistics
  [
    [], // (empty) line separator
    [ '(MIN)' ].concat(scoresPerQ.map(scores => renderScore(Math.min.apply(null, scores)))),
    [ '(AVERAGE)' ].concat(scoresPerQ.map(scores => renderScore(scores.reduce(sum) / scores.length))),
    [ '(MEDIAN)' ].concat(scoresPerQ.map(scores => renderScore(median(scores)))),
    [ '(MAX)' ].concat(scoresPerQ.map(scores => renderScore(Math.max.apply(null, scores)))),
  ].map(appendScoreValues);
  // generate grade/score distribution chart
  fs.appendFileSync(SCORES_CHART_FILE, renderDistributionChart({ flatScores }));
  process.exit();
});
