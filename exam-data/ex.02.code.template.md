# Exercices de code (5 points par exercice)

Ré-écrire ce code de manière à ce qu'il utilise `async` et `await`, au lieu de `then()` et `catch()`. Les erreurs doivent être correctement interceptées.

```js
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('{{{url}}}')
  .then(function (client) {
    return client.db('test').collection('dates').find().toArray();
  })
  .then(function (dates) {
    console.log('dates:', dates);
  })
  .catch(function (err) {
    console.error('erreur:', err);
  });
```

- { "url": "mongodb://localhost:27017/test" }

???

```js
// expected solution
const MongoClient = require('mongodb').MongoClient;
(async () => {
  try {
    const client = await MongoClient.connect('{{{url}}}');
    const dates = await client.db('test').collection('dates').find().toArray();
    console.log('dates:', dates);
  } catch (err) {
    console.error('erreur:', err);
  }
})();
```

--

```js
// automatic student evaluation code
(async function evaluateStudentCode(){
  const EXPECTED_ARRAY = [ '__ expected result __' ];
  const EXPECTED_ERROR = new Error('unable to connect');
  const makeMongoClient = ({ shouldFail }) => {
    const client = {
    connect: async (url) => {
      if (shouldFail) throw EXPECTED_ERROR;
        if (url === '{{{url}}}') return Promise.resolve(client);
      else throw new Error(`unexpected connection url: ${url}`);
    },
    db: (name) => {
        if (name === 'test') return client;
      else throw new Error(`unexpected db name: ${name}`);
    },
    collection: (name) => {
        if (name === 'dates') return client;
      else throw new Error(`unexpected coll name: ${name}`);
    },
    find: () => ({
      toArray: async () => EXPECTED_ARRAY
    })
    };
    return client;
  };
  async function runInContext({ shouldFail }) {
    let error = undefined;
    let lastLogParams = [];
    let lastErrParams = [];
    const console = {
      log: (message, param) => lastLogParams = [message, param],
      error: (message, param) => lastErrParams = [message, param],
    };
    const MongoClient = makeMongoClient({ shouldFail });
    const require = () => ({ MongoClient });
    try {
      eval(`_studentCode`); // run student's code
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch(e) {
      error = e;
    }
    return { error, lastLogParams, lastErrParams };
  }
  const successfulExec = await runInContext({ shouldFail: false });
  const impossibleExec = await runInContext({ shouldFail: true });
  const normalisedCode = `_studentCode`.replace(/[ \n]/g, '');
  function res(pts, msg) {
    application.remote._log((pts ? ' ✅ ' : ' ❌ ') + msg);
    return pts; 
  }
  const scoreArray = [
    !normalisedCode.includes('.then(') && !normalisedCode.includes('.catch(')
      ? res(1, 'ne pas utiliser then() et catch()')
      : res(0, 'ne pas utiliser then() et catch()'),
    normalisedCode.includes('async') && normalisedCode.includes('await')
      ? res(1, 'utiliser async et await')
      : res(0, 'utiliser async et await'),
    !successfulExec.error
      ? res(1, 'exécution du code sans erreur')
      : res(0, `erreur survenue en exécutant le code: ${successfulExec.error}`),
    successfulExec.lastLogParams[1] == EXPECTED_ARRAY
      ? res(1, 'cas nominal: tableau de dates récupéré et affiché dans la console')
      : res(0, `cas nominal: affiché dans la console au lieu des dates: ${successfulExec.lastLogParams[1]}`),
    impossibleExec.lastErrParams[1] == EXPECTED_ERROR
      ? res(1, 'cas d\'erreur: message bien affiché dans la console')
      : res(0, `cas d\'erreur: message affiché dans la console: ${successfulExec.lastErrParams[1]}`),
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
