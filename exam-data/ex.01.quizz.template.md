# QCM (1 point par bonne réponse)

```js
var x = { nb: 1 };
```

De quel type est la variable `x` ?

- Nombre
- Entier
* Objet
- Tableau

???

C'est un objet. On le reconnait aux accolades et à la présence d'une propriété dont la clé et la valeur sont séparés par deux points.

---

```html
<div id="monDiv" class="hidden">contenu</div>
```

Quelle serait le type de la valeur retournée par `document.getElementsByClassName('hidden')` ?

* Un tableau d'objet(s)
- Un objet représentant l'élément
- Une classe
- Une chaîne de caractères

---

Supposons que `elements` soit un tableau d'éléments HTML.

```js
for(var i = 0; i < elements.length; i++) {
  elements[i].onclick = function() {
    console.log(i);
  }
}
```

Comment pourrait-on s'assurer que la valeur de `i` correspondante à chaque élément soit bien affichée dans la console quand l'utilisateur cliquera dessus ?

- Il n'y a rien à changer
- Il faut créer une deuxième boucle
- Il faut utiliser "this"
* Il faut passer i à une fonction génératrice

---

```js
var point = new Point(4, 3);
```

Comment appelle-t-on l'opération à droite du signe `=` ?

- Une génération de fonction
- Une instanciation de classe
- Un appel de fonction
- Une concaténation de nombres
