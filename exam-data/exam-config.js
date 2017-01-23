/*
function readfile(filePath) {
  return require('fs').readFileSync(filePath).toString();
}
*/

module.exports = {

  // Front-end config
  title: 'JavaScript QCM',

  // General settings
  PUBLIC_TEST_MODE: true, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: true, // set to false, for real exams

  redirectToHttps: true,

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: true, // `true` required for realtime-eval/auto-eval back-ends and/or DISPLAY_SOLUTIONS_AFTER_SUBMIT
    publishEvalTests: true, // `true` required for realtime-eval/auto-eval back-ends and/or DISPLAY_SOLUTIONS_AFTER_SUBMIT
  },

  // Back-end config
  backend: {
    type: 'auto-eval', // 'email-submit', 'realtime-eval', 'auto-eval', or 'firebase' (with FIREBASE_CONFIG)
    /*
    EMAIL_SUBMIT_CONFIG: {
      mdTemplate: readfile('public/data/submitted.md'),
    },
    FIREBASE_CONFIG: {
      databaseURL: "https://js-partiel-__INSTANCE__NUMBER__.firebaseio.com",
      apiKey: [
        "", // no instance at index 0
        "AIzaSyCnQ929mAaejgnncBTddNrcExMMlaxCLww",
        "AIzaSyDCqocdoU81PhB9m2zZhYg_DpiTzEcqEfY",
        "AIzaSyAhpXX_dZGkFLmTMFZUbKlUSTZdAIwH2hY",
      ][__INSTANCE__NUMBER__],
      messagingSenderId: [
        "", // no instance at index 0
        "896858434570",
        "425303280065",
        "935470302144",
      ][__INSTANCE__NUMBER__]
      // admin/dashboard: https://console.firebase.google.com/project/js-partiel-__INSTANCE__NUMBER__/database/data
    },
    */
  },

  // Authentication
  GOOGLE_CLIENT_ID: '247219641427-pq1bbfkkpqvvsgps5t1fh1sjivb61dt4.apps.googleusercontent.com', // generated from https://console.developers.google.com/apis/credentials?project=eemi-own-exam&authuser=1
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
