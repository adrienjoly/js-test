// This script loads and evaluates answers submitted by students from Firebase.

var async = require('async');
var firebase = require('firebase');
var evaluateStudent = require('./StudentEvaluator');

// inputs

var config = require('../exam-data/exam-config.js');

var FIREBASE_URL = process.argv[2] || config.FIREBASE_CONFIG.databaseURL;

// helpers

function forEachSubmission(endpointUrl, handler, callback) {
  var q = async.queue(handler, 1); // handler(task, callnext) will be called for each child
  //q.push({name: 'foo', code1: 'console.log("test", 666);'}); // for testing

  if (endpointUrl) {
    config.FIREBASE_CONFIG.databaseURL = endpointUrl; 
  }
  firebase.initializeApp(config.FIREBASE_CONFIG);

  var backend = firebase.database().ref('/submissions');
  backend.on('value', function (snapshot) {
    var remaining = snapshot.numChildren();
    q.drain = function() {
      if (!remaining) callback();
    };
    snapshot.forEach(function(child) {
      var obj = child.val();
      obj.key = child.key;
      q.push(obj);
      --remaining;
    });
  });
}

// actual script

console.log('Reading and evaluating answers from:', FIREBASE_URL, '...');
forEachSubmission(FIREBASE_URL, evaluateStudent, function done() {
  console.log();
  process.exit();
});
