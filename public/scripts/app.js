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

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  app.baseUrl = '/';

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.title = 'Javascript Exo';
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.myAnswers = {}; // will be populated from firebase after login
  app.backend = null;
  app.active = false;

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

  function onBackEndStatus(snapshot) {
    var active = snapshot.val();
    console.log('onBackEndStatus, active:', active);
    app.set('active', active);
  }

  function onLogin(userData) {
    app.user = userData;
    var userHash = userData.email.split('@')[0].replace(/[^\w]/g, '_');
    app.backend = new Firebase('https://js-quizz.firebaseio.com/submissions/' + userHash);
    app.backend.on("value", onStoredUserAnswers);
    (new Firebase('https://js-quizz.firebaseio.com/active')).on('value', onBackEndStatus);
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

  app.myAnswersItem = function(change, index) {
    return this.get(index, change.base);
  };
  //cf https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding
  
  app.onTap = function(evt) {
    var qcmComponent = evt.currentTarget;
    var choiceValue = qcmComponent.value; // or this.value
    var choiceId = qcmComponent.getAttribute('data-id');
    var upd = {
      _t: Firebase.ServerValue.TIMESTAMP,
      _d: Date()
    };
    upd[choiceId] = choiceValue;
    this.backend.update(upd, function(err, res) {
      if (err) console.error('onTap -> firebase:', err || res);
    });
    /* firebase security rules: {
     "rules": {
        ".read": false,
        ".write": false,
        "submissions": {
          ".read": true,
            "$key": {
             ".write": "newData.exists()" // prevents deletion, cf http://stackoverflow.com/questions/29466247/in-firebase-what-security-rules-should-i-write-to-allow-only-push-to-object
    */
    document.getElementById(choiceId).classList.add('loading');
  }

  // TODO: FOR PUBLIC TESTING => disable the following lines to activate Google Login
  
  onLogin({
    id: 1,
    name: 'Demo User',
    email: 'demo-user@example.com',
    token: 'XXX'
  });
  app.loggedIn = true;
  app.active = true;

})(document);
