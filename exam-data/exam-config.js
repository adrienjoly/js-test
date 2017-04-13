/*
function readfile(filePath) {
  return require('fs').readFileSync(filePath).toString();
}
*/

module.exports = {

  // Front-end config
  title: 'JavaScript - Contrôle individuel 2',

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
      apiKey: "AIzaSyAO3h2quk1PBdbLjnSIhhix7LUsHoKkNbE",
      databaseURL: "https://js-controle-2.firebaseio.com",
      messagingSenderId: "835236294998"
      // admin/dashboard: https://console.firebase.google.com/project/js-controle-2/database/data
    },
  },

  teacherEmail: 'adrien.joly@eemi.com', // required for dashboard auth
  
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
    ptsPerExercise: 3,
  }

};
