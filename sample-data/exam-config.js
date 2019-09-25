/*
function readfile(filePath) {
  return require('fs').readFileSync(filePath).toString();
}
*/

module.exports = {

  // Front-end config
  title: 'JavaScript Exam',

  // General settings
  PUBLIC_TEST_MODE: true, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: true, // set to false, for real exams

  redirectToHttps: false,

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: true, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
    publishEvalTests: true, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
  },

  // Back-end config
  backend: {
    type: 'auto-eval', // 'realtime-eval', 'auto-eval', 'email-submit' (with EMAIL_SUBMIT_CONFIG) or 'firebase' (with FIREBASE_CONFIG)
    /*
    EMAIL_SUBMIT_CONFIG: {
      mdTemplate: readfile('public/data/submitted.md'),
    },
    */
    /*
    FIREBASE_CONFIG: {
      apiKey: "kjgkerjghkrjghkerjg-kjgeklrjg",
      databaseURL: "https://jsexam-jhgkejr.firebaseio.com",
      messagingSenderId: "847593487934867"
      // => back-office: https://console.firebase.google.com/project/jsexam-jhgkejr/database/data
    },
    */
  },

  teacherEmail: 'teacher.email@domain.com', // required for dashboard auth
  
  // Authentication
  GOOGLE_CLIENT_ID: '7465834756-rkjgelkhjlerkgjlerkgjelrkg.apps.googleusercontent.com', // generated from https://console.developers.google.com/apis/credentials?project=eemi-own-exam&authuser=1
  GOOGLE_CLIENT_DOMAIN: 'domain.com', // to restrict access to users from a certain domain only
  LOGIN_INVITE: 'Connect using your Google for Education account:',
  
  // Evaluation / grading
  quizzGrading: {
    ptsRight: 1,
    ptsWrong: 0, // or -0.5 for example
    ptsNull: 0,
  },
  codeGrading: {
    ptsPerExercise: 1,
  }

};
