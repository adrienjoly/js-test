Quel est le nom de l'attribut à utiliser pour donner le nom du fichier .js à charger dans une page HTML:

- href
* src
- scr
- type

???

 - `href` est utilisé dans les éléments `<link>` et `<a>`
 - `scr` est mal épelé
 - `type` (optionnel) permet d'expliciter le langage employé dans le fichier, si autre que JavaScript

L'attribut `src` est à utiliser dans l'élément `<script>`, et il ne faut pas oublier d'ajouter une balise de fermeture `</script>`.

---

Si je crée une fichier .js qui ne contient que la ligne `alert('bonjour');` et que j'intègre ce fichier à une page HTML, que se passera-t-il ?

- rien
- l'alert ne s'affichera que si on copie-colle le code dans la console
- l'alert s'affichera quand l'utilisateur cliquera sur un bouton
* l'alert s'affichera à chaque (re)chargement de la page

???

Quand on intègre un fichier .js à une page HTML (à l'aide de l'élément `<script>`), cela a pour effet d'exécuter les instructions du fichier à chaque (re)chargement de la page dans le navigateur.

Pour que l'`alert` soit déclenché par un clic de l'utilisateur, il faut écrire l'instruction à l'intérieur d'une définition de fonction affectée à la propriété `onclick` d'un élément (ex: `<button>`).

---

Soit la page HTML suivante:

```html
<body>
  <p id="premier-paragraphe">Bonjour</p>
  <p id="deuxieme-paragraphe">le monde</p>
</body>
```

Quelle instruction JavaScript dois-je exécuter pour accéder au deuxième paragraphe ?

- document.paragraphes[1];
- document.getElementById(1);
* document.getElementById('deuxieme-paragraphe');
- document.deuxieme-paragraphe;

???

L'API du DOM fournit la fonction `getElementById()` pour accéder à un élément en connaissant son identifiant. Il suffit de passer l'identifiant en paramètre.

---

Soit la page HTML suivante:

```html
<body>
  <form>
    <input id="nom" value="Michel" />
    <input id="prenom" value="Jean" />
  </form>
</body>
```

Quelle instruction JavaScript dois-je exécuter pour modifier la valeur du champ `<input>` dont l'identifiant est `prenom` ?

* document.getElementById('prenom').value = 'nouveau prénom';
- document.getElementById('prenom', 'nouveau prénom');
- document.prenom = 'nouveau prénom';
- document.input = '<input id="prenom" value="nouveau prénom" />'

???

Seule la première solution est valide.

Comme d'habitude, on commence par accéder au champ `<input>` en spécifiant son `id`, puis on affecte une nouvelle valeur à la propriété `value` de l'objet retourné par `getElementById()`.
