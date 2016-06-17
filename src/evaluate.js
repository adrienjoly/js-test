// This script loads and evaluates answers submitted by students from Firebase.

var async = require('async');
var Firebase = require('firebase');
var evaluateStudent = require('./StudentEvaluator');

// inputs

var FIREBASE_URL = process.argv[2] || 'https://js-exam.firebaseio.com';

// helpers

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

// actual script

console.log('Reading and evaluating answers from:', FIREBASE_URL, '...');
forEachChild(FIREBASE_URL + '/submissions', evaluateStudent, function done() {
  console.log();
  process.exit();
});
