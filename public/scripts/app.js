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

  app.baseUrl = '/'; // absolute path where index.html can be reached
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.myAnswers = {}; // will be populated from firebase after login
  app.hashedAnswers = '';
  app.active = false;

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

  app.showQuestions = function(myAnswers) {
    return app.config.DISPLAY_SOLUTIONS_AFTER_SUBMIT || !myAnswers._submitted;
  };

  app.showSolutions = function(myAnswers) {
    return app.config.DISPLAY_SOLUTIONS_AFTER_SUBMIT && myAnswers._submitted;
  };

  // Auth helpers

  function onLogin(userData, offline) {
    app.user = userData;
    // switch exercise variant based on student id
    app.set('exercises', app.exercises.map(function applyVariants(ex) {
      return Polymer.Base.extend(ex, {
        questions: ex.questions.map(function applyVariant(question) {
          return Polymer.Base.extend(question, {
            md: question.md || pickVariant(question.mdVariants, app.user.id)
          });
        })
      });
    }));
    if (offline) return;
    try {
      app._onLogin();
    } catch(e) {}
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

  // UI helpers

  app._toggleLoadingSpinner = (function createToggleFct(){
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

  app._toggleButton = function (btn, toggle) {
    if (!btn) return;
    if (toggle) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'disabled');  
    }
  };

  // when user presses exam submit button => ask confirmation then upload all answers and de-activate form
  app.onSubmitExam = function(evt) {
    app._toggleButton(document.getElementById('submitConfirmation'), false);
    document.getElementById('submitConfirmation').open();
  };

  // FOR PUBLIC TESTING: fakes Google Login
  if (app.config.PUBLIC_TEST_MODE) {
    var id = Math.floor(999 * Math.random()); // variant is based on user id => randomize it
    onLogin({
      id: id,
      name: 'Demo User #' + id,
      email: 'demo-user-' + id + '@example.com',
      token: 'XXX'
    }/*, true*/);
    app.loggedIn = true;
    app.active = true;
  }

  // load backend
  app.async(function(){
    console.log('init backend:', (app.config.backend || {}).type || 'none');
    if (app.config.backend && app.config.backend.type && app.config.backend.type !== 'none') {
      var el = document.createElement('script');
      el.setAttribute('src', 'scripts/app-' + app.config.backend.type + '.js');
      this.appendChild(el);
    } else {
      app.active = true;
    }
  });

})(document);
