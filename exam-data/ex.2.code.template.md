## Condition simple

Supposons qu'une variable `{{varName}}` ait été créée et contienne un nombre.

Implémenter une condition qui affiche `'plus grand que {{threshold}}'` dans la console, si `{{varName}}` est strictement supérieur à `{{threshold}}`.

- { "varName": "monNombre", "threshold": 4 }
- { "varName": "monNumero", "threshold": 4 }
- { "varName": "monNumero", "threshold": 6 }

???

Solution:

```js
if ({{varName}} > {{threshold}}) {
  console.log('plus grand que {{threshold}}');
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  var console = { log: function(p){
    res.push(p);
  } };
  var tests = [];
  var {{varName}} = {{threshold}};
  _runStudentCode();
  tests = tests.concat([
    res.length === 0,
  ]);
  {{varName}} = 7.5;
  _runStudentCode();
  tests = tests.concat([
    res.length === 1, 
    res[0] === 'plus grand que {{threshold}}',
  ]);
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

## Condition avancée

Nous allons écrire un programme qui donne la météo à l'utilisateur, pour la ville de son choix.

Ce programme devra:

 - Inviter l'utilisateur à saisir le nom d'une ville;
 - Dans le cas où l'utilisateur a saisi `{{city1}}`, répondre `{{weather1}}`;
 - Dans le cas où l'utilisateur a saisi `{{city2}}`, répondre `{{weather2}}`;
 - Sinon, répondre `{{else}}`.

Les réponses sont à afficher à l'aide de la fonction `alert()`. Respecter les textes fournis à la lettre. (y compris la casse, espaces et ponctuation)

- { "city1": "paris", "weather1": "nuageux", "city2": "marseille", "weather2": "soleil", "else": "mauvaise saisie" }
- { "city1": "paris", "weather1": "pluvieux", "city2": "roubaix", "weather2": "nuageux", "else": "paris ou roubaix ?" }
- { "city1": "paris", "weather1": "soleil", "city2": "marseille", "weather2": "nuageux", "else": "paris ou marseille ?" }
- { "city1": "roubaix", "weather1": "nuageux", "city2": "marseille", "weather2": "soleil", "else": "mauvaise saisie" }

???

Solution:

```js
var reponse = prompt('saisissez le nom d\'une ville svp');
if (reponse === '{{city1}}') {
  alert('{{weather1}}');
} else if (reponse === '{{city2}}') {
  alert('{{weather2}}');
} else {
  alert("{{else}}");
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
  tests.push(res.length === 1 && res[0] === '{{weather1}}');
  // test 2
  res = [];
  prompt = () => '{{city2}}';
  _runStudentCode();
  tests.push(res.length === 1 && res[0] === '{{weather2}}');
  // test 3
  res = [];
  prompt = () => 'brest';
  _runStudentCode();
  tests.push(res.length === 1 && res[0] === "{{else}}");
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

## Fonctions

Définir une fonction `{{fctName}}` qui retourne le résultat de la multiplication des trois nombres passés en paramètres.

Exemple d'appel: `{{fctName}}(1, 3, -2);` doit retourner `-6` (`1 * 3 * -2`).

- { "fctName": "produit" }
- { "fctName": "multiplier" }

???

Solution:

```js
function {{fctName}}(a, b, c) {
  return a * b * c;
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
    {{fctName}}(1, 3, -2) === -6,
    {{fctName}}(4, 100, 0.5) === 200,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

## Boucles

Définir une fonction `{{fctName}}` qui prend comme paramètres un nombre `n` et une chaîne de caractères `message`, et retourne une chaîne de caractères contenant `n` fois `message`, en utilisant la concaténation.

Exemple d'appel: `{{fctName}}(3, 'bonjour!');` doit retourner `'bonjour!bonjour!bonjour!'`.

- { "fctName": "repeterChaine" }
- { "fctName": "nFois" }
- { "fctName": "repeter" }

???

Solution:

```js
function {{fctName}}(n, message) {
  var resultat = '';
  for (var i = 0; i < n; i++) {
    resultat = resultat + message;
  }
  return resultat;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    {{fctName}}(3, 'bonjour!') === 'bonjour!bonjour!bonjour!',
    {{fctName}}(0, 'bonjour!') === '',
    {{fctName}}(12, 'a') === 'aaaaaaaaaaaa',
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```

---

## Tableaux

Définir une fonction `tableauContient` qui prend deux paramètres:
 - `tableau`: un tableau de nombres
 - `{{paramName}}`: un nombre

...et retourne:
 - `true` s'il existe au moins un élément ayant la valeur `{{paramName}}` dans le tableau `tableau`,
 - ou `false` sinon.
 
Exemples d'appels:
 - `tableauContient([1, 2, 3], 2);` doit retourner `true`.
 - `tableauContient([1, 2, 3], 4);` doit retourner `false`.

- { "paramName": "nombre" }
- { "paramName": "val" }

???

Solution:

```js
function tableauContient(tableau, {{paramName}}) {
  var indice = tableau.indexOf({{paramName}});
  if (indice === -1) {
    return false;
  } else {
    return true;
  }
}
```

...ou:

```js
function tableauContient(tableau, {{paramName}}) {
  return tableau.indexOf({{paramName}}) !== -1;
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var console = { log: function(){} }; // tolerate console.log() calls
  _runStudentCode();
  var tests = [
    tableauContient.toString().replace(/[ \t]/g, '').indexOf('functiontableauContient(tableau,{{paramName}}') !== -1,
    tableauContient([3, 4, 5, 4], 4) === true,
    tableauContient([3, 4, 5, 4], 2) === false,
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
