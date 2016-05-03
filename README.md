Javascript Quizz runner for course students
===========================================

Features:
---------

- 100% paperless examination software, 100% online;
- designed for automated testing and evaluation of students' answers;
- students are identified using their Google Apps account;
- multiple choice questions;
- answers are submitted in real time to a Firebase account, and can be exported to a JSON file;
- beautiful UI thanks to Google Polymer and Material Design.

Usage:
------

- Clone the repo locally
- Run `bower install`
- Run `server.sh`
- Open [localhost:8000](http://localhost:8000)
- Change Firebase's URL to your own instance
- Change Google's client ID from index.html to work with your own domain name (or localhost)
- Insert your questions in `questions-qcm.md` using Markdown formatting
- In `questions-qcm.md`, use stars in front of expected solutions (instead of carrets for alternative answers)
- Run `node convert-md-to-js.js >./scripts/exercises.js` to integrate your questions into the web page
- Moved the `solutions` object definition from `scripts/exercises.js` into a `solutions.json` outside of your project (so that students cannot access it)
- Also move `questions-qcm.md` outside of your project
- Protect your Firebase database to prevent data alteration/loss (cf comments in `./scripts/app.js`)
- Push the project to production (e.g. using Firebase Hosting)
- Toggle the `active` property (1 or 0) of your Firebase database to (de-)activate student access to the questionnaire
- When the quizz is done, export answers from Firebase dashboard to a `answers.json` file in your local project directory
- Move `solutions.json` back to your local project directory, then run `node evaluate answers.json solutions.json` to see the score of your students

TODO:
-----

- different variants of exercises for each student, to reduce and detect fraud;
