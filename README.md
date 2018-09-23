# react-next-start v2.0.0

## Fonctionnalités en vrac

- routing SSR avec NextJs
- server node (expressJs)
- redux (compatible ssr & localstorage caching)
- support sass
- modules & components async
- custom webpack config
- fake-API (germaine.js)
- support multilingue (i18next)
- Traduction des urls (custom)
- tests & CI/CD
- Support JSS
- MaterialUI built-in

## Présentation

Le but de ce starter est de simplifier la mise en place d'un site **headless** avec tous les avantages cités ci-dessus.
Ce starter a initialement été mis en place pour le développement de chefsquare.com, il est donc utilisable en production :). 

Attention, vous ne pourrez pas utiliser ce starter sans maîtriser les éléments suivants :

- JavaScript es6 (!!!)
- ReactJs & Redux (!!!)
- SSR & NextJs (!!!)
- Material-UI (!!)
- Node / express (!)
- JSS / postcss (!)
- SASS (!)
- Webpack (!)
- Babel (!)
- axios (!)

J'insiste sur le fait de bien comprendre les principes du SSR. C'est une manière particulière de développer et vous 
risquez vite de vous arracher les cheveux sans une bonne maîtrise de ses principaux concepts. Dans ce readme, 
je pars du principe que vous êtes déjà à l'aise avec les éléments listés ci-dessus.


## Requirements

- node ^8.11.3

## Installation

### Installer les dépendances du projet

    npm i

### Installer nextJs en global ###

    npm i -g next




---




# Découvrir le starter

Par défaut, 3 pages sont disponibles :
- home : page blanche facilement réutilisable (copy/past)
- readme : contient ce readme
- _sandbox : page uniquement disponible en developpement, contient pleins de choses pratiques (ne supprimez pas cette page, 
elle pourrait vous être utile tout au long du développement de votre projet)

**Je vous conseille vivement de suivre les étapes suivantes pas à pas pour dévouvrir le starter :**

## 1) Lancer l'application

Si vous avez installé les packages (`npm i`), il ne reste normalement plus qu'à lancer le serveur de **développement**

en faisant un `npm run dev`

Si tout s'est bien passé vous devriez voir un message comme celui-ci:

    DONE Compiled successfully in 1773ms  04:07:14 AM

    > Ready on http://localhost:3000

    > Building page: /

Il est possible de **configurer le port** utilisé dans le fichier `config/<env>.config.js`

## 2) Un monstre se réveille...

Maintenant que le serveur ronronne, rendez-vous sur votre navigateur à l'adresse `http://localhost:3000` 
avec **l'onglet network du devTool ouvert**.

**On est sur l'env development, donc :**

- Ne faites pas attention à la taille des fichiers téléchargés, webpack a tendance à injecter beaucoup de données en 
développement. Ne vous affolez donc pas si votre bundle Js fait plusieurs Mo...

- Ne faites également pas gaffe aux requêtes 'on-demand-entries-ping', c'est simplement le serveur qui fait des pings pour 
permettre au HMR (Hot Module Reload) de Webpack de fonctionner.

### main.js

C'est le coeur de l'application. On y retrouve les méthodes de nextJs, babel, webpack... mais aussi certains modules. 

Par défaut, nextJs importe dans ce fichier tout module qui est utilisé sur **plus de 50% des composants** du projet.
Les autres modules, moins fréquents, ne seront donc téléchargé qu'au moment où ils seront requis. Pratique!

### index.js

Ce fichier contient le **script de la page affichée**. À chaque changement de page, une requête similaire sera effectuée.
Si vous êtes sur la page "readme", ce fichier s'appelera "readme.js", et ainsi de suite...

### localhost

Toute la beauté du SSR réside ici. Le serveur a renvoyé le markup de la page au lieu d'envoyer un document vide!  

### _app.js, _error.js, etc...

