# Requête AJAX simple

Écrire un programme JavaScript permettant:

 - d'envoyer une requête HTTP GET à l'URL `https://js-jsonplaceholder.herokuapp.com/photos/{{number}}`,
 - puis d'afficher avec `alert()` la réponse complète du serveur à cette requête.

Utiliser la classe `XMLHttpRequest()` pour effectuer cette requête.

- { "number": 1 }
- { "number": 1 }
- { "number": 2 }

???

```js
var xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://js-jsonplaceholder.herokuapp.com/photos/{{number}}');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    alert(xhr.responseText);
  }
};
xhr.send();
```

--

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
      (_urls[0] || '') !== 'https://js-jsonplaceholder.herokuapp.com/photos/{{number}}'
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

---

# Album interactif

Un client souhaite un moyen d'accéder rapidement à l'URL d'une photo, à partir du numéro d'identifiant de cette photo.

Il met à disposition une API permettant d'accéder à la base de données de photos. Il suffit d'effectuer une requête HTTP GET à l'URL `https://js-jsonplaceholder.herokuapp.com/photos/<numero>`, où `<numero>` est à remplacer par le numéro d'identifiant dont on souhaite récupérer les données de la photo correspondante. L'API retourne alors une réponse au format JSON, contenant une propriété `{{prop}}`.

Nous allons développer une solution simple consistant en:

 - une page HTML contenant un champ permettant de saisir le numéro d'identifiant d'une photo, un bouton pour effectuer la requête, et un deuxième champ qui contiendra l'URL correspondante (récupérée depuis l'API),
 - et un programme JavaScript permettant d'effectuer les requêtes AJAX correspondantes vers leur API, et d'afficher la valeur de la propriété `{{prop}}` de la photo spécifiée, à chaque fois que l'utilisateur cliquera sur le bouton.

La page HTML de cette solution est fournie. Voici le code source de son `<body>`:

```html
<label for="numero">Numéro d'identifiant de la photo:</label>
<input id="numero" type="text">
<input id="bouton" type="button" value="Chercher">
<p>Résultat:</p>
<input id="{{prop}}" type="text" readonly>
```

L'utilisateur doit pouvoir effectuer plusieurs recherches d'affilée, en tapant un autre numéro d'identifiant puis cliquant à nouveau sur le bouton.

Écrire le programme JavaScript à associer à cette page.

Note: Vous devrez utiliser la classe `XMLHttpRequest()` pour effectuer les requêtes.

- { "prop": "url" }
- { "prop": "thumbnailUrl" }

???

```js
var numero = document.getElementById('numero');
var bouton = document.getElementById('bouton');
var {{prop}} = document.getElementById('{{prop}}');
bouton.onclick = function() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', 'https://js-jsonplaceholder.herokuapp.com/photos/' + numero.value);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var record = JSON.parse(xhr.responseText);
      {{prop}}.value = record.{{prop}};
    }
  };
  xhr.send();
};
```

Solution complète: [jsfiddle](https://jsfiddle.net/omgxf4s7/1/)

--

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
    'https://js-jsonplaceholder.herokuapp.com/photos/4' : {
      albumId: 1,
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "http://placehold.it/600/d32776",
      thumbnailUrl: "http://placehold.it/150/39e985"
    },
    'https://js-jsonplaceholder.herokuapp.com/photos/6' : {
      albumId: 1,
      id: 6,
      title: "accusamus ea aliquid et amet sequi nemo",
      url: "http://placehold.it/600/56a8c2",
      thumbnailUrl: "http://placehold.it/150/c672a0"
    },
  };
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
    this.responseText = JSON.stringify(_expectedResponses[this.url]);
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
    application.remote._log(`\-\-\- Simulation de requête pour photo numéro ${numero} ...`);
    var expectedUrl = 'https://js-jsonplaceholder.herokuapp.com/photos/' + numero;
    var expectedValue = _expectedResponses[expectedUrl].{{prop}};
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
