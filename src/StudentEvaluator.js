var fs = require('fs');
var util = require('util');
var QuizzEvaluator = require('./QuizzEvaluator.js');
var CodeEvaluator = require('./CodeEvaluator.js');

// outputs

var SCORES_FILE = './scores.csv';

// inputs

var SOLUTIONS_FILE = './ex.1.quizz.solutions.json';
var TESTS_FILE = './ex.2.code.tests.json';

// helpers

function setConsolePrefix(prefix) {
  if (!prefix) {
    // restore original console
    console.log = console._log_backup;
  } else {
    console._log_backup = console._log_backup || console.log;
    console.log = function() {
      for (var i in arguments) {
        if (arguments[i] instanceof Object || arguments[i] instanceof Array)
          arguments[i] = util.inspect(arguments[i]);
      }
      console._log_backup(prefix + Array.prototype.join.call(arguments, " ").replace(/\n/g, '\n' + prefix));
    };
  }
}

// evaluation logic

var quizzEvaluator = new QuizzEvaluator().readSolutionsFromFile(SOLUTIONS_FILE);
var codeEvaluator = new CodeEvaluator().readTestsFromFile(TESTS_FILE);

function evaluateStudent(student, next) {
  var totalScore = 0;
  var totalPoints = 0;
  console.log('\n================================\n')
  console.log('Evaluating', student.key, '(' + student._uid + ')', '...');
  console.log('  -  quizz answers:');
  var quizzAnsw = quizzEvaluator.getAnswerSet(student);
  setConsolePrefix('  | ');
  for (var i in quizzAnsw) {
    console.log(i, ':', quizzAnsw[i]);
  }
  setConsolePrefix();
  var res = quizzEvaluator.evaluateAnswers(student);
  totalScore += res.score;
  totalPoints += res.length;
  console.log('  => quizz score:', res.score, '/', res.length);
  console.log('  -  code evaluation:');
  setConsolePrefix('  | ');
  codeEvaluator.evaluateAnswers(student, function(err, res){
    totalScore += res.score;
    totalPoints += res.length;
    setConsolePrefix();
    console.log('  => code score:', res.score, '/', res.length);
    console.log();
    console.log('=> TOTAL STUDENT SCORE:', totalScore, '/', totalPoints);
    var csv = [ student.key, totalScore ];
    fs.appendFile(SCORES_FILE, csv.toString() + '\n', next);
  });
}

// exports

module.exports = evaluateStudent;
