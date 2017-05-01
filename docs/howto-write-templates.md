# How to write exam templates

## Exam definition files

`/exam-data` folder must contain:

- `exam-config.js`: defining the title, back-end and scoring rules for the exam/test
- `ex.DD.TTTT.template.md` files, with:
  - `DD` to be replaced by 2-digit numbering starting at 01 (one file per number);
  - `TTTT` can be `quizz` or `code`.

`quizz` and `code` templates are following the same markup (superset of markdown), but have a slightly different structure.

### Template format for Quizz exercises

`quizz` template files follow this structure:

```md
Question text (can include line breaks and code sections)

- choice 1
- choice 2
* choice 3 (star indicates that it's the right answer)
- choice 4

???

Optional explanation that appears after submission of the student's answers.
(can include line breaks and code sections)

---

Next question(s)...
```

### Template format for code exercises

`code` template files follow this structure:

````md
Question text (can include line breaks and code sections)
with {{sample_variant}} placeholders. (variants are optional)

- { "sample_variant": "<this is variant 1>" }
- { "sample_variant": "<this is variant 2>" }

???

Optional explanation that appears after submission of the student's answers.
(can include line breaks and code sections)

```js
// expected solution
console.log('hello world');
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var error = null;
  var scoreArray = [ 1, 1, 0 ]; // e.g. the student got 2 points out of 3
  application.remote._send(error, scoreArray);
})();
```

---

Next code question(s)...
````
