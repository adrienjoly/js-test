// 1) Inviter l'utilisateur à saisir un nombre

var nb = prompt('entrez un nombre');

// 2) Afficher première multiplication

console.log(nb + ' * 2 = ' + nb * 2);

// 3 et 4) Afficher autres multiplications, en utilisant la fonction demandée

function multiplication(nb, coef) {
  return nb + ' * ' + coef + ' = ' + (nb * coef);
}

for (var i = 3; i <= 100; ++i) {
  console.log(multiplication(nb, i));
}
