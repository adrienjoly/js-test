Less coupling between formats, components and tools:

- 2 "exercise" file formats based on markdown:
  - 1 for quizzes: including questions, proposed answers, and right anwsers
  - 1 for code exercises: including text, proposed solution, and an auto-evaluation function to define (where criteria are clearly visible)
- 1 "raw" student submission file format which only contains the students' copy and submission metadata
- 1 "graded" student copy file format which would also contain scores for every question + metadata about the grading process (e.g. version of the exercise file, time and context of execution)
- generation of human-readable copies for each student, which includes actionable feedback, possibly including manual review comments from the educator
- generation of human-readable exam report, which stats and charts, for quick insights about student understanding, errors, and progress
- tools to parse, generate, convert files between all those formats
- a standalone and secure code evaluator that can be run on the educator's laptop, on a web browser or in the cloud
- several ways to generate exam copies for students: web UI with Google Login, Google Forms, or PDF exports with anonymous student identification.

Evolutions of the markdown-based exercise file format:

- make it easier for educators to exchange and re-use exercise file without having to combine them
- if possible, make the code exercises language-agnostic
- provide a cleaner (e.g. less error-prone) and more flexible way to specify and use variants
- provide a documented and extensible SDK with higher-level functions, to make auto-evaluation functions simpler to write and easier to read

Draft of new exercise format (inspired by Jekyll):

<pre>
---
title:  "Make a HTTP request from Node.js"
type: code
runner: nodejs
---

# Question

Write a Node.js program that makes a HTTP {{method}} request to {{url}} and displays its response body to the standard output.

--
# Variants

  ```yaml
  - placeholder: "url"
    values:
      - "http://google.com"
      - "http://bing.com"
      - "http://duckduckgo.com"
  - placeholder: "method"
    values:
      - "GET"
      - "POST"
  # => by combining these variants, we get 6 different versions of this question
  ```

--
# Solution

  ```js
  (async () => {
    const method = `{{method}}`.toLowerCase();
    const { body } = await http[method](`{{url}}`);
    console.log(body);
  })();
  ```

--
# Solution

  ```js
  const method = `{{method}}`.toLowerCase();
  http[method](`{{url}}`).then(({ body }) => {
    console.log(body);
  });
  ```

--
# Evaluator

  ```js
  const { studentCode, runStudentCode, test } = globals;
  const http = require('http');
  
  test('use console.log()', (t) => {
    t.true(studentCode.includes('console.log'));
  });

  test('use the right http method', (t) => {
    const spiedRequest = t.spy(http, `{{method}}`);
    runStudentCode({ http, console: { log: () => {} } });
    t.is(spiedRequest.calls.length, 1);
  });

  test('display the body in stdout', (t) => {
    const spiedConsole = t.spy(console, `log`);
    runStudentCode({ http, console });
    t.is(spiedConsole.calls.length, 1);
  });
  ```

</pre>
