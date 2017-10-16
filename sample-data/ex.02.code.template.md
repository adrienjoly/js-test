Question text (can include line breaks and code sections)
with variant placeholders. (optional, see source template)

In this session, `sample_variant` is replaced by `{{sample_variant}}`.

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
  var alert = window.alert = function(msg) {
    return 1; // fake alert() that returns 1 all the time
  };
  var scoreArray = [
    `_studentCode`.length > 0, // 1 point if student provided non-empty code
    /{{sample_variant}}/.test(`_studentCode`), // 1 point if value was included
    eval(`return _studentCode`), // will return 1 point if student used alert()
  ];
  application.remote._send(null, scoreArray);
})();
```

---

Next exercise...

???

```js
// please enter an expected solution in JavaScript
```

--

```js
(function evaluateStudentCode(){
  // please write student evaluation code
})();
```
