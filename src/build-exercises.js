// This scripts generates ./public/scripts/exam-data.js (for the web client)
// based on ./exam-data/*.md definition files and exam-config.js.

var fs = require('fs');
var ExerciseConverter = require('./ExerciseConverter');
var ExerciseEnumerator = require('./ExerciseEnumerator');

var GENERATE_SOLUTION_FILES = false; // if true, will generate a solution file for each .md file

var PATH_SOURCE = './exam-data/';
var OUTPUT_FILE = './public/scripts/exam-data.js';

var CONFIG_FILE = '../' + PATH_SOURCE + 'exam-config.js';

function objectWithout(keyNames) {
  return function(obj) {
    var res = Object.assign({}, obj); // clone
    keyNames.forEach(function(keyName) {
      delete res[keyName];
    });
    return res;
  };
}

function renderExercisesFile(exercises) {
  var config = require(CONFIG_FILE);

  // exclude solutions and/or evaluation tests, if specified
  config.examPack = config.examPack || {};
  if (!config.examPack.publishSolutions || !config.examPack.publishEvalTests) {
    var filterEx = objectWithout(!config.examPack.publishSolutions ? ['solutions'] : []);
    var filterQuestion = (function(){
      var toExclude = [];
      if (!config.examPack.publishSolutions) {
        toExclude = toExclude.concat(['mdSolution', 'mdSolutions']);
      }
      if (!config.examPack.publishEvalTests) {
        toExclude = toExclude.concat(['testVariants']);
      }
      return objectWithout(toExclude);
    })();
    exercises = exercises.map(function(ex){
      var exOut = filterEx(ex);
      exOut.questions = exOut.questions.map(filterQuestion);
      return exOut;
    });
  }

  return [
    '// generated by build-exercises.js',
    '(function(document) {',
    '  \'use strict\';',
    '  var app = document.querySelector(\'#app\');',
    '  app.config = '
      + JSON.stringify(config, null, 2).replace(/\n/g, '\n  ') + ';',
    '  app.exercises = '
      + JSON.stringify(exercises, null, 2).replace(/\n/g, '\n  ') + ';',
    '})(document);',
    ''
  ].join('\n');
}

// converters

var converter = new ExerciseConverter();

var converters = {

  code: function(exerciseData, exNumber) {
    var rendered = converter.renderCodeExercise(exerciseData, exNumber);
    if (GENERATE_SOLUTION_FILES) {
      var solFile = PATH_SOURCE + 'ex.' + exNumber + '.code.tests.json';
      fs.writeFileSync(solFile, JSON.stringify(rendered.evalTests, null, 2));
    }
    // generate data for exercise pack
    return {
      _info: exerciseData._info,
      i: parseInt(exNumber),
      isCode: true,
      title: exerciseData.title || 'Exercices de codage',
      questions: rendered.questions,
    };
  },

  quizz: function(exerciseData, exNumber) {
    var rendered = converter.renderQuizzExercise(exerciseData, exNumber);
    if (GENERATE_SOLUTION_FILES) {
      var solFile = PATH_SOURCE + 'ex.' + exNumber + '.quizz.solutions.json';
      fs.writeFileSync(solFile, JSON.stringify(rendered.solutions, null, 2));
    }
    // generate data for exercise pack
    return {
      _info: exerciseData._info,
      i: parseInt(exNumber),
      isQuizz: true,
      title: exerciseData.title || 'QCM',
      questions: rendered.questions,
      solutions: rendered.solutions
    };
  },
};

// actual script

var exercises = ExerciseEnumerator.parseAllFrom(PATH_SOURCE).map(function(exData) {
  return converters[exData._type](exData, exData.i);
});

// the exercisePack file will be loaded by index.html, then processed by app.js for rendering
// exercises and student-id-based variants
console.log('Generating', OUTPUT_FILE, '...');
var exercisePack = renderExercisesFile(exercises);
fs.writeFileSync(OUTPUT_FILE, exercisePack);
