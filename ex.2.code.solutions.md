---

Écrivez le code JS permettant d'envoyer une requête Ajax de type GET à l'URL `https://js-jsonplaceholder.herokuapp.com/users/1`. Une fois la réponse reçue, votre code doit afficher dans la console seulement la valeur de la propriété `username` de cette réponse JSON.

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://js-jsonplaceholder.herokuapp.com/users/1');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
    console.log(JSON.parse(xhr.responseText).username);
  }
};
xhr.send(null);
```

---

Écrivez le code JS permettant d'envoyer une requête Ajax de type POST à l'URL `https://js-httpbin.herokuapp.com/post`, en transmettant un objet JSON contenant une propriété `date` valant `"2016"`.

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://js-httpbin.herokuapp.com/post');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
    alert(xhr.responseText);
  }
};
xhr.send(JSON.stringify({ date: '2016' }));
```

---

Définissez une fonction `plusUn` qui renvoie le nombre passé en paramètre après y avoir additionné le nombre `1`; de manière à ce que `plusUn(1)` renvoie `2`, `plusUn(2)` renvoie `3`, etc...

Cette fonction ne doit ni afficher d'alerte modale, ni écrire dans la console. Utilisez `return` pour renvoyer le résultat de l'addition.

```js
function plusUn(p) {
  return p + 1;
}
```

---

Supposons que vous disposiez d'une fonction `plusUn` définie telle que dans la question précédente.

Écrivez le code JS permettant de demander un nombre a l'utilisateur (à l'aide de `prompt`), d'appeler la fonction `plusUn` en passant ce nombre en paramètre, puis d'afficher le résultat de cet appel dans une alerte modale (`alert`).

```js
alert(plusUn(parseInt(prompt())));
```

---

Écrivez une boucle qui affiche dans la console tous les nombres entiers pairs entre `1` et `100` (compris).

`console.log` ne doit paraître qu'une seule fois dans votre code.

Utilisez `% 2` (opérateur modulo) pour savoir si un nombre est pair ou impair.

```js
for (var i=1; i<=100; ++i) {
  if (i % 2 == 0) {
    console.log(i);
  }
}
```

---

Définissez une fonction `tabNombres` qui renvoie (à l'aide de `return`) un tableau contenant tous les nombres entiers entre `1` et `n` (compris), `n` étant un nombre passé en paramètre de cette fonction.

Cette fonction ne doit pas écrire dans la console.

Pour créer un tableau vide, il suffit d'écrire `[]`.

```js
function tabNombres(n) {
  var tab = [];
  for (var i=1; i<=n; ++i) {
    tab.push(i);
  }
  return tab;
}
```

---

Définir une fonction `chaines` qui prend un tableau en paramètre et renvoie (à l'aide de `return`) un autre tableau contenant seulement les valeurs de type `"string"` contenues dans le tableau passé en paramètre.

Le tableau résultant ne doit contenir que des chaines de caractères, et donc aucune valeur `null` ou `undefined`.

```js
function chaines(t) {
  var tab = [];
  for (var i=0; i<t.length; ++i) {
    if (typeof t[i] == "string") {
      tab.push(t[i]);
    }
    return tab;
  }
}
```

---

Nous allons implémenter un petit jeu consistant à deviner un nombre entier choisi aléatoirement entre `1` et `4` (compris) par l'ordinateur.

Écrire le code JS permettant de stocker ce nombre aléatoire dans une variable `choixOrdi`, de demander un nombre a l'utilisateur (à l'aide de `prompt`), puis d'afficher `"yeah"` dans une alerte modale (à l'aide de `alert`) si ce nombre est égal à `choixOrdi`, ou `"il fallait deviner X"` (en remplaçant `X` par la valeur de `choixOrdi`) dans le cas contraire.

```js
var choixOrdi = 1 + Math.floor(Math.random() * 4);
if (prompt() == choixOrdi) {
  alert('yeah');
} else {
  alert('il fallait deviner ' + choixOrdi);
}
```

---
