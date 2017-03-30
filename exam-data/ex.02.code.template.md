Implémenter une condition qui affecte `'oui'` à une variable `resultat` (déjà créée), seulement si une autre variable `nombre` vaut strictement `4`. Indenter correctement.

???

Solution:

```js
if (nombre === 4) {
  resultat = 'oui';
}
```

--

```js
var console = { log: function(){} }; // accept use of console.log()
var alert = function(){}; // accept use of alert()
var studentCode = `_studentCode`.trim();
var canonicCode = studentCode.replace(/[ ;\r\n\t]/g, '');
var tests = [
  canonicCode.indexOf('if(nombre===4)') !== -1,
  canonicCode.indexOf('resultat=\'oui\'') !== -1,
  studentCode.indexOf('\t') === -1,
  studentCode.indexOf('   ') === -1,
  studentCode.indexOf('\n  resultat') !== -1,
  studentCode.indexOf('\'oui\';') !== -1,
];
application.remote._send(null, tests)
```
