---

Écrivez le code JS permettant d'envoyer une requête Ajax de type GET à l'URL `{{{url}}}`. Une fois la réponse reçue, votre code doit afficher dans la console seulement la valeur de la propriété `{{prop}}` de cette réponse JSON.

- { "url": "https://js-jsonplaceholder.herokuapp.com/users/1", "prop": "username", "expectedValue": "Bret" }
- { "url": "https://js-jsonplaceholder.herokuapp.com/users/2", "prop": "email", "expectedValue": "Shanna@melissa.tv" }
- { "url": "https://js-jsonplaceholder.herokuapp.com/users/3", "prop": "phone", "expectedValue": "1-463-123-4447" }

???
```js
// TODO: allow calls to alert();
var expectations = [
  'call to xhr.open()',
  'call to xhr.send()',
  'call to console.log()'
];

function success(key) {
  expectations.splice(expectations.indexOf(key), 1);
}

var checkpoint = (function(){
  var remaining = 3; // expected number of calls to checkpoint()
  function missingExpectations(){
    application.remote._send('missing: ' + expectations.join(', '));
  }
  var timeout = setTimeout(missingExpectations, 1000);
  return function(err) {
    if (err) {
      clearTimeout(timeout);
      application.remote._send(err);
    } else {
      --remaining;
      if (!remaining) {
        clearTimeout(timeout);
        if (expectations.length) {
          missingExpectations();
        } else {
          application.remote._send(null, 1);
        }
      }
    }
  };
})();

function shouldEqual(val, exp, name) {
  checkpoint(val == exp ? null :
    'expected ' + (name || '') + ' == "' + exp + '", got: "' + val + '"');
}

var console = {
  log: function(value){
    success('call to console.log()');
    shouldEqual(value, '{{expectedValue}}');
  }
};

var XMLHttpRequest = function(){};
XMLHttpRequest.prototype.open = function(method, url){
  success('call to xhr.open()');
  shouldEqual((method || '').toUpperCase(), 'GET', 'method');
  shouldEqual(url || '', '{{{url}}}', 'url');
};
XMLHttpRequest.prototype.send = function(){
  success('call to xhr.send()');
  var _this = this;
  setTimeout(function(){
    // intermediate call
    _this.readyState = 1;
    _this.responseText = null;
    _this.onreadystatechange();
  }, 10);
  setTimeout(function(){
    // final response call
    _this.readyState = 4;
    _this.status = 200;
    _this.responseText = '{ "{{prop}}": "{{expectedValue}}" }';
    _this.onreadystatechange();
  }, 20);
};
```
---

Écrivez le code JS permettant d'envoyer une requête Ajax de type POST à l'URL `https://js-httpbin.herokuapp.com/post`, en transmettant un objet JSON contenant une propriété `{{prop}}` valant `"{{val}}"`.

- { "prop": "username", "val": "pierredup" }
- { "prop": "school", "val": "eemi" }
- { "prop": "date", "val": "2016" }
- { "prop": "nickname", "val": "dupont" }

???
```js
// TODO: allow calls to alert();
var expectations = [
  'call to xhr.open()',
  'call to xhr.send()'
];

function success(key) {
  expectations.splice(expectations.indexOf(key), 1);
}

var checkpoint = (function(){
  var remaining = 3; // expected number of calls to checkpoint()
  function missingExpectations(){
    application.remote._send('missing: ' + expectations.join(', '));
  }
  var timeout = setTimeout(missingExpectations, 1000);
  return function(err) {
    if (err) {
      clearTimeout(timeout);
      application.remote._send(err);
    } else {
      --remaining;
      if (!remaining) {
        clearTimeout(timeout);
        if (expectations.length) {
          missingExpectations();
        } else {
          application.remote._send(null, 1);
        }
      }
    }
  };
})();

function shouldEqual(val, exp, name) {
  checkpoint(val == exp ? null :
    'expected ' + (name || '') + ' == "' + exp + '", got: "' + val + '"');
}

var XMLHttpRequest = function(){};
XMLHttpRequest.prototype.open = function(method, url){
  success('call to xhr.open()');
  shouldEqual((method || '').toUpperCase(), 'POST', 'method');
  shouldEqual(url || '', 'https://js-httpbin.herokuapp.com/post', 'url');
};
XMLHttpRequest.prototype.send = function(data){
  success('call to xhr.send()');
  shouldEqual(data, JSON.stringify({ '{{prop}}': '{{val}}' }), 'data');
};
/*
// expected solution:
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://js-httpbin.herokuapp.com/post');
// xhr.onreadystatechange = function() { xhr.readyState == 4 && alert(xhr.responseText); };
xhr.send(JSON.stringify({ {{prop}}: '{{val}}' }));
*/
```
---

Définissez une fonction `plusUn` qui renvoie le nombre passé en paramètre après y avoir additionné le nombre `1`; de manière à ce que `plusUn(1)` renvoie `2`, `plusUn(2)` renvoie `3`, etc...

Cette fonction ne doit ni afficher d'alerte modale, ni écrire dans la console. Utilisez `return` pour renvoyer le résultat de l'addition.

???
```js
setTimeout(function(){
  var done = application.remote._send;
  try { plusUn; } catch(e) { done('plusUn is not defined'); return; };
  if (typeof plusUn != 'function') done('plusUn() definition not found');
  else if (plusUn(1) != 2) done('plusUn(1) != 2');
  else if (plusUn(2) != 3) done('plusUn(2) != 3');
  else if (plusUn(-99) != -98) done('plusUn(-99) != -98');
  else done(null, 1);
}, 10);
```

---

Supposons que vous disposiez d'une fonction `plusUn` définie telle que dans la question précédente.

