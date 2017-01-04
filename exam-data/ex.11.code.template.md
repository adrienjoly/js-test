# Entrainement vacances fin d'année - Code

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

---

Définir une fonction `tableauContient` qui prend deux paramètres:
 - `tableau`: un tableau de chaînes de caractères
 - `chaine`: une chaîne de caractères

...et retourne:
 - `false` si la valeur `chaine` n'a pas été trouvée dans le tableau `tableau`,
 - ou le premier indice (à partir de 0) auquel a été trouvé la valeur `chaine` dans le tableau `tableau`.

Exemples d'appels:
 - `tableauContient(['a', 'b', 'c'], 'b');` doit retourner `1`.
 - `tableauContient(['a', 'b', 'c'], 'd');` doit retourner `false`.

???

Solution:
```js
function tableauContient(tableau, chaine) {
  var indice = tableau.indexOf(chaine);
  if (indice === -1) {
    return false;
  } else {
    return indice;
  }
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    typeof tableauContient === 'function',
    tableauContient(['a', 'b', 'c'], 'b') === 1,
    tableauContient(['a', 'b', 'c'], 'd') === false,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
