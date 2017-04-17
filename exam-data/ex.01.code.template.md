# Requête AJAX simple

Écrire un programme JavaScript permettant:

 - d'envoyer une requête HTTP GET à l'URL `https://js-jsonplaceholder.herokuapp.com/posts/4`,
 - puis d'afficher avec `alert()` la réponse finale du serveur à cette requête.

Utiliser la classe `XMLHttpRequest()` pour effectuer cette requête.

???

```js
var xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://js-jsonplaceholder.herokuapp.com/posts/4');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    alert(xhr.responseText);
  }
};
xhr.send();
```

--

TODO: Evaluation du code
 - pas d'erreur de syntaxe
 - instanciation XMLHttpRequest
 - appel à open GET avec bonne URL
 - affectation à onreadystatechange
 - appel à send()
 - valeur affichée dans alert()

---

# Annuaire interactif

Un client souhaite un moyen d'accéder rapidement à l'adresse email d'un adhérent, à partir de son numéro d'adhérent.

Il met à disposition une API permettant d'accéder aux données de chaque adhérent. Il suffit d'effectuer une requête HTTP GET à l'URL `https://jsonplaceholder.typicode.com/users/<numero>`, où `<numero>` est à remplacer par le numéro d'adhérent dont on souhaite récupérer les données. L'API retourne alors une réponse au format JSON, contenant une propriété `email`.

Nous allons développer une solution simple consistant en:
 - une page HTML contenant un champ permettant de saisir le numéro d'adhérent, un bouton pour en obtenir l'adresse email, et un deuxième champ qui contiendra l'adresse email de l'adhérent,
 - et un programme JavaScript permettant d'effectuer les requêtes AJAX correspondantes vers leur API, et d'afficher l'adresse email de l'adhérent spécifié à chaque fois que l'utilisateur cliquera sur le bouton.

La page HTML de cette solution est fournie. Voici son code source:

```html
TODO
```

L'utilisateur doit pouvoir effectuer plusieurs recherches d'affilée, en tapant un autre numéro d'adhérent puis cliquant à nouveau sur le bouton.

Écrire le programme JavaScript à associer à cette page.

Vous devrez utiliser la classe `XMLHttpRequest()` pour effectuer les requêtes.

???

```js
var numero = document.getElementById('numero');
var bouton = document.getElementById('bouton');
var email = document.getElementById('email');
bouton.onclick = function() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + numero.value);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var adherent = JSON.parse(xhr.responseText);
      email.value = adherent.email;
    }
  };
  xhr.send();
};
```

--

TODO: code d'évaluation
 - pas d'erreur de syntaxe
 - affectation du onclick sur bouton
 - instanciation XMLHttpRequest avec new
 - pas de requete tant que bouton non pressé
 - requête avec numero=4 => requête bien émise à la bonne URL
 - requête avec numero=4 => email bien affichée dans le champ
 - requête avec numero=6 => requête bien émise à la bonne URL
 - requête avec numero=6 => email bien affichée dans le champ
