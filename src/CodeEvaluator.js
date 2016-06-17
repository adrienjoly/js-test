var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var jailed = require('jailed-node');

function sum(a, b) {
  return a + b;
}

function runCodeInSandbox(code, callback) {
  var plugin = null;
  var timeout = null;
  function onDone(err, results){
    clearTimeout(timeout);
    callback(err, results);
    plugin.disconnect();
  }
  var api = {
    // this function will be called with resulting arguments by sandboxed script, when done
    _send: function(){
      onDone(null, arguments);
    }
  };
  plugin = new jailed.DynamicPlugin(code, api);
  plugin.whenFailed(onDone);
  //plugin.whenConnected(onDone);
  timeout = setTimeout(onDone.bind(null, 'TIMEOUT: infinite loop?'), 2000);
}

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
  return modulo(id, variants.length);
};

function runTest(testCode, studentCode, callback) {
  if (!testCode) {
    console.log('// WARNING: NO CODE TESTER => skipping');
    callback(null, [ 0 ]);
  } else if (!studentCode) {
    console.log('// WARNING: NO STUDENT CODE => skipping');
    callback(null, [ 0 ]);
  } else {
    var code = testCode.replace(/_runStudentCode\(\)/g, [ '// <STUDENT-CODE>', studentCode, '// </STUDENT-CODE>' ].join('\n'));
    //console.log(code);
    console.log([ '// STUDENT CODE:', studentCode ].join('\n\n'));
    runCodeInSandbox(code, function(err, res) {
      if (err) console.log('=> test runner err:', err);
      var testScore = 0;
      if (res) {
        testScore = res[1];
        var testError = res[0];
        if (testError) {
          console.log('\n// -> STUDENT CODE ERROR:', testError);
        }
      }
      console.log('\n// => STUDENT CODE SCORE:', testScore || 0);
      callback(err, [ testScore || 0 ]); // sum of array must be <= 1
    });
  }
}

// exported class

function CodeEvaluator() {}

CodeEvaluator.prototype.readTestsFromFile = function(filePath) {
  this.tests = JSON.parse(fs.readFileSync(filePath).toString());
  return this;
};

CodeEvaluator.prototype.evaluateAnswers = function(answers, callback) {
  var nbTests = this.tests.length;
  function runExEval(exEval, callback) {
    var variantNumber = getVariantByStudentId(answers._uid, exEval.variants);
    var evalTest = exEval.testVariants[variantNumber];
    console.log('\n------------- EXERCISE:', exEval.id, '(variant:', variantNumber + ') -------------\n');
    runTest(evalTest, answers[exEval.id], callback);
  }
  async.mapSeries(this.tests, runExEval, function done(err, res) {
    var total = _.flatten(res).reduce(sum);
    callback(null, {
      score: total,
      length: nbTests
    });
  });
};

module.exports = CodeEvaluator;
