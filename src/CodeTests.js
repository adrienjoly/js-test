var async = require('async');

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
      helpers.testCode(caseCode, function(err, res) {
        var isSolutionValid = (res || [])[0] === testCase.expectedOutput;
        console.log('[test]', testCase.expectedOutput, '->', helpers.errorOr(err, (res || [])[0]), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(helpers.sum));
    });
  },

  /* TEST 2: first line of console depends on prompt() */
  /*
  function (code, variant, callback) {
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
        console.log('[test]', renderedCase, '->', errorOr(err, renderedAnsw), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  },
  */

  /* TEST 3: function for rendering multiplication */
  /*
  function (code, variant, callback) {
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
        console.log('[test]', expected, '->', errorOr(err, res), '=>', isSolutionValid);
        caseCallback(null, isSolutionValid);
      });
    }
    async.mapSeries(CASES, test, function(err, res){
      callback(null, res.reduce(sum));
    });
  }
  */
];
