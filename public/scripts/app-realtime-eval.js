(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app._onLogin = function() {
    app.set('active', true);
  };

  function evaluateAnswer(id, value) {
    if (app.myAnswers[id] === value) {
      return; // value has not changed => ignore
    }
    app.myAnswers[id] = value;
    console.log(app.myAnswers);
    app._toggleLoadingSpinner(id, true);
    // TODO: evaluate
    setTimeout(function(){
      app._toggleLoadingSpinner(id, false);
    }, 200);
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

})(document);
