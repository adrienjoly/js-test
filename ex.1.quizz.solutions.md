---

Que renvoie `typeof` quand il est appliqué sur `"bonjour"` ?

* **`"string"`**
- `string`
- `"object"`
- `undefined`

---

Que renvoie `typeof` quand il est appliqué sur un tableau ?

- `"array"`
- `array`
* **`"object"`**
- `undefined`

---

```js
var tab = [ 's', 'u', 'p', 'e', 'r' ];
```

Si je veux afficher une alerte modale seulement quand la valeur de `lettre` n'est pas contenue dans `tab`, quelle condition dois-je utiliser dans mon `if` ?

- `tab[lettre] == false`
- `tab[lettre] == -1`
- `tab.indexOf(lettre) == false`
* **`tab.indexOf(lettre) == -1`**

---

```js
// la bibliothèque "underscore" a été chargée dans l'objet "_"
var template = '<%= nb %> lutin<%= pl %>';
var nombre = 3;
var rendu = _.template(template, {
  nb: nombre,
  pl: 's'
});
```

Que vaut la variable `rendu` ?

* **`"3 lutins"`**
- `"trois lutins"`
- `"3 lutin"`
- `"nombre lutins?"`

---

Je crée un tableau `[ 'a', 'b', 'c' ]`, puis j'utilise successivement les méthodes `push('d')` et `splice(1, 2)` sur ce tableau. Que contient le tableau à la fin ?

- `[ 'a', 'b', 'c' ]`
- `[ 'a', 'b', 'c', 'd' ]`
- `[ 'b' ]`
* **`[ 'a', 'd' ]`**

---

Pour stocker des données dans un back-end Firebase en Javascript, qu'ai-je besoin de faire ?

- Je dois effectuer une requête Ajax avec XMLHttpRequest
- Je uploader un fichier JSON sur le serveur de Firebase
* Je dois utiliser une fonction de l'API de Firebase comme push() ou update()
- Je dois utiliser un bouton Google Connect pour m'identifier

---

Si `typeof x` vaut `"object"`, et `x.length` vaut `undefined`, quel est le type de la variable `x` ?

- Tableau vide
* **Objet**
- Chaîne de caractères vide
- Valeur non définie

---

La ligne `hello();` sert à:

* **appeler la fonction hello**
- définir la fonction hello
- afficher hello
- (on ne peut pas répondre à cette question sans plus de contexte)

---

```js
hello[1] = 2
```

- affiche la valeur du tableau `hello` à l'indice `1`
- sert à vérifier que la valeur à l'indice `1` vaut `2`
- affecte la valeur `1` à l'indice `2` du tableau
* **remplace la valeur à l'indice `1` du tableau par `2`**

---

Si j'ai deux conditions `if` liées par un `else`, laquelle de ces propositions est fausse:

- les conditions sont évaluées une à une
* **si la seconde est vraie alors la première est ignorée**
- seule le code d'une des deux condition sera exécuté
- il est possible qu'aucune condition ne soit vraie

---

Quand on définit une fonction, que faut-il mettre entre les parenthèses qui suivent le nom de la fonction ?

- rien
- le nom de la fonction
* **un nom pour chaque paramètre attendu**
- les valeurs littérales (ex: `3`) qui serviront de paramètres

---

On définit une fonction `fct` qui prend un nombre en paramètre, et retourne le double de ce nombre. Comment obtenir le double de `2` en utilisant cette fonction ?

- `function fct(2)`
* `**fct(2)`**
- `fct(2, 2)`
- `fct(2 * 2)`

---
