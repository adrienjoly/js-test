# Requête AJAX simple

Écrire un programme JavaScript permettant:

 - d'envoyer une requête HTTP GET à l'URL `https://js-jsonplaceholder.herokuapp.com/posts/4`,
 - puis d'afficher avec `alert()` la réponse finale du serveur à cette requête.

Utiliser la classe `XMLHttpRequest()` pour effectuer cette requête.

???

```js
var xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://js-jsonplaceholder.herokuapp.com/posts/4');
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
  var _expectedResponse = `{"userId": 1,"id": 4}`;
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
        ? res(0, 'il passer `GET` comme 1er paramètre de la méthode open()')
        : res(1, '`GET` a bien été passé en paramètre de la méthode open()'),
      (_urls[0] || '') !== 'https://js-jsonplaceholder.herokuapp.com/posts/4'
        ? res(0, 'il passer l\'url comme 2ème paramètre de la méthode open()')
        : res(1, 'l\'url a bien été passée en paramètre de la méthode open()'),
      typeof _instances[0].onreadystatechange !== 'function'
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

# Annuaire interactif

Un client souhaite un moyen d'accéder rapidement à l'adresse email d'un adhérent, à partir de son numéro d'adhérent.

Il met à disposition une API permettant d'accéder aux données de chaque adhérent. Il suffit d'effectuer une requête HTTP GET à l'URL `https://jsonplaceholder.typicode.com/users/<numero>`, où `<numero>` est à remplacer par le numéro d'adhérent dont on souhaite récupérer les données. L'API retourne alors une réponse au format JSON, contenant une propriété `email`.

Nous allons développer une solution simple consistant en:
 - une page HTML contenant un champ permettant de saisir le numéro d'adhérent, un bouton pour en obtenir l'adresse email, et un deuxième champ qui contiendra l'adresse email de l'adhérent,
 - et un programme JavaScript permettant d'effectuer les requêtes AJAX correspondantes vers leur API, et d'afficher l'adresse email de l'adhérent spécifié à chaque fois que l'utilisateur cliquera sur le bouton.

La page HTML de cette solution est fournie. Voici son code source:

```html
TODO
```

L'utilisateur doit pouvoir effectuer plusieurs recherches d'affilée, en tapant un autre numéro d'adhérent puis cliquant à nouveau sur le bouton.

Écrire le programme JavaScript à associer à cette page.

Vous devrez utiliser la classe `XMLHttpRequest()` pour effectuer les requêtes.

???

```js
var numero = document.getElementById('numero');
var bouton = document.getElementById('bouton');
var email = document.getElementById('email');
bouton.onclick = function() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + numero.value);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var adherent = JSON.parse(xhr.responseText);
      email.value = adherent.email;
    }
  };
  xhr.send();
};
```

--

TODO: code d'évaluation
 - pas d'erreur de syntaxe
 - affectation du onclick sur bouton
 - instanciation XMLHttpRequest avec new
 - pas de requete tant que bouton non pressé
 - requête avec numero=4 => requête bien émise à la bonne URL
 - requête avec numero=4 => email bien affichée dans le champ
 - requête avec numero=6 => requête bien émise à la bonne URL
 - requête avec numero=6 => email bien affichée dans le champ
