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