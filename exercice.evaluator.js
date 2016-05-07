var async = require('async');
var jailed = require('jailed-node');

var TEST_TIMEOUT = 200;

function sum(a, b) {
  return a + b;
}

function runCodeAsync(code, api, timeout, callback) {
  var errors = [];
  var plugin = new jailed.DynamicPlugin(code, api);
  plugin.whenFailed(function(err){
    errors.push(err);
  });
  setTimeout(function(){
    plugin.disconnect();
    callback(errors);
  }, timeout);
}

function testCode(code, callback) {
  var result = [];
  var api = {
    _consoleLog: function() {
      result.push(Array.prototype.join.call(arguments, ' '));
    }
  };
  code = 'var console = { log: application.remote._consoleLog };\n' + code;
  //console.log('FINAL CODE:', code);
  runCodeAsync(code, api, TEST_TIMEOUT, function(err) {
    callback(err, result);
  });
}

/*
testCode("console.log('test', 666); alert('Hello from the plugin!');", function(err, res) {
  console.log('=> err:', err); // => [ 'ReferenceError: alert is not defined' ]
  console.log('=> res:', res); // => [ 'test 666' ]
});
*/



var TESTS = [
  /* TEST 1: first line of console depends on prompt() */
  function (code, callback) {
    var CASES = [
      { input: 4, expectedOutput: '4 * 2 = 8' },
      { input: 5, expectedOutput: '5 * 2 = 10' },
    ];
    function test(testCase, caseCallback) {
      var caseCode = 'var prompt = function(){ return ' + testCase.input + '; };\n' + code;
      testCode(caseCode, function(err, res) {
        var isSolutionValid = (res || [])[0] === testCase.expectedOutput;
        console.log('[test]', testCase, '=> studentOutput:', (res || [])[0], '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  },
  /* TEST 2: first line of console depends on prompt() */
  function (code, callback) {
    // TODO: make it work for each variant
    var variant = { nb1: 3, nb3: 5}; 
    function renderMulti(i, j) {
      return i + ' * ' + j + ' = ' + (i * j);
    }
    function makeTestCaseForInput(input, variant) {
      var lines = [ renderMulti(input, 2) ]; // first line
      for (var i = variant.nb1; i <= variant.nb3; ++i) {
        lines.push(renderMulti(input, i));
      }
      return { input: input, expectedOutput: lines };
    }
    var CASES = [
      makeTestCaseForInput(4, variant),
      makeTestCaseForInput(5, variant),
    ];
    function test(testCase, caseCallback) {
      var caseCode = 'var prompt = function(){ return ' + testCase.input + '; };\n' + code;
      testCode(caseCode, function(err, res) {
        var isSolutionValid = JSON.stringify(res) === JSON.stringify(testCase.expectedOutput);
        var renderedCase = {
          second: testCase.expectedOutput[1],
          last: testCase.expectedOutput[testCase.expectedOutput.length - 1]
        };
        res = res || [ null ];
        var renderedAnsw = {
          second: res[1],
          last: res[res.length - 1]
        };
        console.log('[test]', renderedCase, '=> studentOutput:', renderedAnsw, '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  },
];

function evaluateStudent(task, callback) {
  console.log('\n===\nSTUDENT', task.key, ':', task.code1);
  function runTest(testFct, callback) {
    testFct(task.code1, callback);
  }
  async.mapSeries(TESTS, runTest, function done(err, res) {
    console.log('=> total TEST errors:', err);
    console.log('=> total TEST points:', res);
    callback();
  });
}

module.exports = evaluateStudent;