Contient les **scripts des composants** `client/pages/_app.js`  et `client/pages/_error.js` . Ils correspondent 
respectivement au **wrapper de l'application** et à la **page d'erreurs**. 

## 3) Rendez-vous sur la page /readme (lisez-moi en français)

Si vous jetez un oeil aux nouvelles requêtes effectuées, vous remarquerez que la page n'a **pas entièrement été rechargée**. 
Rien de neuf si vous êtes habitué à React, VueJs ou autre.

**Certains nouveaux fichiers ont été téléchargés :**

- **readme.js** : Le script de la page

## 5) Rechargez la page. Ensuite, rendez-vous sur la home page (cliquer sur le logo)

Normalement, vous devriez remarquer la requête suivante: `http://localhost:3000/fake-api/pages/home`

Cette requête est faite à l'API pour récupérer le contenu de la page. Ici le contenu n'est donc téléchargé qu'à condition
que la page soit affichée. C'est cette requête qui permet d'afficher la variable "welcomeMessage".

## 6) Rechargez la page

Oh! Le message est toujours bien affiché sur la page, mais la requête n'a pas été faite. C'est simplement parce que cette fois
si la requête a été faite côté serveur, avant que la page ne soit rendue :). 

## 7) Changez de langue à l'aide du selecteur en haut à droite

- La page est entièrement rechargée pour être sur que tout le contenu soit correctement mis à jour dans la langue désirée. 
- La page est la même! C'est parce que le composant `LangSwitch` est capable de résoudre la page courante dans n'importe
quelle langue définie dans la config. Attention, cela ne marche qu'avec les urls statics..

## 8) Rendez-vous à cette adresse : http://localhost:3000/readme

Le router va automatiquement reconnaître la langue attachée à la page "readme", même si elle n'est pas définie dans l'url


## 9) Rendez-vous à cette adresse : http://localhost:3000/lisez-moi

Le router va automatiquement reconnaître la langue attachée à la page "lisez-moi", même si elle n'est pas définie dans l'url

## 10) Désactivez JavaScript et rechargez la page

TADAAAA 🎉 le site est entièrement naviguable et le contenu charge correctement. Y compris l'image de la page d'accueil,
initialement lazy-loadée (ce qui n'est pas faisable sans JS).

Cela n'est cependant pas magique. Si c'est une priorité pour vous que votre projet puisse être entièrement fonctionnel
sans JavaScript, il va probablement falloir anticiper un temps supplémentaire de développement non négligeable. 

Dans cet exemple, l'image est affichée grace à une balise `<noscript>` qui, lorsque le Js est désactivé, va simplement ajouter
l'image dans le DOM sans passer par le process de lazy-load.

Les liens sont qu'en à eux transformés en simples liens HTML pointants vers les différentes pages du site.

Vous remarquerez cependant que le composant qui permettait de changer de langue a disparu. C'est simplement parce qu'à
l'heure actuelle je n'ai pas trouvé de moyen "simple" de mettre cette fonctionnalité en place en générant le composant
côté serveur. Il n'est donc généré que côté client. Cela ne veut pas dire pour autant qu'il n'est plus possible de changer
de langue ;). 

---

# Under the hood

## Architecture du projet

    .

    ├── build  // The app build after running `npm run build`

    ├── client // Contains all the code that belongs to the client side

    │ ├── components // All the client components

    │ └── pages  // All the client pages

    ├── config // The app config files used in both client and server sides

    ├── node_modules // The projet dependencies

    ├── server // Contains all the code that belongs to the server slide

    ├── static // All the statics files, assets, images, fonts, etc

    ├── lib // Lib files used on both server and client sides

    ├── locales // Locales files for i18n

    ├── store  // Contains all the code that belongs to the store

    │ ├── actions  // All the app actions

    │ └── reducers // All the app reducers

    └── helpers  // Contains helpers that can be used in the whole project

