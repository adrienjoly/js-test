// parses and renders a markdown exercise definition

var _ = require('lodash');
var mustache = require('mustache');

function renderVariant(variantData) {
  var template = this.toString();
  return template && mustache.render(template, variantData);
}

function renderCodeExercise(exerciseData, exNumber) {

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
    var id = 'code' + (q + 1); // TODO: allow each question to override this id
    var rawSolution = exSolution.split(/```.*\n/g)[1];
    solutions[id] = variants.map(renderVariant.bind(rawSolution)); // render one solution per variant
    var exerciseData = {
      i: q + 1, // TODO: prevent id collisions if more than one code.template.md file is used
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
}

function renderQuizzExercise(exerciseData, exNumber) {
  return {
    questions: exerciseData.renderJsonQuestions(),
    solutions: exerciseData.getSolutions(),
  };
}

module.exports = {
  renderCodeExercise: renderCodeExercise,
  renderQuizzExercise: renderQuizzExercise,
};
