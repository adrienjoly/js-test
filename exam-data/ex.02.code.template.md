## Acronyme

Un acronyme consiste en la concaténation des trois premières lettres de chaque prénom et nom d'une personne.

Voici quelques tests unitaires pour illustrer l'usage et les retours attendus d'une fonction `{{fctName}}()`:

```js
{{fctName}}(['adrien', 'joly']) === 'adrjol';
{{fctName}}(['paul', 'edouard', 'vaillant']) === 'pauedovai';
```

Définir la fonction `{{fctName}}` retournant l'acronyme d'une personne, à partir d'un tableau de prénom(s) et nom(s) passé en paramètre, tel que montré en exemple dans les tests unitaires ci-dessus.

Note: Vous pouvez utiliser les méthodes `substr()` ou `substring()` pour extraire les premières lettres d'une chaine de caractères.

- { "fctName": "acronyme" }
- { "fctName": "genererAcronyme" }
- { "fctName": "acro" }

???

Solution:

```js
function {{fctName}}(noms) {
  var acr = '';
  for (var i = 0; i < noms.length; i++) {
    acr = acr + noms[i].substr(0, 3);
  }
  return acr;
}
// remarque: il est aussi possible d'utiliser les méthodes map() et join() au lieu d'une boucle
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
  function unit(p, ret) {
    var result;
    try {
      result = studentFct(p);
    } catch(e) {
      return res(0, `l'appel {{fctName}}(${JSON.stringify(p)}) cause l'erreur: ${e.message}`);
    }
    return result === ret
      ? res(1, `l'appel {{fctName}}(${JSON.stringify(p)}) retourne bien ${ret}`)
      : res(0, `l'appel {{fctName}}(${JSON.stringify(p)}) devrait retourner ${ret}`)
  }
  application.remote._send(null, [
    `_studentCode`.replace(/[ \t]/g, '').indexOf('function{{fctName}}(') !== -1
      ? res(1, 'function {{fctName}} a bien été trouvé dans le code')
      : res(0, 'la fonction {{fctName}}() n\'est pas définie correctement'),
    unit(['adrien', 'joly'], 'adrjol'),
    unit(['paul', 'edouard', 'vaillant'], 'pauedovai'),
    unit(['eric', 'maubert'], 'erimau'),
  ]);
})();
```

---

## Programmation Orientée Objet

Vous souhaitez intégrer deux compteurs sur votre page Web. Chaque compteur doit être initialisé à zéro, puis, quand l'utilisateur cliquera sur un bouton, leur valeur devra augmenter automatiquement, jusqu'à atteindre leur valeur cible au bout d'une seconde. La valeur cible du premier compteur est `{{target}}`, celle du deuxième compteur est `45`.

Vous avez trouvé sur Internet un composant "compteur animé" fournissant la documentation suivante:

> Pour intégrer un compteur sur votre page:
> - instanciez la classe `{{class}}`, en passant en paramètre du constructeur le noeud HTML dans lequel intégrer le compteur. (ex: un `<div>`, tel que retourné par `document.getElementById()`)
> - puis appelez la méthode `countTo()` de cette instance, en passant la valeur cible en paramètre. Le compteur se mettra alors à compter automatiquement de la valeur `0` à la valeur cible passée en paramètre, en une seconde.
>
> Vous pouvez intégrer plusieurs compteurs sur une même page. Il suffit de créer une instance par compteur, et de les intégrer chacun dans un noeud HTML différent.

Voici le code HTML de votre page web:

```html
<div id="compteur1"></div>
<div id="compteur2"></div>
<button id="bouton">Démarrer compteurs<button>
```

Écrire le code du fichier JavaScript qui sera intégré à votre page pour:
 - intégrer les deux compteurs à l'aide du composant décrit plus haut, dans les `<div>` fournis;
 - démarrer les deux compteurs quand l'utilisateur clique sur le bouton.

Note: Supposez que le composant `{{class}}` a déjà été chargé dans la page. La classe est prête à être instanciée dans votre code. (Ne pas fournir la définition de ce composant.)

- { "target": "100", "class": "AnimCounter" }
- { "target": "100", "class": "Counter" }
- { "target": "10", "class": "AnimCounter" }
- { "target": "10", "class": "Counter" }

???

```js
var compteur1 = new {{class}}(document.getElementById('compteur1'));
var compteur2 = new {{class}}(document.getElementById('compteur2'));
document.getElementById('bouton').onclick = function() {
  compteur1.countTo({{target}});
  compteur2.countTo(45);
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  // __ PROVIDED CLASS __
  class {{class}} {
    constructor(el) {
      this.el = el;
      this.el.innerHTML = 0;
    }
    countTo(target) {
      this.el.innerHTML = target;
    }
  }
  // __ FAKE WEB BROWSER ___
  function _Node(attrs) {
    Object.assign(this, attrs);
  }
  _Node.prototype.setAttribute = function(key, value) {
    this[key] = value;
  };
  var _fakeDom = {
    bouton: new _Node({ tagName: 'button', id: 'bouton', }),
    compteur1: new _Node({ tagName: 'div', id: 'compteur1', }),
    compteur2: new _Node({ tagName: 'div', id: 'compteur2', }),
  };
  var document = {
    getElementById: (id) => _fakeDom[id],
    getElementsByTagName: (tagName) => _fakeDom.filter((node) => node.tagName === tagName),
    getElementsByClassName: (className) => _fakeDom.filter((node) => node.className === className),
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
  function alert(msg) {} // tolerate console.log calls
  var console = { log: function(t){} }; // tolerate console.log calls
  var window = {
    document: document,
    alert: alert,
    console: console,
  };
  // TODO: after successfull grading => add this fakedom code to /docs
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  // fonctions de test
  function test(prefix, id, val) {
    return _fakeDom[id].innerHTML === val
      ? res(1, `${prefix}, compteur1 affiche bien ${val}`)
      : res(0, `${prefix}, compteur1 devrait afficher ${val}`)
  }
  // état initial
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  var tests = [
    error
      ? res(0, 'erreur: ' + error.message)
      : res(1, 'le programme fonctionne sans erreur'),
    test(`avant clic de l'utilisateur`, `compteur1`, 0),
    test(`avant clic de l'utilisateur`, `compteur2`, 0),
  ];
  // clic
  error = null;
  try {
    _fakeDom.bouton.onclick({});
  } catch(e) {
    error = e;
  }
  application.remote._send(null, tests.concat([
    error
      ? res(0, `clic sur bouton à causé une erreur: ` + error.message)
      : res(1, `clic sur bouton ne cause aucune erreur`),
    test(`1 seconde après clic`, `compteur1`, {{target}}),
    test(`1 seconde après clic`, `compteur2`, 45),
  ]));
})();
```

---

## Requête AJAX

Écrire un programme JavaScript permettant:
 - d'ajouter une "ressource" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;
 - cette ressource est un objet JSON dont la propriété `{{prop}}` doit avoir pour valeur la chaine de caractères `{{val}}`; (vous pouvez donner la valeur de votre choix aux autres propriétés)
 - puis afficher dans un `{{output}}()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)

