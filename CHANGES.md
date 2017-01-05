== v2.5.0 (WIP)
 * 

== v2.4.0 Robustness and adaptivity
 * Change: question numbering is now global: no more id collisions
 * Feature: no longer limited to 1 quizz + 1 code exercises
 * Feature: variants are applied on solutions too, when displayed
 * Feature: custom exercise titles using Markdown (optional)
 * Feature: new auto-evaluation backend: `auto-eval` (on submit only)
 * Feature: `npm test` tests the evaluation on provided exercise solutions
 * Feature: `_studentCode` string can be used for code evaluation tests
 * Bug fix: allow evaluation code on same line of `_runStudentCode()`
 * Bug fix: better browser support for Firefox and Safari
 * Optimization: disabled Polymer routing, buggy and useless
 * Refactoring: renamed classes and scripts, more self-explanatory

== v2.3.0 Student auto-evaluation, thanks to `realtime-eval` backend mode
 * backend logic selected from config (e.g. firebase, realtime-eval, or none)
 * dashboard: display NaN instead of 0, until a score was evaluated
 * dashboard: sequential evaluation of students, one by one
 * fixed evaluation script, to match new firebase config
 * possibility to edit the submission explainer, using a markdown file

== v2.2.0 Teacher dashboard with real-time client-side evaluation of students' answers
 * Feature: https://github.com/cours-javascript-eemi-2016-2017/js-test/issues/5

== v2.1.0 Mode to display solutions after submission, eval fixes, UI fixes
 * Feature: DISPLAY_SOLUTIONS_AFTER_SUBMIT mode, to display questions and solutions after submission, while not allowing changing answers
 * Feature: store timestamp of first connection for each student
 * Feature: script to evaluate student group files (firebase database dumps)
 * Feature: display expected solutions in quizz evaluation report
 * Feature: adjust scores based on points per quizz and code coefficient
 * Feature: CodeEvaluator's timeout error message can be customized by eval/
 * Feature: added _sendOnce() and _log() functions, in code evaluator
 * BUG FIX: fixed evaluation script, to match firebase new API (v3)
 * UI FIX: allow exam to be printed (or saved as PDF)
 * UI FIX: display date of submission, after submission
 * UI FIX: fixed qcm/quizz choice selection bug
 * UI FIX: ignore TAB from code element, to prevent accidental submission
 * UI FIX: added spacing in evaluation reports
test script
 * cleaner file structure

== v2.0.0 Deploy to heroku instead of firebase hosting

== v1.1.0 Display quizz solutions after submitting

== v1.0.0 successfully tested in real conditions, forked from js-exam
