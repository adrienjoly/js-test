/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  var PUBLIC_TEST_MODE = true; // TODO: set to false to activate Google Login
  var PAGE_TITLE = 'Javascript Exo';
  var FIREBASE_URL = 'https://js-exo-algo.firebaseio.com';

  var NB_VARIANTS = 3;

  function getExerciseMdFile(variant) {
    return './data/exercice.variant.' + variant + '.json.md';
  }

  /* firebase security rules: {
   "rules": {
      ".read": false,
      ".write": false,
      "submissions": {
        ".read": true,
          "$key": {
           ".write": "newData.exists()" // prevents deletion, cf http://stackoverflow.com/questions/29466247/in-firebase-what-security-rules-should-i-write-to-allow-only-push-to-object
  */


  // fixed version of variant3() => returns 0, 1 or 2, depending on the value of number
  function getVariantByStudentId (id) {
    // modulo that also works for big integers
    var modulo = function(divident, divisor) {
        var partLength = 10;
        while (divident.length > partLength) {
            var part = divident.substring(0, partLength);
            divident = (part % divisor) +  divident.substring(partLength);          
        }
        return divident % divisor;
    };
    return modulo(id, NB_VARIANTS);
  };

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');
  app.baseUrl = '/';

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Scroll page to top (used by routing.html)
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.title = PAGE_TITLE;
  app.questions = [];
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.backend = null; // Firebase instance
  app.myAnswers = {}; // will be populated from firebase after login
  app.active = false;

  // when user entry was succesfully stored to Firebase, hide the loading spinner
  function onStoredUserAnswers(snapshot) {
    //console.log('onStoredUserAnswers:', snapshot.key(), snapshot.val());
    var stored = snapshot.val();
    app.myAnswers = stored;
    setTimeout(function() {
      for (var id in stored) {
        var qcmEl = document.getElementById(id);
        if (qcmEl) qcmEl.classList.remove('loading');
      }
    }, 500);
  }

  // disable/enable user entry based on the `active` value in the Firebase DB
  function onBackEndStatus(snapshot) {
    var active = snapshot.val();
    console.log('onBackEndStatus, active:', active);
    app.set('active', active);
  }

  function onLogin(userData, offline) {
    app.user = userData;
    // generate exercise variant, based on student id
    var variant = getVariantByStudentId(userData.id);
    app.set('questions', [
      {
        i: 1,
        id: 'code1',
        mdFile: getExerciseMdFile(variant),
      },
    ]);
    if (offline) return;
    var userHash = userData.email.split('@')[0].replace(/[^\w]/g, '_');
    app.backend = new Firebase(FIREBASE_URL + '/submissions/' + userHash);
    app.backend.on("value", onStoredUserAnswers);
    (new Firebase(FIREBASE_URL + '/active')).on('value', onBackEndStatus);
  }

  window.addEventListener('google-signin-success', function() {
    var user = gapi.auth2.getAuthInstance().currentUser.get();
    var profile = user.getBasicProfile();
    onLogin({
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      token: user.getAuthResponse().id_token
    });
  });

  // used by components to get current answer data
  app.myAnswersItem = function(change, index) {
    return this.get(index, change.base);
  };
  //cf https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding
  
  // when user changes an answer
  app.onChange = function(evt) {
    var qcmComponent = evt.currentTarget;
    var choiceValue = qcmComponent.value; // or this.value
    var choiceId = qcmComponent.getAttribute('data-id');
    var upd = {
      _t: Firebase.ServerValue.TIMESTAMP,
      _d: Date()
    };
    upd[choiceId] = choiceValue;
    this.backend.update(upd, function(err, res) {
      if (err) console.error('onChange -> firebase:', err || res);
    });
    document.getElementById(choiceId).classList.add('loading');
  }

  // FOR PUBLIC TESTING: fakes Google Login
  if (PUBLIC_TEST_MODE) {
    onLogin({
      id: Math.floor(NB_VARIANTS * Math.random()), // variant is based on user id => randomize it
      name: 'Demo User',
      email: 'demo-user@example.com',
      token: 'XXX'
    }, true);
    app.loggedIn = true;
    app.active = true;
  }

})(document);
