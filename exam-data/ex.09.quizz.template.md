# Controle 1 - QCM

Comment créer une variable en JavaScript ?
  		  
- maVariable;
* var maVariable;
- x = 0;
- maVariable = 'bonjour';

???

Réponse: il faut utiliser le mot clé `var` suivi du nom de la variable à créer.

---

Quel est le type de cette variable:

```
var maVariable = 3.2;
```

- string
* number
- decimal
- boolean

???

Réponse: en Javascript, les nombres décimaux sont aussi de type `number`.

---

Quel est le type de cette variable:

```
var maVariable = '3.2';
```

* string
- number
- decimal
- boolean

???

Réponse: la valeur est entourée d'apostrophes => c'est une chaîne de caractères (`string`).

---

Que vaut cette expression de comparaison de valeur ?

```
3.2 === '3.2'
```

- true
* false
- undefined
- c'est une affectation

???

Réponse: le triple égal est une comparaison stricte: elle renvoie `false` ici car les deux valeurs ne sont pas du même type.

---

En respectant les conventions indiquées en cours, quelle affectation faut-il exécuter pour que `J'ai tout compris !` s'affiche à l'écran ?

```
alert(message);
```

- message = "J'ai tout compris !";
- message = 'J"ai tout compris !';
* message = 'J\'ai tout compris !';
- message = J'ai tout compris !

???

Réponse: `'J\'ai tout compris !'` car nous utilisons des apostrophes autour des chaînes de caractères, et antislash pour afficher des apostrophes à l'intérieur de chaînes de caractères.

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

???

Réponse: seulement A, car les trois blocs conditionnels (`if {}`, `else if {}` et `else {}`) sont liés par des `else`. Donc seule la première alternative dont l'expression conditionnelle est vérifiée sera exécutée.
