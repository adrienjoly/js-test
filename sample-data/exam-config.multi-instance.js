// Example of multi-instance configuration
// In order to use this config file, rename it to exam-config.js

const INSTANCE = process.env.JS_TEST_INSTANCE;
const LOCAL_TEST_MODE = typeof INSTANCE === 'undefined';

module.exports = {

  // Instance names (i.e. one per Firebase project, with separate hosting and database)
  instances: [ 'instance1', 'instance2', 'instance3' ], // => npm run deploy-firebase-instances

  // Front-end config
  title: 'JavaScript Exam (' + (LOCAL_TEST_MODE ? 'DEFAULT' : INSTANCE) + ')',

  // General settings
  PUBLIC_TEST_MODE: true, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: true, // set to false, for real exams

  redirectToHttps: false,

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: true, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
    publishEvalTests: LOCAL_TEST_MODE, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
  },

  // Back-end config
  backend: {
    type: LOCAL_TEST_MODE ? 'auto-eval' : 'firebase',
    /*
    EMAIL_SUBMIT_CONFIG: {
      mdTemplate: readfile('public/data/submitted.md'),
    },
    */
    FIREBASE_CONFIG: {
      'instance1': {
        apiKey: "kjgkerjghkrjghkerjg-kjgeklrja",
        databaseURL: "https://jsexam-1.firebaseio.com",
        messagingSenderId: "847593487934867"
      },
      'instance2': {
        apiKey: "kjgkerjghkrjghkerjg-kjgeklrjb",
        databaseURL: "https://jsexam-2.firebaseio.com",
        messagingSenderId: "847593487934868"
      },
      'instance3': {
        apiKey: "kjgkerjghkrjghkerjg-kjgeklrjc",
        databaseURL: "https://jsexam-3.firebaseio.com",
        messagingSenderId: "847593487934869"
      },
    }[ LOCAL_TEST_MODE ? 'instance1' : INSTANCE ],
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
