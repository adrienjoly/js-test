// This scripts renders markdown files in PATH_OUTPUT for each exercise template and variants in PATH_SOURCE

var fs = require('fs');
var mustache = require('mustache');
var QuizzRenderer = require('./QuizzRenderer');

var PATH_SOURCE = './';
var PATH_OUTPUT = './public/data/';

var RE_EX_VARIANT_FILE = /ex\.(\d+)\.variant\.(\d+)\.json/;
var RE_EX_QUIZZ_FILE = /ex\.(\d+)\.quizz\.template\.md/;

function makeRegexTester(regex) {
  return regex.test.bind(regex);
}

function getExerciseTemplate(exercise) {
  return fs.readFileSync(PATH_SOURCE + 'ex.' + exercise + '.code.template.md');
}

// actual script

var files = fs.readdirSync(PATH_SOURCE);

// 1) render code exercises

var isVariantFile = makeRegexTester(RE_EX_VARIANT_FILE);
files.filter(isVariantFile).forEach(function(file){
  console.log('Rendering', file, 'code variants ...');
  var values = RE_EX_VARIANT_FILE.exec(file);
  var template = getExerciseTemplate(values[1]).toString();
  var variantData = JSON.parse(fs.readFileSync(PATH_SOURCE + file));
  var rendered = mustache.render(template, variantData);
  fs.writeFileSync(PATH_OUTPUT + file + '.md', rendered);
});

// 2) render quizz exercises

var isQuizzFile = makeRegexTester(RE_EX_QUIZZ_FILE);
files.filter(isQuizzFile).forEach(function(file){
  console.log('Rendering', file, 'quizz ...');
  var quizz = new QuizzRenderer().readFromFile(PATH_SOURCE + file);
  fs.writeFileSync(PATH_OUTPUT + file + '.js', quizz.renderJsQuestions());
});
