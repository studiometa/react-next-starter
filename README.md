# [WIP] React-next-starter

À terme, ce starter prendra en charge les fonctionnalités suivantes:

- routing SSR
- server node (expressJs)
- gestion du cache
- redux
- custom loading
- sass
- async module & component
- custom webpack config
- fake api
- i18n
- tests & CI/CD

## Requirements

- nodeJs ^9.8.0


## Installation

### Installer les dépendances du projet
`npm i`

### Installer nextJs en global

`npm i -g next`


## Ce que fait ce starter

J'ai mis en place un petit exemple de listing produit pour illustrer les fonctionnalités disponibles.

Suivez les étapes suivantes pour les découvrir:

### 1) Lancer l'application

Si vous avez installé les packages (`npm i`), il ne reste normalement plus qu'à lancer le serveur de développement
en faisant en `npm run dev`

Si tout c'est bien passé vous devriez voir un message comme celui-ci:

```
 DONE  Compiled successfully in 1773ms                                                         04:07:14 AM

> Ready on http://localhost:3000
> Building page: /

```

Il est possible de configurer le port utilisé dans le fichier `config/<env>.config.js` 
(pensez à le modifier également dans la partie `api.url`).

### 2) Un monstre se réveille...

Maintenant que le serveur ronronne, rendez vous sur votre navigateur avec l'onglet 
network du devTool ouvert et rendez-vous à l'adresse suivante: `http://localhost:3000`.

On est sur l'env development, donc:

- Ne faites pas attention à la taille des fichiers téléchargés, webpack a tendance à injecter
beaucoup de données en développement.
- Ne faites également pas gaffe aux requêtes `on-demand-entries-ping`, 
c'est simplement le serveur qui fait des pings pour permettre au HMR (Hot Module Reload) de fonctionner.


#### main.js

C'est le coeur de l'application. On y retrouve les méthodes de nextJs, babel, webpack... mais aussi
certains modules. 

Par défaut, nextJs importe dans ce fichier tout module qui est utilisé sur plus de
50% des composants du projet. Les autres modules, moins fréquents, ne seront donc téléchargé qu'au moment
où ils seront requis. Pratique!

#### index.js

Ce fichier contient le script de la page affichée. À chaque changement de page, une requête similaire
sera effectuée.
 
 
#### localhost

Toute la beauté du SSR réside ici. Le serveur a renvoyé le markup de la page au lieu d'envoyer un document vide. 

#### _app.js, _error.js, etc...

Contiennt les scripts des composants `client/pages/_app.js` et `client/pages/_error.js`. Ils correspondent
respectivement au wrapper de l'application et à la page d'erreur. 

### 3) Rendez-vous sur la page Products

Si vous jetez un oeil aux nouvelles requêtes effectuées, vous remarquerez que la page n'a pas entièrement été rechargée. La base.

Certains nouveaux fichiers ont été téléchargés:

- **products.js** : Le script de la page
- **products** : une requête faite au module fake-api pour récupérer le contenu de la page
- **0, 1, 2, ...** : d'autres requêtes faites au module fake-api pour récupérer le contenu des produits affichés sur la page  

Ici le serveur a d'abord requêté la page à afficher, celle-ci a ensuite fait une nouvelle requête pour
obtenir le contenu de la page (les ids des produits à afficher). Une nouvelle requête ensuite été réalisée
pour chaque produit.

Cela fait beaucoup de requêtes, mais c'est ce qui permet à la page de charger progressivement et à l'utilisateur
de ne jamais se retrouver face à une page blanche.

### 4) Rechargez la page

Le serveur renvoie correctement la page et les produits sont ensuite téléchargés. Vous remarquerez
cependant l'absence de la requête `http://localhost:3000/products` qui a cette fois-ci été éxécutée
côté serveur.

### 4) Rendez vous sur une fiche produit

Comme le produit a déjà été téléchargé, une seule requête devra être effectuée pour récupérer
le contenu de la page.

### 5) Retournez sur la page d'accueil, puis sur la page produits

Aucune requête! Normal, la page a déjà été visitée, et tous les produits téléchargés en local.

## Router

Avec NextJs, la gestion des routes se base directement sur le contenu du dossier `/client/pages`.
Cela signifie que par défaut, la route `https://site.com/exemple` pointe vers le fichier `/client/pages.exemple.js`

Il est cependant possible de gérer les routes manuellement. C'est ce que nous faisons dans le fichier `/server/routes/routes.js`.


Dans ce fichier, toutes les routes sont définies dans un tableau. Ce tableau permettra à la fois au serveur de savoir
ou rediriger les requêtes, mais aussi au client de savoir comment constuire les liens des pages.

Une route peut avoir les arguments suivants: 

- **path {string}** : Le chemin d'accès de la route
- **page {string}** : Le chemin d'accès vers le fichier de la page à retourner
- **queryParams {array}** : Une liste d'arguments passés à la requête qui peuvent être renvoyés au client

**Il est nécessaire d'ajouter toutes les routes disponibles dans ce fichier pour assurer le bon fonctionnement de l'application**


#### Exemple avec le composant Link

Ce composant est disponible dans le dossier `/client/components/Link`. Il sert principalement de wrapper au
composant Link de NextJs (next/link) pour le rendre plus simple à utiliser et permettre à l'avenir une meilleure
maintenabilité des liens de l'application.

Prenons la route suivante:

```
//...
{
    path: '/product/:id',
    page: '/product',
    queryParams: ['id']
}
//...
```

Cette route est supposée retourner vers une page produit définie par le 'queryParam' `id`

Pour créer un lien vers cette page, il faut procéder ainsi:

```
//...
<Link to="/product" query={ product.id }>
    { product.name }
</Link>
//...

```

Ce lien redirigera l'utilisateur vers la page `/product/<PRODUCT_ID>`. 
