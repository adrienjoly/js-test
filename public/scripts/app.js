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

  var PUBLIC_TEST_MODE = false; // TODO: set to false to activate Google Login
  var PAGE_TITLE = 'Javascript Exo';
  var FIREBASE_URL = 'https://js-exo-algo.firebaseio.com';

  var NB_VARIANTS = 3;

  function getExerciseMdFile(variant) {
    return './data/exercice.variant.' + variant + '.json.md';
  }

  /* firebase security rules:
  {
   "rules": {
      ".read": false,
      ".write": false,
      "submissions": {
        ".read": true,
          "$key": {
           ".write": "newData.exists()" // prevents deletion, cf http://stackoverflow.com/questions/29466247/in-firebase-what-security-rules-should-i-write-to-allow-only-push-to-object
          }
        }
      }
    }
  }
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
  app.myCode = ''; // aynchronously bound to app.myAnswers.code1
  app.active = false;
  app.submitText = 'Enregistrer';

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
        //i: 1,
        id: 'code1',
        mdFile: getExerciseMdFile(variant),
      },
    ]);
    if (offline) return;
    var userHash = userData.email.split('@')[0].replace(/[^\w]/g, '_');
    app.backend = new Firebase(FIREBASE_URL + '/submissions/' + userHash);
    app.backend.on('value', function onStoredUserAnswers(snapshot) {
      // called on launch, and right after firebase data updates (even if offline)
      app.myAnswers = snapshot.val() || {}; // make sure that local state = remote state
    });
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

  var toggleLoadingSpinner = (function createToggleFct(){
    var pendingPerId = {};
    return function (id, toggle) {
      var el = document.getElementById(id);
      if (!el) return;
      if (pendingPerId[id]) clearTimeout(pendingPerId[id]);
      if (toggle) {
        el.classList.add('loading');
      } else {
        pendingPerId[id] = setTimeout(function() {
          el.classList.remove('loading');
          delete pendingPerId[id];
        }, 500);
      }
    };
  })();

  function sendAnswersToBackend(upd) {
    if (!app.backend) return console.info('backend is not connected yet => ignoring update');
    if (!upd) return console.warn('not sending a null update to backend');
    // ui feedback: display loading spinner on questions to be sync'ed
    for (var id in upd) {
      toggleLoadingSpinner(id, true);
    }
    // add metadata and send to firebase
    upd._t = Firebase.ServerValue.TIMESTAMP;
    upd._d = Date();
    upd._uid = app.user.id; // will be used to re-generate the variant number during evaluation
    app.backend.update(upd, function(err) {
      if (err) {
        console.error('onChange -> firebase:', err);
        alert('Une erreur est survenue lors de l\'envoi de votre réponse. Prévenez votre enseignant.');
      } else {
        // ui feedback: remove loading spinner on sync'ed questions (even after a temporary disconnection)
        for (var id in upd) {
          toggleLoadingSpinner(id, false);
        }
        app.submitText = 'Enregistré avec succès';
      }
    });
  }

  function toggleSubmitButton (toggle, submitting) {
    var btn = document.querySelector('#btnSubmit');
    if (toggle) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'disabled');  
    }
    app.submitText = submitting ? 'Enregistrement...' : 'Enregistrer';
  }

  (function bindAnswerChangesToBackend(){
    // cf https://www.polymer-project.org/1.0/docs/devguide/properties.html#observing-path-changes
    app.observers = [
      'onAnswersUpdate(myAnswers.*)',
      'onCodeUpdate(myCode)'
      //'onAnswersUpdate(user)'
    ];
    app.onAnswersUpdate = function(update){
      //console.log('onAnswersUpdate', update);
      if ((update.value || {}).code1) app.set('myCode', update.value.code1);
    };
    app.onCodeUpdate = function(update){
      if (app.myAnswers) {
        var changed = app.myAnswers.code1 !== update;
        //console.log('onCodeUpdate changed:', changed, update);
        toggleSubmitButton(changed);
      }
    };
  })();

  app.onSubmit = function(e) {
    var changed = app.myAnswers.code1 !== app.myCode;
    //console.log('onSubmit, code changed:', changed, app.myCode);
    if (changed) {
      toggleSubmitButton(false, true); // prevent user from clicking more than once in a row
      sendAnswersToBackend({ code1: app.myCode });
    }
  };

  // this commented part works only for QCMs:
  /*
  (function bindQcmAnswersToBackend(){
    // used by components to get current answer data
    app.myAnswersItem = function(change, index) {
      console.log('myAnswersItem', change, index)
      return this.get(index, change.base);
    };
    //cf https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding
    
    // when user changes an answer
    app.onChange = function(evt) {
      var qcmComponent = evt.currentTarget;
      var choiceValue = qcmComponent.value; // or this.value
      var choiceId = qcmComponent.getAttribute('data-id');
      var upd = {};
      upd[choiceId] = choiceValue;
      //app.set('myAnswers.' + choiceId, choiceValue);
      sendAnswersToBackend(upd); // should be called by the above line, thru observer
    }
  })();
  */

  // FOR PUBLIC TESTING: fakes Google Login
  if (PUBLIC_TEST_MODE) {
    onLogin({
      id: Math.floor(NB_VARIANTS * Math.random()), // variant is based on user id => randomize it
      name: 'Demo User',
      email: 'demo-user@example.com',
      token: 'XXX'
    }/*, true*/);
    app.loggedIn = true;
    app.active = true;
  }

})(document);
