module.exports = {

  // General settings
  PUBLIC_TEST_MODE: false, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: false, // set to false, for real exams

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: false, // `true` required for realtime-eval/auto-eval back-ends and/or DISPLAY_SOLUTIONS_AFTER_SUBMIT
    publishEvalTests: false, // `true` required for realtime-eval/auto-eval back-ends and/or DISPLAY_SOLUTIONS_AFTER_SUBMIT
  },

  // Back-end config
  backend: {
    type: 'firebase', // 'realtime-eval', 'auto-eval', or 'firebase' (with FIREBASE_CONFIG)
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyCDeq8BT9A5BWk6mfUP4mRabSFxw83ARnE",
      databaseURL: "https://js-partiel.firebaseio.com",
      messagingSenderId: "864469962174"
      // admin/dashboard: https://console.firebase.google.com/project/js-partiel/database/data
    },
  },

  // Front-end config
  title: 'JavaScript Partiel 1',

  // Ask for submission of answers by email (optionnal)
  emailSubmission: {
    teacherEmail: 'adrien.joly@eemi.com',
    emailSubject: 'JS PARTIEL 1 DATA',
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
