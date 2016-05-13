/*
for f in ./exercice.variant.*.json; do
    mustache $f ./exercice.template.md > $f.md;
done;
*/

//var _ = require('lodash');
var fs = require('fs');
var mustache = require('mustache');

var PATH_SOURCE = './';
var PATH_OUTPUT = './public/data/';

var RE_EX_VARIANT_FILE = /ex\.(\d+)\.variant\.(\d+)\.json/;
//var RE_EX_CODE_FILE = /ex\.(\d+)\.code\.template\.md/;

function makeRegexTester(regex) {
  return regex.test.bind(regex);
}

var isVariantFile = makeRegexTester(RE_EX_VARIANT_FILE);
//var isCodeFile = makeRegexTester(RE_EX_CODE_FILE);

function getExerciseTemplate(exercise) {
  return fs.readFileSync(PATH_SOURCE + 'ex.' + exercise + '.code.template.md');
}

// actual script


var files = fs.readdirSync(PATH_SOURCE);

files.filter(isVariantFile).forEach(function(file){
  var values = RE_EX_VARIANT_FILE.exec(file);
  var template = getExerciseTemplate(values[1]).toString();
  var variantData = JSON.parse(fs.readFileSync(PATH_SOURCE + file));
  var rendered = mustache.render(template, variantData);
  fs.writeFileSync(PATH_OUTPUT + file + '.md', rendered);
});


