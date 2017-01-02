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

var _uid = 0; // change user id value in order to test different variants

var submissionSet = {
  _ALLEMPTY_: {},
  _ALLGOOD_: solutions
};

var submissions = Object.keys(submissionSet).map(function(key){
  return _.extend(submissionSet[key], {
    key: key,
    _uid: _uid,
  });
});

// 3) evaluate fake submissions, and print to standard output

function applyVariant(subm, variant) {
  var fixedSubm = Object.assign({}, subm); // clone object
  // replace array-typed properties by picking one, based on variant index
  for (var exKey in fixedSubm) {
    var exVal = fixedSubm[exKey];
    if (typeof exVal === 'object' && typeof exVal.map === 'function') {
      fixedSubm[exKey] = exVal[variant];
    }
  }
  return fixedSubm;
}

function applyVariantThen(variant, asyncFct) {
  return function(param, callback) {
    asyncFct(applyVariant(param, variant), callback);
  };
}

async.mapSeries(submissions, applyVariantThen(_uid, evaluateStudent), process.exit);
