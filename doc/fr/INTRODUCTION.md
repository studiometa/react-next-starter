# Introduction  
  
## Présentation  
  
Ce starter a été développé dans le but de simplifier la mise en place d'un site React en SSR avec NextJs et Material-ui.

L'idée initiale était de permettre la mise en place rapide d'une application web en utilisant un socle technique moderne
mais en partant sur une base suffisamment complète pour rentrer directement dans le vif du sujet. 

Comme chaque projet est unique, ce starter a été pensé pour être le plus customizable possible. Cette documentation a été
écrite pour vous aider à vous familiariser avec certains principes de base mais comme à chaque fois, c'est en bidouillant que
vous apprendrez réellement à tirer profit des fonctionnalités offertes par ce starter !

Attention cependant, plus vous modifierez le "core" du projet et plus il vous sera compliqué d'effectuer d'éventuelles mises à
jour par la suite. Si ce starter ne répond pas à certains de vos besoins spécifiques, n'hésitez pas à suggérer une pull-request
ou à nous en faire la demande directement! :)  

## Motivations

Je sais ce que vous vous dites. Encore un développeur qui partage son starter maison ! 
Et bien oui, vous avez raison. Les articles qui remettent en question l'utilité des starter pullulent sur internet, 
encourageant plutôt l'usage d'outils comme CRA. Mais je pense que le problème vient davantage du peu de documentation
qui accompagne ces starters que de leur réelle utilité. 

À l'origine ce starter n'avait pas pour vocation d'en être un. Le premier développement avait d'abord été pensé pour être utilisé
sur un projet spécifique. Mais il paraît qu'un bon développeur ne refait jamais la même chose deux fois. Aujourd'hui je m'en sers
pour tous mes nouveaux projets et il me permet de développer plus rapidement que jamais des applications complexes avec toutes
les fonctionnalités nécessaires. 

Le gros point négatif avec ce type d'outils, c'est la maintenance. Un simple `npm update` ne vous suffira pas à mettre votre projet
à jour avec les dernière fonctionnalités offertes par ce starter. 

C'est à partir de ce constat que j'ai décidé de faire évoluer ce projet en développant un générateur comme CRA. Celui-ci remplira le
même rôle que ce starter avec les avantages suivants :
- Le core est porté dans un module node, il peut donc être maintenu avec npm
- Les sources de vos projets ne contiendront que votre propre code (ou presque)
- Il sera toujours possible "d'éjecter" le projet pour avoir accès à tout le code

Laissez moi un message si vous voulez être tenu informé de sa sortie ! :) 
   
## Fonctionnalités   
   
- routing SSR natif  
- Configuration selon l'environnement grace aux fichiers '.env'  
- server node (expressJs) prêt à l'emploi  
- redux utilisable en SSR nativement et gestion du localstorage  
- custom loading (prefetch, webpack chunks, code splitting, etc)  
- support sass natif (même si je recommande d'utiliser JSS autant que possible)
- fake API pour le développement (basé sur germaine.js)  
- Support natif de l'i18n avec routeur multi-langue et système de traduction natif des chaines de caractères  
- tests & CI/CD  
- Support JSS (Css-In-Js)  
- Intégration de Material-ui  
- Gestion du cache-serveur native  
- Gestion du cache client à l'aide d'un service-worker
- Mode offline
 