# Dépannage

## Le serveur de développement est lent

Il n'y a malheureusement pas de solution à ce problème. En mode développement, les fichiers ne sont pas minifié, ni 
optimisé, ni gzipés. NextJs doit compiler une grande partie de vos modifications à la volée, ce qui peut parfois
générer certaines lenteurs.

Si toutefois votre application vous semble lente au point de mouliner sans jamais rien afficher, il s'agit peut être
d'une promesse non résolue ou d'une requête non traitée. Node dispose de [quelques outils](https://stackoverflow.com/questions/20990955/how-do-i-debug-promise-based-code-in-node)
 permettant de résoudre ce type de problèmes.
 
 Dans tous les cas, je vous conseille de n'estimer la vitesse de votre application qu'en mode production.
 
 ## Le Hot Module Reload de webpack me rend fou
 
 À priori, NextJs de propose toujours pas de solution efficace pour désactiver cette fonctionnalité, vous pouvez cependant
 bloquer les requêtes à l'aide des outils de développement de votre navigateur. 
 
 Jetez un oeil à [cette issue](https://github.com/zeit/next.js/issues/1109) pour plus d'infos.
 
 ## J'ai une erreur "did not match" dans ma console
 
 ```bash
 Warning: Prop 'className' did not match. Server: "MuiTypography-root-246 MuiTypography-title-252 MuiTypography-colorInherit-265 PageComponent-flex-207" Client: "MuiTypography-root-44 MuiTypography-title-50 MuiTypography-colorInherit-63 PageComponent-flex-5"
 ```
 
 C'est que vous découvrez les joies du SSR :D! Soyez attentifs à ce type de warnings, car ils sont souvent le signe d'un
 défaut de conception qui peut potentiellement avoir un gros impact sur les performances de votre application !
 
 Ce qu'il se passe ici est en réalité assez simple. Votre page est rendue une première fois côté serveur, puis une seconde
 fois ([hydrate](https://reactjs.org/docs/react-dom.html#hydrate)) côté client. Si les deux versions ne sont pas identiques
 au moment du premier rendu, React ne saura pas laquelle conserver et par conséquent mettra l'entièreté du DOM à jour pour
 ne conserver que le rendu effectué côté client. Je vous laisse deviner les conséquences potentielles sur le chargement de votre
 page...
 
 Il n'y pas de solution miracle pour résoudre ce problème. Il faut d'avoir identifier quelle partie de votre code est responsable. 
 Pour cela, le plus simple est de supprimer des segments petit à petit jusqu'à ce que l'erreur disparaisse. Une fois code erroné identifié,
 il vous restera à déterminer ce qui cause cette erreur.
 
 Voici un exemple :
 
 ```jsx harmony
 render(
    <div>
      {
        process.browser === true && "You are on the browser !"
      }
    </div>
 )
 ```
 
 Dans cet exemple, il est évident que la page générée côté serveur ne sera pas identique à celle générée côté client, puisqu'on
 fait usage d'une condition qui ne retournera pas le même résultat dans ces deux paradigmes. 
 
 
 ## Une erreur me dit que document, body, window (etc) n'est pas défini
 
 Encore une contrainte liée au SSR. Rien ne vous empêche d'utiliser ces entités, mais vous ne pouvez pas le faire n'importe où.
 
 Par exemple, si vous faites appel à `window` dans le constructor d'une Class React, ce constructor sera interprété côté serveur,
 où `window` n'existe tout simplement pas. Il en va de même pour la méthode `render` par exemple. 
 
 Si par contre vous faites la même chose dans une méthode comme `componentDidMount`, vous n'aurez plus d'erreur, puisqu'elle n'est
 jamais interprété côté serveur !
 
 ## Node vient de crasher
 
 Oui, malheureusement ça arrive, tout comme ça peut arriver aux avions... Généralement, cela se produit pour une raison
 aléatoire et difficilement identifiable. Il s'agit généralement de [segmentation fault](https://en.wikipedia.org/wiki/Segmentation_fault), cela
 signifie que Node a tenté d'accéder à un segment de mémoire qui ne lui était pas alloué.
 
 Heureusement, en production, il existe une floppée d'outils qui permettent de relancer le serveur automatiquement dans le cas où ce problème
 viendrait à se produire. 
 
 Personnellement avec ce starter, ça ne m'est encore jamais arrivé :).
 
 
 ## Mon bundle / certains de mes chunks sont trop lourds
 
 Alert spoiler : les node_modules sont probablement responsables !
 
 Pour vous en assurer, rendez-vous dans le dossier `build` et ouvrez le fichier `stats.html` dans votre navigateur. Vous ne devriez
 plus avoir de mal à identifier le package responsable !