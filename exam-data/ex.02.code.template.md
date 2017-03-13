# Exercices de codage (4 pts par question)

Créez une variable `obj` et affectez-lui un objet contenant deux propriétés:

 - une propriété `nom` ayant `'sause'` comme valeur (type: chaîne de caractères),
 - et une propriété `age` ayant `46` comme valeur (type: nombre).

???

Solution:

```js
var obj = {
  nom: 'sause',
  age: 46,
};
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  _runStudentCode();
  var tests = [
    typeof obj === 'object',
    obj.nom === 'sause',
    obj.age == 46,
    obj.age === 46,
  ];
  application.remote._send(null, tests);
})();
```

---

On fournit le code JavaScript suivant:

```js
var profilInstagram = {
  prenom: 'François',
  photos: [
    {
      nom: 'mon chien est moi',
      url: 'http://imgur.com/img/1',
    },
    {
      nom: 'coucher de soleil => such wow!',
      url: 'http://imgur.com/img/2',
    },
  ],
};
console.log(chemin);
```

Par quoi faut-il remplacer `chemin`, pour obtenir l'`url` de la deuxième photo de François ?

(utilisez la notation pointée à partir de l'objet `profilInstagram`)

???

Solution:

```js
profilInstagram.photos[1].url
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var profilInstagram = {
    prenom: 'François',
    photos: [
      {
        nom: 'mon chien est moi',
        url: 'http://imgur.com/img/1',
      },
      {
        nom: 'coucher de soleil => such wow!',
        url: 'http://imgur.com/img/2',
      },
    ],
  };
  var studentCode = `_studentCode`.trim();
  var result = eval(studentCode);
  var tests = [
    studentCode === 'profilInstagram.photos[1].url', // notation pointée
    result === 'http://imgur.com/img/2', // valeur finale
  ];
  application.remote._send(null, tests);
})();
```

---

```html
<li>1er produit</li>
<li>2ème produit</li>
<li>3ème produit</li>
```

Écrivez le code JavaScript permettant d'afficher "`ok`" (sans les guillemets) dans un `alert` à chaque fois que l'utilisateur cliquera sur n'importe lequel de ces trois éléments.

Pour définir le comportement au clic, utiliser la propriété `onclick`.

???

Solution:

```js
var lis = document.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
  lis[i].onclick = function() {
    alert('ok');
  };
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _alerts = [];
  var _lis = [
    { onclick: null },
    { onclick: null },
    { onclick: null },
  ];
  var console = { log: function(){} }; // tolerate console.log
  var alert = function(msg) {
    _alerts.push(msg);
  }
  var document = {
    getElementsByTagName: function(tagName) {
      return (tagName || '').toLowerCase() === 'li' ? _lis : [];
    },
    querySelectorAll: function(selector) {
      return (selector || '').toLowerCase() === 'li' ? _lis : [];
    },
  };
  _runStudentCode();
  var tests = [];
  // test 1: onclick are set
  tests.push(!!_lis[0].onclick && !!_lis[1].onclick && !!_lis[2].onclick);
  // test 2: no click yet => no alert
  tests.push(_alerts.length === 0);
  // test 3: click on first li => one alert
  _alerts = []; // reset/clear array, just in case
  _lis[0].onclick();
  tests.push(_alerts.length === 1);
  tests.push(_alerts[0] === 'ok');
  // test 4: two clicks on last li => two alerts
  _alerts = []; // reset/clear array, just in case
  _lis[2].onclick();
  _lis[2].onclick();
  tests.push(_alerts.length === 2);
  tests.push(_alerts[0] === 'ok' && _alerts[1] === 'ok');
  application.remote._send(null, tests);
})();
```

---

Je souhaite intégrer une galerie d'images sur mon site, en utilisant un composant déjà existant.

Voici un extrait de la documentation du composant:

> Pour instancier une galerie sur votre page, appelez la fonction `initGallery(element, images)`, avec en paramètres:
> 
> - `element`(*type: objet*): élément du DOM dans lequel intégrer la galerie,
> - `images`(*type: tableau de chaînes de caractères*): URLs des images à intégrer dans la galerie.

Mon fichier HTML contient ces éléments:

```html
<script src="https://controle.js/gallery.js"></script>
<div id="my-gallery"></div>
```

Je souhaite intégrer la galerie dans le `<div>`, avec les images suivantes:

 - `https://i.imgur.com/ydi5jMh.jpg`
 - `https://i.imgur.com/emRrCLd.jpg`
 - `https://i.imgur.com/HdsQ3fe.jpg`

Quel code JavaScript dois-je exécuter pour intégrer la galerie dans ma page ?

???

Solution:

```js
var element = document.getElementById('my-gallery');
var images = [
  'https://i.imgur.com/ydi5jMh.jpg',
  'https://i.imgur.com/emRrCLd.jpg',
  'https://i.imgur.com/HdsQ3fe.jpg', 
];
initGallery(element, images);
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var _calls = [];
  var _urls = [
    'https://i.imgur.com/ydi5jMh.jpg',
    'https://i.imgur.com/emRrCLd.jpg',
    'https://i.imgur.com/HdsQ3fe.jpg', 
  ];
  var _div = {
    id: 'my-gallery',
  };
  function initGallery(element, images) {
    _calls.push([ element, images ]);
  }
  var console = { log: function(){} }; // tolerate console.log()
  var alert = function(msg) {}; // tolerate alert()
  var document = {
    getElementById: function(id) {
      return id === 'my-gallery' ? _div : null;
    },
    getElementsByTagName: function(tagName) {
      return (tagName || '').toLowerCase() === 'div' ? [ _div ] : [];
    },
    querySelector: function(selector) {
      return (selector || '').toLowerCase() === 'div'
        || (selector || '').indexOf('#my-gallery') !== -1
        ? _div : null;
    },
    querySelectorAll: function(selector) {
      return (selector || '').toLowerCase() === 'div'
        || (selector || '').indexOf('#my-gallery') !== -1
        ? [ _div ] : null;
    },
  };
  _runStudentCode(); // should call initGallery() once
  var tests = [];
  // test 1: initGallery was called once
  tests.push(_calls.length === 1);
  // test 2: first parameter is the div
  var _callParams = _calls[0] || [];
  tests.push((_callParams[0] || {}).id === _div.id);
  // test 3: second parameter is array of URLs
  tests.push((_callParams[1] || []).length === 3);
  tests.push((_callParams[1] || []).join(',') === _urls.join(','));
  application.remote._send(null, tests);
})();
```

<!-- TODO: POO -->
