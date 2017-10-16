Coding Test for Javascript course students
==========================================

Features:
---------

- 100% paperless examination/testing/training software, 100% online;
- designed for automated testing and evaluation of students' answers;
- exams/tests defined as Markdown files;
- variants based on student id;
- students identified using their Google Apps account;
- answers submitted to a Firebase account, can be exported to a JSON file;
- students scores can be evaluated in real time, from a web dashboard;
- beautiful UI thanks to Google Polymer and Material Design.

Usage:
------

- Fork, then clone the repo locally
- Run `npm install` to install dependencies,
- Run `npm run create` to generate sample exercises and configuration to `/exam-data`,
- Update exercises files (`/exam-data/*.md`) using Markdown formatting and Mustache variables (see [howto](docs/howto-write-templates.md)),
- Run `npm run build` to compile exercise data into `/public/scripts/exam-data.js`,
- Run `npm start` to start the web server locally,
- Open [localhost:8000](http://localhost:8000) to test the web client locally.

How to deploy:
--------------

- Change Firebase's URL (from `public/scripts/app.js`) to your own back-end instance,
- Change Google's client ID (from `public/index.html`) so that students can identify using your own google apps domain name (or localhost),
- Protect your Firebase database to prevent data alteration/loss (cf comments in `./scripts/app.js`),
- Run `npm run deploy` to push the project to production on Firebase Hosting (as defined in `firebase.json`).

How to evaluate students' answers
---------------------------------

- Toggle the `active` property (to `1` or `0`) of your Firebase database, to (de-)activate student access to the questionnaire,
- Run `npm run eval` to compute the scores of your students (from the Firebase database) to `scores.csv`.

Roadmap
-------

- Add variants to Quizzes.
- Allow per-variable variants. => more combinations.
- Add access rules. (per student group and timeslot)