**nb:** Cette architecture est sensiblement **différente de celle proposée par NextJs**. 
Ici nous faisons une distinction plus claire entre la **partie client** et la **partie serveur**. 
De cette manière il est plus simple de **distinguer ces deux logiques**, mais aussi de permettre une
 **meilleure scalabilité** dans le cas d'une migration hors du contexte de NextJs.
 

### /store

Pour comprendre correctement cette partie, il est nécessaire de **maitriser le fonctionnement de react-redux et de Flux**.

Les reducers et les actions sont séparés dans des dossiers différents. Les actions/reducers de chaque state sont définis dans
un fichier séparé.

### /store/createStore.js

Retourne une fonction permettant de **créer un nouveau store**.

### /store/withRedux.js

Ce fichier n'est pour l'instant **pas utilisé** et sert juste de documentation. 
La librairie **next-redux-wrapper** est utilisée à la place (c'est sensiblement la même chose en un peu plus complet).

withRedux est un **HOC** (Higher Order Component) qui permet aux pages d'appeler des **actions** 
du store dans la méthode **getInitialProps()** des composants React (cette méthode est une feature de NextJs). 
Pour cela, l'objet **store** est simplement injecté aux paramètres de la méthode.

L'autre avantage de ce composant est qu'il permet de **stocker le store généré côté client** 
dans une variable globale assignée à l'objet window du navigateur.

Cette variable est normalement accessible de cette manière : `window.__NEXT_REDUX_STORE__`. 
De cette manière, le store créé côté client pourra **hériter de celui qui aura été généré côté serveur** 
et ainsi éviter de reproduire des requêtes inutiles.

### /store/actions

Contient toutes les **actions de l'application**. Les actions de chaque sous-store sont définies dans un 
fichier distinct en respectant la nomenclature suivante: `<store>.actions.js`.

Si vous ouvrez un des fichiers, vous remarquerez que chaque action est une **fonction exportée**. 
Vous remarquerez également que la **constante** du nom de chaque action est **également exporté**.

Ceux-ci sont utilisés par les reducers pour s'assurer que le nom de l'action correspondante est 
toujours bon (puisqu'il n'est défini qu'à un seul endroit).

### /store/reducers

De la même manière, ce dossier contient les **reducers de l'app**.

### /lib/socket

La classe Socket permet de **simplifier les interactions avec l'API**. 

### /server/server.js

Le **serveur de développement**. Il permet de **gérer les routes**, certaines **erreurs** et d'instancier **fake-API**. 

### /server/routes

Contient toutes les **routes de l'app**. Ce dossier permet au routeur de 
**faire correspondre une route à la vue correspondante**. Il est également utilisé côté client pour la
 génération des liens de l'app. Chaque fichier du dossier doit respecter la nomenclature suivante: `<LANG>.route.js`;

### /server/database.json

Germaine.js est un middleware utilisé par **ExpressJs** qui permet d'**exposer une API** qui peut 
être utile pour le développement. Cette API ne permet pour l'instant que de récupérer des éléments sur 
le **modèle des API REST.**

Le modèle de données utilisé est un simple **objet JSON** dont la **profondeur correspond aux segments d'une route**. 

Par exemple :

    {

     shop: {

    products: {

     foo: { ... },

     bar: { ... }

     }

    }  

- Pour obtenir la liste des produits, il faut utiliser la route `/fake-api/shop/products`.

- Pour obtenir le produit 'foo', il faut utiliser la route `/fake-api/shop/products/foo`.

### /config

Contient les **fichiers de configurations** de l'app, utilisés à la fois par le **client** et le **serveur**. 
Il y a **cinq types** de configuration :

**- test**: Est uniquement utilisée dans un **environnement de test**

**- development**: Est uniquement utilisée dans un **environnement de développement**

**- production**: Est uniquement utilisée dans un **environnement de production**

**- production**: Est utilisé lorsque l'app est hébergée sur Now (Zeit)

**- master**: Est utilisé **peu importe l'environnement**

À noter que:

 - les propriétés de **development et production** prédomineront celles de **master** en cas de conflict.  
 - les propriétés de **production** prédomineront celles de **now** en cas de conflict.  
 - les propriétés de **development** prédomineront celles de **test** en cas de conflict.  

---




# Router

Avec NextJs, la gestion des routes se base directement sur le contenu du dossier `/client/pages`.

Cela signifie que par défaut, la route `https://site.com/exemple` pointe vers le fichier `/client/pages/exemple.js`

Il est cependant possible de **gérer les routes manuellement**. 
C'est ce que nous faisons dans le fichier `/server/routes/<LANG>.routes.js`.

Dans ce fichier, toutes les routes sont **définies dans un objet**. Cet objet permettra à la fois au serveur de 
savoir ou rediriger les requêtes, mais aussi au client de savoir comment constuire les liens des pages.

**Une route peut avoir les arguments suivants :**

**- page {string}**: Le chemin d'accès vers le fichier de la page à retourner

**- queryParams {array}**: Une liste d'arguments passés à la requête qui peuvent être renvoyés au client

**Il est nécessaire d'ajouter toutes les routes disponibles dans ce fichier pour 
assurer le bon fonctionnement de l'application**

À noter que lorsque l'app est instancié, un attribut 'lang' contenant la langue de la route sera ajouté à toutes les routes.

## Traduire les routes

Comme ce projet a pour vocation d'être **multilingue**, la traduction des routes est indispensable.
Pour cela il est possible de **définir des routes différentes pour différentes langues**. 
Ces langues doivent au préalable avoir été **définies dans le fichier de configuration**.

À noter que cette fonctionnalité est desactivable depuis ce même fichier.

Lorsque ce service est activé, le **slug de la langue** utilisée sera
 **automatiquement ajouté à toutes les routes** (ex: /en/products, /fr/produits, etc).

Par défaut si la langue n'est pas précisée dans l'url lors d'une requête, 
le serveur essayera de la **résoudre lui même**. Cette option est désactivable dans la configuration.

## Ajouter une langue (ex: 'de')

**1)** Ajoutez la langue dans le fichier `master.config.js` (les langues doivent toujours être triées
 de la moins importante à la plus importante: la langue par défaut sera donc la dernière) 

**2)** Créer un fichier de config pour les routes de la langue: `/server/routes/de.routes.js` 

**3)** Traduire toutes les routes au sein de ce fichier (se calquer sur ce qui est en place actuellement)

