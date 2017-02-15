Soit le fichier HTML suivant:

```html
<ul>
  <li class="displayed" id="first-item">premier</li>
  <li class="hidden">deuxième</li>
  <li class="hidden">troisième</li>
</ul>
```

Quelle est la fonction du DOM la plus directe pour:

1) accéder au premier élément `<li>` depuis JavaScript ?

* getElementById()
- getElementByClassName()
- getElementsByClassName()
- getElementsByTagName()

???

 - le deuxième choix n'existe pas, car getElement**s**ByClassName() prend un **s**;
 - le premier choix est plus direct, car le premier élément `<li>` porte un attribut `id` (unique), et que `getElementById()` a l'avantage de le retourner directement, alors que les autres retournent un tableau d'éléments.

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
