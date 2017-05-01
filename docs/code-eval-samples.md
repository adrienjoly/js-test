# Browser mocking and error handling

In order to test browser-based code, DOM functions must be mocked.

In order to avoid the evaluation code to crash and give zero points to the student, student code must be run using the following manner:

```js
try {
  eval(`_studentCode`); // catch syntax errors, if any
} catch(e) {
  error = e;
}
```

A `res()` function was created to provide feedback to students and count points. (for grading)

## Mock alert(), and sequential tests

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

## Testing a function from student's code

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

## Testing the output of a student's loop

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

## Testing code relying on XMLHttpRequest

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _instances = [], _alerts = [], _methods = [], _urls = [], _sends = [];
  var _expectedResponse = `{"id": {{number}}}`;
  function XMLHttpRequest(){
    _instances.push(this);
  }
  XMLHttpRequest.prototype.open = function(method, url) {
    _methods.push(method);
    _urls.push(url);
  };
  XMLHttpRequest.prototype.send = function(data) {
    _sends.push(data);
    setTimeout(() => {
      this.readyState = 2;
      try { this.onreadystatechange(); } catch (e) {}
    }, 50);
    setTimeout(() => {
      this.readyState = 3;
      try { this.onreadystatechange(); } catch (e) {}
    }, 100);
    setTimeout(() => {
      this.readyState = 4;
      this.responseText = _expectedResponse;
      try { this.onreadystatechange(); } catch (e) {}
    }, 150);
  };
  function alert(msg) {
    _alerts.push(msg);
  }
  var console = { log: function(t){} }; // tolerate console.log calls
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var studentCode = `_studentCode`.trim();
  //var canonicCode = studentCode.replace(/[ ;\r\n\t]/g, '');
  setTimeout(() => {
    var tests = [
      error
        ? res(0, 'erreur: ' + error.message)
        : res(1, 'le programme fonctionne sans erreur'),
      studentCode.indexOf('new XMLHttpRequest') === -1
        ? res(0, 'il fallait instancier `XMLHttpRequest` avec le mot-clé `new`')
        : res(1, 'la classe `XMLHttpRequest` a bien été instanciée avec le mot-clé `new`'),
      _methods.length === 0 || _urls.length === 0
        ? res(0, 'il fallait appeler la méthode open() de l\'instance de `XMLHttpRequest`')
        : res(1, 'la méthode open() de l\'instance de `XMLHttpRequest` a bien été appelée'),
      (_methods[0] || '').toLowerCase() !== 'get'
        ? res(0, 'il fallait passer `GET` comme 1er paramètre de la méthode open()')
        : res(1, '`GET` a bien été passé en paramètre de la méthode open()'),
      (_urls[0] || '') !== 'https://js-jsonplaceholder.herokuapp.com/posts/{{number}}'
        ? res(0, 'il fallait passer l\'url comme 2ème paramètre de la méthode open()')
        : res(1, 'l\'url a bien été passée en paramètre de la méthode open()'),
      typeof (_instances[0] || {}).onreadystatechange !== 'function'
        ? res(0, 'il fallait affecter une fonction à la propriété `onreadystatechange` de l\'instance')
        : res(1, 'une fonction a bien été affectée à la propriété `onreadystatechange` de l\'instance'),
      _sends.length === 0
        ? res(0, 'il fallait appeler la méthode send() pour envoyer la requête')
        : res(1, 'la méthode send() a bien été appelée'),
      _alerts[0] !== _expectedResponse
        ? res(0, 'le contenu de la propriété `responseText` devait être affiché dans un alert()')
        : res(1, 'le contenu de la propriété `responseText` a bien été affiché dans un alert()'),
    ];
    application.remote._send(null, tests);
  }, 200)
})();
```

## Testing code relying on user clicks on DOM nodes + AJAX

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  // __ FAKE WEB BROWSER ___
  function _Node(attrs) {
    Object.assign(this, attrs);
  }
  _Node.prototype.setAttribute = function(key, value) {
    this[key] = value;
  };
  var _fakeDom = {
    numero: new _Node({ id: 'numero', value: '', }),
    bouton: new _Node({ id: 'bouton', value: 'Chercher', }),
    {{prop}}: new _Node({ id: '{{prop}}', value: '', }),
  };
  var document = {
    getElementById: function(id) {
      return _fakeDom[id];
    },
    /*
    getElementsByTagName: function(tagName) {
      return (tagName || '').toLowerCase() === 'div' ? [ _div ] : [];
    },
    */
    querySelector: function(selector) {
      selector = '' + selector
      return selector[0] === '#' ? _fakeDom[selector.substr(1)] : null;
    },
    querySelectorAll: function(selector) {
      selector = '' + selector
      if (selector.toLowerCase() === 'input') {
        return Object.values(_fakeDom);
      } else {
        return selector[0] === '#' ? [ _fakeDom[selector.substr(1)] ] : [];
      }
    },
  };
  function alert(msg) {} // tolerate console.log calls
  var console = { log: function(t){} }; // tolerate console.log calls
  var window = {
    document: document,
    alert: alert,
    console: console,
  };
  // __ FAKE AJAX ___
  var _instances = [],  _methods = [], _urls = [], _sends = [];
  var _expectedResponses = {
    'https://js-jsonplaceholder.herokuapp.com/users/4' : `{
  "id": 4,
  "name": "Patricia Lebsack",
}`,
    'https://js-jsonplaceholder.herokuapp.com/users/6' : `{
  "id": 6,
  "name": "Mrs. Dennis Schulist",
}`,
  }
  function XMLHttpRequest(){
    _instances.push(this);
  }
  XMLHttpRequest.prototype.open = function(method, url) {
    this.url = url;
    _methods.push(method);
    _urls.push(url);
  };
  XMLHttpRequest.prototype.send = function(data) {
    _sends.push(data);
    this.readyState = 4;
    this.responseText = _expectedResponses[this.url];
    try { this.onreadystatechange(); } catch (e) {}
  };
  // __ RUN STUDENT CODE ___
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var studentCode = `_studentCode`.trim();
  //var canonicCode = studentCode.replace(/[ ;\r\n\t]/g, '');

  var tests = [
    error
      ? res(0, 'erreur: ' + error.message)
      : res(1, 'le programme fonctionne sans erreur'),
    typeof _fakeDom.bouton.onclick !== 'function'
      ? res(0, 'il fallait affecter une fonction à la propriété `onclick` du bouton')
      : res(1, 'une fonction a bien été affectée à la propriété `onclick` du bouton'),
    studentCode.indexOf('new XMLHttpRequest') === -1
      ? res(0, 'il fallait instancier `XMLHttpRequest` avec le mot-clé `new`')
      : res(1, 'la classe `XMLHttpRequest` a bien été instanciée avec le mot-clé `new`'),
    _sends.length !== 0
      ? res(0, 'il ne fallait pas appeler la méthode send() avant que l\'utilisateur clique sur le bouton')
      : res(1, 'la méthode send() n\'est pas appelée tant que l\'utilisateur n\'a plas cliqué sur le bouton'),
  ];

  /* simulate requests: */ [ '4', '6' ].forEach((numero) => {
    application.remote._log(`\-\-\- Simulation de requête pour adhérent numéro ${numero} ...`);
    var expectedUrl = 'https://js-jsonplaceholder.herokuapp.com/users/' + numero;
    var expectedValue = JSON.parse(_expectedResponses[expectedUrl]).{{prop}};
    // run student's onclick handler
    _fakeDom.numero.value = numero;
    _sends = [];
    try { _fakeDom.bouton.onclick({}) } catch (e) { error = e }
    var providedUrl = _urls.shift();
    // run tests
    tests = tests.concat([
      error
        ? res(0, 'erreur après clic sur le bouton: ' + error.message)
        : res(1, 'le programme fonctionne sans erreur quand on clique sur le bouton'),
      providedUrl !== expectedUrl
        ? res(0, `au clic, il fallait passer l\'url ${expectedUrl} à la méthode open(), et non ${providedUrl}`)
        : res(1, `au clic, l\'url passée en paramètre de la méthode open() est correcte`),
      _sends.length !== 1
        ? res(0, 'au clic, il fallait appeler la méthode send() une fois pour envoyer la requête')
        : res(1, 'au clic, la méthode send() a bien été appelée une fois'),
      _fakeDom.{{prop}}.value !== expectedValue
        ? res(0, `la valeur ${expectedValue} aurait du apparaitre dans le champ {{prop}}`)
        : res(1, `la valeur ${expectedValue} a bien été affichée dans le champ {{prop}}`),
    ]);
  });

  application.remote._send(null, tests);
})();
```
