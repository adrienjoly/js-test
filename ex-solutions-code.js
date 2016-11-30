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
