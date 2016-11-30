// This script loads and evaluates answers submitted by students from Firebase.

var async = require('async');
var firebase = require('firebase');
var evaluateStudent = require('./StudentEvaluator');

// inputs

var FIREBASE_URL = process.argv[2] || 'https://js-test-2.firebaseio.com';

// helpers

function forEachSubmission(endpointUrl, handler, callback) {
  var q = async.queue(handler, 1); // handler(task, callnext) will be called for each child
  //q.push({name: 'foo', code1: 'console.log("test", 666);'}); // for testing

  // TODO: read this info from a config file that will also be compiled for app.js
  var config = {
    apiKey: "AIzaSyCBkfcodGHJEJDsnh99KgpP_F3cxU58P9I",
    databaseURL: endpointUrl,
    messagingSenderId: "730428017661"
  };
  firebase.initializeApp(config);

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
