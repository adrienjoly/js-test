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

Vous disposez d'une variable `fruits` contenant un tableau de chaînes de caractères.

Saisissez le code JavaScript pour créer une variable `troisieme` et lui affecter la valeur du 3ème élément de ce tableau.

???

Solution:
```js
var troisieme = fruits[2];
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _fruits = ['pomme', 'orange', 'kiwi'];
  var fruits = _fruits.slice(); // clone
  _runStudentCode();
  var tests = [
    troisieme === _fruits[2],
    fruits.join(',') === _fruits.join(','),
    `_studentCode`.replace(/[\(\) ]/g, '').indexOf('[2]') !== -1,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

Vous disposez d'une variable `fruits` contenant un tableau de chaînes de caractères.

Saisissez le code JavaScript permettant de retirer le dernier élément de ce tableau, et d'afficher la valeur de cet élément dans la console.

???

Solution:
```js
console.log(fruits.pop());
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _fruits = ['pomme', 'orange', 'kiwi'];
  var fruits = _fruits.slice(); // clone
  var out;
  var console = { log: function(value){
    out = value;
  } };
  _runStudentCode();
  var tests = [
    out === _fruits.pop(),
    fruits.join(',') === _fruits.join(','),
    `_studentCode`.toString().replace(/[\(\) ]/g, '').indexOf('.pop') !== -1,
  ];
  application.remote._log('3', tests);
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
  tableauContient = null;
  _runStudentCode(); // TODO: find a way to run the function defined in that code
  var tests = [
    typeof tableauContient === 'function',
    tableauContient(['a', 'b', 'c'], 'b') === 1,
    tableauContient(['a', 'b', 'c'], 'd') === false,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
