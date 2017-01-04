# TP 1

Comment ouvrir la console JavaScript dans Google Chrome ?

- En tapant "console"
- En appelant le prof
- En demandant gentiment à Siri
* En pressant Cmd-Alt-J ou Ctrl-Shift-J

???

Réponse: *en pressant Cmd-Alt-J ou Ctrl-Shift-J*

---

Que retourne `typeof` quand il est appliqué sur `"bonjour"` ?

* `"string"`
- `string`
- `"object"`
- `undefined`

???

Réponse: `"string"`.
Pour le vérifier, taper `typeof "bonjour";` dans la console JavaScript.

---

Types de valeurs en JavaScript. Quel est l'intrus ?

- string
- boolean
* decimal
- number

???

Réponse: `decimal` était l'intrus.
En JavaScript, les nombres décimaux sont compris dans le type `number`.
Vérifier en tapant `typeof 4.5;` dans la console.

---

Comment créer une variable en JavaScript ?

- maVariable;
* var maVariable;
- x = 0;
- maVariable = 'bonjour';

???

Réponse: `var maVariable;`
Pour créer une variable, il faut utiliser le mot-clé `var`.
Après, il est possible de changer la valeur de cette variable sans avoir à utiliser `var`.
Il est aussi possible d'affecter une valeur à cette variable au moment de sa création: `var maVariable = 4;` 

---

Comment afficher la valeur d'une variable appelée `maVariable` depuis la console ?

* maVariable;
- var maVariable;
- maVariable?
- show maVariable

???

Réponse: `maVariable;`
Dans la console JavaScript, il suffit de taper le nom du variable pour afficher sa valeur, de la même façon que taper `1+1` provoquera l'affichage de `2`.
Le point virgule n'est pas imposé par la console JavaScript, mais c'est une convention à suivre.

---

Comment changer la valeur d'une variable existante ? (déjà créée)

- var maVariable = 4;
* maVariable = 4;
- maVariable(4);
- 4 = maVariable;

???

Réponse: `maVariable = 4;`
Le mot-clé `var` n'est à utiliser que lorsque la variable n'a pas encore été créée.
L'usage des parenthèses dans `maVariable(4);` provoque l'appel d'une fonction appelée `maVariable` en passant la valeur `4` en paramètre.
Enfin, l'opérateur d'affectation stocke la valeur à droite du `=` dans la variable à gauche du `=`, donc `4 = maVariable` n'a pas de sens car `4` n'est pas une variable. 

---

Si j'ai créé une variable dont la valeur est un nombre, que se passera-t-il si je lui affecte ensuite une chaine de caractères ?

- erreur, car le type est différent.
- erreur, car on ne peut pas changer la valeur d'une variable.
* la valeur de la variable va être remplacée par la chaine de caractères.
- les deux valeurs vont être concaténées.

???

Réponse: *la valeur de la variable va être remplacée par la chaine de caractères.*
L'affectation consiste à utiliser l'opérateur `=` pour remplacer la valeur d'une variable par une autre valeur.
Pour effectuer une concaténation, il faut utiliser l'opérateur `+`, et non l'opérateur d'affectation.
JavaScript est un langage faiblement typé, il est donc possible d'affecter une valeur de n'importe quel type à n'importe quelle variable.  
