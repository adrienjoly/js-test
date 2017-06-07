# Samples and patterns for student code evaluation tests

## Basic code evaluation test

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  application.remote._send(null, 1); // => give 1 point to the student
})();
```

## Return a code evaluation array

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  application.remote._send(null, [1, 1, 0]); // => give 2 points / 3 to the student
})();
```

## Return a code evaluation array with feedback/notes

A `res()` function was created to provide feedback to students and count points. (for grading)

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts; 
  }
  var tests = [
    2 === 2
      ? res(1, '2 equals 2, as expected 👍')
      : res(0, '2 should equal 2 ... 😿'),
  ];
  application.remote._send(null, tests); // 1 passing test => 1 point
})();
```

## Safe student code execution

In order to avoid the evaluation code to crash and give zero points to the student, student code must be run using the following manner:

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var error;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts; 
  }
  var tests = [
    !error
      ? res(1, 'no error occurred while running your code 👍')
      : res(0, `an error occurred while running your code: ${error.message} 😿`),
    2 === 2
      ? res(1, '2 equals 2, as expected 👍')
      : res(0, '2 should equal 2 ... 😿'),
  ];
  application.remote._send(null, tests); // 2 passing tests => 2 point
})();
```

## Testing a function from student's code

With variants:

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _scope = {}; // store the function name in the global scope 
  var error;
  try {
    eval(`_studentCode`.replace(/function ([^ \(]+)/g, '_scope.$1 = function'));
    /* will associate the student's function to the global var above */
  } catch (e) {
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var studentFct = _scope[`{{{fctName}}}`]; // value of fctName depends on the student's variant
  var tests = [
    `_studentCode`.replace(/[ \t]/g, '').indexOf('function{{fctName}}(') !== -1
      ? res(1, 'function {{fctName}} was found in your code 👍')
      : res(0, 'function {{fctName}}() was not defined as expected ... 😿'),
    !error
      ? res(1, 'no error occurred while running your code 👍')
      : res(0, `an error occurred while running your code: ${error.message} 😿`),
    typeof studentFct === 'function' && studentFct(`{{{input}}}`) === `{{{expected}}}`
      ? res(1, `{{{fctName}}}('{{{input}}}') returns '{{{expected}}}', as expected 👍`)
      : res(0, `{{{fctName}}}('{{{input}}}') should have returned '{{{expected}}}' 😿`),
  ];
  application.remote._send(null, tests); // 1 point per passing test
})();
```

## Mock/tolerate calls to `alert()` and `console.log()`

In order to test browser-based code from students, the corresponding functions must be implemented.

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _alerts = [];
  // calls to alert() will be logged to the _alerts array
  function alert(p) {
    _alerts.push(p);
  }
  // tolerate (but ignore) calls to console.log()
  var console = {
    log: function(){}
  };
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    error = e;
  }
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  var tests = [
    !error
      ? res(1, 'no error occurred while running your code 👍')
      : res(0, `an error occurred while running your code: ${error.message} 😿`),
    _alerts.length === 1 && _alerts[0] === '{{{expectedValue}}}'
      ? res(1, `{{{expectedValue}}} was displayed in an alert(), as expected 👍`)
      : res(0, `{{{expectedValue}}} should have been displayed in an alert() ... 😿`),
  ];
  application.remote._send(null, tests); // 1 point per passing test
})();
```
## Example: testing the output of a student's loop

Student is expected to make a `for` loop that displays numbers using `console.log()`:

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _logged = [];
  var _expected = [];
  // generate expected array, based on provided values {{n1}} and {{n2}}
  for (var i = {{n1}}; i <= {{n2}}; i++) {
    _expected.push(i)
  }
  // mock console.log()
  var console = {
    log: function(i){
      _logged.push(i);
    }
  };
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch (e) {
    error = e;
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
    !error
      ? res(1, 'no error occurred while running your code 👍')
      : res(0, `an error occurred while running your code: ${error.message} 😿`),
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
  application.remote._send(null, tests); // => 1 point per passing test
})();
```


## Testing AJAX code relying on `XMLHttpRequest` (asynchronous)

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _expectedResponse = `{"id": {{number}}}`;
  var _instances = [], _alerts = [], _methods = [], _urls = [], _sends = [];
  function alert(msg) {
    _alerts.push(msg);
  }
  // fake/mocked XMLHttpRequest class
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
  // run student's code
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
  // ... or canonic version: studentCode.replace(/[ ;\r\n\t]/g, '')
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

## Fake web browser: testing code relying on user clicks on DOM nodes + AJAX

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  // polyfill Object.values()
  Object.prototype.values = Object.prototype.values || (obj => Object.keys(obj).map(key => obj[key]));
  // __ FAKE WEB BROWSER / DOM API MOCK ___
  function _Node(attrs) {
    Object.assign(this, attrs);
  }
  _Node.prototype.setAttribute = function(key, value) {
    this[key] = value;
  };
  // mock the DOM
  var _fakeDom = {
    numero: new _Node({ tagName: 'input', id: 'numero', value: '', }),
    bouton: new _Node({ tagName: 'input', id: 'bouton', value: 'Chercher', }),
    {{prop}}: new _Node({ tagName: 'input', id: '{{prop}}', value: '', }),
  };
  // mock the document object
  var document = {
    getElementById: (id) => _fakeDom[id],
    getElementsByTagName: (tagName) => Object.values(_fakeDom).filter((node) => node.tagName === tagName),
    getElementsByClassName: (className) => Object.values(_fakeDom).filter((node) => node.className === className),
    querySelectorAll: function(selector) {
      selector = '' + selector
      switch (selector[0]) {
        case '#': return [ this.getElementById(selector.substr(1)) ];
        case '.': return this.getElementsByClassName(selector.substr(1));
      }
      return this.getElementsByTagName(selector);
    },
    querySelector: function(selector) {
      return this.querySelectorAll(selector)[0];
    },
  };
  // tolerate (and ignore) calls to console.log & alert, then mock the window object
  function alert(msg) {}
  var console = {
    log: function(t){}
  };
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
