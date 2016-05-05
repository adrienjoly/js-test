Javascript Coding Exercise runner for course students
=====================================================

Features:
---------

- 100% paperless examination software, 100% online;
- designed for automated testing and evaluation of students' answers;
- students are identified using their Google Apps account;
- type of exercise: algorythmic coding;
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

How to get student answers:
---------------------------

- Toggle the `active` property (1 or 0) of your Firebase database to (de-)activate student access to the questionnaire
- When the test is done, export answers from Firebase dashboard to a `answers.json` file in your local project directory
- Move `solutions.json` back to your local project directory, then run `node evaluate answers.json solutions.json` to see the score of your students
