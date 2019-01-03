# Performances

## Server caching

Bien que NextJs gère nativement une partie de la mise en cache pour la génération des pages, il est possible d'ajouter une sur-couche à ExpressJs pour cacher la totalité des pages générées. Cela vous permet d'obtenir des performances de chargement de page beaucoup plus élevées.

Le cache serveur est géré avec la librairie [LRUCache](https://www.npmjs.com/package/lru-cache) et est configurable via des variables d'environnement :

- **ENABLE_SSR_CACHING** : [TRUE|FALSE] permet d'activer ou non cette feature
- **SRR_CACHE_MAX_SIZE** : [1...∞] permet de définir la taille max du cache en Mo
- **SSR_CACHE_MAX_AGE** : [1...∞] age max du cache en secondes

**Voici quelques consignes pour utiliser cette fonctionnalité correctement :**

- Ne l'activez pas en développement
- Ne définissez pas un temps de cache trop long, quelques minutes suffisent en général
- Comprenez bien que TOUTE la logique de génération de page qui a lieu côté serveur sera mise en cache, y compris d'éventuels appels à une API. Cela signifie que vous pouvez potentiellement perdre le dynamisme de certaines pages, soyez vigilants !
- L'id du cache est généré en fonction de L'URL de la page, **avec ses éventuels paramètres et queries**.
- Il est possible de désactiver la mise en cache de certaines pages dans le fichier `routes.js` (voir section router de la doc)


## Service Worker

Cette fonctionnalité permet de gérer le cache côté client.

Tout ce que vous avez à faire, c'est activer cette fonctionnalité avec la variable d'env `ENABLE_SERVICE_WORKER`.

**Voici quelques consignes pour utiliser cette fonctionnalité correctement :**
- Ne l'activez pas en développement
- On utiliser workbox under the hood pour la génération de la config du service-worker
- La configuration se trouve dans le fichier `/config/serviceWorker.config.js`

**@see** https://github.com/hanford/next-offline
**@see** https://developers.google.com/web/tools/workbox/
**@see** https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin
   