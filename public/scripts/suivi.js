(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  app.baseUrl = '/'; // absolute path where index.html can be reached
  app.loggedIn = false; // init default value, to be set by google-signin
  app.user = null;
  app.submissions = null;
  app.students = [];
  app.firebaseDB = firebase.initializeApp(app.config.FIREBASE_CONFIG).database();

  // Scroll page to top (used by routing.html)
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.isAdmin = function(user) {
    return user && user.email === app.config.teacherEmail;
  };

  function onLogin(userData) {
    app.user = userData;
    /*
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
    */
    app.submissions = app.firebaseDB.ref('/submissions');
    // get data on login, and every time firebase data is updated (even if offline)
    app.submissions.on('value', function onStoredUserAnswers(snapshot) {
      var value = snapshot.val();
      var students = [];
      for (var key in value) {
        students.push(key);
      }
      app.set('students', students);
      // TODO: compute and display student score
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

  // FOR PUBLIC TESTING: fakes Google Login
  if (app.config.PUBLIC_TEST_MODE) {
    onLogin({
      id: -1,
      name: 'PUBLIC_TEST_MODE',
      email: app.config.teacherEmail,
      token: 'XXX'
    }/*, true*/);
    app.loggedIn = true;
  }

})(document);
