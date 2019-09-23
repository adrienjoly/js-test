# Exercice de code (10 points)

Ré-écrire ce code de manière à ce qu'il utilise `async` et `await`, au lieu de `then()` et `catch()`. Les erreurs doivent être correctement interceptées.

```js
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/{{{db}}}')
  .then((client) => client.db('{{{db}}}').collection('{{{coll}}}').find().toArray())
  .then(({{{coll}}}) => console.log('{{{coll}}}:', {{{coll}}}))
  .catch((err) => console.error('erreur:', err));
```

- { "db": "myapp", "coll": "dates" }
- { "db": "test", "coll": "cats" }
- { "db": "db", "coll": "chats" }
- { "db": "cats", "coll": "types" }

???

```js
// expected solution
const MongoClient = require('mongodb').MongoClient;
(async () => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017/{{{db}}}');
    const {{{coll}}} = await client.db('{{{db}}}').collection('{{{coll}}}').find().toArray();
    console.log('{{{coll}}}:', {{{coll}}});
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
    class MongoClient {
      constuctor(url) {
        if (shouldFail) throw EXPECTED_ERROR;
        if (url === 'mongodb://localhost:27017/{{{db}}}') return Promise.resolve(this);
        else throw new Error(`unexpected connection url: ${url}`);
      }
      connect (url) {
        if (shouldFail) throw EXPECTED_ERROR;
        if (url === 'mongodb://localhost:27017/{{{db}}}') return new MongoClient(url);
        else throw new Error(`unexpected connection url: ${url}`);
      }
      db (name) {
        if (name === '{{{db}}}') return this;
        else throw new Error(`unexpected db name: ${name}`);
      }
      collection (name) {
        if (name === '{{{coll}}}') return this;
        else throw new Error(`unexpected coll name: ${name}`);
      }
      find () {
        return { toArray: async () => EXPECTED_ARRAY };
      }
    }
    const instance = new MongoClient();
    MongoClient.connect = instance.connect;
    return MongoClient;
  };
  async function runInContext({ shouldFail }) {
    let error = undefined;
    let lastLogParams = [];
    let lastErrParams = [];
    const process = { env: {} };
    const console = {
      log: (message, param) => lastLogParams = [message, param],
      error: (message, param) => lastErrParams = [message, param],
    };
    const MongoClient = makeMongoClient({ shouldFail });
    const require = () => ({ MongoClient });
    try {
      application.remote._trackUncaughtRejections(true);
      await _runStudentCode();
      await new Promise(resolve => setTimeout(resolve, 100));
      await new Promise((resolve, reject) => {
        application.remote._getUncaughtRejections(e => {
          application.remote._trackUncaughtRejections(false);
          e.length ? reject(e[0]) : resolve();
        });
      });
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
    !successfulExec.error && !successfulExec.lastErrParams.length
      ? res(1, 'exécution du code sans erreur')
      : res(0, `erreur survenue en exécutant le code: ${successfulExec.error || successfulExec.lastErrParams}`),
    successfulExec.lastLogParams[1] == EXPECTED_ARRAY
      ? res(1, 'cas nominal: tableau de récupéré et affiché dans la console')
      : res(0, `cas nominal: affichage inattendu dans la console: ${successfulExec.lastLogParams[1]}`),
    impossibleExec.lastErrParams[1] == EXPECTED_ERROR
      ? res(1, 'cas d\'erreur: message bien affiché dans la console')
      : res(0, `cas d\'erreur: message affiché dans la console: ${successfulExec.lastErrParams[1]}`),
  ];
  application.remote._send(null, scoreArray);
})();
```
