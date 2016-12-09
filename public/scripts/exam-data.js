// generated by build-exercises.js
(function(document) {
  'use strict';
  var app = document.querySelector('#app');
  app.config = {
    "PUBLIC_TEST_MODE": false,
    "DISPLAY_SOLUTIONS_AFTER_SUBMIT": true,
    "FIREBASE_CONFIG": {
      "apiKey": "AIzaSyCBkfcodGHJEJDsnh99KgpP_F3cxU58P9I",
      "databaseURL": "https://js-test-2.firebaseio.com",
      "messagingSenderId": "730428017661"
    },
    "title": "JavaScript QCM 3",
    "teacherEmail": "adrien.joly@eemi.com",
    "emailSubject": "JS EXAM DATA",
    "GOOGLE_CLIENT_ID": "247219641427-ifeq88p7rgor9al5ksduds7ug0ba7djr.apps.googleusercontent.com",
    "GOOGLE_CLIENT_DOMAIN": "eemi.com",
    "LOGIN_INVITE": "Se connecter à son compte EEMI:",
    "quizzGrading": {
      "ptsRight": 1,
      "ptsWrong": 0,
      "ptsNull": 0
    },
    "codeGrading": {
      "ptsPerExercise": 3
    }
  };
  app.exercises = [
    {
      "_info": "generated from ex.1.quizz.template.md",
      "i": "1",
      "isQuizz": true,
      "title": "QCM",
      "questions": [
        {
          "i": 1,
          "id": "qcm1",
          "md": "```js\nfunction maFonction(param) {\n  return param + 2;\n}\n```\n\nCeci est:\n\n\n",
          "mdSolution": "\n\nC'est une définition de fonction.\n\nOn la reconnait à l'usage du mot clé `function` et des accolades entourant le code qui sera exécuté lorsque cette fonction sera appelée.",
          "choices": [
            {
              "name": 1,
              "text": "un appel de fonction"
            },
            {
              "name": 2,
              "text": "une définition de fonction"
            },
            {
              "name": 3,
              "text": "une affectation de fonction"
            },
            {
              "name": 4,
              "text": "une fonction qui ne fonctionne pas"
            }
          ]
        },
        {
          "i": 2,
          "id": "qcm2",
          "md": "```js\nmaFonction(4);\n```\n\nCeci est:\n\n\n",
          "mdSolution": "\n\nC'est un appel de fonction.\n\nUn appel de fonction = le nom de la fonction, suivi par les paramètres entre parenthèses. Sans le mot clé `function`.\n\nCette instruction va exécuter le code défini dans la fonction, et affecter les valeurs fournies à chaque paramètre.",
          "choices": [
            {
              "name": 1,
              "text": "un appel de fonction"
            },
            {
              "name": 2,
              "text": "une définition de fonction"
            },
            {
              "name": 3,
              "text": "une affectation de fonction"
            },
            {
              "name": 4,
              "text": "une fonction qui ne fonctionne pas"
            }
          ]
        },
        {
          "i": 3,
          "id": "qcm3",
          "md": "```\n// cette fonction concatène un zéro à la fin de la valeur passée en paramètre\nfunction maFonction(param) {\n  return param + '0';\n}\n```\n\nComment savoir si cette fonction fonctionne bien ? (c.a.d. sans bug)\n\n\n",
          "mdSolution": "\n\nPour vérifier le bon fonctionnement il faut définir et exécuter des tests unitaires.\n\nCeux-ci permettent de comparer le résultat attendu d'une fonction, à celui effectivement retourné par l'implémentation actuelle de cette fonction.\n\n`maFonction(1) === '10';` est un bon test unitaire car son exécution retourne `true` si la fonction retourne le résultat attendu (`10`) lorsqu'on lui passe `1` en paramètre.",
          "choices": [
            {
              "name": 1,
              "text": "il suffit de la copier-coller dans la console"
            },
            {
              "name": 2,
              "text": "il faut taper maFonction dans la console"
            },
            {
              "name": 3,
              "text": "vérifier que le test passe: maFonction(1) === '10';"
            },
            {
              "name": 4,
              "text": "vérifier que maFonction(1) renvoie bien true"
            }
          ]
        },
        {
          "i": 4,
          "id": "qcm4",
          "md": "Supposons que nous avons défini une fonction `doubler()` qui retourne le double du nombre passé en paramètre, lors de son appel.\n\nQue se passe-t-il si on exécute l'instruction suivante:\n\n```js\nvar maVariable = doubler(3);\n```\n\n\n",
          "mdSolution": "\n\nIl s'agit ici d'un appel de fonction. De la même façon que pour une opération élémentaire (ex: `2 + 2`), tout appel de fonction sera remplacé par la valeur retourné par l'exécution de cette fonction.\n\nIci, le résultat de l'exécution de la fonction `doubler` avec le paramètre `3`, soit la valeur `6`, va être affectée à `maVariable`.",
          "choices": [
            {
              "name": 1,
              "text": "le résultat va être affecté à maVariable"
            },
            {
              "name": 2,
              "text": "le résultat va s'afficher dans la console"
            },
            {
              "name": 3,
              "text": "maVariable contient la définition de la fonction"
            },
            {
              "name": 4,
              "text": "maVariable contient l'appel de la fonction"
            }
          ]
        }
      ],
      "solutions": {
        "qcm1": 2,
        "qcm2": 1,
        "qcm3": 3,
        "qcm4": 1
      }
    },
    {
      "_info": "generated from ex.2.code.template.md",
      "i": "2",
      "isCode": true,
      "title": "Exercices de codage",
      "questions": [
        {
          "i": 1,
          "id": "code1",
          "variants": [
            {}
          ],
          "testVariants": [
            "\n// automatic student evaluation code\n(function evaluateStudentCode(){\n  var console = { log: function(){} }; // tolerate console.log() calls\n  _runStudentCode();\n  var tests = [\n    typeof soustraire === 'function', \n    soustraire(2, 1) === 1,\n    soustraire(2, -1) === 3,\n  ];\n  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise\n})();\n"
          ],
          "mdVariants": [
            "Définir une fonction `soustraire` qui retourne le résultat de la soustraction `a - b`, `a` et `b` étant des paramètres de cette fonction.\n\nRespecter les conventions et règles d'indentation vues en cours.\n\n"
          ],
          "mdSolution": "\n\nSolution:\n```js\nfunction soustraire(a, b) {\n  return a - b;\n}\n```\n"
        },
        {
          "i": 2,
          "id": "code2",
          "variants": [
            {}
          ],
          "testVariants": [
            "\n// automatic student evaluation code\n(function evaluateStudentCode(){\n  var nb = 0;\n  var console = {\n    log: function(t){\n      if (t === 'Bonjour!') {\n        nb++;\n      }\n    }\n  };\n  _runStudentCode();\n  var res = repeter(25);\n  var tests = [\n    typeof repeter === 'function',\n    nb === 25,\n    res === 25,\n  ];\n  application.remote._send(null, tests); // 1 point per passing test => 3 pts per exercise\n})();\n"
          ],
          "mdVariants": [
            "Définir une fonction `repeter` qui affiche `n` fois `'Bonjour!'` dans la console, puis qui retourne `n`, `n` étant un paramètre de cette fonction.\n\nRespecter les conventions et règles d'indentation vues en cours.\n\n"
          ],
          "mdSolution": "\n\nSolution:\n```js\nfunction repeter(n) {\n  for (var i = 0; i < n; i++) {\n    console.log('Bonjour!');\n  }\n  return n;\n}\n```\n"
        }
      ]
    }
  ];
})(document);
