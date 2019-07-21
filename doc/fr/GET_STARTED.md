# Premiers pas


## Obtenir la dernière version 

Commencez par télécharger la dernière version du starter : 

```shell
$ git clone https://github.com/studiometa/react-next-starter.git MyApp
$ cd MyApp
```
  
## Installer les dépendances  
```shell
$ npm i  
```

## Checklist - Bien débuter

*tips* : Vous pouvez conserver les pages de documentation, ainsi que la page _sandbox, elles ne seront jamais accessibles
en production !

### package.json
- Modifier le nom
- Modifier la description
- Modifier le numéro de version
- Modifier les mots clés

### env.development
- Modifier le port
- Modifier les paramètres de l'API

### Configuration
- Configurer les paramètres de langue dans le fichier `lang.config.js` (et ajouter les fichiers de locale si besoin)
- Modifier les paramètres de l'API dans le fichier `api.config.js`
- Changer les paramèter SEO de base dans le fichier `seo.config.js`

### Contenu
- Modifier le fichier `PageLayout.js` pour l'adapter à vos besoins (modifier/supprimer le header, etc)
- Supprimer la page readme dans le dossier `pages` ainsi que sa route dans le fichier `routes.js`
- Modifier la page d'accueil pour y ajouter votre contenu

### autre
- Modifier le readme

## Éxécuter l'application en mode développement
```shell
$ npm run dev
```

## Éxécuter l'application en mode production
```shell
$ npm run build
$ npm run start
```

## Éxécuter l'application en mode production avec PM2

*Pensez avant tout à modifier les variables d'environnement dans le fichier `env.production`*

[PM2](http://pm2.keymetrics.io/) est un puissant outils qui permet entre autre de "[clusteriser](http://pm2.keymetrics.io/docs/usage/cluster-mode/)"
votre application, c'est à dire de la rendre multi-process. PM2 assure également la maintenance de votre projet avec
l'accès à une interface de [monitoring](http://pm2.keymetrics.io/docs/usage/monitoring/). Pour finir, il permet également
de relancer automatiquement votre application si celle-ci venait à cracher. Tout cela fait de PM2 l'arme ultime pour les
mises en production.

```shell
$ npm run build
$ npm run pm2:start
```

Attention, cette commande va éxécuter un daemon qui sera exécuté en tache de fond. Pour stoper ce processus utilisez la commande suivante :

```shell
$ npm run pm2:stop <process_name>
```

Le nom du processus correspond au nom de votre projet tel qu'il est défini dans le fichier `package.json`.


## Éxécuter les tests
```shell
$ npm run test
```