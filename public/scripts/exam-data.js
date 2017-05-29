// generated by build-exercises.js
(function(document) {
  'use strict';
  if(window.location.href.match(/^http\:\/\/(?!localhost|(.*.ngrok.io)).*$/))
    window.location.href = window.location.href.replace('http:', 'https:');
  var app = document.querySelector('#app');
  app.config = {
    "title": "JavaScript - Partiel 2",
    "PUBLIC_TEST_MODE": false,
    "DISPLAY_SOLUTIONS_AFTER_SUBMIT": false,
    "redirectToHttps": true,
    "examPack": {
      "publishSolutions": false,
      "publishEvalTests": false
    },
    "backend": {
      "type": "firebase",
      "FIREBASE_CONFIG": {
        "apiKey": "AIzaSyDvyDGBIXfhto7CQ7fflkY213e-mr3iMTo",
        "databaseURL": "https://js-part-2.firebaseio.com",
        "messagingSenderId": "83750922078"
      }
    },
    "teacherEmail": "adrien.joly@eemi.com",
    "GOOGLE_CLIENT_ID": "247219641427-ifeq88p7rgor9al5ksduds7ug0ba7djr.apps.googleusercontent.com",
    "GOOGLE_CLIENT_DOMAIN": "eemi.com",
    "LOGIN_INVITE": "Se connecter à son compte EEMI:",
    "quizzGrading": {
      "ptsRight": 1,
      "ptsWrong": 0,
      "ptsNull": 0
    },
    "codeGrading": {
      "ptsPerExercise": 4
    }
  };
  app.exercises = [
    {
      "_info": "generated from ex.01.quizz.template.md",
      "i": 1,
      "isQuizz": true,
      "title": "QCM",
      "maxScore": 4,
      "questions": [
        {
          "i": 1,
          "id": "qcm1",
          "md": "Pour modifier le texte visible d'un lien hypertexte (`<a>`) depuis JavaScript, il faut utiliser:\n",
          "choices": [
            {
              "name": 1,
              "text": "XMLHttpRequest"
            },
            {
              "name": 2,
              "text": "alert()"
            },
            {
              "name": 3,
              "text": "innerHTML"
            },
            {
              "name": 4,
              "text": "href"
            }
          ]
        },
        {
          "i": 2,
          "id": "qcm2",
          "md": "Quel est actuellement le format le plus couramment utilisé pour échanger des données en AJAX ?\n",
          "choices": [
            {
              "name": 1,
              "text": "JSON"
            },
            {
              "name": 2,
              "text": "HTML"
            },
            {
              "name": 3,
              "text": "XML"
            },
            {
              "name": 4,
              "text": "String"
            }
          ]
        },
        {
          "i": 3,
          "id": "qcm3",
          "md": "Quelle méthode ou propriété de l'API du DOM n'est pas employée par le code jQuery suivant: `$('form .nom').val()` ?\n",
          "choices": [
            {
              "name": 1,
              "text": "value"
            },
            {
              "name": 2,
              "text": "getElementById()"
            },
            {
              "name": 3,
              "text": "getElementsByTagName()"
            },
            {
              "name": 4,
              "text": "getElementsByClassName()"
            }
          ]
        },
        {
          "i": 4,
          "id": "qcm4",
          "md": "Lequel de ces symboles vus en cours est une classe ?\n",
          "choices": [
            {
              "name": 1,
              "text": "console"
            },
            {
              "name": 2,
              "text": "classList"
            },
            {
              "name": 3,
              "text": "style"
            },
            {
              "name": 4,
              "text": "XMLHttpRequest"
            }
          ]
        }
      ]
    },
    {
      "_info": "generated from ex.02.code.template.md",
      "i": 2,
      "isCode": true,
      "title": "Exercices de codage",
      "maxScore": 16,
      "questions": [
        {
          "i": 5,
          "id": "code5",
          "variants": [
            {
              "fctName": "acronyme"
            },
            {
              "fctName": "genererAcronyme"
            },
            {
              "fctName": "acro"
            }
          ],
          "mdVariants": [
            "## Acronyme\n\nUn acronyme consiste en la concaténation des trois premières lettres de chaque prénom et nom d'une personne.\n\nVoici quelques tests unitaires pour illustrer l'usage et les retours attendus d'une fonction `acronyme()`:\n\n```js\nacronyme(['adrien', 'joly']) === 'adrjol';\nacronyme(['paul', 'edouard', 'vaillant']) === 'pauedovai';\n```\n\nDéfinir la fonction `acronyme` retournant l'acronyme d'une personne, à partir d'un tableau de prénom(s) et nom(s) passé en paramètre, tel que montré en exemple dans les tests unitaires ci-dessus.\n\nNote: Vous pouvez utiliser les méthodes `substr()` ou `substring()` pour extraire les premières lettres d'une chaine de caractères.\n\n\n",
            "## Acronyme\n\nUn acronyme consiste en la concaténation des trois premières lettres de chaque prénom et nom d'une personne.\n\nVoici quelques tests unitaires pour illustrer l'usage et les retours attendus d'une fonction `genererAcronyme()`:\n\n```js\ngenererAcronyme(['adrien', 'joly']) === 'adrjol';\ngenererAcronyme(['paul', 'edouard', 'vaillant']) === 'pauedovai';\n```\n\nDéfinir la fonction `genererAcronyme` retournant l'acronyme d'une personne, à partir d'un tableau de prénom(s) et nom(s) passé en paramètre, tel que montré en exemple dans les tests unitaires ci-dessus.\n\nNote: Vous pouvez utiliser les méthodes `substr()` ou `substring()` pour extraire les premières lettres d'une chaine de caractères.\n\n\n",
            "## Acronyme\n\nUn acronyme consiste en la concaténation des trois premières lettres de chaque prénom et nom d'une personne.\n\nVoici quelques tests unitaires pour illustrer l'usage et les retours attendus d'une fonction `acro()`:\n\n```js\nacro(['adrien', 'joly']) === 'adrjol';\nacro(['paul', 'edouard', 'vaillant']) === 'pauedovai';\n```\n\nDéfinir la fonction `acro` retournant l'acronyme d'une personne, à partir d'un tableau de prénom(s) et nom(s) passé en paramètre, tel que montré en exemple dans les tests unitaires ci-dessus.\n\nNote: Vous pouvez utiliser les méthodes `substr()` ou `substring()` pour extraire les premières lettres d'une chaine de caractères.\n\n\n"
          ]
        },
        {
          "i": 6,
          "id": "code6",
          "variants": [
            {}
          ],
          "mdVariants": [
            "## Programmation Orientée Objet\n\nVous souhaitez intégrer deux compteurs sur votre page Web. Chaque compteur doit être initialisé à zéro, puis, quand l'utilisateur cliquera sur un bouton, leur valeur devra augmenter automatiquement, jusqu'à atteindre leur valeur cible au bout d'une seconde. La valeur cible du premier compteur est `100`, celle du deuxième compteur est `45`.\n\nVous avez trouvé sur Internet un composant \"compteur animé\" fournissant la documentation suivante:\n\n> Pour intégrer un compteur sur votre page:\n> - instanciez la classe `AnimCounter`, en passant en paramètre du constructeur le noeud HTML dans lequel intégrer le compteur. (ex: un `<div>`, tel que retourné par `document.getElementById()`)\n> - puis appelez la méthode `countTo()` de cette instance, en passant la valeur cible en paramètre. Le compteur se mettra alors à compter automatiquement de la valeur `0` à la valeur cible passée en paramètre, en une seconde.\n>\n> Vous pouvez intégrer plusieurs compteurs sur une même page. Il suffit de créer une instance par compteur, et de les intégrer chacun dans un noeud HTML différent.\n\nVoici le code HTML de votre page web:\n\n```html\n<div id=\"compteur1\"></div>\n<div id=\"compteur2\"></div>\n<button id=\"bouton\">Démarrer compteurs<button>\n```\n\nÉcrire le code du fichier JavaScript qui sera intégré à votre page pour:\n - intégrer les deux compteurs à l'aide du composant décrit plus haut, dans les `<div>` fournis;\n - démarrer les deux compteurs quand l'utilisateur clique sur le bouton.\n\nNote: Supposez que le composant `AnimCounter` a déjà été chargé dans la page. La classe est prête à être instanciée dans votre code. (Ne pas fournir la définition de ce composant.)\n\n"
          ]
        },
        {
          "i": 7,
          "id": "code7",
          "variants": [
            {
              "prop": "title",
              "val": "Heroku",
              "output": "alert"
            },
            {
              "prop": "body",
              "val": "Firebase",
              "output": "alert"
            },
            {
              "prop": "title",
              "val": "Firebase",
              "output": "console.log"
            },
            {
              "prop": "body",
              "val": "Heroku",
              "output": "console.log"
            }
          ],
          "mdVariants": [
            "## Requête AJAX\n\nÉcrire un programme JavaScript permettant:\n - d'ajouter une \"ressource\" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;\n - cette ressource est un objet JSON dont la propriété `title` doit avoir pour valeur la chaine de caractères `Heroku`; (vous pouvez donner la valeur de votre choix aux autres propriétés)\n - puis afficher dans un `alert()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)\n\nPour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.\n\n\n",
            "## Requête AJAX\n\nÉcrire un programme JavaScript permettant:\n - d'ajouter une \"ressource\" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;\n - cette ressource est un objet JSON dont la propriété `body` doit avoir pour valeur la chaine de caractères `Firebase`; (vous pouvez donner la valeur de votre choix aux autres propriétés)\n - puis afficher dans un `alert()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)\n\nPour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.\n\n\n",
            "## Requête AJAX\n\nÉcrire un programme JavaScript permettant:\n - d'ajouter une \"ressource\" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;\n - cette ressource est un objet JSON dont la propriété `title` doit avoir pour valeur la chaine de caractères `Firebase`; (vous pouvez donner la valeur de votre choix aux autres propriétés)\n - puis afficher dans un `console.log()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)\n\nPour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.\n\n\n",
            "## Requête AJAX\n\nÉcrire un programme JavaScript permettant:\n - d'ajouter une \"ressource\" sur le serveur `https://js-jsonplaceholder.herokuapp.com` en envoyant une requête AJAX (utilisant `XMLHttpRequest`) sur l'API HTTP POST disponible à l'adresse `/posts`;\n - cette ressource est un objet JSON dont la propriété `body` doit avoir pour valeur la chaine de caractères `Heroku`; (vous pouvez donner la valeur de votre choix aux autres propriétés)\n - puis afficher dans un `console.log()` la valeur de la propriété `id` contenue dans la réponse à cette requête. (et seulement cette valeur)\n\nPour vous aider à définir votre requête, consulter la documentation du serveur, située sur la page web `https://github.com/typicode/jsonplaceholder`.\n\n\n"
          ]
        },
        {
          "i": 8,
          "id": "code8",
          "variants": [
            {}
          ],
          "mdVariants": [
            "## Jeu des 7 différences\n\nUn client souhaite permettre aux utilisateurs de son site de comparer facilement deux images, en passant de l'une à l'autre autant de fois qu'il le souhaite.\n\nLe code HTML de la page est fourni:\n\n```html\n<button id=\"bouton1\">image 1</button>\n<button id=\"bouton2\">image 2</button>\n<img id=\"image\" src=\"https://i.imgur.com/X3iY0e3.jpg\">\n```\n\nÉcrire le code JavaScript permettant:\n - d'afficher l'image `https://i.imgur.com/X3iY0e3.jpg` dans la balise `<img>` quand l'utilisateur clique sur le `bouton1`;\n - d'afficher l'image `https://i.imgur.com/MrsKxdZ.jpg` dans la balise `<img>` quand l'utilisateur clique sur le `bouton2`.\n\nLe code que vous écrirez ci-dessous sera stocké dans un fichier `.js` puis intégré à la page du client via une balise `<script>`.\n\n"
          ]
        }
      ]
    }
  ];
})(document);
