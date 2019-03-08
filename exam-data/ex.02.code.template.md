# Exercices de code (5 points par exercice)

Ré-écrire ce code de manière à ce qu'il utilise `async` et `await`, au lieu de `then()` et `catch()`. Les erreurs doivent être correctement interceptées.

```js
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('{{{url}}}')
  .then(function (db) {
    return db.collection('dates').find().toArray();
  })
  .then(function (dates) {
    console.log('dates:', dates);
  })
  .catch(function (err) {
    console.error('erreur:', err)
  });
```

- { "url": "mongodb://localhost:27017/test" }

???

```js
// expected solution
alert('{{{url}}}');
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  function runInContext() {
    var points = 0;
    try {
      eval('function alert(msg) { points = 1; };' // fake alert() function that gives 1 point when called
          + `_studentCode`); // run student's code
    } catch(e) {
      application.remote._log(`error: ${e}`);
    }
    return points;
  }
  var scoreArray = [
    /{{sample_variant}}/.test(`_studentCode`), // 1 point if value was included
    runInContext(), // will return 1 point if student used alert()
  ];
  application.remote._send(null, scoreArray);
})();
```

---

Le fichier `index.js` contient le code suivant:

```js
const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000);
```

Quelles lignes de code faut-il ajouter à ce fichier pour que `curl http://localhost:3000/bonjour` affiche "Hello", une fois qu'on aura exécuté ce programme avec `node index.js` ?

???

```js
// TODO: expected solution
```

--

```js
// TODO: automatic student evaluation code
```

---

L'objectif est d'écrire un programme Node.js permettant d'afficher dans la sortie standard (c.a.d. en utilisant `console.log()`) l'adresse email de trois personnes dont les données seront à récupérer en JSON depuis les URLs suivantes:

 - https://js-jsonplaceholder.herokuapp.com/users/1
 - https://js-jsonplaceholder.herokuapp.com/users/2
 - https://js-jsonplaceholder.herokuapp.com/users/3

Seules les adresses email doivent être affichées. Et l'affichage de ces adresses doit respecter l'ordre des URLs fournies ci-dessus. C'est à dire que l'adresse email de la personne `1` doit être affichée en premier, et ainsi de suite.

Votre programme devra utiliser le module `node-fetch` pour effectuer les requêtes. Voici le contenu actuel du programme:

```js
const fetch = require('node-fetch');
const urlsToFetch = [
 'https://js-jsonplaceholder.herokuapp.com/users/1',
 'https://js-jsonplaceholder.herokuapp.com/users/2',
 'https://js-jsonplaceholder.herokuapp.com/users/3'
];
```

Quelles lignes de code faut-il ajouter pour que ce programme affiche l'adresse email de ces utilisateurs, quand on l'exécutera avec `node`.

???

```js
// TODO: expected solution
```

--

```js
// TODO: automatic student evaluation code
```
