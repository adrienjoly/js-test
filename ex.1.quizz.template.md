--- // TP B

```html
<form id="formulaire"><input id="email"></form>
```
```js
document.getElementById('formulaire').onsubmit = function(event) {
  event.preventDefault();
  alert('bonjour')
  if (document.getElementById('email').value == 'hollande@elysee.fr') {
    alert('Vérifiez votre adresse');
  }
};
```

Quel est le rôle de `evt.preventDefault()` ?

- le formulaire sera crypté
- le formulaire sera envoyé en AJAX
* la page ne change pas quand l'utilisateur appuie sur Entrée
- le champ email vaudra 'hollande@elysee.fr' par défaut

---

Que se passera-t-il si l'utilisateur tape 'hollande@elysee.fr' dans le champ puis presse Entrée ?

- une requête AJAX va être envoyée
- la page va se recharger
- seul le message 'Vérifiez votre adresse' va s'afficher 
* 'bonjour' puis 'Vérifiez votre adresse' vont s'afficher

---

Pourquoi faut-il mettre deux signes d'égalité ?

- le simple egal ne fonctionne qu'entre les nombres
- le simple egal ne sert qu'à créer des variables
* le simple egal modifie la valeur de ce qui est à sa gauche
- le simple egal affecte la valeur de gauche à droite

---

```html
<label for="ref1">
<input type="checkbox" name="ref1">
<input type="text" id="ref1">
```
```js
var ref = document.getElementById('ref1')
```

À quel élément la variable `ref` fait-elle référence ?

- le label
- la case a cocher
* le champ texte
- aucun

--- // TP C

```js
var a = 2;
a + 4;
a = 1;
alert(a + 4);
```

Quel chiffre va être affiché ?

- 1
- 2
* 5
- 6

---

Comment écrire du texte dans la console ?

- alert('message')
- function(message)
* console.log('bonjour')
- var message = 'bonjour'

---

```html
<a id="link" href="http://google.com">google</a>
```
```js
link.onclick = function(evt) { evt.preventDefault(); }
```

En supposant que la variable `link` fasse référence au lien HTML ci-dessus, que se passe-t-il si on clique sur ce lien ?

* rien
- on change de page
- un message est affiché à l'écran
- le formulaire n'est pas soumis

---

```js
if (0 == 0 && 1 == 3) {
    alert('Un est égal à trois');
}
else if (2 == 2) {
    alert('Deux est égal à lui-même');
}
else {
    alert('Les conditions sont toutes fausses');
}
```

Quelles alertes sont affichées ?

- 'Un est égal à trois'
* 'Deux est égal à lui-même'
- 'Les conditions sont toutes fausses'
- les trois

--- // TP D

```js
for ( var i = 0; i < 4; i++ ) {
  console.log(i);
}
```

Combien de chiffres vont être affichés ?

- 0
- 1
- 3
* 4

--- // TP E

```js
function multiplierParDeux (nombre) {
  return nombre * 2;
}
var resultat = multiplierParDeux(multiplierParDeux(3));
```

Que vaut `resultat` ?

- 2
- 3
- 6
* 12

--- // TP G

```js
var xhr = new XMLHttpRequest(); 
xhr.open('GET', 'http://jsonplaceholder.typicode.com/users/1');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
    // [...]
  }
};
xhr.send(null);
```

Comment afficher la propriété `name` de l'objet JSON renvoyé en réponse de cette requête AJAX ?

- alert(xhr.responseText.name)
* alert(JSON.parse(xhr.responseText).name)
- alert(JSON.parse('name'))
- alert(xhr.send('name'))

--- // TP H

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://httpbin.org/post');
```

Comment envoyer un objet JSON contenant une propriété `name` ayant "steve" comme valeur:

* xhr.send(JSON.stringify({ name: 'steve' }));
- alert(JSON.stringify('name', 'steve'))
- xhr.responseText = {name: 'steve'};
- xhr.send('name', 'steve')

--- // TP I

```html
<a href="http://eemi.com">eemi</a>
```

Je veux ajouter une image à l'intérieur de l'élément `<a>`, référencé par la variable `lien`:

- lien.setAttribute('href', 'http://eemi.com/image.jpg');
* lien.innerHTML = lien.innerHTML + '<img src="http://eemi.com/image.jpg">';
- lien.innerText += "http://eemi.com/image.jpg";
- lien.image = 'http://eemi.com/image.jpg';

--- // TP K

Trouvez l'intrus: qu'est-ce qui n'a aucun rapport direct avec un back-end ?

* une interface d'administration du site
- une API pour effectuer des opérations CRUD
- le stockage des données du site
- Firebase

---

Laquelle de ces applications ne pourrait pas fonctionner sans back-end ?

* Facebook
- Angry birds
- Une application de conversion de devises
- Votre éditeur de texte

---

Quelle serait la principale limitation d'une app de todo-list sans back-end ?

- la page se rafraichit à chaque fois qu'on ajoute une tache
- tous les utilisateurs auraient la même liste de taches
* toutes les modifications seraient "oubliées" quand on rafraichit la page
- on ne pourrait pas se logger avec son compte EEMI

---

Quelle commande permet d'ajouter un objet à stocker dans firebase ?

- myDataRef.on('child_added', objet);
* myDataRef.push(objet);
- new Firebase('https://flickering-inferno-5369.firebaseIO.com');
- afaire.innerHTML = afaire.innerHTML + '<p>' + objet + '</p>';

---

```js
myDataRef.on('child_added', function(snapshot) { alert('bonjour') })
```

En supposant que ma base de données firebase référencée par la variable `myDataRef` contienne 3 objets, combien de fois vais-je voir "bonjour" s'afficher ?

- 0
- 1
- 2
* 3

--- // TP L

Comment supprimer de firebase un objet dont la clé est `key` ?

* new Firebase('https://flickering-inferno-5369.firebaseIO.com/' + key).remove();
- Firebase.remove('https://flickering-inferno-5369.firebaseIO.com/' + key);
- Firebase.remove(key);
- document.getElementById(key).remove();

--- // TP M

Quelle commande permet de créer un repository local ?

* git init
- mkdir todolist
- git checkout
- cd todolist

---

Qu'est-ce que la commande `git clone` ne fait pas ?

- créer un sous-répertoire
- créer un repo local
- télécharger le code depuis un repo distant
* envoyer les modifs du repo local vers le repo distant

---

Qu'est-ce que la commande `git checkout` ne permet pas de faire ?

* créer un repo local
- creer une branche gh-pages
- revenir sur la branche master
- revenir à une ancienne version (commit) du code

---

Quelle commande n'est pas nécéssaire pour partager ses modifications de code avec ses collaborateurs ?

- git add
* git log
- git commit
- git push

---
