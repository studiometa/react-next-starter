# React-next-starter

Ce starter prend en charge les fonctionnalités suivantes:

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

## Router

Avec NextJs, la gestion des routes se base directement sur le contenu du dossier `/client/pages`.
Cela signifie que par défaut, la route `https://site.com/exemple` est redirigér vers le fichier `/client/pages.exemple.js

Il est cependant possible de gérer les routes manuellement. C'est ce que nous faisons dans le fichier `/server/routes/routes.js`.


Dans ce fichier, toutes les routes sont définies dans un tableau. Ce tableau permettra à la fois au serveur de savoir
ou rediriger les requêtes, mais aussi au client de savoir comment constuire les liens des pages.

Une route peut avoir les arguments suivantes: 

- **path {string}** : Le chemin d'accès de la route
- **page {string}** : Le chemin d'accès vers le fichier de la page à retourner
- **queryParams {array}** : Une liste d'arguments passés à la requête qui peuvent être renvoyés au client

**Il est nécessaire d'ajouter toutes les routes disponibles dans ce fichier pour assurer le bon fonctionnement de l'application**


#### Exemple avec le composant Link

Ce composant est disponible dans le dossier /client/components/Link. Il sert principalement de wrapper au
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

Cette route est supposée retourner vers une page produit défini par le queryParam `id`

Pour créer un lien vers cette page, il faut procéder ainsi:

```
//...
<Link to="/product" query={ product.id }>
    { product.name }
</Link>
//...

```

Ce lien redirigera l'utilisateur vers la page `/product/<PRODUCT_ID>`. 