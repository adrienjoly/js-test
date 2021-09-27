⚠ This project is not maintained anymore. Feel free to fork and make it your own ^^

# JS-TEST

**A toolkit to help JavaScript teachers evaluate their students' skills more efficiently.**

Alternative short description: a file-based way to produce, publish, collect and grade student assessments.

In the frame of my JavaScript course at EEMI, I developed an online exam application for students, using Google Polymer and Firebase. It's designed to display different variants of each exercise to prevent fraud, and automatic student evaluation/grading, for both quizzes and coding exercises.

It's made of:

- a simple Markdown-based language to define quizz and coding exercises;
- a web app that students will use to give their answers;
- scripts to deploy, evaluate, collect (e.g. from Google Forms) and grade students' answers automatically.

> 🇫🇷 Annonce de sortie en Français: [Un exerciseur en ligne + script pour corriger et noter le code de vos étudiants](http://mailchi.mp/cec2914e9181/exporter-en-pdf-le-code-de-vos-tudiants-depuis-google-classroom-1439429)

▶️ **Demo video:** *(click to play)*

[![](docs/js-test-video-thumbnail.png)](https://www.youtube.com/watch?v=RwxCBDoxbF8)

▶️ **Interactive demo:** *(click to try)*

[![](docs/js-test-screenshot-thumb.png)](https://js-test-demo.firebaseapp.com/)

## Features

- 100% paperless examination/evaluation/training software, 100% online;
- designed for automated testing and evaluation of students' answers;
- exams/quizzes/exercises defined as Markdown files;
- variants based on student id;
- students identified using their Google Apps account;
- answers submitted to a Firebase account, can be exported to a JSON file;
- students scores can be evaluated in real time, from a web dashboard;
- beautiful UI thanks to Google Polymer and Material Design.

## Use cases

I've been using js-test:

- to measure the understanding of my students; (quizz at the end of a class)
- to grade my students; (exams)
- to help my students self-assess and train their skills individually.

### Setup: install js-test

Run the following steps in a bash-compatible terminal:

```sh
$ git clone https://github.com/adrienjoly/js-test.git && cd js-test
$ nvm use # to use the right node.js version
$ npm install # to install dependencies
$ npm run create # to generate sample exercises and configuration to `/exam-data`
$ vi /exam-data/ex.01.quizz.template.md # to edit quizz questions
$ vi /exam-data/ex.02.code.template.md # to edit coding exercise(s)
```

### Create an assessment and test it locally

> Video walkthrough: [How I create automated student exams using Markdown - YouTube](https://www.youtube.com/watch?v=UcG95C7DXcQ)

After editing the exercise files (see above), run the following commands:

```sh
$ npm run build # to compile exercise data into `/public/scripts/exam-data.js`
$ npm start # to run the web server, until you press ctrl-c
```

Then, open [localhost:8080](http://localhost:8080) to test the assessment.

Read [how to write assessments](docs/howto-write-templates.md) (a.k.a. exam templates) and [examples](docs/code-eval-samples.md) to learn how to write quizzes and coding exercises.

### Deploy an assessment to Firebase

After editing and testing the exercise files locally (see above):

1. Create a new project on [Firebase](https://console.firebase.google.com)
2. Click on "Add Firebase to your web app"
3. Copy the values of the given `apiKey`, `databaseURL` and `messagingSenderId` properties to the `FIREBASE_CONFIG` object of your `/exam-data/exam-config.js` file (i.e. overwrite existing values)
4. Still in your `/exam-data/exam-config.js` file:
    - set `backend.type` to `firebase`,
    - un-comment the `FIREBASE_CONFIG` object.
6. Run `npm run build` to re-compile your configuration into `/public/scripts/exam-data.js`
7. Run `npm run deploy-firebase` (or `npm run deploy-firebase-instances`) to push the project to production on Firebase Hosting
8. Test your Firebase project from the given URL, by simulating a student's submission

ℹ️️ After disabling `PUBLIC_TEST_MODE` in `/exam-data/exam-config.js`, don't forget to toggle the `active` property (to `1` or `0`) of your Firebase database, to (de-)activate student access to the assessment.

⚠️ Security notice: *You may want to protect your Firebase database to prevent accidental or malicious data alteration/loss, as explained in `/public/scripts/app-firebase.js`.*

### Evaluate and grade answers submitted to Firebase

At all times, you can:

- Go to the "Database" section of your Firebase project's dashboard to see the submitted answers
- Export the submitted data as a JSON file, for backup and/or offline evaluation and grading

After having run the steps above, you can either:

- Run `npm run eval` (`npm run eval-instances`) to compute the scores of answers stored in your Firebase database;
- Or `npm run eval-firebase-dumps` to do it offline, from a JSON export of your Firebase database.

In both cases, resulting grades will be stored in the `/exam-data/scores.csv` file.

### Evaluate and grade answers submitted to Google Forms

As an alternative to using Firebase as a back-end, it's possible to ask students to submit their answers by email, or to Google Forms. This alternative has been useful with schools which don't provide Google-based authentification for their students.

#### Phase 1 - Setup and deploy the assessment website

1. In the `/exam-data/exam-config.js` file:
    - set `PUBLIC_TEST_MODE` to `true`,
    - set `backend.type` to `'email-submit'`,
    - set `backend.EMAIL_SUBMIT_CONFIG` to `readfile('public/data/submitted.md')`,
    - un-comment the `FIREBASE_CONFIG` object.
1. In the `/public/data/intro.md` file, write a message to let students know that refreshing (or changing) the page will cause them to loose their answers.
1. In the `/public/data/submitted.md` file:
    - include a HTML link to a Google Forms where your students will paste their answers in JSON format, with the `target="_blank"` attribute, to prevent them from loosing their answers during that process.
    - also include `<pre>{{hashedAnswers}}</pre>` to display the JSON code in question.
1. Run `npm run build` then commit the pending changes to the `git` repository that holds your `js-test` copy and your exercises.
1. Run `npm run deploy-firebase`, as specified in the procedure above. (i.e. you will need to setup a Firebase app first)

#### Phase 2 - Collect answers from students

1. At the time of the exam, provide the resulting URL to students, so they can fill their answers.
1. At the end of the exam, go to the "answers" tab of the Google Forms, click the icon to save them into a Google Spreadsheet, then open that spreadsheet.
1. Export the spreadsheet as a csv file, then use https://www.csvjson.com/csv2json to convert it into a JSON file. Download that file in your `js-test` directory, and rename it as `student-submissions.csv.json`.
1. Run `node src/extract-student-submissions-from-spreadsheet-json.js ./student-submissions.csv.json` => this creates a `students` directory that contains one JSON file per student submission.

#### Phase 3 - Evaluate and grade student answers

1. Run `npm run eval-student-submissions` to evaluate and grade these student submissions and store their results in `exam-data/email-submission`.
    > If you see any error during this process, it may mean that your testing code needs some fixes. Student mistakes and runtime errors are reported in their own file, not in stdout.
1. When you're done, send these result files back to students, so they can read the feedback and grade of their work.

Checkout [this YouTube playlist](https://www.youtube.com/playlist?list=PLmzn1C-VN6G7DsJb9wn29Pv2XkrF8aI6Q) for examples.

<!-- TODO also mention the procedure to extract github repo URLs from google classrooms and run tests against them -->

### Enable student identification

ℹ️️ *These instructions are not complete yet.*

- Change Google's client ID (from `/exam-data/exam-config.js`) so that students can identify using your own google apps domain name (or localhost),
- `build` and `deploy` again to your assessment's hosting account. (e.g. Firebase or Heroku)

## Roadmap

- Add variants to Quizzes.
- Allow per-variable variants. => more combinations.
- Add access rules. (per student group and timeslot)
- read more: [ROADMAP.md](docs/ROADMAP.md), [Kanban board](https://github.com/adrienjoly/js-test/projects/1) and [issues](https://github.com/adrienjoly/js-test/issues)
