# Tableaux - Code

Créez une variable `nombres` de type tableau et contenant les nombres `1`, `2` et `3`.

???

Solution:

```js
var nombres = [1, 2, 3];
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  _runStudentCode();
  var tests = [
    nombres[0] === 1,
    nombres.length === 3,
    nombres.join(',') === '1,2,3',
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---
