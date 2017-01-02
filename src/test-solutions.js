// make sure that provided exercise solutions work

var _ = require('lodash');
var async = require('async');
var QuizzConverter = require('./QuizzConverter');
var QuizzEnumerator = require('./QuizzEnumerator');
var evaluateStudent = require('./StudentEvaluator');

var PATH_SOURCE = './exam-data/';

// 1) render solutions from exercise definition files

var converters = {
  code: QuizzConverter.renderCodeExercise,
  quizz: QuizzConverter.renderQuizzExercise,
};

var exercises = QuizzEnumerator.parseAllFrom(PATH_SOURCE).map(function(exData) {
  return converters[exData._type](exData, exData.i);
});

var solutions = Object.assign.apply(Object, [{}].concat(_.map(exercises, 'solutions')));

// 2) generate fake submissions (automated tests)

var uids = [ 0, 1 ]; // change user id value in order to test different variants
// TODO: to compute, based on common denominator of all variants defined in exercises

var submissionSet = {
  _ALLEMPTY_: {},
  _ALLGOOD_: solutions
};

// combine submissionSet with variants
var submissions = _.flatten(Object.keys(submissionSet).map(function(key){
  return uids.map(function(uid) {
    return Object.assign({}, submissionSet[key], {
      key: key + uid,
      _uid: uid,
    });
  });
}));

// 3) evaluate fake submissions, and print to standard output

function applyUserVariant(subm) {
  var fixedSubm = Object.assign({}, subm); // clone object
  // replace array-typed properties by picking one, based on variant index
  for (var exKey in fixedSubm) {
    var exVal = fixedSubm[exKey];
    if (typeof exVal === 'object' && typeof exVal.map === 'function') {
      var exVariants = exVal;
      var variant = evaluateStudent.getVariantByStudentId(subm._uid, exVariants);
      fixedSubm[exKey] = exVariants[variant];
    }
  }
  return fixedSubm;
}

function applyVariantThen(asyncFct) {
  return function(subm, callback) {
    asyncFct(applyUserVariant(subm), callback);
  };
}

async.mapSeries(submissions, applyVariantThen(evaluateStudent), process.exit);
