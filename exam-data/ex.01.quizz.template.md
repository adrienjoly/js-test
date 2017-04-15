```js
function bonjour() {
  return 'bonjour !';
}
var resultat = bonjour();
```

Qu'est-ce que ce code ne contient PAS:

- Affectation
- Définition de fonction
- Appel de fonction
* Concaténation

---

```js
for (var i = -1; i < 1; i++) {
  bonjour();
}
```

Combien de fois la fonction `'bonjour'` va-t-elle être appelée ?

- 0 fois
- 1 fois
* 2 fois
- 3 fois

---

```js
if (a === 1) {
  if (b === 1) {
    // code sans importance
  } else {
    // code sans importance
  }
} else {
  // code sans importance
}
```

Si on voulait représenter ces conditions sous forme d'un arbre de décision, combien contiendrait-il de niveaux ?

- 1
* 2
- 3
- 4

---

Supposons que nous ayons un tableau `fruits` ayant la valeur suivante:

```js
[ 'kiwi', 'prune', 'abricot', 'fraise' ]
```

Que se passe-t-il si on exécute l'instruction suivante:

```js
fruits[3] = 'litchi';
```

- "litchi" va être ajouté à la fin du tableau
- "litchi" va remplacer l'abricot
* "litchi" va remplacer la fraise
- cette expression vaut `false`

---

Supposons que nous ayons un tableau `fruits` ayant la valeur suivante:

```js
[ 'kiwi', 'prune', 'abricot', 'fraise' ]
```

Que se passe-t-il si on exécute l'instruction suivante:

```js
fruits.splice(1, 0, 'mûre');
```

* un élément "mûre" sera inséré entre kiwi et prune
- un élément "mûre" sera inséré juste avant kiwi
- le deuxième élément (prune) va être remplacé par "mûre"
- le tableau restera inchangé
