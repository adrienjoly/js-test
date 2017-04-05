Implémenter un programme JavaScript de 3 lignes maximum qui affiche {{ n }} fois `'{{ expected }}'` dans la console. Respecter les conventions et règles d'indentation vues en cours.

- { "n": 10, "expected": "coucou" }
- { "n": 10, "expected": "salut" }
- { "n": 20, "expected": "coucou" }
- { "n": 20, "expected": "salut" }

???

Solution:

```js
for ( var i = 0; i < {{ n }}; i++ ) {
  console.log('{{ expected }}');
}
```

--

```js
// automatic student evaluation code
(function evaluateStudentCode(){
  var nb = 0;
  var lastLog;
  var console = {
    log: function(t){
      lastLog = t;
      nb++;
    }
  };
  var error = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(e) {
    error = e;
  }
  function ok(msg) {
    application.remote._log('[+] ' + msg);
    return 1;
  }
  function nok(msg) {
    application.remote._log('[-] ' + msg);
    return 0;
  }
  var studentCode = `_studentCode`.trim();
  //var canonicCode = studentCode.replace(/[ ;\r\n\t]/g, '');
  var tests = [
    error
      ? nok('erreur: ' + error.message)
      : ok('le programme fonctionne sans erreur'),
    nb !== {{ n }}
      ? nok('il fallait afficher {{ n }} lignes dans la console')
      : ok('{{ n }} lignes ont bien été affichées dans la console'),
    lastLog !== '{{ expected }}'
      ? nok('il fallait afficher \'{{ expected }}\', et non \'' + lastLog + '\'')
      : ok('la chaine de caractères \'{{ expected }}\' a bien été respectée à la lettre'),
    studentCode.indexOf('for') === -1
      ? nok('il fallait utiliser une boucle for')
      : ok('une boucle for a bien été utilisée'),
    studentCode.indexOf('\n  console.log') === -1
      ? nok('indentation: il fallait précéder console.log de 2 espaces, sur sa propre ligne')
      : ok('indentation: console.log a bien été précédé de 2 espaces'),
  ];
  application.remote._send(null, tests);
})();
```

---

Implémenter un chat-bot à partir de l'arbre de décision suivant:

![arbre de décision](data/arbre{{n}}.jpg)

Comme vu et pratiqué en cours:
 - Les questions posées par l'ordinateur sont représentées par des rectangles, et sont à implémenter à l'aide de la fonction `prompt()`.
 - Les réponses comprises par l'ordinateur sont écrites à côté de chaque branche, et sont à implémenter à l'aide de conditions.
 - Les messages à afficher par l'ordinateur sont représentés par des cercles, et sont à implémenter à l'aide de la fonction `alert()`.

Vous serez noté(e) sur:
 - le respect **à la lettre** du texte des questions et des réponses (espaces, accents, ponctuation, et majuscules/minuscules compris).
 - le bon fonctionnement de votre code, sans erreurs, pour chacun des cas illustrés dans l'arbre de décision. (à tester dans la console)
 - le respect des règles d'indentation et autres conventions vues en cours. (ex: 2 espaces par niveau d'indentation)
 
- { "n": 1, "prompts": "mal,non", "expected": "tant pis.", "q2": "veux-tu une aspirine ?", "alt1": "oui", "alt2": "non", "other": "voici !" }
- { "n": 2, "prompts": "mal,non", "expected": "ouf !", "q2": "c'est contagieux ?", "alt1": "oui", "alt2": "non", "other": "oh non !" }
- { "n": 3, "prompts": "mal,oui", "expected": "voici !", "q2": "veux-tu une aspirine ?", "alt1": "non", "alt2": "oui", "other": "ok" }

???

Solution:

```js
var reponse = prompt('Comment vas tu ?');
if (reponse === 'bien') {
  alert('super !');
} else if (reponse === 'mal') {
  var reponse2 = prompt(`{{{ q2 }}}`);
  if (reponse2 === `{{{ alt1 }}}`) {
    alert(`{{{ other }}}`);
  } else if (reponse2 === `{{{ alt2 }}}`) {
    alert(`{{{ expected }}}`);
  }
} else {
  alert('j\'attendais bien ou mal');
}

```

--

```js
(function evaluateStudentCode(){
  var log = application.remote._log;
  var done = application.remote._sendOnce; // to call upon code evaluation
  // student's variant -> test inputs and expected outputs
  var variant = {
    prompts: '{{prompts}}'.split(','),
    expected: '{{expected}}',
  };
  // exercise requirements
  var ctx = 'si l\'utilisateur tape ' + variant.prompts.join(' puis ') + ', ';
  var req = '[-] ' + ctx + 'alert devrait afficher "' + variant.expected + '"';
  application.remote._setTimeoutMessage(req + ', mais alert n\'a pas été appelé...');
  // test environment
  var prompts = variant.prompts.slice(); // clone the array
  var lastAlert = null;
  function prompt() {
    return prompts.shift();
  }
  function alert(message) {
    lastAlert = message;
  };
  var console = { log: function(){} }; // tolerate calls to console.log()
  // run the test
  var syntaxError = null;
  try {
    eval(`_studentCode`); // catch syntax errors, if any
  } catch(error) {
    log('CATCHED ERROR: ' + error.name);
    if (error.name === 'SyntaxError') {
      syntaxError = error;
    }
  }
  if (!syntaxError) {
    log('[+] le programme s\'est exécuté sans erreur.');
    if (lastAlert !== variant.expected) {
      log(req + ' au lieu de "' + lastAlert + '"');
      done(null, 0.5);
      // give a half point to the student, because her code runs
    } else {
      log('[+] ' + ctx + 'on obtient bien la réponse "' + variant.expected + '".');
      done(null, 1); // passed test => give the point to the student
    }
  } else {
    log('[-] erreur de syntaxe: ' + syntaxError.message);
    done(null, 0);
  }
})();
```
