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
  var PAGE_TITLE = 'Javascript Exam';
  var FIREBASE_URL = 'https://js-exam.firebaseio.com';
  var GOOGLE_CLIENT_ID = '247219641427-vs70sb2354ug6kafth4sm8mf8en4g1sb.apps.googleusercontent.com'; // generated from https://console.developers.google.com/apis/credentials?project=eemi-own-exam&authuser=1
  var GOOGLE_CLIENT_DOMAIN = 'eemi.com'; // to restrict access to users from a certain domain only
  var LOGIN_INVITE = 'Veuillez vous connecter à votre compte EEMI en utilisant le bouton ci-dessous svp:';

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

  function pickVariant (variants, id) {
    // modulo that also works for big integers
    var modulo = function(divident, divisor) {
        var partLength = 10;
        while (divident.length > partLength) {
            var part = divident.substring(0, partLength);
            divident = (part % divisor) +  divident.substring(partLength);          
        }
        return divident % divisor;
    };
    return variants[modulo(id, variants.length)];
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
  app.teacherEmail = "adrien.joly@eemi.com";
  app.emailSubject = "PARTIEL2";
  app.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
  app.GOOGLE_CLIENT_DOMAIN = GOOGLE_CLIENT_DOMAIN;
  app.LOGIN_INVITE = LOGIN_INVITE;
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.backend = null; // Firebase instance
  app.myAnswers = {}; // will be populated from firebase after login
  app.hashedAnswers = '';
  app.active = false;

  // disable/enable user entry based on the `active` value in the Firebase DB
  function onBackEndStatus(snapshot) {
    var active = snapshot.val();
    console.log('onBackEndStatus, active:', active);
    if (!PUBLIC_TEST_MODE) {
      app.set('active', active);
    }
  }

  function onLogin(userData, offline) {
    app.user = userData;
    // switch exercise variant based on student id
    app.set('exercises', app.exercises.map(function applyVariants(ex) {
      return Polymer.Base.extend(ex, {
        questions: ex.questions.map(function applyVariant(question) {
          return Polymer.Base.extend(question, {
            md: question.md || pickVariant(question.mdVariants, userData.id)
          });
        })
      });
    }));
    if (offline) return;
    var userHash = userData.email.split('@')[0].replace(/[^\w]/g, '_');
    app.backend = new Firebase(FIREBASE_URL + '/submissions/' + userHash);
    app.backend.on('value', function onStoredUserAnswers(snapshot) {
      // called on launch, and right after firebase data updates (even if offline)
      app.myAnswers = snapshot.val() || {}; // make sure that local state = remote state
      app.hashedAnswers = JSON.stringify(app.myAnswers, null, '  ');
    });
    /*
    function onStoredAnswers(snapshot) {
      console.log('onStoredAnswers', snapshot.key(), snapshot.val());
      // called on launch, and right after firebase data updates (even if offline)
      app.set('myAnswers.' + snapshot.key(), snapshot.val());
      app.hashedAnswers = JSON.stringify(app.myAnswers, null, '  ');
    }
    app.backend.on('child_added', onStoredAnswers);
    app.backend.on('child_changed', onStoredAnswers); // only fired when online
    */
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

  function sendAnswersToBackend(upd, callback) {
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
    app.backend.update(upd, callback || function(err) {
      if (err) {
        console.error('onChange -> firebase:', err);
        alert('Une erreur est survenue lors de l\'envoi de votre réponse. Prévenez votre enseignant.');
      } else {
        // ui feedback: remove loading spinner on sync'ed questions (even after a temporary disconnection)
        for (var id in upd) {
          toggleLoadingSpinner(id, false);
          var btn = document.querySelectorAll('#btnSubmit_' + id + ' span')[0];
          if (btn) btn.innerHTML = 'Enregistré avec succès';
        }
      }
    });
  }

  function toggleButton(btn, toggle) {
    if (!btn) return;
    if (toggle) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'disabled');  
    }
  }

  // for code exercises only
  (function bindCodeAnswersToBackend(){
    /*
    // cf https://www.polymer-project.org/1.0/docs/devguide/properties.html#observing-path-changes
    app.observers = [
      'onAnswersUpdate(myAnswers.*)',
      //'onAnswersUpdate(user)'
    ];
    app.onAnswersUpdate = function(update){
      console.log('onAnswersUpdate', update);
    };
    */
    /*
    function toggleSubmitButton (questionId, toggle, submitting) {
      var btn = document.querySelector('#btnSubmit_' + questionId);
      if (!btn) return;
      toggleButton(btn, toggle);
      btn.querySelectorAll('span')[0].innerHTML = submitting ? 'Enregistrement...' : 'Enregistrer';
    }
    // when user changes an answer => update associated submit button
    app.onCodeChange = function(evt) {
      var input = evt.currentTarget;
      var questionId = input.getAttribute('data-id');
      if (app.myAnswers) {
        var changed = app.myAnswers[questionId] !== input.value;
        //console.log('onCodeChange changed:', changed);
        toggleSubmitButton(questionId, changed);
      }
    }
    */
    // upload code answer
    function uploadCodeValue(questionId, inputValue) {
      var changed = app.myAnswers[questionId] !== inputValue;
      if (changed) {
        //toggleSubmitButton(questionId, false, true); // prevent user from clicking more than once in a row
        var upd = {};
        upd[questionId] = inputValue;
        sendAnswersToBackend(upd);
      }
    }
    /*
    app.onSubmit = function(evt) {
      var button = evt.currentTarget;
      var questionId = button.getAttribute('data-id');
      var input = document.querySelector('my-code[data-id="' + questionId + '"]');
      uploadCodeValue(questionId, input.value);
    };
    */
    app.onCodeBlur = function(evt) {
      var input = evt.currentTarget;
      var questionId = input.getAttribute('data-id');
      uploadCodeValue(questionId, input.value);
    };
  })();

  // for quizz questions only
  (function bindQcmAnswersToBackend(){
    // used by components to get current answer data
    app.myAnswersItem = function(change, index) {
      //console.log('myAnswersItem', change, index)
      return this.get(index, change.base);
      //cf https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding    
    };
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

  // when user confirms submission of all exam answers
  app.onSubmitConfirm = function(evt, res){
    toggleButton(document.getElementById('submitConfirmation'), true);
    if (res.confirmed) {
      var upd = { _submitted: true };
      /*
      // store all answers
      var codes = document.getElementsByTagName('my-code'); // TODO use this.shadowRoot.querySelectorAll('my-code') intead ?
      for (var i=0; i<codes.length; ++i) {
        upd[codes[i].getAttribute('data-id')] = codes[i].value;
      }
      */
      sendAnswersToBackend(upd, function(err) {
        if (err) {
          console.error('onSubmitExam -> firebase:', err);
          alert('Une erreur est survenue lors du rendu de votre copie. Prévenez votre enseignant.');
        } else {
          app.scrollPageToTop();
        }
        // => the page will de-activate after onStoredUserAnswers() is called by Firebase
      });
    }
  };

  // when user presses exam submit button => ask confirmation then upload all answers and de-activate form
  app.onSubmitExam = function(evt) {
    toggleButton(document.getElementById('submitConfirmation'), false);
    document.getElementById('submitConfirmation').open();
  };

  // FOR PUBLIC TESTING: fakes Google Login
  if (PUBLIC_TEST_MODE) {
    onLogin({
      id: Math.floor(999 * Math.random()), // variant is based on user id => randomize it
      name: 'Demo User',
      email: 'demo-user@example.com',
      token: 'XXX'
    }/*, true*/);
    app.loggedIn = true;
    app.active = true;
  }

})(document);
