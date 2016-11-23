Comment créer une variable en JavaScript ?
  		  
- maVariable;
* var maVariable;
- x = 0;
- maVariable = 'bonjour';

---

Quel est le type de cette variable:

```
var maVariable = 3.2;
```

- string
* number
- decimal
- boolean

---

Quel est le type de cette variable:

```
var maVariable = '3.2';
```

* string
- number
- decimal
- boolean

---

Que vaut cette expression de comparaison de valeur ?

```
3.2 === '3.2'
```

- true
- false
- undefined
- c'est une affectation

---

En respectant les conventions indiquées en cours, quelle affectation faut-il exécuter pour que `J'ai tout compris !` s'affiche à l'écran ?

```
alert(message);
```

- message = "J'ai tout compris !";
- message = 'J"ai tout compris !';
* message = 'J\'ai tout compris !';
- message = J'ai tout compris !

---

Quelles sections vont être exécutées, si on exécute le code suivant ?

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

* seulement A
- seulement B
- A et B
- A, B et C

---

À quoi ressemblerait l'arbre de décision correspondant à ce code:

```
var reponse = prompt('as-tu faim ?')
if (reponse === 'oui') {
  var reponse2 = prompt('aimes-tu les burgers ?');
  if (reponse2 === 'oui') {
    alert('alors je t\'en offre un !');
  } else {
    alert('dommage !');
  }
} else {
  alert('désolé');
}
```

- une boîte de niveau 1, et deux branches
- une boîte de niveau 1, et quatre branches
- deux boîtes de niveau 1, avec deux branches chacune
* deux boites de niveaux différents, liées par une branche
