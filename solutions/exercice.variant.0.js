// 1) Inviter l'utilisateur à saisir un nombre

var nb = prompt();

// 2) Afficher première multiplication

console.log(nb, '* 2 =', nb * 2);

// 3 et 4) Afficher autres multiplications, en utilisant la fonction demandée

function multi(i, j) {
  return i + ' * ' + j + ' = ' + (i * j);
}

for (var i = 3; i <= 100; ++i) {
  console.log(multi(nb, i));
}
