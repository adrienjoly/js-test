// This class transforms de quizz.template.md file into a JSON definition for the web client
// and a solutions file (for evaluation of students' answers)

// helpers

var CHOICE = /^[-\*] (.+)$/;

function getTrimmedLines(str) {
  return str.replace(/^\s+|\s+$/g, '').split('\n');
}

function nonEmptySection(lines) {
  return lines.length > 1;
}

function isChoice(line) {
  return CHOICE.test(line);
}

function getFirstChar(line) {
  return line[0];
}

function renderQuestion(lines, index) {
  var choice = 1;
  function renderOption(line){
    return {
      name: (choice++),
      text: line.replace(CHOICE, '$1')
    };
  }
  var code = [];
  var choices = [];
  lines.forEach(function(line) {
    (isChoice(line) ? choices : code).push(line);
  });
  return {
    i: index + 1,
    id: 'qcm' + (index + 1),
    md: code,
    choices: choices.map(renderOption)
  };
}

// class

function QuizzRenderer() {
  this.questionLines = [];
}

QuizzRenderer.prototype.readFromFile = function (filepath) {
  this.questionLines = require('fs').readFileSync(filepath).toString()
    .split('---')
    .map(getTrimmedLines)
    .filter(nonEmptySection);
  return this;
};

QuizzRenderer.prototype.renderJsonQuestions = function () {
  return this.questionLines.map(renderQuestion);
};

QuizzRenderer.prototype.getSolutions = function () {
  var solutions = {};
  this.questionLines.forEach(function(lines, index){
    solutions['qcm' + (index + 1)] = lines.filter(isChoice).map(getFirstChar).join('').indexOf('*') + 1;
  });
  return solutions;
};

// exports

module.exports = QuizzRenderer;
