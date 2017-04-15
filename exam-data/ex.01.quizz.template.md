```js
function bonjour(prenom) {
  var resultat = 'bonjour, ' + prenom;
  return resultat;
}
```

Qu'est-ce que ce code ne contient PAS:

- Affectation
- Définition de fonction
* Appel de fonction
- Concaténation

---

```js
for (var i = -1; i <= 1; i++) {
  // code sans importance
}
```

Combien de fois le code à l'intérieur des accolades va-t-il être exécuté ?

- 1 fois
- 2 fois
* 3 fois
- à l'infini

---

```js
if (a === 1) {
  // code sans importance
} else if (b === 1) {
  // code sans importance
} else {
  // code sans importance
}
```

Si on voulait représenter ces conditions sous forme d'un arbre de décision, combien contiendrait-il de niveaux ?

* 1
- 2
- 3
- 4

---

Supposons que nous ayons un tableau `fruits` ayant la valeur suivante:

```js
[ 'kiwi', 'prune', 'abricot', 'fraise' ]
```

Que se passe-t-il si on exécute l'instruction suivante:

```js
fruits[1] = 'litchi';
```

- la valeur "litchi" va être ajoutée au début du tableau
* la valeur "litchi" va remplacer "prune"
- la valeur "litchi" va remplacer "kiwi"
- cette expression vaut `false`

---

Supposons que nous ayons un tableau `fruits` ayant la valeur suivante:

```js
[ 'kiwi', 'prune', 'abricot', 'fraise' ]
```

Que se passe-t-il si on exécute l'instruction suivante:

```js
fruits.splice(1, 2);
```

- le nombre 2 sera inséré juste après "kiwi"
- la valeur "prune" va être retirée du tableau
* les valeurs "prune" et "abricot" vont être retirées du tableau
- les valeurs "prune", "abricot" et "fraise" vont être retirées du tableau
