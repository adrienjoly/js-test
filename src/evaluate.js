// this script loads and evaluates answers submitted by students from Firebase

var async = require('async');
var Firebase = require('firebase');
var evaluateStudent = require('./exercice.evaluator.js');

var FIREBASE_URL = 'https://js-exam.firebaseio.com';

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

forEachChild(FIREBASE_URL + '/submissions', evaluateStudent, function done() {
  process.exit();
});
