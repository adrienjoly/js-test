Qu'est-ce qu'un composant ?

- c'est le nom qu'on donne à tout programme JavaScript
- c'est le nom qu'on donne à tout div d'une page HTML
* c'est un module qui a été conçu pour être intégré par d'autres développeurs
- c'est une page web de documentation

???

Un composant est un module qui a été conçu pour être intégré par d'autres développeurs.

Sur le Web, un composant est généralement composé d'un script JavaScript, et éventuellement d'un fichier CSS en plus. Il est aussi accompagné d'une page qui explique aux développeurs comment intégrer ce composant sur leur page.

---

```js
var lien = document.getElementById('mon-hyperlien');
```

Comment changer le texte du lien `<a>` (tel qu'il sera affiché à l'écran) référencé par la variable `lien` ?

- lien.href = 'nouveau texte';
- lien.title = 'nouveau texte';
* lien.innerHTML = 'nouveau texte';
- lien.setAttribute('title', 'nouveau texte');

???

 - en HTML, le titre visible d'un lien est défini par le contenu de l'élément (ce qu'il y a entre les balises `<a>` et `</a>`); il ne faut donc pas modifier un attribut de ce lien (ex: `title` et `href`) mais son contenu.
 - pour modifier le contenu d'un élément, il faut utiliser la propriété `innerHTML`.

---

Soit le fichier HTML suivant:

```html
<ul>
  <li class="displayed first-item">premier</li>
  <li class="hidden">deuxième</li>
  <li class="hidden" id="last-item">troisième</li>
</ul>
```

Quelle est la fonction du DOM la plus directe pour:

1) accéder au dernier élément `<li>` depuis JavaScript ?

* getElementById()
- getElementByClassName()
- getElementsByClassName()
- getElementsByTagName()

???

 - le deuxième choix n'existe pas, car getElement**s**ByClassName() prend un **s**;
 - le premier choix est plus direct, car le dernier élément `<li>` porte un attribut `id` (unique), et que `getElementById()` a l'avantage de le retourner directement, alors que les autres retournent un tableau d'éléments.

---

2) accéder à tous les éléments `<li>` portant la classe `"hidden"` ?

- getElementById()
- getElementByClassName()
* getElementsByClassName()
- getElementsByTagName()

???

 Pour référencer les éléments par classe, il faut utiliser `getElementsByClassName()`.

 Note: Cette fonction retourne un tableau d'éléments.

---

3) accéder à tous les éléments `<li>` ?

- getElementById()
- getElementByClassName()
- getElementsByClassName()
* getElementsByTagName()

???

Pour référencer les éléments par nom d'élément (appelé *tag name* en anglais), il faut utiliser `getElementsByTagName()`.

 Note: Cette fonction retourne un tableau d'éléments.

---

Comment retirer la classe `"hidden"` des deux derniers éléments `<li>` ?

- document.getElementsByClassName('hidden').className = '';
- document.getElementsByClassName('hidden').setAttribute('class', '');
- document.getElementsByClassName('hidden').classList.remove('hidden');
* (il faut utiliser une boucle)

???

[`className`](https://developer.mozilla.org/fr/docs/Web/API/Element/className), [`setAttribute()`](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute) et [`classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList) ne sont applicables que sur un objet JavaScript représentant un élément HTML (ex: retourné par `getElementById()`), or `document.getElementsByClassName('hidden')` retourne un tableau d'éléments.

Donc on ne peut pas utiliser ces propriétés/fonctions directement sur le tableau retourné par `document.getElementsByClassName('hidden')` => Il faut utiliser une boucle pour appeler `classList.remove('hidden')` sur chaque élément du tableau.
