// requires caolan's async

try {
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
} catch (err) {};

// fixed version of variant3() => returns 0, 1 or 2, depending on the value of number
function getVariantByStudentId (id, variants) {
  // modulo that also works for big integers
  var modulo = function(divident, divisor) {
      var partLength = 10;
      while (divident.length > partLength) {
          var part = divident.substring(0, partLength);
          divident = (part % divisor) +  divident.substring(partLength);
      }
      return divident % divisor;
  };
  return modulo('' + id, variants.length);
};

function makeCodeEvaluator(jailed, async, codeGradingOptions) {

  var COEF = codeGradingOptions.ptsPerExercise;

  function sum(a, b) {
    return a + b;
  }

  function runCodeInSandbox({ code, apiExts = {} }, callback) {
    var plugin = null;
    // var timeout = null;
    function onDone(err, results){
      /*
      clearTimeout(timeout);
      timeout = null;
      */
      callback(err, results);
      plugin.disconnect();
    }
    // var timeoutMessage = 'TIMEOUT: infinite loop?'; // can be overrided by evaluation code
    let trackUncaughtRejections = false;
    const uncaughtRejections = [];
    var api = {
      ...apiExts,
      _xhr: (method = 'GET', url, cb) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState === 4) {
            cb(null, this);
          }
        };
        xhr.onerror = function(error) {
          cb(error || new Error('error from XMLHttpRequest'));
        };
        xhr.open(method, url);
        xhr.send();
      },
      /*
      _setTimeoutMessage: function(message){
        timeoutMessage = message;
      },
      */
      _log: console.log.bind(console),
      // this function will be called with resulting arguments by sandboxed script, when done
      _send: function(){
        onDone(null, arguments);
      },
      /*
      _sendOnce: function(){
        timeout && onDone(null, arguments);
      },
      */
      _trackUncaughtRejections: function(val){
        trackUncaughtRejections = !!val;
      },
      _getUncaughtRejections: function(callback){
        callback(uncaughtRejections);
      },
    };
    plugin = new jailed.DynamicPlugin(code, api, {
      failOnRuntimeError: true,
      onUncaughtRejection: function (err, extras = {}) {
        if (trackUncaughtRejections) {
          uncaughtRejections.push(err);
        } else if (!err.includes('evaluateStudentCode')) {
          console.log(` ⚠️ runCodeInSandbox caught a warning: ${err}`);
        }
        console.error(`⚠️ runCodeInSandbox caught a ${trackUncaughtRejections ? '': 'un'}tracked warning: ${extras.promiseStack || err}`);
      },
    });
    plugin.whenFailed(onDone);
    //plugin.whenConnected(onDone);
    // timeout = setTimeout(function(){ onDone(timeoutMessage); }, 2000);
  }

  function runCodeInWrappedSandbox({ code, apiExts }, callback) {
    runCodeInSandbox({ code, apiExts }, function(err, res) {
      callback(err, res);
    });
  }

  if (codeGradingOptions.wrapper) {
    // wrapper could be overrided by CodeEvaluator.js, for catching Jailed errors from stderr
    runCodeInWrappedSandbox = codeGradingOptions.wrapper.bind(runCodeInWrappedSandbox);
  }

  function runTest(testCode, studentCode, callback) {
    if (!testCode) {
      console.log('// WARNING: NO CODE TESTER => skipping');
      callback(null, [ 0 ]);
    } else if (!studentCode) {
      console.log('// WARNING: NO STUDENT CODE => skipping');
      callback(null, [ 0 ]);
    } else {
      var code = [
        'application.remote.getStudentCode(_studentCode => {',
      ].concat(testCode
        .replace(/`_studentCode`/g, '_studentCode') // kept for backward compatibility
        .replace(/_runStudentCode\(\)/g, 'eval(_studentCode)') // kept for backward compatibility
        .replace(/_runStudentCodeAgain\(\)/g, 'eval(_studentCode)') // kept for backward compatibility
        .split('\n').map(line => '  ' + line)
      ).concat([
        '});'
      ]).join('\n');
      // console.warn(code.split('\n').map(line => `> ${line}`).join('\n'))
      console.log([
        '// STUDENT CODE:',
        studentCode,
        '// CODE EVALUATION:',
      ].join('\n\n') + '\n');
      const apiExts = {
        getStudentCode: (callback) => callback(studentCode),
      };
      runCodeInWrappedSandbox({ code, apiExts }, function(err, res) {
        if (err) {
          console.log(' 🔴 runTest caught an error:', err.message || err);
          process.stderr.write(`🔴 runTest caught an error: ${err.message || err}\n`);
        }
        // TODO: find a way to display the position of the error in the student's code
        // (like when nodejs intercepts and displays the error)
        var scoreArray = [ 0 ];
        if (res) {
          if (res[0]) {
            console.log('\n// -> STUDENT CODE ERROR:', res[0]);
          }
          var testResult = res[1];
          if (typeof testResult === 'object' && testResult.length >= 0) {
            scoreArray = testResult.map(function(a){ return a ? 1 : 0; });
          } else {
            scoreArray = [ testResult || 0 ];
          }
          console.log('\n// -> STUDENT SCORE ARRAY:', scoreArray);
        }
        callback(null, scoreArray); // sum of array must be <= config.codeGrading.ptsPerExercise
      });
    }
  }

  // exported class

  function CodeEvaluator(tests) {
    this.tests = tests;
  }

  CodeEvaluator.prototype.getMaxScore = function() {
    return this.tests.length * COEF;
  };

  CodeEvaluator.prototype.evaluateAnswersEx = function(params, callback) {
    var _this = this;
    params = params || {};
    var answers = params.answers;
    var renderedQuestions = params.renderedQuestions;
    function runExEval(exEval, callback) {
      var variantNumber = getVariantByStudentId(answers._uid, exEval.variants);
      var evalTest = exEval.testVariants[variantNumber];
      console.log('\n------------- EXERCISE:', exEval.id, '(variant:', variantNumber + ') -------------\n');

      if (renderedQuestions) {
        var question = renderedQuestions
          .find(q => q.id === exEval.id)
          .mdVariants[variantNumber]
          .replace(/<!--(.*?)-->/g, '')
          .trim();
        console.log([
          '// QUESTION:',
          question,
        ].join('\n\n') + '\n');
      }

      runTest(evalTest, answers[exEval.id], function(err, scoreArray) {
        var pts = (scoreArray.reduce(sum) / scoreArray.length)
        console.log('\n// -> EXERCISE POINTS:', pts * COEF + ' / ' + COEF);
        callback(err, scoreArray);
      });
    }
    async.mapSeries(this.tests, runExEval, function done(err, res) {
      var ptsPerExercise = res.map(function(scoreArray){
        return scoreArray.reduce(sum) * COEF / scoreArray.length;
      });
      callback(null, {
        score: ptsPerExercise.reduce(sum),
        length: _this.getMaxScore(),
        scoreArray: ptsPerExercise,
      });
    });
  };

  CodeEvaluator.prototype.evaluateAnswers = function(answers, callback) {
    return this.evaluateAnswersEx({ answers: answers }, callback);
  };

  return CodeEvaluator;

};

try {
  exports.makeCodeEvaluator = makeCodeEvaluator;
  exports.getVariantByStudentId = getVariantByStudentId;
} catch(e) {}
