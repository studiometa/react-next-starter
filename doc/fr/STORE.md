# Store

Ce starter utilise les librairies react-redux et redux-thunk pour la gestion du store et la mise ne place d'un contexte à travers les pages.


## Isomorphisme

Le store est `isomorphic`. Cela signifie qu'il fonctionne aussi bien côté serveur que côté client. Pour cela, le store est initialisé une première fois côté serveur. Il est alors possible de le mettre à jour ou de le consumer à l'aide des actions et des providers. 

Une fois la page servie côté client, le contenu du store est stocké à une variable globale rattachée à l'objet `window`. Cela permet d'initialiser un nouveau store côté client tout en conservant les données du store serveur.


## Le dossier /store passé au crible 
  
Les reducers et les actions sont séparés dans des dossiers différents. Les actions/reducers de chaque state sont également définis dans  un fichier séparé.  
  
### /store/createStore.js  
  
Retourne une fonction permettant de **créer un nouveau store**.  
  
### /store/actions  
  
Contient toutes les **actions de l'application**. Les actions de chaque sous-store sont définies dans un   
fichier distinct en respectant la nomenclature suivante: `<store>.actions.js`.  
  
Si vous ouvrez un des fichiers, vous remarquerez que chaque action est une **fonction exportée**.   
Vous remarquerez également que la **constante** du nom de chaque action est **également exporté**.  
  
Ceux-ci sont utilisés par les reducers pour s'assurer que le nom de l'action correspondante est   
toujours bon (puisqu'il n'est défini qu'à un seul endroit).  
  
### /store/reducers  
  
De la même manière, ce dossier contient les **reducers de l'app**.  
Attention, contrairement aux actions, si vous désirez ajouter un nouveau reducer, il faudra également penser à exporter celui-ci dans le fichier `/store/reducers/index.js`


## Actions asynchrones

La librairie redux-thunk est utilisée afin de permettre d'effectuer certaines actions de manière asynchrone. Cela s'avère très utile lorsqu'il s'agit de réaliser certaines taches telles q'une requête à API et que les données récupérées doivent être stockées dans le store. 


### Démonstration avec l'action fetchAppSettings

**Rendez-vous dans le fichier `/store/actions.app.actions.js` et jetez un oeil à l'action `fetchAppSettings` :**

- Chaque action asynchrone retourne une nouvelle fonction dite 'async'
	- Cette fonction prend trois paramètres :
		- **dispatch** :  fonction native à redux permettant d'appeler une autre action
		- **getState** : fonction native à redux permettant de retourner le store actuel
		- **socket** : instance de la classe socket qui permet de simplifier la communication avec une éventuelle API distance
- Petite astuce : il est possible de passer une callback en paramètre à l'action. Cela permet d'effectuer une action en fonction de la réussite ou de l'échec de l'action à effectuer sans avoir besoin d'attendre que le store soit mis à jour.


## Local storage

Parfois il peut s'avérer utile de synchroniser certains éléments du store avec le local storage. 

Vous pouvez définir ces éléments dans le fichier de configuration `/config/redux.config.js` à l'aide du paramètre `localStorageStates`. Il s'agit d'un tableau supposé contenir l'identifiant des éléments à conserver dans le local storage. Par exemple : 'app', 'user.preferences', etc.

À noter que le store 'client' est constamment hydraté à partir du store 'serveur' à chaque nouveau chargement de la page. Attention à ne stocker que des éléments qui ne seront pas constamment rafraîchis (vous ne risu
