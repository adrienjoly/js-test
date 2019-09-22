function readfile(filePath) {
  return require('fs').readFileSync(filePath).toString();
}

module.exports = {

  // Front-end config
  title: 'Node.js - Évaluation Jour 1',

  // General settings
  PUBLIC_TEST_MODE: true, // set to false to restrict acccess and identify students using Google Login
  DISPLAY_SOLUTIONS_AFTER_SUBMIT: false, // set to false, for real exams

  redirectToHttps: true,

  // Settings for conversion and publication of exercise templates
  examPack: {
    publishSolutions: false, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
    publishEvalTests: false, // `true` required for realtime-eval/auto-eval back-ends, DISPLAY_SOLUTIONS_AFTER_SUBMIT and/or dashboard
  },

  // Back-end config
  backend: {
    type: 'email-submit',
    EMAIL_SUBMIT_CONFIG: {
      mdTemplate: readfile('public/data/submitted.md'),
    },
  },

  teacherEmail: 'adrien.joly@gmail.com', // required for dashboard auth
  
  // Evaluation / grading
  quizzGrading: {
    ptsRight: 1,
    ptsWrong: 0, // or -0.5 for example
    ptsNull: 0,
  },
  codeGrading: {
    ptsPerExercise: 10,
  }

};
