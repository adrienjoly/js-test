var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var jailed = require('jailed-node');

function sum(a, b) {
  return a + b;
}

function runCodeInSandbox(code, callback) {
  var plugin = null;
  function onDone(err, results){
    callback(err, results);
    plugin.disconnect();
  }
  var api = {
    // this function will be called with resulting arguments by sandboxed script, when done
    _send: function(){
      onDone(null, arguments);
    }
  };
  console.log('FINAL CODE:', code);
  plugin = new jailed.DynamicPlugin(code, api);
  plugin.whenFailed(onDone);
  //plugin.whenConnected(onDone);
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

function runTest(testCode, /*variantData,*/ studentCode, callback) {
  //var fakeScores = [0, 0.25, 0, 0]; // sum must be == 1
  if (!testCode) {
    console.log('no testCode => skipping');
  } else if (!studentCode) {
    console.log('no studentCode => skipping');
  } else {
    runCodeInSandbox(testCode + '\n// STUDENT CODE:\n' + studentCode, function(err, res) {
      if (err) console.log('=> test runner err:', err);
      var testError = res[0];
      var testScore = res[1];
      if (testError) console.log('=> test error:', testError);
      console.log('=> test score:', testScore || 0);
      process.exit(); // TODO: remove
      callback(err, [ testScore || 0 ]);
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
    //testFct.call(testHelpers, answers.code1, VARIANTS[variantNumber], callback);
    //'(' + answers._uid + ' => ' + variantNumber + ')
    var variantNumber = getVariantByStudentId(answers._uid, exEval.variants);
    //var variantData = exEval.variants[variantNumber];
    var evalTest = exEval.testVariants[variantNumber];
    console.log('runExEval', exEval.id, '...');
    runTest(evalTest, /*variantData,*/ answers[exEval.id], callback);
  }
  async.mapSeries(this.tests, runExEval, function done(err, res) {
    var total = _.flatten(res).reduce(sum);
    //console.log('=> total STUDENT points:', res, '=', total);
    // csv export of marks:
    //console.log(JSON.stringify([ 'SCORE', answers.key, answers._uid, variantNumber, total ]).replace(/[\[\]]/g, ''));
    callback(null, {
      score: total,
      length: nbTests
    });
  });
};

module.exports = CodeEvaluator;
