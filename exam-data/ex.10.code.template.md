---

Implémenter un chat-bot à partir de l'arbre de décision suivant:

![arbre de décision](data/arbre{{n}}.jpg)

Comme vu et pratiqué en cours:
 - Les questions posées par l'ordinateur sont représentées par des rectangles, et sont à implémenter à l'aide de la fonction `prompt()`.
 - Les réponses comprises par l'ordinateur sont écrites à côté de chaque branche, et sont à implémenter à l'aide de conditions.
 - Les messages à afficher par l'ordinateur sont représentés par des cercles, et sont à implémenter à l'aide de la fonction `alert()`.

Vous serez noté(e) sur:
 - le respect **à la lettre** du texte des questions et des réponses (espaces, accents, et majuscules/minuscules compris).
 - le respect des règles d'indentation et autres conventions vues en cours. (ex: 2 espaces par niveau d'indentation)
 - le bon fonctionnement de votre code, sans erreurs, depuis la console JavaScript de Google Chrome, pour chacun des cas illustrés dans l'arbre de décision.

- { "n": 1, "prompts": "gris,foncé", "expected": "ah bon?" }
- { "n": 2, "prompts": "gris,foncé", "expected": "c'est bien!" }
- { "n": 3, "prompts": "bleu,foncé", "expected": "OK" }

???

Solution:
```js
var reponse = prompt('Ta couleur préférée ?');
if (reponse === 'bleu') {
  alert('OK');
} else if (reponse === 'gris') {
  var reponse2 = prompt('clair ou foncé ?');
  if (reponse2 === 'clair') {
    alert('comme le ciel');
  } else if (reponse2 === 'foncé') {
    alert('c\'est bien!');
  } 
} else {
  alert('je connais pas');
}
```

--

```js
(function evaluateStudentCode(){
  var done = application.remote._sendOnce; // to call upon code evaluation
  // student's variant -> test inputs and expected outputs
  var variant = {
    prompts: '{{prompts}}'.split(','),
    expected: '{{expected}}',
  };
  // exercise requirements
  var req = 'si l\'utilisateur tape ' + variant.prompts.join(' puis ')
    + ', alert devrait afficher "' + variant.expected + '"';
  application.remote._setTimeoutMessage(req
    + ', mais alert n\'a pas été appelé...');
  // test environment
  var prompts = variant.prompts.slice(); // clone the array
  function prompt() {
    return prompts.shift();
  }
  function alert(message) {
    if (message !== variant.expected) {
      done(req + ' au lieu de "' + message + '"', 0.5);
      // give a half point to the student, because her code runs
    } else {
      done(null, 1); // passed test => give the point to the student
    }
  };
  var console = { log: function(){} }; // tolerate calls to console.log()
  // run the test
  _runStudentCode(); // student call should call prompt() and alert()
})();
```
