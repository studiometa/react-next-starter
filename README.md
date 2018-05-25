# [WIP] React-next-starter

À terme, ce starter prendra en charge les fonctionnalités suivantes:

- routing SSR
- server node (expressJs)
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


## Découvrir le starter

J'ai mis en place un petit exemple de listing produit pour illustrer les fonctionnalités disponibles.

Suivez les étapes suivantes pour les découvrir:

### 1) Lancer l'application

Si vous avez installé les packages (`npm i`), il ne reste normalement plus qu'à lancer le serveur de **développement**
en faisant un `npm run dev`

Si tout s'est bien passé vous devriez voir un message comme celui-ci:

```
 DONE  Compiled successfully in 1773ms                                                         04:07:14 AM

> Ready on http://localhost:3000
> Building page: /

```

Il est possible de **configurer le port** utilisé dans le fichier `config/<env>.config.js` 
(pensez à le modifier également dans la partie `api.url`).

### 2) Un monstre se réveille...

Maintenant que le serveur ronronne, rendez-vous sur votre navigateur à l'adresse `http://localhost:3000` avec **l'onglet 
network du devTool ouvert**.

**On est sur l'env development, donc:**

- Ne faites pas attention à la taille des fichiers téléchargés, webpack a tendance à injecter
beaucoup de données en développement.
- Ne faites également pas gaffe aux requêtes `on-demand-entries-ping`, 
c'est simplement le serveur qui fait des pings pour permettre au HMR (Hot Module Reload) de fonctionner.


#### main.js

C'est le coeur de l'application. On y retrouve les méthodes de nextJs, babel, webpack... mais aussi
certains modules. 

Par défaut, nextJs importe dans ce fichier tout module qui est utilisé sur **plus de
50% des composants** du projet. Les autres modules, moins fréquents, ne seront donc téléchargé qu'au moment
où ils seront requis. Pratique!

#### index.js

Ce fichier contient le **script de la page affichée**. À chaque changement de page, une requête similaire
sera effectuée.
 
 
#### localhost

Toute la beauté du SSR réside ici. Le serveur a renvoyé le markup de la page au lieu d'envoyer un document vide. 

#### _app.js, _error.js, etc...

Contient les **scripts des composants** `client/pages/_app.js` et `client/pages/_error.js`. Ils correspondent
respectivement au **wrapper de l'application** et à la **page d'erreurs**. 

### 3) Rendez-vous sur la page Products

Si vous jetez un oeil aux nouvelles requêtes effectuées, vous remarquerez que la page n'a **pas entièrement été rechargée**. La base.

**Certains nouveaux fichiers ont été téléchargés :**

- **products.js** : Le script de la page
- **products** : une requête faite au module fake-api pour récupérer le contenu de la page
- **0, 1, 2, ...** : d'autres requêtes faites au module fake-api pour récupérer le contenu des produits affichés sur la page  

Ici le serveur a d'abord requêté la page à afficher, celle-ci a ensuite fait une nouvelle requête pour
obtenir le contenu de la page (les ids des produits à afficher). Une nouvelle requête a ensuite été réalisée
pour chaque produit.

Cela fait beaucoup de requêtes, mais c'est ce qui permet à la page de **charger progressivement** et à l'utilisateur
de ne **jamais se retrouver face à une page blanche**.

### 4) Rechargez la page

Le **serveur renvoie correctement la page** et les produits sont ensuite téléchargés. Vous remarquerez
cependant l'absence de la requête `http://localhost:3000/products` qui a cette fois-ci été éxécutée
côté serveur.

### 4) Rendez vous sur une fiche produit

Comme le produit a déjà été téléchargé, **une seule requête devra être effectuée** pour récupérer
le contenu de la page.

### 5) Retournez sur la page d'accueil, puis sur la page produits

**Aucune requête!** Normal, la page a déjà été visitée, et tous les produits téléchargés en local.


## Under the hood

### Architecture du projet

