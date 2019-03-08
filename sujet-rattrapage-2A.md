---
title: Projet à rendre en groupe - Service de gestion de notes personnelles
layout: default
---

<!-- WORK IN PROGRESS

- https://github.com/eemi-aj/node-note-keeper
- https://circleci.com/gh/eemi-aj/node-note-keeper
- réf: https://trello.com/c/OY8UVMiS/25-%F0%9F%8E%93-cours#comment-5c33318474ebba6e5f47f9d9
-->

Le but est d'écrire et de mettre en production une application Web permettant à des utilisateurs de gérer leurs notes personnelles.

Ce travail est à effectuer en groupe, et sera évalué à la fois de manière collective et individuelle.

Afin de vérifier son bon fonctionnement, ainsi que le respect du cahier des charges et des critères d'évaluation fournis ci-dessous, le code source rendu sera exécuté et vérifié par une suite de tests automatisés.

## Critères d'évaluation

Chaque groupe devra rendre deux URLs:
- l'URL du dépôt git contenant le code source et l'historique de commits, hébergé sur le GitLab de l'école;
- et l'URL à laquelle l'application Web a été déployée en production.

Le travail du groupe et de ses collaborateurs sera évalué selon les critères suivants:
- Fonctionnel: Les fonctionnalités ont été implémentées conformément au cahier des charges fourni ci-dessous.
- Lisibilité: Le dépôt git respecte la structure de fichiers de `express-generator`. Il contient un fichier `README.md` qui explique comment cloner et faire fonctionner l'application depuis une autre machine que la sienne. Les fichiers JavaScript doivent respecter les conventions de codage de Express: chaînes de caractères entre apostrophes, indentation à 2 espaces, usage de point-virgules pour ponctuer chaque instruction.
- Production: L'application Web doit être accessible et fonctionnelle en production, à l'URL fournie.
- Collaboration: Chaque collaborateur de l'équipe devra avoir contribué une partie substantielle du code source de l'application. Ceci sera vérifié grâce à l'historique des commits git.

## Cahier des charges

Dans cette section, nous décrivons les fonctionnalités attendues dans l'application Web à produire.

Attention: Sachant que ces fonctionnalités seront vérifiés par des tests automatisés, merci de respecter ces spécifications **à la lettre**. Ceci inclue notamment: le nom des routes, la structure des objets JSON à produire, les chaines de caractères fournies... (liste non exhaustive)

> Le saviez-vous: Le cahier des charges est un document habituellement produit par le client (ou co-écrit avec lui) pour exprimer ses besoins de la manière la plus précise possible. En effet, lors de la recette, le client vérifiera le produit livré remplit bien les attentes listées dans ce document.

### Spécifications fonctionnelles

L'application Web à fournir doit permettre à chaque utilisateur de:
- créer un compte en fournissant un identifiant et mot de passe;
- se connecter à l'aide de son identifiant et mot de passe;
- se déconnecter;
- visualiser toutes ses notes, dans l'ordre anti-chronologique, avec leur date de création;
- saisir une nouvelle note;
- supprimer n'importe laquelle de ses notes.

Les notes seront à stocker et afficher en tant que texte brut (c.a.d. non HTML) mais doivent pouvoir contenir des sauts de ligne, ainsi que n'importe quel caractère Unicode. (accents, emoji...)

L'application s'adresse à des utilisateurs experts et francophones qui souhaitent pouvoir s'en servir très efficacement. Faire en sorte que les pages se chargent rapidement, soient réactives, et qu'aucune confirmation (ou dialogue modal / bloquant) ne soit affichée, même lors de la suppression de notes.

Chaque page Web rendue par l'application doit être facilement compréhensible et utilisable à la souris et au clavier par les utilisateurs, quel que soit leur navigateur. Les fonctionnalités doivent être assurées même si l'exécution de code JavaScript a été désactivée dans le navigateur de l'utilisateur.

### Spécifications techniques

#### Environnement d'exécution

Le serveur Web doit pouvoir s'exécuter dans n'importe quel environnement de type Linux, doté de Node.js version 10 et de MongoDB version 4.

Les variables d'environnement suivantes seront fournies:
- `PORT`: numéro de port sur lequel le serveur Web devra être à l'écoute de requêtes HTTP entrantes;
- `MONGODB_URL`: l'URL permettant à l'application de se connecter au serveur MongoDB.

#### Sécurité

Les comptes utilisateur et sessions doivent être stockés en base de données. Les mots de passe ne doivent jamais être stockés en clair. Les chiffrer au format MD5.

La session utilisateur doit être transmise au navigateur de l'utilisateur à l'aide d'un *cookie* appelé `notemanager` et dont la valeur est un code permettant de retrouver cette session en base de données. En cas de perte ou de corruption du cookie, l'utilisateur ne doit pas avoir accès à ses notes avant de s'identifier à nouveau.

#### Interfaces

Le serveur Web de l'application implémentera du *server-side rendering*. C'est à dire que chaque route décrite ci-dessous devra rendre du contenu HTML valide (W3C) et prêt à être affiché dans le navigateur.

Pour des raisons de sécurité et d'esthétique, l'usage de paramètres `GET` est interdit. Les routes doivent être capables d'interpréter les paramètres au format `application/x-www-form-urlencoded`, conformément aux possibilités des formulaires HTML standards.

Les routes à implémenter sont décrites ci-dessous.

##### Route `GET /`