**4)** C'est tout! Pensez également à ajouter vos traductions dans le dossier `/locales` 

## Créer un lien dans l'app

Pour créer un lien, il est nécessaire d'utiliser **le composant Link** défini plus bas.
 Lorsque vous créez un lien, tout ce que vous avez à faire est de lui passer la **route** correspondante. 
 La langue utilisée pour définir les liens peut être modifiée dans les fichiers de config.

**Attention** ne mettez jamais le segment de la langue dans le **pathname** de Link, c'est à lui de générer 
le lien qui correspond à la route que vous lui définissez. 


**Le composant Link :**

Ce composant est disponible dans le dossier `/client/components/Link`. 
Il sert principalement de **wrapper au composant Link de NextJs** (next/link) 
pour le rendre plus simple à utiliser et permettre à l'avenir une meilleure
maintenabilité des liens de l'application.

Prenons la route suivante :

    //...

    '/product/:id': { page: '/product', queryParams: ['id'] }

    //...

Cette route est supposée retourner vers une page produit définie par le 'queryParam' `id`

Pour créer un lien vers cette page, il faut procéder ainsi :

    //...

    <Link to="/product/:id" query={ { id: product.id } }>

    { product.name }

    </Link>

    //...

Ce lien redirigera l'utilisateur vers la page `/product/<PRODUCT_ID>`. 

