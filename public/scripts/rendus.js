(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template and give it some initial binding values
  var app = document.querySelector('#app');

  // Scroll page to top (used by routing.html)
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.baseUrl = '/'; // absolute path where index.html can be reached
  app.students = [];

  app.ready = function(){
    console.log('ready');
    app.ready = null; // prevent this function from running twice
    // load backend
    app.async(function(){
      var firebaseDB = firebase.initializeApp(app.config.backend.FIREBASE_CONFIG).database();
      firebaseDB.ref('/submissions').on('value', function onStoredUserAnswers(snapshot) {
        var studentData = snapshot.val();
        console.log('student data', studentData);
        var students = [];
        for (var key in studentData) {
          studentData[key].i = students.length;
          students.push({
            name: key,
            value: studentData[key],
            submitted: studentData[key]._submitted ? '☑' : '☐',
          });
        }
        app.set('students', students);
      });
    });
  }

})(document);
