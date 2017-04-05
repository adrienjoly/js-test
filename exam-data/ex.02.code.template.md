Définir une fonction `soustraire` qui retourne le résultat de la soustraction `a - b`, `a` et `b` étant des paramètres de cette fonction.

Respecter les conventions et règles d'indentation vues en cours.

???

Solution:
```js
function soustraire(a, b) {
  return a - b;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    typeof soustraire === 'function', 
    soustraire(2, 1) === 1,
    soustraire(2, -1) === 3,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

Définir une fonction `repeter` qui affiche `n` fois `'Bonjour!'` dans la console, puis qui retourne `n`, `n` étant un paramètre de cette fonction.

Respecter les conventions et règles d'indentation vues en cours.

???

Solution:
```js
function repeter(n) {
  for (var i = 0; i < n; i++) {
    console.log('Bonjour!');
  }
  return n;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var nb = 0;
  var console = {
    log: function(t){
      if (t === 'Bonjour!') {
        nb++;
      }
    }
  };
  _runStudentCode();
  var res = repeter(25);
  var tests = [
    typeof repeter === 'function',
    nb === 25,
    res === 25,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
