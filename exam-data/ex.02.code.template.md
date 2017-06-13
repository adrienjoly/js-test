<!-- ## Cacher le bouton -->

Imaginez que vous disposez de la page HTML suivante:

```html
<button id="{{btnId}}">cliquez ici !</button>
```

Et de la règle CSS suivante:

```css
.{{className}} {
  display: none;
}
```

Écrivez le code JavaScript nécéssaire pour que la classe `{{className}}` soit ajoutée au bouton une fois que l'utilisateur aura cliqué dessus, à l'aide de la propriété `classList`.

- { "btnId": "bouton", "className": "hidden" }
- { "btnId": "bouton", "className": "cache" }
- { "btnId": "mon-bouton", "className": "cache" }

???

Solution:

```js
var bouton = document.getElementById('{{btnId}}');
bouton.onclick = function() {
  bouton.classList.add('{{className}}');
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var res = [];
  var _button = {
    onclick: function() {},
    classList: {
      add: res.push.bind(res),
      remove: function(){},
    }
  };
  var document = {
    getElementById: function(id) {
      return id === '{{btnId}}' ? _button : null;
    }
  };
  _runStudentCode();
  var tests = [];
  tests.push(res.length === 0);
  setTimeout(function(){
    _button.onclick()
    tests.push(res.length === 1 && res[0] === '{{className}}');
    setTimeout(function(){
      _button.onclick()
      tests.push(res.length === 2 && res[1] === '{{className}}');
      application.remote._send(null, tests);
      // 1 point per passing test => 3 pts per exercise
    }, 50)
  }, 50)
})();
```
