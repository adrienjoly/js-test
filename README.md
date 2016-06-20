Coding Exam for Javascript course students
==========================================

Features:
---------

- 100% paperless examination software, 100% online;
- designed for automated testing and evaluation of students' answers;
- students are identified using their Google Apps account;
- variants based on student id;
- answers are submitted to a Firebase account, and can be exported to a JSON file;
- beautiful UI thanks to Google Polymer and Material Design.

Usage:
------

- Clone the repo locally
- Run `npm install` to install dependencies,
- Update exercises (`ex.1.quizz.template.md` and `ex.2.code.template.md`) using Markdown formatting and Mustache variables,
- Run `npm run build` to compile exercise data into `/public/scripts/exercices.js`,
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

TODO
----

- Add variants to Quizzes.
- Prevent the on-tap event from firing when clicking outside of the choices.
- Right after login, initialize student's record in Firebase, in order to know their presence (and id) even if they didn't press the "save" button.
- Allow per-variable variants. => more combinations.
- Add a way to evalute students scores in real time, from a web interface.
- Prevent students from connecting an exam URL 1 hour after activation. (to avoid next students to see the test before their timeslot, even if other students finish early and show them the URL)
- BUG: sometimes, the submit button does not lead to the submission page. the page keeps loading (chrome's loading favicon) and the CPU heats. infinite loop?
