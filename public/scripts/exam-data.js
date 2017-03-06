// generated by build-exercises.js
(function(document) {
  'use strict';
  if(window.location.href.match(/^http\:\/\/(?!localhost).*$/))
    window.location.href = window.location.href.replace('http:', 'https:');
  var app = document.querySelector('#app');
  app.config = {
    "title": "JavaScript - Contrôle individuel 2",
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
        "apiKey": "AIzaSyAO3h2quk1PBdbLjnSIhhix7LUsHoKkNbE",
        "databaseURL": "https://js-controle-2.firebaseio.com",
        "messagingSenderId": "835236294998"
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
      "ptsPerExercise": 2
    }
  };
  app.exercises = [
    {
      "_info": "generated from ex.01.quizz.template.md",
      "i": 1,
      "isQuizz": true,
      "title": "QCM (1 point par bonne réponse)",
      "maxScore": 4,
      "questions": [
        {
          "i": 1,
          "id": "qcm1",
          "md": "\n```js\nvar x = { nb: 1 };\n```\n\nDe quel type est la variable `x` ?\n\n\n",
          "choices": [
            {
              "name": 1,
              "text": "Nombre"
            },
            {
              "name": 2,
              "text": "Entier"
            },
            {
              "name": 3,
              "text": "Objet"
            },
            {
              "name": 4,
              "text": "Tableau"
            }
          ]
        },
        {
          "i": 2,
          "id": "qcm2",
          "md": "```html\n<div id=\"monDiv\" class=\"hidden\">contenu</div>\n```\n\nQuelle serait le type de la valeur retournée par `document.getElementsByClassName('hidden')` ?\n",
          "choices": [
            {
              "name": 1,
              "text": "Un tableau d'objet(s)"
            },
            {
              "name": 2,
              "text": "Un objet représentant l'élément"
            },
            {
              "name": 3,
              "text": "Une classe"
            },
            {
              "name": 4,
              "text": "Une chaîne de caractères"
            }
          ]
        },
        {
          "i": 3,
          "id": "qcm3",
          "md": "Supposons que `elements` soit un tableau d'éléments HTML.\n\n```js\nfor(var i = 0; i < elements.length; i++) {\n  elements[i].onclick = function() {\n    console.log(i);\n  }\n}\n```\n\nComment pourrait-on s'assurer que la valeur de `i` correspondante à chaque élément soit bien affichée dans la console quand l'utilisateur cliquera dessus ?\n",
          "choices": [
            {
              "name": 1,
              "text": "Il n'y a rien à changer"
            },
            {
              "name": 2,
              "text": "Il faut créer une deuxième boucle"
            },
            {
              "name": 3,
              "text": "Il faut utiliser \"this\""
            },
            {
              "name": 4,
              "text": "Il faut passer i à une fonction génératrice"
            }
          ]
        },
        {
          "i": 4,
          "id": "qcm4",
          "md": "```js\nvar point = new Point(4, 3);\n```\n\nComment appelle-t-on l'opération à droite du signe `=` ?\n",
          "choices": [
            {
              "name": 1,
              "text": "Une génération de fonction"
            },
            {
              "name": 2,
              "text": "Une instanciation de classe"
            },
            {
              "name": 3,
              "text": "Un appel de fonction"
            },
            {
              "name": 4,
              "text": "Une concaténation de nombres"
            }
          ]
        }
      ]
    },
    {
      "_info": "generated from ex.02.code.template.md",
      "i": 2,
      "isCode": true,
      "title": "Exercices de codage (2 pts par question)",
      "maxScore": 8,
      "questions": [
        {
          "i": 5,
          "id": "code5",
          "variants": [
            {}
          ],
          "mdVariants": [
            "\nCréez une variable `obj` et affectez-lui un objet contenant deux propriétés:\n\n - une propriété `nom` ayant `'sause'` comme valeur (type: chaîne de caractères),\n - et une propriété `age` ayant `46` comme valeur (type: nombre).\n\n"
          ]
        },
        {
          "i": 6,
          "id": "code6",
          "variants": [
            {}
          ],
          "mdVariants": [
            "On fournit le code JavaScript suivant:\n\n```js\nvar profilInstagram = {\n  prenom: 'François',\n  photos: [\n    {\n      nom: 'mon chien est moi',\n      url: 'http://imgur.com/img/1',\n    },\n    {\n      nom: 'coucher de soleil => such wow!',\n      url: 'http://imgur.com/img/2',\n    },\n  ],\n};\nconsole.log(chemin);\n```\n\nPar quoi faut-il remplacer `chemin`, pour obtenir l'`url` de la deuxième photo de François ?\n\n(utilisez la notation pointée à partir de l'objet `profilInstagram`)\n\n"
          ]
        },
        {
          "i": 7,
          "id": "code7",
          "variants": [
            {}
          ],
          "mdVariants": [
            "```html\n<li>1er produit</li>\n<li>2ème produit</li>\n<li>3ème produit</li>\n```\n\nÉcrivez le code JavaScript permettant d'afficher \"`ok`\" dans un `alert` à chaque fois que l'utilisateur cliquera sur un de ces trois éléments.\n\n"
          ]
        },
        {
          "i": 8,
          "id": "code8",
          "variants": [
            {}
          ],
          "mdVariants": [
            "Je souhaite intégrer une galerie d'images sur mon site, en utilisant un composant déjà existant.\n\nVoici un extrait de la documentation du composant:\n\n> Pour instancier une galerie sur votre page, appelez la fonction `initGallery(element, images)`, avec en paramètres:\n> \n> - `element`(*type: objet*): élément du DOM dans lequel intégrer la galerie,\n> - `images`(*type: tableau de chaînes de caractères*): URLs des images à intégrer dans la galerie.\n\nMon fichier HTML contient ces éléments:\n\n```html\n<script src=\"https://controle.js/fake-gallery.js\"></script>\n<div id=\"my-gallery\"></div>\n```\n\nJe souhaite intégrer la galerie dans le `<div>`, avec les images suivantes:\n\n - `https://i.imgur.com/ydi5jMh.jpg`\n - `https://i.imgur.com/emRrCLd.jpg`\n - `https://i.imgur.com/HdsQ3fe.jpg`\n\nQuel code JavaScript dois-je exécuter pour intégrer cette galerie ?\n\n"
          ]
        }
      ]
    }
  ];
})(document);
