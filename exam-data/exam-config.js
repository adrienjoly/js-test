/*
function readfile(filePath) {
  return require('fs').readFileSync(filePath).toString();
}
*/

module.exports = {

  // Front-end config
  title: 'Partiel Node.js 2A Dev',

  // General settings
  PUBLIC_TEST_MODE: false, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: false, // set to false, for real exams

  redirectToHttps: true,

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: false, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
    publishEvalTests: false, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
  },

  // Back-end config
  backend: {
    type: 'firebase', // 'realtime-eval', 'auto-eval', or 'firebase' (with FIREBASE_CONFIG)
    /*
    EMAIL_SUBMIT_CONFIG: {
      mdTemplate: readfile('public/data/submitted.md'),
    },
    */
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyDkiphR3IUCQ4CcjUgW6-q9ryYc9MxwVs0",
      authDomain: "js-ps2.firebaseapp.com",
      databaseURL: "https://js-ps2.firebaseio.com",
      projectId: "js-ps2",
      messagingSenderId: "18232771090"
      // => back-office: https://console.firebase.google.com/project/js-ps2/database/data
    },
  },

  teacherEmail: 'adrien.joly@eemi.com', // required for dashboard auth
  
  // Authentication
  GOOGLE_CLIENT_ID: '7465834756-rkjgelkhjlerkgjlerkgjelrkg.apps.googleusercontent.com', // generated from https://console.developers.google.com/apis/credentials?project=eemi-own-exam&authuser=1
  GOOGLE_CLIENT_DOMAIN: 'domain.com', // to restrict access to users from a certain domain only
  LOGIN_INVITE: 'Connectez-vous à l\'aide de votre compte Google de l\'EEMI:',
  
  // Evaluation / grading
  quizzGrading: {
    ptsRight: 1,
    ptsWrong: 0, // or -0.5 for example
    ptsNull: 0,
  },
  codeGrading: {
    ptsPerExercise: 5,
  }

};
