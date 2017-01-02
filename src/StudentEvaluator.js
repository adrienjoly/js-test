var fs = require('fs');
var util = require('util');
var QuizzEvaluator = require('./QuizzEvaluator.js');
var CodeEvaluator = require('./CodeEvaluator.js');

var PATH_SOURCE = './exam-data/';

// outputs

var SCORES_FILE = PATH_SOURCE + 'scores.csv';

// inputs

var SOLUTIONS_FILE = PATH_SOURCE + 'ex.1.quizz.solutions.json';
var TESTS_FILE = PATH_SOURCE + 'ex.2.code.tests.json';

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
  console.log('\n\n================================\n')
  console.log('STUDENT:', student.key/*, '(' + student._uid + ')', '...'*/);

  var res = quizzEvaluator.evaluateAnswers(student);
  console.log('\n  -  quizz answers:');
  setConsolePrefix('  | ');
  res.log.map(function(q){
    console.log(q.questionId, ':', q.answer, '(solution: ' + q.solution + ') =>', q.points, 'pts');
  });
  setConsolePrefix();
  totalScore += res.score;
  totalPoints += res.length;
  console.log('\n  => quizz score:', res.score, '/', res.length, 'pts');

  console.log('\n  -  code evaluation:');
  setConsolePrefix('  | ');
  codeEvaluator.evaluateAnswers(student, function(err, res){
    totalScore += res.score;
    totalPoints += res.length;
    setConsolePrefix();
    console.log('\n  => code score:', res.score, '/', res.length, 'pts');
    console.log();
    console.log('=> TOTAL STUDENT SCORE:', totalScore, '/', totalPoints);
    var csv = [ student.key, totalScore ];
    fs.appendFile(SCORES_FILE, csv.toString() + '\n', next);
  });
}

// exports

module.exports = evaluateStudent;
module.exports.getVariantByStudentId = CodeEvaluator.getVariantByStudentId;
