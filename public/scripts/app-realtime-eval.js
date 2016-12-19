(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app._score = null;

  app._onLogin = function() {
    app.set('active', true);
    app.myAnswers._uid = app.user.id;
  };

  // code evaluation

  function computeQuizzScore(studentAnswers, exercise, callback) {
    var score = 0;
    var maxScore = 0;
    for (var qId in exercise.solutions) {
      maxScore += app.config.quizzGrading.ptsRight;
      if (studentAnswers[qId] === undefined) {
        score += app.config.quizzGrading.ptsNull;
      } else if (studentAnswers[qId] == exercise.solutions[qId]) {
        score += app.config.quizzGrading.ptsRight
      } else {
        score += app.config.quizzGrading.ptsWrong;
      }
    }
    callback(null, {
      length: maxScore,
      score: score
    });
  }

  function computeCodeScore(studentAnswers, exercise, callback) {
    var CodeEvaluator = makeCodeEvaluator(jailed, async, app.config.codeGrading);
    var codeEvaluator = new CodeEvaluator(exercise.questions);
    codeEvaluator.evaluateAnswers(studentAnswers, callback);
  }

  function computeStudentScores(studentAnswers, callback) {
    async.mapSeries(app.exercises, function(ex, callback){
      var computeExerciseScore = ex.isQuizz ? computeQuizzScore : computeCodeScore;
      computeExerciseScore(studentAnswers, ex, callback);
    }, callback);
  }

  function evaluateAnswer(id, value) {
    if (app.myAnswers[id] === value) {
      return; // value has not changed => ignore
    }
    app.myAnswers[id] = value;
    console.log(app.myAnswers);
    app._toggleLoadingSpinner(id, true);
    computeStudentScores(app.myAnswers, function(err, res){
      console.log('=>', err || res);
      app._toggleLoadingSpinner(id, false);
    });
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
    computeStudentScores(app.myAnswers, function(err, res){
      console.log('computeStudentScores =>', err || res);
      // display expected solutions
      app.myAnswers = Object.assign({}, app.myAnswers, {
        _submitted: true,
        _maxScore: res[0].length + res[1].length,
        _score: res[0].score + res[1].score, // sum of quizz and code scores
      });
      app._toggleButton(document.getElementById('submitConfirmation'), true);
      app.scrollPageToTop();
    });
  };

  // load dependencies for code evaluation
  app.async(function(){
    function require(src) {
      var el = document.createElement('script');
      el.setAttribute('src', src);
      document.body.appendChild(el);
    }
    require('/scripts/CodeEvaluatorGeneric.js')
    require('/bower_components/async/lib/async.js');
    require('/bower_components/jailed/lib/jailed.js');
  });

})(document);
