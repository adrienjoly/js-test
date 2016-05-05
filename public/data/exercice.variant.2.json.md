# Table de multiplication

But: Nous allons développer un script permettant d'afficher une table de multiplication dans la console, en fonction d'un nombre saisi par l'utilisateur.

Pour ce faire:

1. Inviter l'utilisateur à saisir un nombre à l'aide de la fonction `prompt()`;
2. Afficher dans la console la ligne `nb * 2 = res` (où `nb` est à remplacer par le nombre saisi par l'utilisateur, et `res` par le résultat de la multiplication);
3. Selon le même modèle, afficher ensuite la multiplication de ce nombre par chaque nombre de `5` à `7` (compris) dans la console; (faire un appel à `console.log()` pour chaque multiplication à afficher);

    Par exemple: Si l'utilisateur saisit `4` dans la boite de dialogue, votre script doit afficher les lignes suivantes dans la console:

    ```
    4 * 2 = 8
    4 * 5 = 20
    4 * 6 = 24
    4 * 7 = 28
    ```

4. Définir une fonction `multi()` de manière à ce que chaque multiplication de la partie 3 puisse être affichée à l'aide de `console.log(multi(nb, coef));` (avec `nb` étant le nombre saisi par l'utilisateur en partie 1, et `coef` son multiplicateur). Cette fonction devra donc accepter deux nombres en paramètres et retourner une chaîne de caractères sur le modèle de celle définie dans la partie 2 de cet exercice. => Cette partie de l'exercice ne changera rien à l'affichage dans la console, seulement le code du script.

Note: La correction de cet exercice sera automatisée, donc merci de respecter **à la lettre** les noms de fonctions, syntaxes dans la console (avec les mêmes espaces), et nombres fournis dans l'énoncé.
