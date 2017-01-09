module.exports = {

  // General settings
  PUBLIC_TEST_MODE: false, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: true, // set to false, for real exams

  // Back-end config
  backend: {
    type: 'realtime-eval', // 'realtime-eval', 'auto-eval', or 'firebase' (with FIREBASE_CONFIG)
    /*
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyCBkfcodGHJEJDsnh99KgpP_F3cxU58P9I",
      databaseURL: "https://js-test-2.firebaseio.com",
      messagingSenderId: "730428017661"
      // admin/dashboard: https://console.firebase.google.com/project/js-test-2/database/data
    },
    */
  },

  // Front-end config
  title: 'JavaScript Partiel 1',

  // Ask for submission of answers by email (optionnal)
  emailSubmission: {
    teacherEmail: 'adrien.joly@eemi.com',
    emailSubject: 'JS PARTIEL 1 DATA',
  },
  
  // Authentication
  GOOGLE_CLIENT_ID: '247219641427-ifeq88p7rgor9al5ksduds7ug0ba7djr.apps.googleusercontent.com', // generated from https://console.developers.google.com/apis/credentials?project=eemi-own-exam&authuser=1
  GOOGLE_CLIENT_DOMAIN: 'eemi.com', // to restrict access to users from a certain domain only
  LOGIN_INVITE: 'Se connecter à son compte EEMI:',
  
  // Evaluation / grading
  quizzGrading: {
    ptsRight: 1,
    ptsWrong: 0, // or -0.5 for example
    ptsNull: 0,
  },
  codeGrading: {
    ptsPerExercise: 3, // applies to scores of code exercises
  }

};
