# Under the hood  
  
## Architecture du projet  
```
    .  
    ├── build                   # The app build after running `npm run build`  
    ├── client                  # Contains all the code that belongs to the client side  
    │ ├── components            # All the client components  
    │ ├── lib                   # Lib files for the client side   
    │ ├── pages                 # All the client pages   
    │ ├── public                # Everything in this folder will be accessible at the root of your project URL (robots.txt, htaccess, etc)   
    │ ├── static                # Static files will be accessible under /static. It's a good place to put your assets for example   
    │ └── styles                # Here you can put some scss files for your styles   
    ├── config                  # The app config files used in both client and server sides  
    ├── node_modules            # The projet dependencies  
    ├── server                  # Contains all the code that belongs to the server slide
    │ └── lib                   # Lib files for the server side  
    ├── static                  # All the statics files, assets, images, fonts, etc  
    ├── locales                 # Locales files for i18n  
    ├── doc                     # Contains all the documentation files
    ├── store                   # Contains all the code that belongs to the store  
    │ ├── actions               # All the app actions  
    │ └── reducers              # All the app reducers  
    ├── __tests__               # Contains all the tests files
    └── helpers                 # Contains helpers that can be used in the whole project  
```
 
 
 Cette arborescence s'inspire de celle proposait dans les guidelines de NextJs mais a été légèrement modifiée pour
 une meilleure répartition des éléments principaux :
 - Dans le dossier **client**, vous trouverez tout ce qui touche à la **vue** 
 - Dans le dossier **store**, vous trouverez les éléments qui attraient à la partie **modèle**
 - Le dossier **server** contient une majeure partie de la logique **serveur** avec notamment la définition des routes
 - Les dossiers **lib** et **helpers** mettent à disposition certains composants utiles pouvant être exploité n'importe
 où dans le projet
 
 
 ## server.js
 
 
 Ce fichier expose l'instance d'une classe comprenant toute la logique serveur. Son utilisation a été grandement simplifiée
 depuis la version 2.0.0. Cette classe dispose d'une méthode `start` et d'une méthode `stop`. Il n'y a basiquement rien de plus
 à comprendre pour pouvoir l'utiliser. D'autres méthodes sont également disponibles mais il s'agit principalement de helpers.
 
 Voici une liste non-exhaustive des fonctionnalités gérées par la classe au moment de lancer le serveur. Certaines de ces fonctionnalités
 ne sont activées qu'en production :
 - Attribution d'un port disponible
 - Vérification de la structure globale du projet (présence des fichiers indispensables au bon fonctionnement de celui-ci)
 - Activation de certains middlewares, cors, compression etc
 - Initialisation de germaine.js pour la mise en place de la "fake-api"
 - Mise en service de i18next pour la gestion du multi-langue
 - Création des listeners qui vont permettrent de servir les pages du site, résoudre dans la bonne langue, etc
 - Ajout d'une éventuelle restriction d'accès avec une authentification basic
 - Vérification de la validité des routes
 - Mise en route du cache serveur
 
 
 ## Le dossier /client/static
 
 Stockez tous vos assets dans ce dossier et accédez-y ensuite depuis le pathname `/static` 