```
.
├── build           // The app build after running `npm run build`
├── client          // Contains all the code that belongs to the client side
│   ├── components  // All the client components
│   └── pages       // All the client pages
├── config          // The app config files used in both client and server sides
├── node_modules    // The projet dependencies
├── server          // Contains all the code that belongs to the server slide
│   └── fakeAPI     // The fakeAPI Middleware for ExpressJs that can be used during development
├── static          // All the statics files, assets, images, fonts, etc
├── store           // Contains all the code that belongs to the store
│   ├── actions     // All the app actions
│   └── reducers    // All the app reducers
└── utils           // Contains helpers that can be used in the whole project

```

**nb:** Cette architecture est sensiblement **différente de celle proposée par NextJs**. Ici nous faisons une distinction plus claire entre 
la **partie client** et la **partie serveur**. De cette manière il est plus simple de **distinguer ces deux logiques**, mais aussi de permettre une
**meilleure scalabilité** dans le cas d'une migration hors du contexte de NextJs.

### /store

Pour comprendre correctement cette partie, il est nécessaire de **maitriser le fonctionnement de react-redux et de Flux**. 

#### /store/createStore.js

Retourne une fonction permettant de **créer un nouveau store**. Cette fonction est appelée par **toutes les pages de l'application**, qu'elles soient
rendues côté **client** ou côté **serveur**.

#### /store/withRedux.js

Ce fichier n'est pour l'instant **pas utilisé** et sert juste de documentation. La librairie **next-redux-wrapper** est utilisée à la place (c'est sensiblement la même chose
en un peu plus complet).


withRedux est un **HOC** (Higher Order Component) qui permet aux pages d'appeler des **actions** du store dans la méthode **getInitialProps()** des composants React
(cette méthode est une feature de NextJs). Pour cela, l'objet **store** est simplement injecté aux paramètres de la méthode.

L'autre avantage de ce composant est qu'il permet de **stocker le store généré côté client** dans une variable globale assignée à l'objet window du navigateur.
Cette variable est normalement accessible de cette manière : `window.__NEXT_REDUX_STORE__`. De cette manière, le store créé côté client pourra **hériter de celui qui
aura été généré côté serveur** et ainsi éviter de reproduire des requêtes inutiles.

### /store/actions

Contient toutes les **actions de l'application**. Les actions de chaque sous-store sont définies dans un fichier distinct en respectant la nommenclature suivante: `<store>.actions.js`.

