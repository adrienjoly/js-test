// This script loads and evaluates answers submitted by students from Firebase.

var async = require('async');
var Firebase = require('firebase');
var QuizzEvaluator = require('./QuizzEvaluator.js');
var CodeEvaluator = require('./CodeEvaluator.js');

var FIREBASE_URL = 'https://js-exam.firebaseio.com';
var SOLUTIONS_FILE = './ex.1.quizz.solutions.json';
var TESTS_FILE = './ex.2.code.tests.json';

// helpers

function forEachChild(endpointUrl, handler, callback) {
  var q = async.queue(handler, 1); // handler(task, callnext) will be called for each child
  //q.push({name: 'foo', code1: 'console.log("test", 666);'}); // for testing
  var backend = new Firebase(endpointUrl);
  backend.on('value', function (snapshot) {
    var remaining = snapshot.numChildren();
    q.drain = function() {
      if (!remaining) callback();
    };
    snapshot.forEach(function(child) {
      var obj = child.val();
      obj.key = child.key();
      q.push(obj);
      --remaining;
    });
  });
}

function setConsolePrefix(prefix) {
  if (!prefix) {
    // restore original console
    console.log = console._log_backup;
  } else {
    console._log_backup = console._log_backup || console.log;
    console.log = function() {
      for (var i in arguments) {
        if (arguments[i] instanceof Object || arguments[i] instanceof Array)
          arguments[i] = sys.inspect(arguments[i]);
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
    next();
  });
}

// actual script

forEachChild(FIREBASE_URL + '/submissions', evaluateStudent, function done() {
  process.exit();
});
