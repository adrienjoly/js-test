var fs = require('fs');
var jailed = require('jailed-node');
var config = require('../exam-data/exam-config.js');
var CodeEvaluatorGeneric = require('../public/scripts/CodeEvaluatorGeneric.js');

var CodeEvaluator = CodeEvaluatorGeneric.makeCodeEvaluator(jailed, config.codeGrading);

CodeEvaluator.prototype.readTestsFromFile = function(filePath) {
  this.tests = JSON.parse(fs.readFileSync(filePath).toString());
  return this;
};

module.exports = CodeEvaluator;