Écrivez le code JS permettant de demander un nombre a l'utilisateur (à l'aide de `prompt`), d'appeler la fonction `plusUn` en passant ce nombre en paramètre, puis d'afficher le résultat de cet appel dans une alerte modale (`alert`).

???
```js
var done = application.remote._send;
function plusUn(p) { return parseInt(p) + 1; }
function prompt() { return '8' };
function alert(r) {
  if (r != 9) {
    done('if user types 8, alert should show 9');
  } else {
    done(null, 1);
  }
};
setTimeout(function(){
  done('alert() was not called');
}, 10);
```

---

Écrivez une boucle qui affiche dans la console tous les nombres entiers {{p}}s entre `1` et `100` (compris).

`console.log` ne doit paraître qu'une seule fois dans votre code.

Utilisez `% 2` (opérateur modulo) pour savoir si un nombre est pair ou impair.

- { "p": "pair", "_modRes": 0 }
- { "p": "impair", "_modRes": 1 }

???
```js
var done = application.remote._send;
var output = [];
var console = { log: output.push.bind(output) };
var expected = [];
for (var i = 1; i <= 100; ++i) {
  if (i % 2 == {{_modRes}}) {
    expected.push(i);
  }
}
setTimeout(function(){
  var outputFirsts = output.slice(0, 2).join(',');
  var expectedFirsts = expected.slice(0, 2).join(',');
  if (outputFirsts != expectedFirsts) {
    done('two first lines: ' + outputFirsts + ', expected: ' + expectedFirsts);
    return;
  }
  var outputLast = output.pop();
  var expectedLast = expected.pop();
  if (outputLast != expectedLast) {
    done('last line: ' + outputLast + ', expected: ' + expectedLast);
  } else {
    done(null, 1);
  }
}, 10);
```

---

Définissez une fonction `{{nom}}` qui renvoie (à l'aide de `return`) un tableau contenant tous les nombres entiers entre `1` et `n` (compris), `n` étant un nombre passé en paramètre de cette fonction.

Cette fonction ne doit pas écrire dans la console.

Pour créer un tableau vide, il suffit d'écrire `[]`.

- { "nom": "tabNombres" }
- { "nom": "jusqua" }
- { "nom": "nombres" }

???
```js
setTimeout(function(){
  var done = application.remote._send;
  function makeExpectedArray(n) {
    var expected = [];
    for (var i = 1; i <= n; ++i) {
      expected.push(i);
    }
    return expected;
  }
  try {
    {{nom}};
  } catch(e) {
    return done('{{nom}} is not defined');
  };
  if (typeof {{nom}} != 'function') {
    return done('{{nom}}() definition not found');
  }
  var _n = 50;
  var e = makeExpectedArray(_n); // expected output
  var o = ({{nom}}(_n)); // actual output
  if (typeof o != 'object' || typeof o.length == 'undefined') {
    return done('{{nom}}(' + _n + ') did not return an array');
  }
  if (e[0] != o[0]) {
    done('first value of returned array: ' + o[0] + ', expected: ' + e[0]);
    return;
  }
  var eLast = e.pop();
  var oLast = o.pop();
  if (eLast != oLast) {
    done('last value of returned array: ' + oLast + ', expected: ' + eLast);
    return;
  }
  done(null, 1);
}, 10);
```

---

Définir une fonction `{{nom}}` qui prend un tableau en paramètre et renvoie (à l'aide de `return`) un autre tableau contenant seulement les valeurs de type `"{{type}}"` contenues dans le tableau passé en paramètre.

Le tableau résultant ne doit contenir que des {{fr}}, et donc aucune valeur `null` ou `undefined`.

- { "nom": "chaines", "type": "string", "fr": "chaînes de caractères" }
- { "nom": "nombres", "type": "number", "fr": "nombres" }

???
```js
setTimeout(function(){
  var done = application.remote._send;
  function makeExpectedArray(a) {
    var expected = [];
    for (var i in a) {
      if (typeof a[i] == '{{type}}') {
        expected.push(a[i]);
      }
    }
    return expected;
  }
  try {
    {{nom}};
  } catch(e) {
    return done('{{nom}} is not defined');
  };
  if (typeof {{nom}} != 'function') {
    return done('{{nom}}() definition not found');
  }
  var _a = [ null, 'a', 10, undefined, 'b', 4 ];
  var e = makeExpectedArray(_a); // expected output
  var o = ({{nom}}(_a)); // actual output
  if (typeof o != 'object' || typeof o.length == 'undefined') {
    return done('{{nom}}(' + _n + ') did not return an array');
  }
  if (e[0] != o[0]) {
    done('first value of returned array: ' + o[0] + ', expected: ' + e[0]);
    return;
  }
  var eLast = e.pop();
  var oLast = o.pop();
  if (eLast != oLast) {
    done('last value of returned array: ' + oLast + ', expected: ' + eLast);
    return;
  }
  done(null, 1);
}, 10);
```

---

Nous allons implémenter un petit jeu consistant à deviner un nombre entier choisi aléatoirement entre `1` et `4` (compris) par l'ordinateur.

Écrire le code JS permettant de stocker ce nombre aléatoire dans une variable `choixOrdi`, de demander un nombre a l'utilisateur (à l'aide de `prompt`), puis d'afficher `"{{bravo}}"` dans une alerte modale (à l'aide de `alert`) si ce nombre est égal à `choixOrdi`, ou `"il fallait deviner X"` (en remplaçant `X` par la valeur de `choixOrdi`) dans le cas contraire.

- { "bravo": "bravo" }
- { "bravo": "congrats" }
- { "bravo": "yeah" }
- { "bravo": "super" }

---
