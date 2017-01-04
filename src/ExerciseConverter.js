// parses and renders a markdown exercise definition

var _ = require('lodash');
var mustache = require('mustache');

function renderVariant(variantData) {
  var template = this.toString();
  return template && mustache.render(template, variantData);
}

function ExerciseConverter() {
  // global counters to prevent id collisions, if more than one template.md file per type is used
  this.codeExNumber = 0; 
  this.quizzExNumber = 0; 
}

ExerciseConverter.prototype.renderCodeExercise = function renderCodeExercise(exerciseData, exNumber) {
  var _this = this;
  var evalTests = [];
  var solutions = {};

  var questions = exerciseData.renderJsonQuestions().map(function(question, q) {
    var variants = _.map(question.choices, 'text').map(JSON.parse);
    variants = variants.length > 0 ? variants : [{}]; // also render coding questions that don't have any variants
    var exText = question.md;
    var exEval = question.mdSolution;
    var exSolution = null;
    if (exEval) {
      var parts = exEval.split('\n--\n');
      exEval = parts.pop(); // evaluation code
      exEval = exEval.replace(/```js\n*/g, '').replace(/```\n*/g, '');
      exSolution = parts.pop();
    }
    _this.codeExNumber++;
    var id = 'code' + _this.codeExNumber;
    var rawSolution = exSolution.split(/```.*\n/g)[1];
    solutions[id] = variants.map(renderVariant.bind(rawSolution)); // render one solution per variant
    var exerciseData = {
      i: _this.codeExNumber,
      id: id,
      variants: variants,
      testVariants: variants.map(renderVariant.bind(exEval))
    };
    evalTests.push(exerciseData);
    return Object.assign({}, exerciseData, {
      mdVariants: variants.map(renderVariant.bind(exText)),
      mdSolutions: variants.map(renderVariant.bind(exSolution)),
      mdSolution: exSolution // deprecated => use mdSolutions instead (one per variant)
    });
    // TODO: obfuscate solution and tests on client-side
  });
  
  return {
    questions: questions,
    solutions: solutions,
    evalTests: evalTests,
  };
};

ExerciseConverter.prototype.renderQuizzExercise = function renderQuizzExercise(exerciseData, exNumber) {
  var _this = this;
  var solutionSet = {};
  var solutions = exerciseData.getSolutions();
  return {
    questions: exerciseData.renderJsonQuestions().map(function(question, i) {
      _this.quizzExNumber++;
      var id = 'qcm' + _this.quizzExNumber;
      solutionSet[id] = solutions[i];
      return Object.assign({
        i: _this.quizzExNumber,
        id: id,
      }, question);
    }),
    solutions: solutionSet,
  };
};


module.exports = ExerciseConverter;
