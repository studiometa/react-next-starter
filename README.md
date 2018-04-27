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

### Lancer l'application

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

### Un monstre se réveille...

 Maintenant que le serveur ronronne, rendez vous sur votre navigateur avec l'onglet 
 network du devTool ouvert et rendez-vous à l'adresse suivante: `http://localhost:3000`.
 
 
 
 


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
