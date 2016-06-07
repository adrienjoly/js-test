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
- Run `npm install`
- Run `npm start`
- Open [localhost:8000](http://localhost:8000)

Updating the exercise data:
---------------------------

- Update the exercise template (`exercice.template.md`) using Markdown formatting and Mustache variables,
- Update `public/data/exercice.variant.*.json` files to set up variant-specific values for Mustache variables defined above,
- Run `npm run build` to render/generate final markdown files for each variant.

How to deploy:
--------------

- Change Firebase's URL (from `public/scripts/app.js`) to your own instance
- Change Google's client ID (from `public/index.html`) to work with your own domain name (or localhost)
- Protect your Firebase database to prevent data alteration/loss (cf comments in `./scripts/app.js`)
- Run `npm run deploy` to push the project to production on Firebase Hosting (based on `firebase.json`)

How to evaluate students' answers
---------------------------------

- Toggle the `active` property (1 or 0) of your Firebase database to (de-)activate student access to the questionnaire
- Run `npm run eval` to evaluate the score of your students from Firebase

TODO
----

- Add variants to Quizzes.
- Prevent the on-tap event from firing when clicking outside of the choices.
- Right after login, initialize student's record in Firebase, in order to know their presence (and id) even if they didn't press the "save" button.
- Allow per-variable variants. => more combinations.
- Add a way to evalute students scores in real time, from a web interface.
- Prevent students from connecting an exam URL 1 hour after activation. (to avoid next students to see the test before their timeslot, even if other students finish early and show them the URL)
- BUG: sometimes, the submit button does not lead to the submission page. the page keeps loading (chrome's loading favicon) and the CPU heats. infinite loop?
