Implémenter une condition qui affecte `'egal'` à une variable `resultat` seulement si une autre variable `nombre` vaut strictement `4`. Indenter correctement.

???

Solution:

```js
if (nombre === 4) {
  resultat = 'egal';
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  var tests = [];
  var nombre, resultat;
  resultat = undefined; nombre = 4; _runStudentCode(); tests.push(resultat === 'egal');
  resultat = undefined; nombre = 3; _runStudentCode(); tests.push(resultat != 'egal');
  resultat = undefined; nombre = 5; _runStudentCode(); tests.push(resultat != 'egal');
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
