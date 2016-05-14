---

Écrivez le code JS permettant d'envoyer une requête Ajax de type GET à l'URL `{{{url}}}`. Une fois la réponse reçue, affichez dans la console seulement la valeur de la propriété `{{prop}}` de cette réponse JSON.

- { "url": "http://jsonplaceholder.typicode.com/users/1", "prop": "username" }
- { "url": "http://jsonplaceholder.typicode.com/users/2", "prop": "email" }
- { "url": "http://jsonplaceholder.typicode.com/users/3", "prop": "phone" }

---

Écrivez le code JS permettant d'envoyer une requête Ajax de type POST à l'URL `http://httpbin.org/post`, en transmettant un objet JSON contenant une propriété `{{prop}}` valant `"{{val}}"`.

- { "prop": "username", "val": "pierredup" }
- { "prop": "school", "val": "eemi" }
- { "prop": "date", "val": "2016" }
- { "prop": "nickname", "val": "dupont" }

???

var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://httpbin.org/post');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) alert(xhr.responseText);
};
xhr.send(JSON.stringify({a:'données à envoyer'}));

---

Définissez une fonction `plusUn` qui renvoie le nombre passé en paramètre après y avoir additionné le nombre `1`; de manière à ce que `plusUn(1)` renvoie `2`, `plusUn(2)` renvoie `3`, etc...

Cette fonction ne doit ni afficher d'alerte modale, ni écrire dans la console. Utilisez `return` pour renvoyer le résultat de l'addition.

---

Supposons que vous disposiez d'une fonction `plusUn` définie telle que dans la question précédente.

Écrivez le code JS permettant de demander un nombre a l'utilisateur (à l'aide de `prompt`), d'appeler la fonction `plusUn` en passant ce nombre en paramètre, puis d'afficher le résultat de cet appel dans une alerte modale (`alert`).

---

Écrivez une boucle qui affiche dans la console tous les nombres entiers {{p}}s entre `1` et `100` (compris).

`console.log` ne doit paraître qu'une seule fois dans votre code.

Utilisez `% 2` (opérateur modulo) pour savoir si un nombre est pair ou impair.

- { "p": "pair" }
- { "p": "impair" }

---

Définissez une fonction `{{nom}}` qui renvoie (à l'aide de `return`) un tableau contenant tous les nombres entiers entre `1` et `n` (compris), `n` étant un nombre passé en paramètre de cette fonction.

Cette fonction ne doit pas écrire dans la console.

Pour créer un tableau vide, il suffit d'écrire `[]`.

- { "nom": "tabNombres" }
- { "nom": "jusqua" }
- { "nom": "nombres" }

---

Définir une fonction `{{nom}}` qui prend un tableau en paramètre et renvoie (à l'aide de `return`) un autre tableau contenant seulement les valeurs de type `"{{type}}"` contenues dans le tableau passé en paramètre.

Le tableau résultant ne doit contenir que des {{fr}}, et donc aucune valeur `null` ou `undefined`.

- { "nom": "chaines", "type": "string", "fr": "chaînes de caractères" }
- { "nom": "nombres", "type": "number", "fr": "nombres" }

---

Nous allons implémenter un petit jeu consistant à deviner un nombre entier choisi aléatoirement entre `1` et `4` (compris) par l'ordinateur.

Écrire le code JS permettant de stocker ce nombre aléatoire dans une variable `choixOrdi`, de demander un nombre a l'utilisateur (à l'aide de `prompt`), puis d'afficher `"{{bravo}}"` dans une alerte modale (à l'aide de `alert`) si ce nombre est égal à `choixOrdi`, ou `"il fallait deviner X"` (en remplaçant `X` par la valeur de `choixOrdi`) dans le cas contraire.

- { "bravo": "bravo" }
- { "bravo": "congrats" }
- { "bravo": "yeah" }
- { "bravo": "super" }

---