Tout ce qui sera passé dans la prop `query` sera automatiquement ajouté à la query de l'url 
(ne sera pas visible directement dans l'url mais uniquement dans la requête).

Lorsque l'url est générée, tous les segments de type `:<param>` seront remplacés par la query correspondante.
 **Il est donc indispensable de s'assurer que celle-ci soit toujours définie!!**

---




## Ajouter une nouvelle page

Plusieurs étapes sont nécessaires pour la création d'une nouvelle page mais le processus a 
grandement été simplifié (si vous scrollez un peu, vous vous rendrez compte que cette section 
est pourtant relativement longue et vous vous direz que je me fou un peu de votre gueule. 
À cela je répondrai qu'en réalité c'est dû au fait que je prend le temps de présenter chaque 
étapes pour m'assurer que vous compreniez bien tout le processus. Je répondrai également que d'une 
certaine manière, oui, je me fou un peu de votre gueule puisqu'en définitive, le paragraphe le plus 
long de la section, vous êtes entrain de le lire, et qu'il ne vous aura pas appris grand chose :)). 

### 1) Créer la page

La première chose à faire sera de créer le fichier correspondant à la nouvelle page (dans /client/pages par défaut).

    export default () => (

      <div>

        <h1>{ pageData.title }</h1>

      </div>

    )

L'exemple ci-dessous ne suffira pas à faire en sorte que votre page fonctionne.
 Pour cela, chaque page a besoin de trois choses :

**Redux**

Chaque page doit avoir accès au **state** et à la méthode **dispatch** du **store**.
La vraie logique d'injection et de création du store se trouvant dans le fichier `_app.js`, 
il n'y a pas grand chose de particulier à faire si ce n'est utiliser le HOC **connect** de **react-redux**.

**i18next**

Dans la prévision d'un site multi-langue, il est également nécessaire de prévoir l'injection de nouvelles
props par l'intermédiaire d'un autre HOC: withI18next.js


**styles**

Chaque page doit également avoir accès aux classes qui la concerne (JSS/Material-ui).

**pageData**

Pour finir, certaines pages peuvent avoir besoin d'informations les concernant. Il peut s'agir de leur contenu, leur titre,
leurs meta-datas, etc... Ces données sont par défaut récupérées depuis une API distante (germaine.js dans notre cas) 
puis injectées dans la page par l'intermédiaire d'un autre HOC.

On se retrouve donc avec 4 HOCs à imbriquer les uns dans les autres et cela pour chaque page, 
c'est un peu fastidieux. Pour rendre ça moins galère et plus maintenable, 
je vous suggère d'utiliser le wrapper pageWrapper disponible ici : `client/lib/pageWrapper.js`.
Ce composant utilise la librairie recompose.js pour fusionner les HOCs ensembles.

    const App = ({ pageData }) => (
      <div>
        <h1>{ pageData.title }</h1>
      </div>
    );
    
    export default pageWrapper(App, {
      name: 'app'
    });

Dans cet exemple, on retourne simplement **un appel à la fonction pageWrapper** dont le premier paramètre correspond
à notre page et le second à des options. Son utilisation est documentée un peu plus bas dans ce readme.

Désormais, la page est fonctionnelle. Il manque encore cependant un dernier élément: le wrapper **Layout.**

Ce wrapper est un composant qu'il est préférable d'utiliser sur toutes les pages. Son utilisation est très simple :

        const App = ({ pageData }) => (
          <Layout pageData={pageData}>
            <div>
                <h1>{ pageData.title }</h1>
            </div>
          </Layout>
        );
        
        export default pageWrapper(App, {
          name: 'app'
        });

Il suffit en effet d'utiliser ce composant comme container pour votre page et de lui passer la prop **pageData** (si définie). 
Celle-ci sera notamment utilisée pour générer la balise **<head>** de la page et ses meta-data. 


**nb:** Toute autre _prop_ passée au composant _Layout_ sera injectée dans l'objet _pageData_. 
Cela permet par exemple de réécrire certains attributs (comme _title_ par exemple).



### 2) Ajouter les données à la "database" (/fake-api)

Cette étape est optionnelle mais permet d'illustrer comment ajouter de nouvelles données 
(pageData) à la page. Pour cela,  il suffit de rajouter un attribut à l'élément **pages** du fichier database.json :

    //...

    pages: {

    //...

     myPage: {

       title: 'myPage',

       metaData: [

         { name: 'description', content: 'This is the page description'},

       ],

    //...

    }

-   **title** : C'est le seul attribut obligatoire, il correspond au titre de la page (sera affiché en front)
-   **metaData** :Chaque objet de ce tableau correspond à un tag **&lt;meta> **

### 3) Créer une nouvelle route

Évidemment, sans route votre page ne sera pas accessible. 
Il faut donc l'ajouter. Pour cela, référez-vous à la section **Router** de ce readme.


### 4) Ajouter un namespace pour les locales

Cette étape est optionnelle. Si vous désirez ajouter un namespace correspondant à cette page pour vos traductions, 
il suffit de créer un nouveau fichier dans tous les dossiers contenant vos locales (`/locales/*` par défaut). 
En l'occurence, il devra s'appeler **myPage.json.**

Pensez également à ajouter le nom du namespace dans la partie **lang.namespaces** de la configuration.



---




# Déployer une pré-production sur Now

**Spoiler :** Vous allez kiffer.



1) Ouvrez le fichier `package.json`, vous y trouverez plusieurs scripts pour now qui sont utilisés par
 **Bitbucket pipelines**. Jetez également un oeil au fichier `config/now.config.js`, vous y 
 trouverez surement des choses intéressantes. 

2) Certains des scripts font appel à la variable d'environnement **"$NOW_TOKEN"**. 
Cette variable est à **définir dans les settings de votre répertoire Bitbucket** 
(dans la section pipeline > variables d'environnement). Pour obtenir un **nouveau token**, 
$connectez vous au dashboard de **Now > settings (icône engrenage) > tokens**.


3) Si vous ouvrez le fichier `bitbucket-pipelines.yml`, vous verrez que lorsqu'un push est effectué sur develop, 
pipeline va automatiquement exécuter les bons scripts pour deployer votre application (si les tests n'ont pas échoué).



4) Par défaut lorsque votre site tourne sur un serveur Now, **un identifiant et un mot de passe sont exigés**
à la connexion (désactivable dans la config). Vous pouvez modifier les identifiants dans le fichier `package.json`
sous now > env > htpasswd-user/htpasswd-password. Profitez-en également pour **mettre à jour l'alias** (nom de domaine) 
que vous souhaitez attribuer à votre preprod. Dans ce cas, pensez aussi à **rediriger vos DNS correctement** (cf doc de Now,
 rtfm). 

Si vous ne souhaitez** pas ajouter de nom de domaine **à votre préprod, pensez à 
**supprimer la ligne** `-npm run now:alias` de la config de pipeline.



5) Vous n'avez plus qu'à **push sur develop**, le reste se fera tout seul! :).



