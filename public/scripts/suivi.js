(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app.baseUrl = '/'; // absolute path where index.html can be reached
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.submissions = null;
  app.students = [];
  app.firebaseDB = firebase.initializeApp(app.config.backend.FIREBASE_CONFIG).database();

  // Scroll page to top (used by routing.html)
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  if (!app.config.teacherEmail) {
    throw new Error('config.teacherEmail is required but not set');
  }

  app.isAdmin = function(user) {
    return app.config && user && user.email === app.config.teacherEmail;
  };

  function computeQuizzScore(studentAnswers, exercise, callback) {
    var score = 0;
    if (!exercise.solutions) {
      throw new Error('missing solutions for quizz exercises => enable `examPack.publishEvalTests` in exam-config, re-build, and retry');
    }
    for (var qId in exercise.solutions) {
      if (studentAnswers[qId] === undefined) {
        score += app.config.quizzGrading.ptsNull;
      } else if (studentAnswers[qId] == exercise.solutions[qId]) {
        score += app.config.quizzGrading.ptsRight
      } else {
        score += app.config.quizzGrading.ptsWrong;
      }
    }
    callback(null, score);
  }

  function computeCodeScore(studentAnswers, exercise, callback) {
    var CodeEvaluator = makeCodeEvaluator(jailed, async, app.config.codeGrading);
    console.log('building code evaluator with', exercise.questions);
    for (var i in exercise.questions) {
      if (!exercise.questions[i].testVariants) throw new Error('missing tests for code exercise ' + i + ' => enable `examPack.publishEvalTests` in exam-config, re-build, and retry');
    }
    var codeEvaluator = new CodeEvaluator(exercise.questions);
    codeEvaluator.evaluateAnswers(studentAnswers, function(err, res){
      callback(null, res.score);
    });
  }

  function computeStudentScores(studentAnswers, callback) {
    var studentIndex = studentAnswers.i;
    console.log('computeStudentScores', studentIndex, studentAnswers);
    async.mapSeries(app.exercises, function(ex, callback){
      var computeExerciseScore = ex.isQuizz ? computeQuizzScore : computeCodeScore;
      computeExerciseScore(studentAnswers, ex, callback);
    }, function onDone(err, scores) {
      console.log('=> student', studentIndex, 'scores:', err || scores, app.students[studentIndex].name);
      app.set('students.' + studentIndex + '.scores', scores);
      callback();
    });
  }

  function onLogin(userData) {
    app.user = userData;
    if (!userData) return;
    app.submissions = app.firebaseDB.ref('/submissions');
    // get data on login, and every time firebase data is updated (even if offline)
    app.submissions.on('value', function onStoredUserAnswers(snapshot) {
      var studentData = snapshot.val();
      var students = [];
      for (var key in studentData) {
        studentData[key].i = students.length;
        students.push({
          name: key,
          value: studentData[key],
          submitted: studentData[key]._submitted ? '☑' : '☐',
          scores: [NaN, NaN],
        });
      }
      app.set('students', students);
      async.mapSeries(studentData, computeStudentScores);
      // TODO: prevent refreshing all student score on every db update
      // TODO: prevent concurrent execution of evaluation code
    });
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

  window.addEventListener('google-signed-out', function() {
    onLogin();
  });

  // FOR PUBLIC TESTING: fakes Google Login
  if (app.config.PUBLIC_TEST_MODE) {
    onLogin({
      id: -1,
      name: 'PUBLIC_TEST_MODE',
      email: '_public@testmode.com',
      token: 'XXX'
    }/*, true*/);
    app.loggedIn = true;
  }

})(document);
