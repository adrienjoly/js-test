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

function renderMulti(i, j) {
  return i + ' * ' + j + ' = ' + (i * j);
}

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
        console.log('[test]', testCase.expectedOutput, '->', (res || [])[0], '=>', isSolutionValid);
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
    var variant = { nb1: 3, nb3: 100}; 
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
        var renderedCase = [
          testCase.expectedOutput[1], // second line
          testCase.expectedOutput[testCase.expectedOutput.length - 1] // last line
        ];
        res = res || [ null ];
        var renderedAnsw = [
          res[1], // second line
          res[res.length - 1] // last line
        ];
        console.log('[test]', renderedCase, '->', renderedAnsw, '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  },

  /* TEST 3: function for rendering multiplication */
  function (code, callback) {
    // TODO: make it work for each variant
    var variant = { fctName: 'multi' };
    var CASES = [ [-1,1], [12,33] ];
    function test(testCase, caseCallback) {
      var caseCode = [
        'var prompt = function(){};',
        code,
        'console.log(' + variant.fctName + '(' + testCase[0] + ', ' + testCase[1] + '));'
      ].join('\n');
      testCode(caseCode, function(err, results) {
        var res = results.pop(); // last line of console holds the result
        var expected = renderMulti(testCase[0], testCase[1]);
        var isSolutionValid = res == expected;
        console.log('[test]', expected, '->', res, '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  }
];

function evaluateStudent(task, callback) {
  console.log('\n===\nSTUDENT', task.key, '(' + task._uid + ') :\n---\n' + task.code1 + '\n---');
  function runTest(testFct, callback) {
    testFct(task.code1, callback);
  }
  async.mapSeries(TESTS, runTest, function done(err, res) {
    console.log('=> total STUDENT points:', res);
    callback();
  });
}

module.exports = evaluateStudent;
