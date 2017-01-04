Implémenter un programme de moins de 4 lignes qui affiche 50 fois `'Bonjour!'` dans la console. Respecter les conventions et règles d'indentation vues en cours.

???

Solution:
```js
for ( var i = 0; i < 50; i++ ) {
  console.log('Bonjour!');
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var nb = 0;
  var lastLog;
  var console = {
    log: function(t){
      lastLog = t;
      nb++;
    }
  };
  _runStudentCode();
  var tests = [
    `_studentCode`.indexOf('for') !== -1,
    nb === 50,
    lastLog === 'Bonjour!',
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
