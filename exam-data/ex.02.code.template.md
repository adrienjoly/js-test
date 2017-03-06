# Exercices de codage (2 pts par question)

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

Écrivez le code JavaScript permettant d'afficher "`ok`" dans un `alert` à chaque fois que l'utilisateur cliquera sur un de ces trois éléments.

???

Solution:

```js
var lis = document.getElementsByTagName('li');
for (var i = 0; i < lis; i++) {
  lis[i].onclick = function() {
    alert('ok');
  };
}
```

--

<!-- TODO -->

---

Je souhaite intégrer une galerie d'images sur mon site, en utilisant un composant déjà existant.

Voici un extrait de la documentation du composant:

> Pour instancier une galerie sur votre page, appelez la fonction `initGallery(element, images)`, avec en paramètres:
> 
> - `element`(*type: objet*): élément du DOM dans lequel intégrer la galerie,
> - `images`(*type: tableau de chaînes de caractères*): URLs des images à intégrer dans la galerie.

Mon fichier HTML contient ces éléments:

```html
<script src="https://controle.js/fake-gallery.js"></script>
<div id="my-gallery"></div>
```

Je souhaite intégrer la galerie dans le `<div>`, avec les images suivantes:

 - `https://i.imgur.com/ydi5jMh.jpg`
 - `https://i.imgur.com/emRrCLd.jpg`
 - `https://i.imgur.com/HdsQ3fe.jpg`

Quel code JavaScript dois-je exécuter pour intégrer cette galerie ?

???

Solution:

```js
```

--

<!-- TODO: POO -->
