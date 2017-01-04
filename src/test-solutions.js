// make sure that provided exercise solutions work

var _ = require('lodash');
var async = require('async');
var ExerciseConverter = require('./ExerciseConverter');
var QuizzEnumerator = require('./QuizzEnumerator');
var evaluateStudent = require('./StudentEvaluator');

var PATH_SOURCE = './exam-data/';

// 1) render solutions from exercise definition files

var converters = {
  code: ExerciseConverter.renderCodeExercise,
  quizz: ExerciseConverter.renderQuizzExercise,
};

var exercises = QuizzEnumerator.parseAllFrom(PATH_SOURCE).map(function(exData) {
  return converters[exData._type](exData, exData.i);
});

var solutions = Object.assign.apply(Object, [{}].concat(_.map(exercises, 'solutions')));

// 1b) computer number of all possible variants, based on exercise definition files

var nbVariants = (function(){
  // Least Common Mulitple, source: http://www.w3resource.com/javascript-exercises/javascript-math-exercise-11.php
  function lcm_more_than_two_numbers(input_array) {  
    if (toString.call(input_array) !== "[object Array]")    
      return  false;    
    var r1 = 0, r2 = 0;  
    var l = input_array.length;  
    for(i=0;i<l;i++) {  
      r1 = input_array[i] % input_array[i + 1];  
      if(r1 === 0) {  
        input_array[i + 1] = (input_array[i] * input_array[i+1]) / input_array[i + 1];  
      }  
      else {  
        r2 = input_array[i + 1] % r1;  
        if(r2 === 0) {  
          input_array[i + 1] = (input_array[i] * input_array[i + 1]) / r1;  
        }  
        else {  
          input_array[i+1] = (input_array[i] * input_array[i + 1]) / r2;  
        }  
      }  
    }  
    return input_array[l - 1];  
  }  
  var variants = _.map(_.flatten(_.map(exercises, 'questions')), 'variants').map(function(varArray) {
    return (varArray || [ {} ]).length;
  });
  return lcm_more_than_two_numbers(variants);
})();

// 2) generate fake submissions (automated tests), based on solutions and variants

var submissionSet = {
  _ALLEMPTY_: {},
  _ALLGOOD_: solutions
};

// combine submissionSet with variants (linked to user id)
var submissions = _.flatten(Object.keys(submissionSet).map(function(key){
  return Array.apply(null, Array(nbVariants)).map(function(dummy, uid) {
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
