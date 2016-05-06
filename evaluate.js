// this script loads and evaluates answers submitted by students from Firebase

var async = require('async');
var Firebase = require('firebase');
var jailed = require('jailed-node');

var FIREBASE_URL = 'https://js-exo-algo.firebaseio.com';

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

function forEachChild(endpointUrl, handler, callback) {
  var q = async.queue(handler, 1); // handler(task, callnext) will be called for each child
  //q.push({name: 'foo', code1: 'console.log("test", 666);'}); // for testing
  var backend = new Firebase(endpointUrl);
  backend.on('value', function (snapshot) {
    var remaining = snapshot.numChildren();
    q.drain = function() {
      if (!remaining) callback();
    };
    snapshot.forEach(function(child) {
      var obj = child.val();
      obj.key = child.key();
      q.push(obj);
      --remaining;
    });
  });
}

function evaluateStudent(task, callback) {
  console.log('\n===\nSTUDENT', task.key, ':', task.code1);
  testCode(task.code1, function(err, res) {
    console.log('=> err:', err);
    console.log('=> res:', res);
    callback();
  });
}

forEachChild(FIREBASE_URL + '/submissions', evaluateStudent, function done() {
  process.exit();
});
