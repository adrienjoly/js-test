# Table de multiplication (20mn)

But: Nous allons développer un script permettant d'afficher une table de multiplication dans la console, en fonction d'un nombre saisi par l'utilisateur.

Pour ce faire:

1. Inviter l'utilisateur à saisir un nombre à l'aide de la fonction `prompt()`;
2. Afficher dans la console la ligne `nb * 2 = res` (où `nb` est à remplacer par le nombre saisi par l'utilisateur, et `res` par le résultat de la multiplication). Note: il faut afficher le résultat ET la multiplication, en respectant bien le modèle proposé;
3. Selon le même modèle, afficher ensuite la multiplication de ce nombre par chaque nombre de `3` à `100` (compris) dans la console; (faire un appel à `console.log()` pour chaque multiplication à afficher, en utilisant une boucle `for`);

    Par exemple: Si l'utilisateur saisit `4` dans la boite de dialogue, votre script doit afficher les lignes suivantes dans la console:

    ```
    4 * 2 = 8
    4 * 3 = 12
    4 * 4 = 16
    ... etc, jusqu'à ...
    4 * 100 = 400
    ```

4. Définir une fonction `multiplication()` de manière à ce que chaque multiplication de la partie 3 puisse être affichée à l'aide de `console.log(multiplication(nb, coef));` (avec `nb` étant le nombre saisi par l'utilisateur en partie 1, et `coef` son multiplicateur). Cette fonction devra donc accepter deux nombres en paramètres et retourner une chaîne de caractères sur le modèle de celle définie dans la partie 2 de cet exercice. => Cette partie de l'exercice ne devra rien changer à l'affichage de l'exercice entier dans la console, c'est seulement une implémentation différente.

Note: La correction de cet exercice sera automatisée, donc merci de respecter **à la lettre** les noms de fonctions, syntaxes dans la console (avec les mêmes espaces), et nombres fournis dans l'énoncé. Vous serez notamment évalué sur les résultats affichés dans la console, donc assurez-vous que votre code fonctionne bien.
