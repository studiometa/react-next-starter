# API et pageData

Comme ce starter a été conçu pour une utilisation headless, il vous sera probablement nécessaire de mettre en place un moyen de communiquer avec une API distante pour récupérer les données à afficher.

Dans le cas d'un site *entièrement statique*, vous pouvez sauter cette section.

## Configuration de l'API

Certaines options de l'API sont configurables via les variables d'environnement. Rendez-vous dans la section "configuration" de la documentation pour plus d'infos. 


## pageData

L'objet pageData est accessible à partir de n'importe quelle page de l'application. Il contient un certain nombre d'informations sur la page et doit respecter la structure suivante : 

    {  
      "title": "Home",
      "metaData": [  
	     { "name": "description", "content": "This is the home page"}  
	  ],
	  "content": {...},
	  "settings": {...} 
    },

- **title** : Le titre de la page tel qu'il sera affiché dans la balise `<title>` 
- **metaData**: Un tableau permettant de générer des balises `<meta>`. Chaque élément du tableau doit être un objet, tous les attributs de ces objets seront passés à la balise `<meta>`.
- **content**: Le contenu de votre page, peut contenir tout et n'importe quoi selon vos besoins
- **settings**: Des paramètres supplémentaires propres à cette page, encore une fois vous pouvez y mettre tout ce qui vous semble utile. 

Il vous est possible de définir qu'une page n'a pas besoin de l'objet pageData en définissant l'attribut `noPageData` à `true` dans les paramètres du wrapper de la page. Si vous ne désirez pas du tout utiliser cette feature, il est possible de la désactiver depuis le fichier `/config/api.config.js` à l'aide du paramètre `fetchPagesData`.

Lorsque ce paramètre est activé, l'application se chargera à votre place d'effectuer une requête vers votre API afin de récupérer les informations de la page à afficher.
Le résultat est ensuite stocké localement grace à Redux pour éviter d'avoir à récupérer ces informations une nouvelle fois dans le cas où l'utilisateur
reviendrait sur une page qu'il a déjà visité.

Il est possible de modifier le endpoint utilisé pour effectuer cette requête dans le fichier `api.config.js` en éditant le paramètre`endpoints.pages`.

*Attention* pour que cela puisse fonctionner il faut absolument que votre API retourne un code 200 ainsi qu'un objet au format JSON. 

## Socket.js

La classe `Socket` a été conçue dans le but de simplifier les requêtes faites à l'API. Elle est disponible à cet endroit : `/lib/socket.js`.

- Par défaut, cette classe est utilisée afin de récupérer les données pour certaines pages ainsi que des paramètres d'application
- Une instance de cette classe est également accessible depuis les actions de redux (voir la section "store" de la documentation).
- Il ne tient qu'à vous de mettre cette classe à jour pour lui permettre de gérer toutes les requêtes dont vous pourriez avoir besoin à partir d'un seul et même endroit. 


## Fake-api

Comme son nom l'indique, il s'agit d'une "fausse API" ne prenant en charge que les requêtes de type GET ou FIND. Cette API a été conçue à l'aide de la librairie [germaine.js](https://github.com/chuck-durst/germaine). Je vous invite à lire la doc de cette librairie pour comprendre ses principes de fonctionnement.

- Les requêtes sont faites sur le endpoint `/fake-api` de votre application (non modifiable)
- Les données sont accessibles dans le dossier `/server/database.json`. 
- Vous pouvez également désactiver cette fonctionnalité à l'aide de la variable d'environnement `ENABLE_FAKE_API`. 

**Vous pouvez vous servir de ce service pour trois raisons :**
- En développement, si un endpoint de l'API n'a pas encore été développé, vous pouvez utiliser fake-api pour simuler les requêtes
- En production, fake-api peut très bien être utilisé comme "base de donnée statique" 
- En production, il vous serait également possible de mettre en place un système de fallback. Si une requête à votre API échoue (404, 500, etc) vous pourriez alors résoudre un contenu statique grace à fake-api.


