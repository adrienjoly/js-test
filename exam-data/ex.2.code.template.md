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
  var console = {
    log: function(t){
      if (t === 'Bonjour!') {
        nb++;
      }
    }
  };
  _runStudentCode();
  application.remote._send(null, nb === 50 ? 1 : 0); // points to the student
})();
```
