Quel section de va être exécutée, si on exécute le code suivant ?

```
var nb = 2;
if (nb === 1) {
  // A
} else {
  // B
}
```

- A
* B
- A et B
- aucune 

???

Réponse: B, car l'expression d'égalité `nb === 1` de la premiere condition est fausse,
donc ce sont les intructions rattachées à l'alternative par défaut (`else`) qui sont exécutées.

---

Quel section de va être exécutée, si on exécute le code suivant ?

```
var nb = 2;
if (nb === 2) {
  // A
} else if (nb > 1) {
  // B
} else {
  // C
}
```

* A
- B
- A et B
- A, B et C

???

Réponse: A. Une seule des trois alternatives peut s'exécuter, car elles sont liées par des `else`.
Sachant que les conditions sont évaluées de haut en bas, et que la première expression est vraie,
c'est donc la section A qui va s'exécuter.

---

À quoi ressemblerait l'arbre de décision correspondant à ce code:

```
var reponse = prompt('as-tu faim ?')
if (reponse === 'oui) {
  var reponse2 = prompt('aimes-tu les burgers ?');
  if (reponse2 == 'oui') {
    alert('alors je t\'en offre un !');
  } else {
    alert('dommage !');
  }
} else {
  alert('désolé');
}
```

- une boîte et deux branches
- deux boîtes de même niveau
* une boîte de niveau 1, et une boîte de niveau 2
- une boîte et trois branches

???

Réponse: Une première boîte (niveau 1) représente la question `as-tu faim ?`, et a deux branches: `oui` et *autre*.
Liée à la première branche, une deuxième boîte (niveau 2) représente la question `aimes-tu les burgers ?`, et
a elle-aussi deux branches: `oui` et *autre*.

---

Pourquoi faut-il éviter d'utiliser les opérateurs `==` et `!=` ?

- car il vaut mieux utiliser une affectation `=`
- car ils sont trop stricts
* car ils sont trop laxistes
- var `===` et `!==` sont plus lisibles

???

Réponse: Ils sont trop laxistes, dans le sens où deux valeurs de types différents (ex: `1` et `'1'`) peuvent
être vus comme égaux par l'opérateur `==`. Cet excès de tolérance peut occasionner des comportements imprévus
qui font perdre beaucoup de temps à diagnostiquer et à corriger. Idem pour `!=`.
