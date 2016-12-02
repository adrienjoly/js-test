test

```js
// code {{variant}}
```

- { "variant" : 33 }
- { "variant" : 66 }

???

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate calls to console.log()
  _runStudentCode();
  application.remote._send(null, 1); // give one point to the student
})();
```
