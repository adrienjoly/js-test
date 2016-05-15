var async = require('async');

function renderMulti(i, j) {
  return i + ' * ' + j + ' = ' + (i * j);
}

function wrapCode(code) {
  return [
    // test-specific instructions
    'var _result = [];',
    'var console = { log: function(){ _result.push(Array.prototype.join.call(arguments, " ")); } };',
    code,
    // every test should end with this, in order to compare to expected results
    'application.remote._send(_result);'
  ].join('\n');
}

module.exports = [

  /* TEST 1: first line of console depends on prompt() */
  function (code, variant, callback) {
    var helpers = this;
    var CASES = [
      { input: 4, expectedOutput: '4 * 2 = 8' },
      { input: 5, expectedOutput: '5 * 2 = 10' },
    ];
    function test(testCase, caseCallback) {
      var caseCode = 'var prompt = function(){ return ' + testCase.input + '; };\n' + code;
      helpers.testCode(wrapCode(caseCode), function(err, res) {
        var isSolutionValid = (res || [])[0] === testCase.expectedOutput;
        //console.log('[test]', testCase.expectedOutput, '->', helpers.errorOr(err, (res || [])[0]), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(helpers.sum));
    });
  },

  /* TEST 2: first line of console depends on prompt() */
  function (code, variant, callback) {
    var helpers = this;
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
      helpers.testCode(wrapCode(caseCode), function(err, res) {
        res = res || [ null ];
        var isSolutionValid = JSON.stringify(res.slice(1)) === JSON.stringify(testCase.expectedOutput.slice(1));
        var renderedCase = [
          testCase.expectedOutput[1], // second line
          testCase.expectedOutput[testCase.expectedOutput.length - 1] // last line
        ];
        var renderedAnsw = [
          res[1], // second line
          res[res.length - 1] // last line
        ];
        //console.log('[test]', renderedCase, '->', helpers.errorOr(err, renderedAnsw), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(helpers.sum));
    });
  },

  /* TEST 3: function for rendering multiplication */
  function (code, variant, callback) {
    var helpers = this;
    var CASES = [ [-1,1], [12,33] ];
    function test(testCase, caseCallback) {
      var caseCode = [
        'var prompt = function(){};',
        code,
        'console.log(' + variant.fctName + '(' + testCase[0] + ', ' + testCase[1] + '));'
      ].join('\n');
      helpers.testCode(wrapCode(caseCode), function(err, results) {
        var res = results.pop(); // last line of console holds the result
        var expected = renderMulti(testCase[0], testCase[1]);
        var isSolutionValid = res == expected;
        //console.log('[test]', expected, '->', helpers.errorOr(err, res), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(helpers.sum));
    });
  }
];
