Laquelle de ces instructions constitue un objet JavaScript valide:

- [ prop1: 3, prop2: 4 ]
* { prop1: 3, prop2: 4 }
- { 2, true, 'bonjour' }
- { 'a': 1; 'b': 2 }

???

Un objet JavaScript:

 - accolades
 - propriétés définis par paires clé-valeur (syntaxe: `clé: valeur`)
 - propriétés séparées par des virgules

---

Comment récupérer la valeur de la propriété `nom` d'un objet affecté à une variable `personne` ?

- personne.get('nom');
- personne.[nom];
* personne[nom];
- personne.nom;

???

Sachant qu'on connaît littéralement la clé de la propriété (il s'agit de `nom`), on peut utiliser la notation pointée.

---

Toujours dans notre objet `personne`, comment récupérer la valeur d'une propriété dont la clé est stockée dans la variable `laCle` ?

- personne.get(laCle);
- personne.laCle;
* personne[laCle];
- personne['laCle'];

???

Sachant qu'on ne connaît pas a priori la clé de la propriété (car elle est stockée dans une variable), on ne peut PAS utiliser la notation pointée. => Il faut utiliser les crochets, comme pour récupérer la valeur d'un élément de tableau.

Et, sachant que `laCle` est une variable, et non la valeur littérale de notre clé, il ne faut pas l'écrire entre apostrophes.

---

```js
var compteFacebook = {
  groupes: {
    maitresJedi: {},
    lolcats: {
      titre: 'Vive les chats !',
      membres: [ 'Patrick' ],
    },
  },
};
```

Quelle instruction faut-il saisir pour accéder à la valeur `'Patrick'` ?

* compteFacebook.groupes.lolcats.membres[0]
- compteFacebook.membres[0]
- [comptesFacebook][groupes][localcats][membres][0]
- ['comptesFacebook']['groupes']['localcats']['membres'][0]

???

Il faut préciser tout le cheminement à effectuer, niveau par niveau, en partant de la racine de l'arbre: la variable qui contient l'objet principal.

Vu qu'on connaît les clés de chaque propriété de cet objet hiérarchique (objets imbriqués), on peut utiliser la notation pointée, sauf pour accéder au premier élément du tableau contenant la valeur `'Patrick'`.

Il est possible d'utiliser des crochets au lieu de la notation pointée, à condition de mettre les noms de chaque clé entre apostrophes (car on connaît leur valeur littérale à priori), et de ne pas mettre le nom de la variable contenant l'objet (`compteFacebook`) entre crochets, car ce n'est pas une clé de propriété.
