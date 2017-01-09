(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app._onLogin = function() {
    console.log('_onLogin');
    var userHash = app.user.email.split('@')[0].replace(/[^\w]/g, '_');
    app.myAnswers = Object.assign({
      _uid: app.user.id,
      _uha: userHash,
    }, app.myAnswers);
    app.set('active', true);
  };

  function evaluateAnswer(id, value) {
    app._toggleLoadingSpinner(id, true);
    if (app.myAnswers[id] !== value) {
      app.myAnswers[id] = value;
      app.hashedAnswers = JSON.stringify(app.myAnswers, null, '  ');
      // TODO: store to cookie or local storage
    }
    app._toggleLoadingSpinner(id, false);
  }

  // for quizz questions only
  app.onChange = function(evt) {
    var choiceValue = evt.detail.value; // or this.value
    var choiceId = evt.detail.id;
    evaluateAnswer(choiceId, choiceValue);
  }

  // for code exercises only
  app.onCodeBlur = function(evt) {
    var input = evt.currentTarget;
    var questionId = input.getAttribute('data-id');
    evaluateAnswer(questionId, input.value);
  };

  // when user presses exam submit button
  app.onSubmitExam = function(evt) {
    app._toggleButton(document.getElementById('submitConfirmation'), false);
    app.myAnswers = Object.assign({}, app.myAnswers, { _submitted: true });
    app.mdSubmitted = app.config.backend.EMAIL_SUBMIT_CONFIG.mdTemplate.replace('{{hashedAnswers}}', app.hashedAnswers);
    app._toggleButton(document.getElementById('submitConfirmation'), true);
    app.scrollPageToTop();
  };

})(document);