Si vous ouvrez un des fichiers, vous remarquerez que chaque action est une **fonction exportée**. Vous remarquerez également que la **constante** du nom de chaque action est **également exporté**.
Ceci sont utilisés par les reducers pour s'assurer que le nom de l'action correspondante est toujours bon (puisqu'il n'est défini qu'à un seul endroit).

### /store/reducers

De la même manière, ce dossier contient les **reducers de l'app**.


### /utils/socket

La classe Socket permet de **simplifier les intéractions avec l'API** en exposant une **bibliothèque de méthodes très simples**. Par exemple pour récupérer un produit, il suffirait d'appeler
la méthode `getProduct(<PRODUCT_ID>)`.

### /server/server.js

Le **serveur de développement**. Il permet de **gérer les routes**, certaines **erreurs** et d'instancier **fake-API**. 

### /server/routes

Contient toutes les **routes de l'app**. Ce dossier permet au routeur de **faire correspondre une route à la vue correspondante**. Il est également utilisé côté client pour la génération des
liens de l'app. Chaque fichier du dossier doit respecter la nommenclature suivante: `<LANG>.route.js`;

### /server/fakeAPI

fakeAPI est un middleware utilisé par **ExpressJs** qui permet d'**exposer une API** qui peut être utile pour le développement. Cette API ne permet pour l'instant que de récupérer des éléments
sur le **principe des API REST**.

Le modèle de données utilisé est un simple **objet JavaScript** dont la **profondeur correspond aux segments d'une route**. 

Par exemple :

```
{
    shop: {
        products: {
            foo: { ... },
            bar: { ... }
        }
    }        
}
```

- Pour obtenir la liste des produits, il faut utiliser la route `/fake-api/shop/products`.
- Pour obtenir le produit 'foo', il faut utiliser la route `/fake-api/shop/products/foo`.


### /config

Contient les **fichiers de configurations** de l'app, utilisés à la fois par le **client** et le **serveur**. Il y a **trois types** de configuration:

- **development** : Est uniquement utilisée dans un **environnement de développement**
- **production** : Est uniquement utilisée dans un **environnement de production**
- **master** : Est utilisé **peu importe** l'environnement.

À noter que les propriétés de development et production prédomineront celles de master en cas de conflict. 

## Router

Avec NextJs, la gestion des routes se base directement sur le contenu du dossier `/client/pages`.
Cela signifie que par défaut, la route `https://site.com/exemple` pointe vers le fichier `/client/pages.exemple.js`

Il est cependant possible de **gérer les routes manuellement**. C'est ce que nous faisons dans le fichier `/server/routes/<LANG>.routes.js`.


Dans ce fichier, toutes les routes sont **définies dans un objet**. Cet objet permettra à la fois au serveur de savoir
ou rediriger les requêtes, mais aussi au client de savoir comment constuire les liens des pages.

Une route peut avoir les arguments suivants: 

- **page {string}** : Le chemin d'accès vers le fichier de la page à retourner
- **queryParams {array}** : Une liste d'arguments passés à la requête qui peuvent être renvoyés au client

**Il est nécessaire d'ajouter toutes les routes disponibles dans ce fichier pour assurer le bon fonctionnement de l'application**

À noter que lorsque l'app est instancié, un attribut 'lang' contenant la langue de la route sera ajouté à toutes les routes.

### Traduire les routes

Comme ce projet a pour vocation d'être **multilingue**, la traduction des routes est indispensable. Pour cela il est possible
de **définir des routes différentes pour différentes langues**. Ces langues doivent au préalable avoir été **définies dans le fichier de configuration**.
À noter que cette fonctionnalité est desactivable depuis ce même fichier.

Lorsque ce service est activé, le **slug de la langue** utilisée sera **automatiquement ajouté à toutes les routes** (ex: /en/products, /fr/produits, etc).
Par défaut si la langue n'est pas précisée dans l'url lors d'une requête, le serveur essayera de la **résoudre lui même**. Cette option est
désactivable dans la configuration.

#### Ajouter une langue (ex: 'de')

1) Ajoutez la langue dans le `fichier master.config.js` (les langues doivent toujours être triées de la moins importante à la plus importante: la langue par défaut sera donc la dernière) 
2) Créer un fichier de config pour les routes de la langue: `/server/routes/de.routes.js`
3) Traduire toutes les routes au sein de ce fichier (se calquer sur ce qui est en place actuellement)
4) C'est tout! Pensez également à ajouter vos traductions dans le dossier `/locales`


#### Créer un lien dans l'app

Pour créer un lien, il est nécessaire d'utiliser le composant Link défini plus bas. Lorsque vous créez un lien, tout ce que vous avez
à faire est de lui passer la route correspondante. La langue utilisée pour définir les liens peut être modifiée dans les fichiers de config.

Attention, ne mettez jamais le segment de la langue dans les pathname de Link, c'est à lui de générer le lien qui correspond à la route
que vous lui définissez. 

### Exemple avec le composant Link

Ce composant est disponible dans le dossier `/client/components/Link`. Il sert principalement de **wrapper au
composant Link de NextJs** (next/link) pour le rendre plus simple à utiliser et permettre à l'avenir une meilleure
maintenabilité des liens de l'application.


Prenons la route suivante:

```
//...
'/product/:id': { page: '/product', queryParams: ['id'] }
//...
```

Cette route est supposée retourner vers une page produit définie par le 'queryParam' `id`

Pour créer un lien vers cette page, il faut procéder ainsi:

```
//...
<Link to="/product/:id" query={ { id: product.id } }>
    { product.name }
</Link>
//...

```

Ce lien redirigera l'utilisateur vers la page `/product/<PRODUCT_ID>`. 

Tout ce qui sera passé dans la prop `query` sera automatiquement ajouté à la query de l'url (ne sera pas visible directement dans l'url mais uniquement dans la requête)
Il est donc tout à fait possible d'ajouter des paramètres à l'url. Lorsque l'url est générée, tous les segments de type `:<param>` seront remplacés par la query
correspondante. **Il est donc indispensable de s'assurer que celle-ci soit toujours définie!!**
