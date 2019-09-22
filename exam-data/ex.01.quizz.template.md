# QCM (1 point par bonne réponse)

Je viens de "cloner" un projet Node.js depuis GitHub. Comment installer les dépendances de ce projet ?

- npm start
- npm init
* npm install
- npm install express --save

---

Quel fichier contient la liste des dépendances npm installées dans le projet Node.js ?

- serveur.js
- server.js
* package.json 
- node_modules

---

À quoi sert la fonction `require()` ?


- à déployer notre serveur dans le cloud
- à configurer Node.js
- à créer une API Web utilisant le protocole HTTP
* à charger une dépendance npm dans un programme Node.js

---

Quel est le nom du package npm permettant de faciliter la création d'une API web ?

- package.json
- Heroku
- .gitignore
* express

---

J'ai créé une API avec Node.js et l'ai lancée en local avec la commande `npm start`. Quel logiciel exécute le code permettant de répondre aux requêtes reçues par cette API ?

- Mon navigateur Web
- La commande curl
- Heroku
* node

---

À quoi sert Express.js ?

- à mettre une API en production
* à faciliter la création d'un serveur HTTP
- à accelérer la vitesse de traitement des requêtes HTTP
- à gérer des requêtes asynchrones comme si elles étaient synchrones

---

Quelle expression Node.js permet de récupérer le numéro de port choisi par Heroku ? (via lequel notre serveur pourra recevoir les requêtes HTTP)

- 3000
- console.log("port");
- app.listen(PORT, function() {});
* process.env.PORT 

---

Quelle fonction permet d'expliquer à Node.js comment répondre à une requête HTTP GET ?

En supposant que `app` est une instance de Express.js.

- process.env.PORT
- express()
* app.get()
- app.listen()

---

Quel est le type du deuxième paramètre qu'il faut passer quand on appelle la fonction `app.get()` ?

Pour rappel, le premier paramètre de cette fonction est une chaine de caractères (type = `string`) contenant le chemin de l'API que l'on est en train de définir.

- port
- null
- string
* function

---

À quoi sert Heroku ?

* à déployer un programme en production, sur internet
- à compiler un programme Node.js
- à déboguer un programme Node.js
- à tester des chat bots
