<!-- Condition simple -->

Supposons qu'une variable `{{varName}}` ait été créée et contienne une chaine de caractères.

Implémenter une condition qui affiche `'{{varName}} vaut {{value}}'` à l'aide de `alert()`, si (et seulement si) `{{varName}}` est strictement égal à `{{value}}`.

- { "varName": "prenom", "value": "patrice" }
- { "varName": "prenom", "value": "michel" }
- { "varName": "nom", "value": "durand" }

???

Solution:

```js
if ({{varName}} === '{{value}}') {
  alert('{{varName}} vaut {{value}}');
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  var console = { log: function(){} }; // tolerate console.log() calls
  function alert(p) {
    res.push(p);
  }
  var {{varName}};
  var tests = [];
  _runStudentCode();
  tests = tests.concat([
    res.length === 0,
  ]);
  {{varName}} = '{{value}}';
  _runStudentCode();
  tests = tests.concat([
    res.length === 1, 
    res[0] === '{{varName}} vaut {{value}}',
  ]);
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

<!-- Condition avancée -->

Nous allons écrire un programme qui donne la distance de certaines villes, au départ de Paris.

Ce programme devra:

 - Inviter l'utilisateur à saisir le nom d'une ville;
 - Dans le cas où l'utilisateur a saisi `{{city1}}`, répondre `{{dist1}}`;
 - Dans le cas où l'utilisateur a saisi `{{city2}}`, répondre `{{dist2}}`;
 - Sinon, répondre `mauvaise saisie`.

Les réponses sont à afficher à l'aide de la fonction `alert()`. Respecter les textes fournis à la lettre. (y compris la casse, espaces et ponctuation)

- { "city1": "agen",      "dist1": "590km", "city2": "marseille", "dist2": "750km" }
- { "city1": "le mans",   "dist1": "200km", "city2": "angers",    "dist2": "300km" }
- { "city1": "marseille", "dist1": "750km", "city2": "bordeaux",  "dist2": "550km" }
- { "city1": "roubaix",   "dist1": "230km", "city2": "lyon",      "dist2": "450km" }

???

Solution:

```js
var reponse = prompt('saisissez le nom d\'une ville svp');
if (reponse === '{{city1}}') {
  alert('{{dist1}}');
} else if (reponse === '{{city2}}') {
  alert('{{dist2}}');
} else {
  alert('mauvaise saisie');
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res;
  var tests = [];
  var console = { log: function(){} }; // tolerate console.log() calls
  var prompt, alert = (p) => res.push(p);
  // test 1
  res = [];
  prompt = () => '{{city1}}';
  _runStudentCode();
  tests.push(res.length === 1 && res[0] === '{{dist1}}');
  // test 2
  res = [];
  prompt = () => '{{city2}}';
  _runStudentCode();
  tests.push(res.length === 1 && res[0] === '{{dist2}}');
  // test 3
  res = [];
  prompt = () => 'brest';
  _runStudentCode();
  tests.push(res.length === 1 && res[0] === "mauvaise saisie");
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

<!-- Fonctions -->

Définir une fonction `{{fctName}}` qui retourne le résultat de la division des deux nombres passés en paramètres.

Exemple d'appel: `{{fctName}}(6, -2);` doit retourner `-3` (résultat de `6 / -2`).

- { "fctName": "division" }
- { "fctName": "diviser" }

???

Solution:

```js
function {{fctName}}(a, b) {
  return a / b;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    typeof {{fctName}} === 'function', 
    {{fctName}}(6, -2) === -3,
    {{fctName}}(2, 0.5) === 4,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

<!-- Boucles -->

Implémenter une boucle `for()` qui écrit les nombres de `{{n1}}` à `{{n2}}` (compris) dans la console, à raison d'une ligne par nombre. Utiliser `console.log()`.

- { "n1": 10, "n2": 20 }
- { "n1": 50, "n2": 60 }
- { "n1": -5, "n2":  5 }

???

Solution:

```js
for (var i = {{n1}}; i <= {{n2}}; i++) {
  console.log(i);
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _logged = [];
  var _expected = [];
  for (var i = {{n1}}; i <= {{n2}}; i++) { _expected.push(i) }
  var console = { log: function(i){ _logged.push(i); } }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    `_studentCode`.split('for').length === 2, // just 1 for-loop
    `_studentCode`.split('console.log').length === 2, // just 1 console.log call
    _logged.length,
    _logged[0] === _expected[0],
    _logged[4] === _expected[4],
    _logged[9] === _expected[9],
  ];
  application.remote._send(null, tests);
})();
```

---

<!-- Tableaux -->

Définir une fonction `contient{{val}}` qui prend en paramètre un tableau de nombres, et retourne:
 - `true` si la valeur `{{val}}` est contenue au moins une fois dans le tableau passé en paramètre,
 - ou `false` sinon.
 
Exemples d'appels:
 - `contient{{val}}([1, 2, 3]);` doit retourner `true`.
 - `contient{{val}}([4, 5, 6]);` doit retourner `false`.

- { "val": 1 }
- { "val": 3 }

???

Solution:

```js
function contient{{val}}(tableau) {
  var indice = tableau.indexOf({{val}});
  if (indice === -1) {
    return false;
  } else {
    return true;
  }
}
```

...ou:

```js
function contient{{val}}(tableau) {
  return tableau.indexOf({{val}}) !== -1;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    contient{{val}}.toString().replace(/[ \t]/g, '').indexOf('functioncontient{{val}}(') !== -1,
    contient{{val}}([40, {{val}}, 5, {{val}}]) === true,
    contient{{val}}([40, 4, 5, 4]) === false,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