---


# Quelques infos en vrac

## Traduire le contenu static

Dans le starter, toutes les traductions sont gérées par l'intermédiaire de la 
librairie [i18next](https://www.i18next.com/). Le principe de fonctionnement reste donc 
très similaire à celui décrit dans leur documentation.



### Ajouter une nouvelle langue

-   Ajouter la langue dans le fichier `master.config.js` (dans lang > available). Basez vous sur le modèle existant.
-   Dupliquez un des dossiers du dossier **locales** en le renommant avec le slug de la langue qui vous intéresse
-   Traduire chaque fichier de locale 

### Traduire le contenu

Comme indiqué plus haut il est nécessaire de wrapper chaque page avec la fonction pageWrapper.
Celle-ci prend en paramètre le nom (slug) de votre page. Ce nom sera utilisé pour récupérer le 
fichier de locale qui correspond à la page. Par exemple la page products.js peut avoir accès au fichier 
de locale products.json.

-   Ça permet de scopper certaines traductions à une page en particulier
-   Ce n'est pas une obligation. Cependant, si le fichier de locale n'existe pas, le client fera 
toujours une requête au client pour l'obtenir (le serveur répondra par une 404, ce qui n'est pas une mauvaise chose en soit). 
-   Si vous ajoutez de nouveaux fichiers de locale, pensez à rajouter le namespace au fichier
master.config.js (dans lang > namespaces)

