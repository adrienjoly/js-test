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
