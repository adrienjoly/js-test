# Exercices de code (3.75 points par exercice)

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
const {{app}} = express();
```

Quelles lignes de code faut-il ajouter à ce fichier pour que:

 - `curl http://localhost:3000/bonjour?prenom=Michelle` réponde "`Hello Michelle`" (au format texte brut, sans les guillemets, et le prénom devra systématiquement correspondre à celui passé en paramètre),
 - `curl http://localhost:3000/bonjour` réponde "`Prénom manquant`" (toujours au format texte brut, et sans les guillemets) avec un code `400` de status HTTP,

... une fois qu'on aura exécuté ce programme avec `node index.js` ?

Respecter les chaines de caractères fournies à la lettre.

- { "app": "app" }

???

```js
// expected solution
{{app}}.get('/bonjour', (req, res) => {
  const { prenom } = req.query;
  res
    .status(prenom ? 200 : 400)
    .send(prenom ? 'Hello ' + prenom : 'Prénom manquant');
});
{{app}}.listen(3000);
```

--

```js
// automatic student evaluation code
(async function evaluateStudentCode(){
  async function runInContext() {
    let error = undefined;
    const pathHandlers = {};
    const listenedPorts = [];
    const console = {
      log: () => {},
      error: () => {},
    };
    const express = () => {
      const instance = {
        get: (path, handler) => {
          pathHandlers[path] = handler;
          return instance;
        },
        listen: (port) => {
          listenedPorts.push(port);
        },
      };
      return instance;
    };
    const {{app}} = express();
    const require = () => express;
    try {
      eval(`_studentCode`); // run student's code
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch(e) {
      error = e;
    }
    return { error, pathHandlers, listenedPorts };
  }
  const { error, pathHandlers, listenedPorts } = await runInContext();
  const pathHandler = pathHandlers['/bonjour'] || (() => {});
  const callHandler = (queryParams) => new Promise((resolve) => {
    let statusCode;
    const timeout = setTimeout(() => resolve({ timeout: true }), 100);
    const req = {
      query: queryParams
    };
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      send: (text) => {
        clearTimeout(timeout);
        resolve({ text, statusCode });
      }
    };
    pathHandler(req, res);
  });
  function res(pts, msg) {
    application.remote._log((pts ? ' ✅ ' : ' ❌ ') + msg);
    return pts; 
  }
  const scoreArray = [
    !error
      ? res(1, 'exécution du code sans erreur')
      : res(0, `erreur survenue en exécutant le code: ${error}`),
    listenedPorts.includes(3000)
      ? res(1, 'écoute sur port 3000 avec {{app}}.listen()')
      : res(0, 'écoute sur port 3000 avec {{app}}.listen()'),
    typeof pathHandler === 'function'
      ? res(1, 'définition de route GET /bonjour avec {{app}}.get()')
      : res(0, 'définition de route GET /bonjour avec {{app}}.get()'),
    (await callHandler({ prenom: '_étienne_' })).text === 'Hello _étienne_'
      ? res(1, 'cas nominal: GET /bonjour retourne le prénom')
      : res(0, 'cas nominal: GET /bonjour retourne le prénom'),
    (await callHandler({})).text === 'Prénom manquant'
      ? res(1, 'cas d\'erreur: retour de GET /bonjour sans prénom')
      : res(0, 'cas d\'erreur: retour de GET /bonjour sans prénom'),
    (await callHandler({})).statusCode === 400
      ? res(1, 'cas d\'erreur: code 400 de GET /bonjour sans prénom')
      : res(0, 'cas d\'erreur: code 400 de GET /bonjour sans prénom'),
  ];
  application.remote._send(null, scoreArray);
})();
```

---

L'objectif est d'afficher dans la sortie standard (c.a.d. en utilisant `console.log()`) l'adresse email de plusieurs personnes dont les données seront à récupérer en JSON, depuis des URLs listées dans un tableau JavaScript. L'adresse email est fournie via la propriété `email` de la réponse à ces requêtes.