**common.json**

Ce fichier de locale est le seul à être obligatoirement présent dans toutes les langues.
Il est commun à toutes les pages et accessible depuis chacune d'entre elles.

**La fonction t**

C'est la fonction décrite dans la doc de i18next. Elle est accessible via les props de n'importe quelle
page grace au wrapper. On pourrait donc traduire quelque chose comme ça :



    <p>

     { this.props.t('header.greetings.hello_world');

    </p>



---




## Ajouter un store au state de Redux

-   Créer le fichier `your_name.reducer.js` en se basant sur les modèles existants (penser à l'ajouter dans store/reducers/index.js)
-   Créer  le fichier `your_name.actions.js` en se basant sur les modèles existants
-   (Optionnel) Ajouter quelque chose dans le store par défaut (createStore.js)

## Les wrappers

Ils sont deux et permettent de wrapper facilement vos pages et vos composants afin d'y intégrer facilement certaines fonctionnalités.

Ils sont disponibles dans le dossier `client/lib`. Ce sont des fonctions dont le premier paramètre correspond au composant à "wrapper"
et le second un objet contenant des paramètres.

### pageWrapper

Si vous avez lu ce readme en entier, c'est la deuxième fois que ce composant est évoqué. Il permet de wrapper chacune de vos pages :


    const MyPage = () => <div>coucou</div>
    
    export default pageWrapper(MyPage, { name: 'my-page' })
    

Ce composant gère les paramètres suivants : 
  - *name*  - *namespaces* : Permet d'utiliser des namespaces supplémentaires pour la traduction du contenu
  - *mapStateToProps* : Même fonction utilisée par Redux pour injecter des props au composant
  - *styles* : Objet utilisé par JSS et Material-ui pour générer les styles de la page
  - *withTheme* : Si true, la prop "theme" sera accessible par le composant, contenant l'objet Theme de material-ui
  - *noPageData* : Indispensable si la page n'est pas supposée récupérer de contenu à travers l'API. 

### componentWrapper

Ce composant est sensiblement le même que le précédent et peut être utilisé pour tous vos composants.


    const MyComponent = () => <div>coucou</div>
    
    export default componentWrapper(MyComponent, { name: 'my-component' })
    

Ce composant gère les paramètres suivants :
  - *isTranslatable* : true par défaut, permet de désactiver la traduction pour ce composant
  - *isConnected* : Défini si le composant doit être connecté à redux. Si oui, la prop 'dispatch' sera accessible.
  Si `mapStateToProps` est défini, le composant sera toujours considéré comme étant connecté
  - *namespaces* : Permet d'utiliser des namespaces supplémentaires pour la traduction du contenu
  - *mapStateToProps* : Même fonction utilisée par Redux pour injecter des props au composant
  - *styles* : Objet utilisé par JSS et Material-ui pour générer les styles de la page
  - *withTheme* : Si true, la prop "theme" sera accessible par le composant, contenant l'objet Theme de material-ui


# Contribuer

Si vous désirez contribuer à ce projet, vous pouvez :
- L'utiliser ! :) 
- Faire remonter des issues
- Envoyer des pull-request pour proposer des corrections ou des améliorations
- Aider à l'amélioration de la documentation