Pour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.

- { "prop": "title", "val": "Heroku", "output": "alert" }
- { "prop": "body", "val": "Firebase", "output": "alert" }
- { "prop": "title", "val": "Firebase", "output": "console.log" }
- { "prop": "body", "val": "Heroku", "output": "console.log" }

???

```js
var xhr = new XMLHttpRequest(); 
xhr.open('POST', 'https://js-jsonplaceholder.herokuapp.com/posts');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    //console.info('reponse reçue:', xhr.responseText);
    var reponse = JSON.parse(xhr.responseText);
    {{output}}(reponse.id);
  }
};
xhr.send(JSON.stringify({
  {{prop}}: '{{val}}',
}));
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _expectedId = 101;
  var _alerts = [], _logs = [], _instances = [], _opens = [], _sends = [];
  var _results = '{{output}}' === 'alert' ? _alerts : _logs;
  var alert = _alerts.push.bind(_alerts);
  var console = {
    log: _logs.push.bind(_logs)
  };
  function XMLHttpRequest(){
    _instances.push(this);
  }
  XMLHttpRequest.prototype.open = function(method, url) {
    _opens.push(arguments);
  }
  XMLHttpRequest.prototype.send = function(data) {
    _sends.push(data);
    setTimeout(() => {
      this.readyState = 3;
      try { this.onreadystatechange(); } catch (e) {}
    }, 10);
    setTimeout(() => {
      this.readyState = 4;
      this.responseText = JSON.stringify(Object.assign(
        {},
        typeof data === 'object' ? data : {},
        { id: _expectedId }
      ));
      try { this.onreadystatechange(); } catch (e) {}
    }, 20);
  };
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
  setTimeout(() => {
    //application.remote._log(_opens);
    var content;
    try {
      content = JSON.parse(_sends[0]);
    } catch (e) {}
    application.remote._send(null, [
      error
        ? res(0, 'erreur: ' + error.message)
        : res(1, 'le programme fonctionne sans erreur'),
      `_studentCode`.indexOf('new XMLHttpRequest') === -1
        ? res(0, 'il fallait instancier `XMLHttpRequest` avec le mot-clé `new`')
        : res(1, 'la classe `XMLHttpRequest` a bien été instanciée avec le mot-clé `new`'),
      _opens.length !== 1
        ? res(0, 'il fallait appeler la méthode open() de l\'instance de `XMLHttpRequest`')
        : res(1, 'la méthode open() de l\'instance de `XMLHttpRequest` a bien été appelée'),
      (_opens[0] || ['', ''])[0].toLowerCase() !== 'post'
        ? res(0, 'il fallait passer `POST` comme 1er paramètre de la méthode open()')
        : res(1, '`POST` a bien été passé en paramètre de la méthode open()'),
      (_opens[0] || ['', ''])[1] !== 'https://js-jsonplaceholder.herokuapp.com/posts'
        ? res(0, 'il fallait passer l\'url demandée comme 2ème paramètre de la méthode open()')
        : res(1, 'l\'url demandée a bien été passée en paramètre de la méthode open()'),
      typeof (_instances[0] || {}).onreadystatechange !== 'function'
        ? res(0, 'il fallait affecter une fonction à la propriété `onreadystatechange` de l\'instance')
        : res(1, 'une fonction a bien été affectée à la propriété `onreadystatechange` de l\'instance'),
      _sends.length !== 1
        ? res(0, 'il fallait appeler la méthode send() une fois pour envoyer la requête')
        : res(1, 'la méthode send() a bien été appelée une fois'),
      (content || {}).{{prop}} !== '{{val}}'
        ? res(0, 'il fallait passer à send() un objet ayant une propriété {{prop}}: {{val}}')
        : res(1, 'un objet ayant une propriété {{prop}}: {{val}} a bien été passé à send()'),
      !_results.length || _results[_results.length - 1] != _expectedId
        ? res(0, `la valeur d\'id ${_expectedId} aurait être affichée dans un {{output}}()`)
        : res(1, `la valeur d\'id ${_expectedId} a bien été affichée dans un {{output}}()`),
    ]);
  }, 50);
})();
```

---

## Jeu des 7 différences

Un client souhaite permettre aux utilisateurs de son site de comparer facilement deux images, en passant de l'une à l'autre autant de fois qu'il le souhaite.

Le code HTML de la page est fourni:

```html
<button id="bouton1">image 1</button>
<button id="bouton2">image 2</button>
<img id="image" src="{{{img1}}}">
```

Écrire le code JavaScript permettant:
 - d'afficher l'image `{{{img1}}}` dans la balise `<img>` quand l'utilisateur clique sur le `bouton1`;
 - d'afficher l'image `{{{img1}}}` dans la balise `<img>` quand l'utilisateur clique sur le `bouton2`.

Le code que vous écrirez ci-dessous sera stocké dans un fichier `.js` puis intégré à la page du client via une balise `<script>`.

- { "img1": "https://i.imgur.com/X3iY0e3.jpg", "img2": "https://i.imgur.com/MrsKxdZ.jpg" }
- { "img1": "https://i.imgur.com/MrsKxdZ.jpg", "img2": "https://i.imgur.com/X3iY0e3.jpg" }

???

Solution:

```js
var image = document.getElementById('image');
document.getElementById('bouton1').onclick = function() {
  image.src = '{{{img1}}}';
};
document.getElementById('bouton2').onclick = function() {
  image.src = '{{{img1}}}';
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _urls = [
    '{{{img1}}}',
    '{{{img1}}}',
  ];
  // __ FAKE WEB BROWSER ___
  function _Node(attrs) {
    Object.assign(this, attrs);
  }
  _Node.prototype.setAttribute = function(key, value) {
    this[key] = value;
  };
  var _fakeDom = {
    bouton1: new _Node({ tagName: 'button', id: 'bouton1', }),
    bouton2: new _Node({ tagName: 'button', id: 'bouton2', }),
    image: new _Node({ tagName: 'img', id: 'image', src: _urls[0], }),
  };
  var document = {
    getElementById: (id) => _fakeDom[id],
    getElementsByTagName: (tagName) => _fakeDom.filter((node) => node.tagName === tagName),
    getElementsByClassName: (className) => _fakeDom.filter((node) => node.className === className),
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
  function alert(msg) {} // tolerate console.log calls
  var console = { log: function(t){} }; // tolerate console.log calls
  var window = {
    document: document,
    alert: alert,
    console: console,
  };
  // TODO: after successfull grading => add this fakedom code to /docs
  function res(pts, msg) {
    application.remote._log((pts ? '[+] ' : '[-] ') + msg);
    return pts;
  }
  // fonctions de test
  function clicSur(id, imgUrl) {
    var error = null;
    try {
      _fakeDom[id].onclick({});
    } catch(e) {
      error = e;
    }
    return [
      error
        ? res(0, `clic sur ${id} à causé une erreur: ` + error.message)
        : res(1, `clic sur ${id} ne cause aucune erreur`),
      _fakeDom.image.src === imgUrl
        ? res(1, `clic sur ${id} => image ${imgUrl} est bien affichée`)
        : res(0, `clic sur ${id} => image ${imgUrl} devrait être affichée`)
    ];
  }
  // état initial
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  var tests = [
    error
      ? res(0, 'erreur: ' + error.message)
      : res(1, 'le programme fonctionne sans erreur'),
    _fakeDom.image.src === _urls[0]
      ? res(1, 'l\'image initiale n\'est pas modifiée tant que l\'utilisateur ne clique pas')
      : res(0, 'l\'image initiale ne devrait pas être modifiée tant que l\'utilisateur ne clique pas')
  ];
  // clics successifs sur les boutons
  tests = tests.concat(clicSur('bouton1', _urls[0]));
  tests = tests.concat(clicSur('bouton2', _urls[1]));
  tests = tests.concat(clicSur('bouton1', _urls[0]));
  application.remote._send(null, tests);
})();
```
