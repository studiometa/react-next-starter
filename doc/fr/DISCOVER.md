# Découvrir le starter  
  
Par défaut, 3 pages sont disponibles :  
- home : page blanche facilement réutilisable (copy/past) 
- readme: Permet d'accéder au readme du starter (page de démo, à supprimer)
- documentation : contient la doc du starter
- sandbox : contient un certain nombre d'infos pratiques, notamment pour pré-visualiser le thème actuel

**nb:** Les pages documentation et sandbox ont été conçues pour être uniquement accessibles lorsque l'application tourne sur un environnement de développement. Cela signifie que vous pouvez les conserver, même après avoir mis votre projet en production !
  
  
## 1) Lancer l'application  
  
Si vous avez installé les dépendances (`npm i`), il ne reste normalement plus qu'à lancer le serveur de **développement**  
en faisant un `npm run dev`  
  
Si tout s'est bien passé vous devriez voir un message comme celui-ci:  
  
 DONE Compiled successfully in 1773ms  04:07:14 AM  
 > Ready on http://localhost:3000  
 > Building page: /  
 
 
Il est possible de **configurer le port** utilisé à partir des variables d'environnement (nous reviendrons là dessus plus tard)
  
## 2) Un monstre se réveille...  
  
Maintenant que le serveur ronronne, rendez-vous sur votre navigateur à l'adresse `http://localhost:3000` avec **l'onglet network du devTool ouvert**.  
  
**On est sur l'env "development", donc :**  
  
- Ne faites pas attention à la taille des fichiers Js téléchargés, webpack a tendance à injecter beaucoup de données en   
développement. Ne vous affolez donc pas si votre bundle fait plusieurs Mo... Ce ne sera plus le cas en prod :).  
  
- Ne faites également pas gaffe aux requêtes 'on-demand-entries-ping', c'est simplement le serveur qui fait des pings pour   
permettre au HMR (Hot Module Reload) de Webpack de fonctionner.  
  
- Pour comprendre d'un peu plus près à quoi correspondent les différents fichiers Js, je vous invite à jeter un  
oeil à la [doc de NextJs](https://nextjs.org/docs/).  
  
## 3) Rendez-vous sur la page /documentation
  
Si vous jetez un oeil aux nouvelles requêtes effectuées, vous remarquerez que la page n'a **pas entièrement été rechargée**.   
Rien de neuf si vous êtes habitué à React, VueJs ou autre.  
  
**Certains nouveaux fichiers ont été téléchargés :**  
  
- **intro.js** : Le script de la page  
- **_doc** : Cette requête est faite à l'API pour récupérer le contenu de la page. Ici le contenu n'est donc téléchargé qu'à condition que la page soit affichée. Rendez-vous dans la section "pageData" de ce readme pour plus d'infos. 
  
## 5) Rechargez entièrement la page, puis rendez-vous sur la homepage (cliquez sur le logo)  
  
Normalement, vous devriez remarquer la requête suivante: `http://localhost:3000/fake-api/pages/home`  
  
C'est à nouveau une requête faite à l'API pour récupérer les informations de la page. C'est cette requête qui permet d'afficher la variable "welcomeMessage".  
  
## 6) Rechargez la page  
  
Boom! Le message est toujours bien affiché sur la page, mais la requête n'a pas été faite. C'est simplement parce que cette fois-ci la requête a été faite côté serveur, avant que la page ne soit rendue :).  Si vous êtes habitués  au SSR, cela ne devrait pas vous étonner.
  
## 7) Changez de langue à l'aide du sélecteur en haut à droite  
  
- La page est entièrement rechargée pour être certain que tout le contenu soit correctement mis à jour dans la langue désirée.   
- La page est la même! C'est parce que le composant `LangSwitch` est capable de résoudre la page courante dans n'importe  
quelle langue définie dans la config. Attention, cela ne marche pour l'instant qu'avec les urls statics.
  
## 8) Rendez-vous à cette adresse : http://localhost:3000/readme  
  
Le router va automatiquement reconnaître la langue attachée à la page "readme", même si elle n'est pas définie dans l'url  
  
  
## 9) Rendez-vous à cette adresse : http://localhost:3000/lisez-moi  
  
Le router va automatiquement reconnaître la langue attachée à la page "lisez-moi", même si elle n'est pas définie dans l'url  
  
## 10) Désactivez JavaScript et rechargez la page  
  
TADAAAA 🎉 le site est entièrement naviguable et le contenu charge correctement. Y compris l'image de la page d'accueil,  
initialement lazy-loadée.  
  
Cela n'est cependant pas magique. Si c'est une priorité pour vous que votre projet puisse être entièrement fonctionnel  
sans JavaScript, **il va probablement falloir anticiper un temps supplémentaire de développement non négligeable**.   
  
Dans cet exemple, l'image est affichée grace à une balise `<noscript>` qui, lorsque le Js est désactivé, va simplement ajouter l'image dans le DOM sans passer par le process de lazy-load.  
  
Les liens sont quant à eux transformés en simples liens HTML pointants vers les différentes pages du site.  