(function(document) {
  'use strict';

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

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app.backend = null; // Firebase instance
  app.firebaseDB = firebase.initializeApp(app.config.FIREBASE_CONFIG).database();

  // disable/enable user entry based on the `active` value in the Firebase DB
  function onBackEndStatus(snapshot) {
    var active = snapshot.val();
    console.log('onBackEndStatus, active:', active);
    if (!app.config.PUBLIC_TEST_MODE) {
      app.set('active', active);
    }
  }

  app._onLogin = function() {
    var userHash = app.user.email.split('@')[0].replace(/[^\w]/g, '_');
    app.backend = app.firebaseDB.ref('/submissions/' + userHash);
    // send a first update with timestamp on login    
    var upd = {
      _uid: app.user.id,
      _t: firebase.database.ServerValue.TIMESTAMP,
      _d: Date()
    };
    app.backend.update(upd, function(err) {
      if (err) {
        console.error('connection -> firebase:', err);
      } else {
        console.log('connection -> OK');
      }
    });
    // get data on login, and every time firebase data is updated (even if offline)
    app.backend.on('value', function onStoredUserAnswers(snapshot) {
      var value = snapshot.val();
      app.myAnswers = value || {}; // make sure that local state = remote state
      app.hashedAnswers = JSON.stringify(app.myAnswers, null, '  ');
      // if first connection of this user, store first timestamps
      if (value && !value._f) {
        app.backend.update({ _f: value._d, _ft: value._t }, function(err) {
          if (err) {
            console.error('firstconnectionupdate -> firebase:', err);
          } else {
            console.log('firstconnectionupdate -> OK');
          }
        });
      }
      // TODO: compute and display student score
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
    (app.firebaseDB.ref('/active')).on('value', onBackEndStatus);
  }

  function sendAnswersToBackend(upd, callback) {
    if (!app.backend) return console.info('backend is not connected yet => ignoring update');
    if (!upd) return console.warn('not sending a null update to backend');
    if (app.myAnswers._submitted) {
      return alert('Vous ne pouvez plus changer vos réponses, après avoir rendu.');
    }
    // ui feedback: display loading spinner on questions to be sync'ed
    for (var id in upd) {
      app._toggleLoadingSpinner(id, true);
    }
    // add metadata and send to firebase
    upd._t = firebase.database.ServerValue.TIMESTAMP;
    upd._d = Date();
    upd._uid = app.user.id; // will be used to re-generate the variant number during evaluation
    app.backend.update(upd, callback || function(err) {
      if (err) {
        console.error('onChange -> firebase:', err);
        alert('Une erreur est survenue lors de l\'envoi de votre réponse. Prévenez votre enseignant.');
      } else {
        // ui feedback: remove loading spinner on sync'ed questions (even after a temporary disconnection)
        for (var id in upd) {
          app._toggleLoadingSpinner(id, false);
          var btn = document.querySelectorAll('#btnSubmit_' + id + ' span')[0];
          if (btn) btn.innerHTML = 'Enregistré avec succès';
        }
      }
    });
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
      app._toggleButton(btn, toggle);
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
      var choiceValue = evt.detail.value; // or this.value
      var choiceId = evt.detail.id;
      var upd = {};
      upd[choiceId] = choiceValue;
      //app.set('myAnswers.' + choiceId, choiceValue);
      sendAnswersToBackend(upd); // should be called by the above line, thru observer
    }
  })();

  // when user confirms submission of all exam answers
  app.onSubmitConfirm = function(evt, res){
    app._toggleButton(document.getElementById('submitConfirmation'), true);
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

})(document);