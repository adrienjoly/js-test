Imaginez que vous disposez de la page HTML suivante:

```html
<bouton id="pouet">cliquez ici !</bouton>
```

Écrivez le code JavaScript nécéssaire pour que le message `pouet !` s'affiche dans un `alert` à chaque fois que l'utilisateur cliquera sur le bouton:

???

Solution:

```js
document.getElementById('pouet').onclick = function() {
  alert('pouet !');
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  var _button = {
    onclick: function() {}
  };
  var document = {
    getElementById: function(id) {
      return id === 'pouet' ? _button : null;
    }
  };
  function alert(p){
    res.push(p);
  };
  _runStudentCode();
  var tests = [];
  tests.push(res.length === 0);
  setTimeout(function(){
    _button.onclick()
    tests.push(res.length === 1);
    setTimeout(function(){
      _button.onclick()
      tests.push(res.length === 2);
      application.remote._send(null, tests);
      // 1 point per passing test => 3 pts per exercise
    }, 50)
  }, 50)
})();
```
