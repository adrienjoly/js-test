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

function runTest(testCode, studentCode, callback) {
  if (!testCode) {
    console.log('// WARNING: NO CODE TESTER => skipping');
  } else if (!studentCode) {
    console.log('// WARNING: NO STUDENT CODE => skipping');
  } else {
    var code = [ '// CODE TESTER:', testCode, '// STUDENT CODE:', studentCode ].join('\n\n');
    console.log(code);
    runCodeInSandbox(code, function(err, res) {
      if (err) console.log('=> test runner err:', err);
      var testError = res[0];
      var testScore = res[1];
      if (testError) console.log('=> test error:', testError);
      console.log('\n// => STUDENT CODE SCORE:', testScore || 0);
      process.exit(); // TODO: remove
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