Pour cela, nous allons compléter le programme Node.js suivant:

```js
const https = require('https');
const urlsToFetch = [
 '{{{url1}}}',
 '{{{url2}}}',
 '{{{url3}}}'
];
```

Consignes à respecter:

 - Seules les adresses email doivent être affichées, sans préfixe et à raison d'une par ligne.
 - L'affichage de ces adresses doit respecter l'ordre de leurs URLs respectives dans le tableau `urlsToFetch`.
 - Votre programme devra utiliser le module `https` fourni par Node.js pour effectuer les requêtes. Aucune autre dépendance ne pourra être utilisée.
 - En cas d'erreur lors d'une requête, afficher "`oops!`" (sans les guillemets) au lieu de l'adresse email dont la récupération a échoué.
 - Enfin, les URLs fournies dans `urlsToFetch`, leur ordre, ainsi que leur nombre peuvent changer. Le programme doit donc fonctionner en s'adaptant au contenu de ce tableau.

Fournir les lignes de code à ajouter au programme fourni ci-dessus de manière à ce qu'il affiche les adresses email quand on l'exécutera avec `node`.

- { "url1": "https://js-jsonplaceholder.herokuapp.com/users/1", "url2": "https://js-jsonplaceholder.herokuapp.com/users/2", "url3": "https://js-jsonplaceholder.herokuapp.com/users/3", "email1": "Sincere@april.biz", "email2": "Shanna@melissa.tv", "email3": "Nathan@yesenia.net" }

???

```js
// expected solution
const fetch = (url) => new Promise((resolve, reject) => {
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => resolve(data));
  }).on('error', reject);
});
const fetchAndRender = (url) => new Promise((resolve) => {
  fetch(url)
    .then(data => resolve(JSON.parse(data).email))
    .catch(err => resolve('oops!'));
});
(async() => {
  for (const i in urlsToFetch) {
    console.log(await fetchAndRender(urlsToFetch[i]));
  }
})();
```

--

```js
// automatic student evaluation code
(async function evaluateStudentCode(){
  const urlsToFetch = [
    '{{{url1}}}',
    '{{{url2}}}',
    '{{{url3}}}',
  ];
  const expectedEmails = [
    '{{{email1}}}',
    '{{{email2}}}',
    '{{{email3}}}',
  ];
  async function runStudentCode(urlsToFetch) {
    let error = undefined;
    let logs = [];
    const console = {
      log: (email) => logs.push(email),
      error: () => {},
    };
    const respEvtHandlers = {};
    const retEvtHandlers = {};
    let reqDelay = 30; // will decrease for each request, to simulate random network latency
    const https = {
      get: (url, callback) => {
        const resp = {
          on: (evtName, handler) => {
            respEvtHandlers[evtName] = handler;
          },
        };
        setTimeout(async () => {
          const email = expectedEmails[urlsToFetch.indexOf(url)];
          const dataParts = ['{ ', '"email": "', email, '" }'];
          for (var i in dataParts) {
            await respEvtHandlers.data(dataParts[i]);
          }
          respEvtHandlers.end();
          // TODO: also implement error case
        }, reqDelay);
        reqDelay = reqDelay / 2; // next request will respond twice faster
        callback(resp);
        return {
          on: (evtName, handler) => {
            retEvtHandlers[evtName] = handler;
          },
        };
      },
    };
    const require = () => https;
    try {
      eval(`_studentCode`); // run student's code
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch(e) {
      error = e;
    }
    return { error, logs, respEvtHandlers, retEvtHandlers };
  }
  const { error, logs, respEvtHandlers, retEvtHandlers } = await runStudentCode(urlsToFetch);
  function res(pts, msg) {
    application.remote._log((pts ? ' ✅ ' : ' ❌ ') + msg);
    return pts; 
  }
  const scoreArray = [
    !error
      ? res(1, 'exécution du code sans erreur')
      : res(0, `erreur survenue en exécutant le code: ${error}`),
    typeof respEvtHandlers.data === 'function'
      ? res(1, 'fonction rattachée à l\'évènement "data"')
      : res(0, 'fonction rattachée à l\'évènement "data"'),
    typeof respEvtHandlers.end === 'function'
      ? res(1, 'fonction rattachée à l\'évènement "end"')
      : res(0, 'fonction rattachée à l\'évènement "end"'),
    typeof retEvtHandlers.error === 'function'
      ? res(1, 'fonction rattachée à l\'évènement "error"')
      : res(0, 'fonction rattachée à l\'évènement "error"'),
    (new Set(logs)).toString() === (new Set(expectedEmails)).toString()
      ? res(1, 'cas nominal: toutes adresses email affichées')
      : res(0, 'cas nominal: toutes adresses email affichées'),
    logs.toString() === expectedEmails.toString()
      ? res(1, 'cas nominal: adresses email affichées dans l\'ordre')
      : res(0, 'cas nominal: adresses email affichées dans l\'ordre'),
  ];
  application.remote._send(null, scoreArray);
})();
```

