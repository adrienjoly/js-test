(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app._onLogin = function() {
    app.set('active', true);
  };

  function evaluateAnswers() {
    console.log(app.myAnswers);
    // TODO
  }

  // for quizz questions only
  (function bindQcmAnswers(){
    // when user changes an answer
    app.onChange = function(evt) {
      var choiceValue = evt.detail.value; // or this.value
      var choiceId = evt.detail.id;
      app.myAnswers[choiceId] = choiceValue;
      evaluateAnswers();
    }
  })();

  // for code exercises only
  (function bindCodeAnswers(){
    function evaluateCodeValue(questionId, inputValue) {
      var changed = app.myAnswers[questionId] !== inputValue;
      if (changed) {
        app.myAnswers[questionId] = inputValue;
        evaluateAnswers();
      }
    }
    app.onCodeBlur = function(evt) {
      var input = evt.currentTarget;
      var questionId = input.getAttribute('data-id');
      evaluateCodeValue(questionId, input.value);
    };
  })();

})(document);
