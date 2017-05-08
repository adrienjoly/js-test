# Requête AJAX POST

Écrire un programme JavaScript permettant:
 - d'ajouter une "ressource" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;
 - cette ressource est un objet JSON dont la propriété `{{prop}}` doit avoir pour valeur la chaine de caractères `{{val}}`; (vous pouvez donner la valeur de votre choix aux autres propriétés)
 - puis afficher dans un `{{output}}()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)

Pour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.

Ne pas utiliser jQuery.

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
xhr.send({
  {{prop}}: '{{val}}',
});
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
      (_sends[0] || {}).{{prop}} !== '{{val}}'
        ? res(0, 'il fallait passer à send() un objet ayant une propriété {{prop}}: {{val}}')
        : res(1, 'un objet ayant une propriété {{prop}}: {{val}} a bien été passé à send()'),
      !_results.length || _results[_results.length - 1] != _expectedId
        ? res(0, `la valeur d\'id ${_expectedId} aurait être affichée dans un {{output}}()`)
        : res(1, `la valeur d\'id ${_expectedId} a bien été affichée dans un {{output}}()`),
    ]);
  }, 50);
})();
```
