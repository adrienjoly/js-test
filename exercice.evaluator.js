var jailed = require('jailed-node');

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
  //console.log('code:', code);
  runCodeAsync(code, api, 1000, function(err) {
    callback(err, result);
  });
}

/*
testCode("console.log('test', 666); alert('Hello from the plugin!');", function(err, res) {
  console.log('=> err:', err); // => [ 'ReferenceError: alert is not defined' ]
  console.log('=> res:', res); // => [ 'test 666' ]
});
*/

function evaluateStudent(task, callback) {
  console.log('\n===\nSTUDENT', task.key, ':', task.code1);
  testCode(task.code1, function(err, res) {
    console.log('=> err:', err);
    console.log('=> res:', res);
    callback();
  });
}

module.exports = evaluateStudent;
