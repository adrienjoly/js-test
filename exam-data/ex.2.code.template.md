Définir un objet contenant une propriété `texte` ayant `'bonjour'` comme valeur, et stocker cet objet dans une variable `message`.

Ajouter l'instruction permettant d'afficher avec `alert()` la valeur de la propriété `texte` de l'objet `message`, en récupérant cette valeur depuis l'objet.

???

Solution:

```js
var message = { texte: 'bonjour' };
alert(message.texte);
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  function alert(p){
    res.push(p);
  };
  _runStudentCode();
  var tests = [
    res.length === 1,
    res[0] === 'bonjour',
    `_studentCode`.match(/alert\(message[\.\[]/),
  ];
  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise
})();
```
