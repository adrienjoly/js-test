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
  var _res = [];
  var console = { log: function(){} }; // tolerate console.log() calls
  function alert(p) {
    _res.push(p);
  }
  var {{varName}};
  var tests = [];
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  tests = tests.concat([
    !error && _res.length === 0
      ? res(1, 'le code fonctionne sans erreur')
      : res(0, 'une erreur ou un alert() inattendu est survenu'),
  ]);
  {{varName}} = '{{value}}';
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  tests = tests.concat([
    _res.length === 1
      ? res(1, 'quand {{varName}} vaut {{value}}, l\'alert est bien affiché')
      : res(0, 'quand {{varName}} vaut {{value}}, un alert devrait être affiché'),
    _res[0] === '{{varName}} vaut {{value}}'
      ? res(1, 'l\'alert contient le message demandé')
      : res(0, 'l\'alert ne contient pas le message demandé'),
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
  var _res;
  var tests = [];
  var console = { log: function(){} }; // tolerate console.log() calls
  var prompt, alert = (p) => _res.push(p);
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  // test 1
  _res = [];
  prompt = () => '{{city1}}';
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  tests.push(_res.length === 1 && _res[0] === '{{dist1}}'
    ? res(1, 'quand on tape {{city1}}, la réponse est bien {{dist1}}')
    : res(0, 'quand on tape {{city1}}, la réponse devrait être {{dist1}}')
  );
  // test 2
  _res = [];
  prompt = () => '{{city2}}';
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  tests.push(_res.length === 1 && _res[0] === '{{dist2}}'
    ? res(1, 'quand on tape {{city2}}, la réponse est bien {{dist2}}')
    : res(0, 'quand on tape {{city2}}, la réponse devrait être {{dist2}}')
  );
  // test 3
  _res = [];
  prompt = () => 'brest';
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  tests.push(_res.length === 1 && _res[0] === "mauvaise saisie"
    ? res(1, 'quand on tape brest, la réponse est bien "mauvaise saisie"')
    : res(0, 'quand on tape brest, la réponse devrait être "mauvaise saisie"')
  );
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
  var _scope = {}; // store the function name in the global scope 
  try {
    eval(`_studentCode`.replace(/function ([^ \(]+)/g, '_scope.$1 = function'));
    /* will associate the student's function to the global var above */
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var studentFct = _scope[`{{fctName}}`];
  var tests = [
    `_studentCode`.replace(/[ \t]/g, '').indexOf('function{{fctName}}(') !== -1
      ? res(1, 'function {{fctName}} a bien été trouvé dans le code')
      : res(0, 'la fonction {{fctName}}() n\'est pas définie correctement'),
    typeof studentFct === 'function' && studentFct(6, -2) === -3
      ? res(1, 'l\'appel {{fctName}}(6, -2) retourne bien -3')
      : res(0, 'l\'appel {{fctName}}(6, -2) devrait retourner -3'),
    typeof studentFct === 'function' && studentFct(2, 0.5) === 4
      ? res(1, 'l\'appel {{fctName}}(2, 0.5) retourne bien 4')
      : res(0, 'l\'appel {{fctName}}(2, 0.5) devrait retourner 4'),
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
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var tests = [
    `_studentCode`.split('for').length === 2 // just 1 for-loop
      ? res(1, 'il y a bien une boucle for dans le code')
      : res(0, 'il devrait y avoir une boucle for dans le code'),
    `_studentCode`.split('console.log').length === 2 // just 1 console.log call
      ? res(1, 'il y a bien un console.log for dans le code')
      : res(0, 'il devrait y avoir un console.log for dans le code'),
    _logged.length
      ? res(1, 'console.log a bien été appelé')
      : res(0, 'console.log aurait du être appelé'),
    _logged[0] === _expected[0]
      ? res(1, 'le 1er console.log affiche bien ' + _expected[0])
      : res(0, 'le 1er console.log devrait afficher ' + _expected[0]),
    _logged[4] === _expected[4]
      ? res(1, 'le 5ème console.log affiche bien ' + _expected[4])
      : res(0, 'le 5ème console.log devrait afficher ' + _expected[4]),
    _logged[9] === _expected[9]
      ? res(1, 'le 10ème console.log affiche bien ' + _expected[9])
      : res(0, 'le 10ème console.log devrait afficher ' + _expected[9]),
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
  var _scope = {}; // store the function name in the global scope 
  try {
    eval(`_studentCode`.replace(/function ([^ \(]+)/g, '_scope.$1 = function'));
    /* will associate the student's function to the global var above */
  } catch (e) {
    application.remote._log('/!\\ erreur: ' + e.message);
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var studentFct = _scope[`contient{{val}}`];
  var tests = [
    `_studentCode`.replace(/[ \t]/g, '').indexOf('functioncontient{{val}}(') !== -1
      ? res(1, 'function contient{{val}} a bien été trouvé dans le code')
      : res(0, 'la fonction contient{{val}}() n\'est pas définie correctement'),
    typeof studentFct === 'function' && studentFct([40, {{val}}, 5, {{val}}]) === true
      ? res(1, 'l\'appel contient{{val}}([40, {{val}}, 5, {{val}}]) retourne bien true')
      : res(0, 'l\'appel contient{{val}}([40, {{val}}, 5, {{val}}]) devrait retourner true'),
    typeof studentFct === 'function' && studentFct([40, 4, 5, 4]) === false
      ? res(1, 'l\'appel contient{{val}}([40, 4, 5, 4]) retourne bien false')
      : res(0, 'l\'appel contient{{val}}([40, 4, 5, 4]) devrait retourner false'),
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
