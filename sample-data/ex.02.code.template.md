# Coding exercices

Question text (can include line breaks and code sections)
with variant placeholders. (optional, see source template)

In this session, `sample_variant`'s value is `{{sample_variant}}`.

- { "sample_variant": "this is variant 1" }
- { "sample_variant": "this is variant 2" }

Sample exercise: display the value of `sample_variant` in a call to `alert()`.

???

Optional explanation that appears after submission of the student's answers.
(can include line breaks and code sections)

```js
// expected solution
alert('{{sample_variant}}');
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  function runInContext() {
    var points = 0;
    try {
      eval('function alert(msg) { points = 1; };' // fake alert() function that gives 1 point when called
          + `_studentCode`); // run student's code
    } catch(e) {
      application.remote._log(`error: ${e}`);
    }
    return points;
  }
  var scoreArray = [
    /{{sample_variant}}/.test(`_studentCode`), // 1 point if value was included
    runInContext(), // will return 1 point if student used alert()
  ];
  application.remote._send(null, scoreArray);
})();
```

---

Next exercise... Type whatever you want.

???

```js
// please enter an expected solution in JavaScript
```

--

```js
(function evaluateStudentCode(){
  // please write student evaluation code
  application.remote._send(null, [ 1 ]); // 1 / 1 points
})();
```
