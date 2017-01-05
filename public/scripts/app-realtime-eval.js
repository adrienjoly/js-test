(function(document) {
  'use strict';

  function sum(a, b) {
    return a + b;
  }

  function pickProp(name) {
    return function(res) {
      return res[name];
    }
  }

  function renameProp(old, name) {
    return function(res) {
      var obj = {};
      obj[name] = res[old];
      return obj;
    }
  }

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app._score = null;

  app._onLogin = function() {
    console.log('_onLogin');
    app.set('active', true);
    app.myAnswers = Object.assign({ _uid: app.user.id }, app.myAnswers);
  };

  app.myPoints = function(myAnswers, questionId) {
    var points = myAnswers[questionId + '_points'];
    return points !== undefined && (points + ' points');
  };

  // code evaluation

  function computeQuizzScore(studentAnswers, exercise, callback) {
    var log = [];
    var score = 0;
    var maxScore = 0;
    for (var qId in exercise.solutions) {
      var points;
      maxScore += app.config.quizzGrading.ptsRight;
      if (studentAnswers[qId] === undefined) {
        points = app.config.quizzGrading.ptsNull;
      } else if (studentAnswers[qId] == exercise.solutions[qId]) {
        points = app.config.quizzGrading.ptsRight
      } else {
        points = app.config.quizzGrading.ptsWrong;
      }
      score += points;
      log.push({
        points: points
      });
    }
    callback(null, {
      log: log,
      length: maxScore,
      score: score
    });
  }

  function computeCodeScore(studentAnswers, exercise, callback) {
    var CodeEvaluator = makeCodeEvaluator(jailed, async, app.config.codeGrading);
    async.mapSeries(exercise.questions, function(codeExercise, callback) {
      var codeEvaluator = new CodeEvaluator([ codeExercise ]);
      codeEvaluator.evaluateAnswers(studentAnswers, callback);
    }, function(err, results) {
      callback(err, {
        log: results.map(renameProp('score', 'points')),
        length: results.map(pickProp('length')).reduce(sum),
        score: results.map(pickProp('score')).reduce(sum),
      });
    });
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
    var answers = app.myAnswers; // TODO: only evaluated modified answers
    computeStudentScores(answers, function(err, res){
      console.log('computeStudentScores =>', err || res);
      var upd = {
        _maxScore: res.map(pickProp('length')).reduce(sum),
        _score: res.map(pickProp('score')).reduce(sum), // sum of quizz and code scores
      };
      // compute each exercise points, for display
      res.forEach(function(exResult, i) {
        var points = exResult.log.map(pickProp('points'));
        app.exercises[i].questions.forEach(function(q, i) {
          upd[q.id + '_points'] = points.shift();
        });
      });
      // update display
      app.myAnswers = Object.assign({}, app.myAnswers, upd);
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
    // display solutions, total score, and hide submit button
    app.myAnswers = Object.assign({ _submitted: true }, app.myAnswers);
    app.scrollPageToTop();
  };

  // load dependencies for code evaluation
  app.async(function(){
    function require(src) {
      var el = document.createElement('script');
      el.setAttribute('src', src);
      document.body.appendChild(el);
    }
    require('scripts/CodeEvaluatorGeneric.js?_t=' + new Date().getTime()); // load latest version despite cache
    require('bower_components/async/lib/async.js');
    //require('bower_components/jailed/lib/jailed.js'); // TODO: load from here instead of index.html, when jailed will be able to initialize after window.onload
  });

})(document);