---

Déployer en production (sur Heroku) un serveur Web en Node.js mettant à disposition les routes suivantes:

 - `GET /` retourne le texte "`Bonjour !`" (sans les guillemets)
 - `GET /{{{path}}}` retourne le texte "`{{{text}}}`" (sans les guillemets)

Au lieu de fournir le code JavaScript de ce serveur, collez seulement l'URL Heroku de ce serveur dans le champ ci-dessous:

- { "path": "text", "text": "test" }

???

```js
https://frozen-dawn-64094.herokuapp.com
// 👆 run `npm run deploy` from exam-data/app-to-deploy/ to get that URL
```

--

```js
// automatic student evaluation code
(async function evaluateStudentCode(){
  const expectedRes = {
    indexRes: { responseText: 'Bonjour !' },
    pathRes:  { responseText: `{{{text}}}` },
  };
  const fetch = (url) => new Promise((resolve) =>
    application.remote._xhr('GET', url, (error, res) => {
      const { responseText } = res || {};
      resolve({ responseText, error });
    })
  );
  async function callEndpoints(url = `_studentCode`) {
    const appName = url.match(/\/\/(.*)\.herokuapp\.com/)[1];
    const urlPrefix = 'https://' + appName + '.herokuapp.com';
    return {
      appName,
      indexRes: await fetch(urlPrefix),
      pathRes: await fetch(urlPrefix + '/{{{path}}}'),
    };
  }
  const { appName, indexRes, pathRes } = await callEndpoints();
  function res(pts, msg) {
    application.remote._log((pts ? ' ✅ ' : ' ❌ ') + msg);
    return pts; 
  }
  const scoreArray = [
    appName
      ? res(1, 'URL Heroku reconnue')
      : res(0, `URL Heroku reconnue`),
    !indexRes.error
      ? res(1, 'réponse valide de l\'endpoint GET /')
      : res(0, 'réponse valide de l\'endpoint GET /'),
    !pathRes.error
      ? res(1, 'réponse valide de l\'endpoint GET /{{{path}}}')
      : res(0, 'réponse valide de l\'endpoint GET /{{{path}}}'),
    indexRes.responseText === expectedRes.indexRes.responseText
      ? res(1, 'réponse conforme de l\'endpoint GET /')
      : res(0, 'réponse conforme de l\'endpoint GET /'),
    pathRes.responseText === expectedRes.pathRes.responseText
      ? res(1, 'réponse conforme de l\'endpoint GET /{{{path}}}')
      : res(0, 'réponse conforme de l\'endpoint GET /{{{path}}}'),
  ];
  application.remote._send(null, scoreArray);
})();
```
