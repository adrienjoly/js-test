// make sure that provided exercise solutions work

var _ = require('lodash');
var async = require('async');
var QuizzConverter = require('./QuizzConverter');
var QuizzEnumerator = require('./QuizzEnumerator');
var evaluateStudent = require('./StudentEvaluator');

var PATH_SOURCE = './exam-data/';

// 1) render solutions from exercise definition files

var converters = {
  code: QuizzConverter.renderCodeExercise, // TODO: add support for variants
  quizz: QuizzConverter.renderQuizzExercise,
};

var exercises = QuizzEnumerator.parseAllFrom(PATH_SOURCE).map(function(exData) {
  return converters[exData._type](exData, exData.i);
});

var solutions = Object.assign.apply(Object, [{}].concat(_.map(exercises, 'solutions')));

// 2) generate fake submissions (automated tests)

var submissionSet = {
  _ALLEMPTY_: {},
  _ALLGOOD_: solutions
};

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], {
    key: key,
    _uid: 0, // change user id value in order to test different variants
  });
});

// 3) evaluate fake submissions, and print to standard output

async.mapSeries(submissions, evaluateStudent, function(){
  process.exit();
});