L'index de l'application Web est une page HTML qui contient:
- Un favicon;
- Le nom de l'application, affiché en haut à gauche;
- Si l'utilisateur est connecté, inclure:
  - L'identifiant de l'utilisateur qui est actuellement connecté, affiché en haut à droite;
  - Un bouton permettant de se déconnecter en un clic, via la route `POST /signout`;
  - Un formulaire permettant d'ajouter une note, via la route `PUT /note`;
  - Toutes les notes de l'utilisateur connecté, accompagnées de leur date de création et d'un bouton permettant de supprimer chaque note individuellement, via la route `DELETE /note/:id`.
- Si l'utilisateur n'est pas connecté, inclure:
  - Un formulaire permettant de créer un compte en saisissant un identifiant et un mot de passe, via la route `POST /signup`;
  - Un formulaire permettant de se connecter avec un identifiant et un mot de passe, via la route `POST /signin`;
  - Une description du service apporté par cette application Web. (*landing page*)

##### Route `POST /signup`

Cette route permet de créer un compte utilisateur, à partir d'un identifiant et mot de passe choisis par l'utilisateur.

Une fois le compte créé, une session est ouverte pour cet utilisateur, et celui-ci est redirigé vers l'index de l'application.

En cas d'erreur, une description de l'erreur est affichée, et un hyperlien permet à l'utilisateur de retourner sur la page d'index pour essayer à nouveau.

Paramètres attendus:
- `user_id`: identifiant choisi par l'utilisateur;
- `password`: mot de passe choisi par l'utilisateur. (en clair / non chiffré)

Cas d'erreurs (liste non exhaustive):
- si `password` contient moins de 4 caractères: `Le mot de passe doit contenir au moins 4 caractères` et retourner un code HTTP `400`.
- si `user_id` contient un ou plusieurs caractères autre que des lettres minuscules non accentuées entre `a` et `z`, afficher le message d'erreur suivant: `Votre identifiant ne doit contenir que des lettres minuscules non accentuées` et retourner un code HTTP `400`.
- si `user_id` contient moins de 2 caractères ou plus de 20 caractères, afficher le message d'erreur suivant: `Votre identifiant doit contenir entre 2 et 20 caractères` et retourner un code HTTP `400`.
- si `user_id` est déjà associé à un utilisateur existant en base de données, afficher le message suivant: `Cet identifiant est déjà associé à un compte` et retourner un code HTTP `400`.

##### Route `POST /signin`

Cette route permet à un utilisateur de se connecter à son compte, en fournissant son identifiant et son mot de passe.

Une fois les identifiants vérifiés, une session est ouverte pour cet utilisateur, et celui-ci est redirigé vers l'index de l'application.

En cas d'erreur, une description de l'erreur est affichée, et un hyperlien permet à l'utilisateur de retourner sur la page d'index pour essayer à nouveau.

Paramètres attendus:
- `user_id`: identifiant choisi par l'utilisateur;
- `password`: mot de passe choisi par l'utilisateur. (en clair / non chiffré)

Cas d'erreurs (liste non exhaustive):
- si `password` contient moins de 4 caractères: `Le mot de passe doit contenir au moins 4 caractères` et retourner un code HTTP `400`.
- si `user_id` contient un ou plusieurs caractères autre que des lettres minuscules non accentuées entre `a` et `z`, afficher le message d'erreur suivant: `Votre identifiant ne doit contenir que des lettres minuscules non accentuées` et retourner un code HTTP `400`.
- si `user_id` contient moins de 2 caractères ou plus de 20 caractères, afficher le message d'erreur suivant: `Votre identifiant doit contenir entre 2 et 20 caractères` et retourner un code HTTP `400`.
- si `user_id` n'est associé à aucun compte utilisateur de la base de données, afficher le message suivant: `Cet identifiant est inconnu` et retourner un code HTTP `403`.

##### Route `POST /signout`

Cette route permet à un utilisateur de se déconnecter de son compte.

Une fois la session close, celui-ci est redirigé vers la page d'index.

En cas d'erreur, une description de l'erreur est affichée, et un hyperlien permet à l'utilisateur de retourner sur la page d'index pour essayer à nouveau.

L'exécution de cette route a pour effet de supprimer la session de cet utilisateur en base de données et le *cookie* de l'utilisateur.

##### Route `PUT /note`

Cette route permet à un utilisateur connecté d'ajouter une note.

Une fois la note enregistrée en base de données, l'utilisateur est redirigé vers la page d'index, où la note doit être désormais visible en première position.

En cas d'erreur, une description de l'erreur est affichée, et un hyperlien permet à l'utilisateur de retourner sur la page d'index pour essayer à nouveau.

Paramètres attendus:
- `content`: contenu de la note saisie par l'utilisateur.

Cas d'erreurs (liste non exhaustive):
- si l'utilisateur n'est pas connecté, afficher le message suivant: `Utilisateur non connecté` et retourner un code HTTP `401`.

##### Route `DELETE /note/:id`

Cette route permet à un utilisateur connecté de supprimer une note.

Une fois la note supprimée de la base de données, l'utilisateur est redirigé vers la page d'index, où la note ne doit plus être listée.

En cas d'erreur, une description de l'erreur est affichée, et un hyperlien permet à l'utilisateur de retourner sur la page d'index pour essayer à nouveau.

Paramètres attendus:
- `id` (fourni directement dans le chemin): identifiant unique de la note à supprimer.

Cas d'erreurs (liste non exhaustive):
- si `id` n'est associé à aucune note stockée dans la base de données, afficher le message suivant: `Cet identifiant est inconnu` et retourner un code HTTP `404`.
- si `id` est associé à une note appartenant à un autre utilisateur, afficher le message suivant: `Accès non autorisé à cette note` et retourner un code HTTP `403`.
