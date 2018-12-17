# Configuration

La configuration de l'application se fait par l'intermédiaire de deux moyens :
- Les variables d'environnement : concernent tous les paramètres susceptibles de changer d'un contexte à un autre
- Les fichiers de configuration : concernent tous les paramètres propres à la configuration des éléments de votre application

## Variables d'environnement

Il s'agit du premier moyen de configurer votre application. Cette stratégie vous permet de mettre facilement en place une configuration différente selon le contexte d'exécution de votre application. Pour se faire, il vous suffit d'ajouter un fichier `.env`à la racine de votre projet (attention, ce fichier ne doit jamais être versionné!!)

- Il est possible de définir un fichier d'environnement différent pour chaque type d'environnement : `.env.test`,  `.env.development`, `.env.production`
- Vous pouvez vous inspirer des fichiers `.env.example`  et `.env.production` déjà présents sur le starter.
- Le fichier `/lib/env.js` permet d'injecter ces variables dans le contexte de votre application (vous ne devrez normalement jamais avoir à éditer ce fichier)
- Il est possible de configurer la configuration de vos variables d'environnement depuis le fichier `/config/env.config.js`
	- Lors du lancement de l'application, une exception sera 'throw' pour toute variable d'environnement définie comme étant requise mais n'étant pas définie
	- Si vous souhaitez rendre une variable accessible dans le context côté client, il faut le spécifier dans ce fichier.
		- **Attention à ne jamais passer de variable contenant des données sensibles!**


## Fichiers de configuration

Ces fichiers sont accessibles dans le dossier `/config` et respectent tous la nomenclature suivante : `<subject>.config.js`. Vous y retrouverez tous les paramètres nécessaires et pourrez en ajouter de nouveaux. Il vous sera ensuite possible d'importer n'importe lequel de ces fichiers dans votre application, ou d'importer tout le dossier pour avoir accès à la configuration complète. 

Le dossier `/config/env` vous permet de définir des fichiers de configuration supplémentaires qui seront interprété selon l'environnement node actuel. Cela peut s'avérer utile si vous désirez utiliser une configuration différente pour vos tests ou en développement par exemple.