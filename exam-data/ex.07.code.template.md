# Fonctions - Code

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

Définir une fonction `somme` qui retourne la somme des trois nombres passés en paramètres.

Exemple d'appel: `somme(1, 3, -2);` doit retourner `2`.

???

Solution:

```js
function somme(a, b, c) {
  return a + b + c;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    typeof somme === 'function', 
    somme(1, 3, -2) === 2,
    somme(4, 100, 0.5) === 104.5,
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

---


Définir une fonction `sommeIntervalle` qui retourne la somme de tous les nombres entiers compris entre les nombres `premier` et `dernier` (compris) passés en paramètres.

Exemple d'appel: `sommeIntervalle(2, 5);` doit retourner `14` (résultat de `2 + 3 + 4 + 5`).

???

Solution:

```js
function sommeIntervalle(premier, dernier) {
  var somme = 0;
  for (var i = premier; i <= dernier; i++) {
    somme = somme + i;
  }
  return somme;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    typeof sommeIntervalle === 'function',
    sommeIntervalle(2, 5) === 14,
    sommeIntervalle(-4, -1) === -10,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
