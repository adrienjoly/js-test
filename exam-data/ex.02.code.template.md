# Exercice de code (10 points)

Le fichier `server.js` contient le code suivant:

```js
const express = require('express');
const {{app}} = express();
```

Quelles lignes de code faut-il **ajouter à ce fichier** pour que:

 - `curl http://localhost:3000/{{{path}}}?country=Zimbabwe` réponde `Hello, Zimbabwe!` (ou autre pays passé en paramètre);
 - `curl http://localhost:3000/{{{path}}}` réponde `Which country?`.
 
... une fois qu'on aura exécuté ce programme avec `$ node server.js` ?

> Important: Votre code sera évalué de manière automatique. Pensez donc à:
> - respecter les valeurs fournies **à la lettre**;
> - tester votre code avant de rendre votre copie.

- { "app": "app", "path": "hello" }
- { "app": "myApp", "path": "hi" }
- { "app": "myApp", "path": "hello" }

???

```js
// expected solution
{{app}}.get('/{{{path}}}', (req, res) => {
  const { country } = req.query;
  res.send(country ? `Hello, ${country}!` : 'Which country?');
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
    const process = { env: {} };
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
        post: () => instance,
        listen: (port) => {
          listenedPorts.push(port);
        },
        use: () => {},
      };
      return instance;
    };
    express.json = () => {};
    express.urlencoded = () => {};
    const {{app}} = express();
    const require = () => express;
    try {
      application.remote._trackUncaughtRejections(true);
      await _runStudentCode();
      await new Promise(resolve => setTimeout(resolve, 500));
      await new Promise((resolve, reject) => {
        application.remote._getUncaughtRejections(e => {
          application.remote._trackUncaughtRejections(false);
          e.length ? reject(e[0]) : resolve();
        });
      });
    } catch(e) {
      error = e;
    }
    return { error, pathHandlers, listenedPorts };
  }
  const { error, pathHandlers, listenedPorts } = await runInContext();
  const pathHandler = pathHandlers['/{{{path}}}'] || (() => {});
  const callHandler = (queryParams) => new Promise((resolve) => {
    let toResolve = {};
    setTimeout(() => resolve(toResolve), 100);
    const req = {
      query: queryParams,
      body: {},
      param: (key) => queryParams[key],
    };
    const res = {
      status: (code) => {
        toResolve.statusCode = code;
        return res;
      },
      send: (text) => {
        if (toResolve.sent) {
          toResolve = { error: 'a response to that query was already sent' };
        } else {
          toResolve = { ...toResolve, text, sent: true };
        }
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
    listenedPorts.includes(3000) || _studentCode.match(/[aA]pp.listen\(.*(3000|PORT)/)
      ? res(1, 'écoute sur port 3000 avec {{app}}.listen()')
      : res(0, 'écoute sur port 3000 avec {{app}}.listen()'),
    _studentCode.includes(`.get('/{{{path}}}',`) || _studentCode.match(/[aA]pp.get\(["']\/{{{path}}}/)
      ? res(1, 'définition de route GET /{{{path}}} avec {{app}}.get()')
      : res(0, 'définition de route GET /{{{path}}} avec {{app}}.get()'),
    (await callHandler({ country: '_france_' })).text === 'Hello, _france_!'
      ? res(1, 'cas nominal: GET /{{{path}}} salue le pays')
      : res(0, 'cas nominal: GET /{{{path}}} salue le pays'),
    (await callHandler({})).text === 'Which country?'
      ? res(1, 'cas d\'erreur: retour de GET /{{{path}}} sans pays')
      : res(0, 'cas d\'erreur: retour de GET /{{{path}}} sans pays'),
  ];
  application.remote._send(null, scoreArray);
})();
```
