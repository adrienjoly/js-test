Imaginez que vous disposez de la page HTML suivante:

```html
<bouton id="mon-bouton">cliquez ici !</bouton>
```

Et de la règle CSS suivante:

```css
.hidden {
  display: none;
}
```

Écrivez le code JavaScript nécéssaire pour que la classe `hidden` soit ajoutée au bouton une fois que l'utilisateur aura cliqué dessus, à l'aide de la propriété `classList`.

???

Solution:

```js
var bouton = document.getElementById('mon-bouton');
bouton.onclick = function() {
  bouton.classList.add('hidden');
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  var _button = {
    onclick: function() {},
    classList: { add: res.push.bind(res) }
  };
  var document = {
    getElementById: function(id) {
      return id === 'mon-bouton' ? _button : null;
    }
  };
  _runStudentCode();
  var tests = [];
  tests.push(res.length === 0);
  setTimeout(function(){
    _button.onclick()
    tests.push(res.length === 1 && res[0] === 'hidden');
    setTimeout(function(){
      _button.onclick()
      tests.push(res.length === 2 && res[1] === 'hidden');
      application.remote._send(null, tests);
      // 1 point per passing test => 3 pts per exercise
    }, 50)
  }, 50)
})();
```
