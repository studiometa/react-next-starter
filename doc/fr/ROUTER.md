# Router  
  
## Routes

Avec NextJs, la gestion des routes se base normalement sur le contenu du dossier `/pages`.  
Cela signifie que par défaut, la route `https://site.com/exemple` pointe vers le fichier `/pages/exemple.js`  
  
Afin de répondre aux besoins de ce starter (multi-langue etc), il a été préférable de mettre en place une solution maison pour la gestion des routes. Celles-ci sont définies dans le fichier `/server/routes.js`.  

**Dans ce fichier, chaque route est définie selon le modèle suivant :**

`<routeName>: { page: <pagePath>, prefetch: <prefetch>, neverCache: <neverCache> },`

|  | type | description | exemple |
|--|--|--|--|
| routeName | String | L'identifiant de la route. Si vous avez désactivé la traduction d'url, c'est cet identifiant qui figurera dans l'URL (voir section i18n) | /user/profile/:id |
| pagePath | String | Le chemin d'accès vers le fichier Js de la page correspondante dans le dossier pages | /user/profile (pour le fichier /pages/user/profile.js)  |
| prefetch | Boolean | Permet d'activer la feature "prefetch" de NextJs pour cette page | true |
| neverCache | Boolean | Si le cache serveur est activé, ce paramètre permet de s'assurer que cette page ne sera jamais mise en cache | true |

Il vous est bien sûr possible d'ajouter n'importe quel autre paramètre qui vous semblerait nécessaire


## Nommage d'une route

Afin de conserver une certaine consistance à travers l'application, veillez à respecter les règles suivantes pour le nommage de vos routes :
- Les routes sont toujours écrites en minuscules, sans accents
- Seuls les tirets et les underscores sont autorisés à l'intérieur d'un segment de route
- Une route commence toujours par un slash
- Une route ne termine jamais par un slash (sauf la home page, puisque la route ne fait qu'un caractère)
- Une route suit donc ce modèle : `/<segment>/<segment>/<segment>`
- Un segment peut être dynamique, dans ce cas il doit commence par deux points : `/:<dynamicSegment>`
	- Les valeurs seront alors accessible via le paramètre `query`dans la méthode `getInitialProps` de la page correspondante

## Routes multi-langue

Si vous envisagez de développer un site multi-langue, il peut s'avérer nécessaire d'avoir accès à des urls différentes selon la langue courante.
Cette option est modifiable via le paramètre `localeSubpaths` accessible dans le fichier `/config/lang.config.js`.

**Attention**, désactiver ce paramètre ne veut pas pour autant dire que votre site sera "mono-langue".
 Il vous est toujours possible de mettre en place un site multi-langue, la seule différence réside dans l'ajout de ce segment dans l'url.

### Lorsque ce paramètre est désactivé

- La langue est toujours stockée dans un cookie, rien ne vous empêche de gérer le multi-langue différemment, même si je vous le déconseille vivement
- Vous pouvez toujours utiliser le paramètre `langRoute` pour gérer l'aspect d'une route, mais seule la langue par défaut sera prise en compte (la langue définie via le paramètre `default`dans le fichier `/config/lang.config.js` 

## Créer un lien dans l'app  
  
Pour créer un lien, il est nécessaire d'utiliser **le composant Link** accessible dans le dossier `/client/components/common`.  
 Lorsque vous créez un lien, tout ce que vous avez à faire est de lui indiquer la **route** correspondante.  Le composant se chargera du reste, c'est à dire générer un lien valide, vers la bonne page et dans la bonne langue. 
  
  
### Le composant Link
  
Il sert principalement de **wrapper au composant Link de NextJs** (next/link)   
pour le rendre plus simple à utiliser et permettre à l'avenir une meilleure  
maintenabilité des liens de l'application.  
  
**Prenons la route suivante :**

    "/product/:id" : { page: "/product" }   
    

Cette route est supposée retourner vers une page produit définie par le paramètre `id`.  

Voici comment créer un lien vers cette page :
  

     <Link to="/product/:id" query={ { id: 23 } }>  
	     Découvrir le produit
     </Link>  


Ce lien redirigera l'utilisateur vers la page `monsite.com/product/23`.
Si la traduction d'url est activée, en français cela donnerait : `monsite.com/fr/product/23`
  
 Ici il s'agit d'une URL dynamique. Les URLs statiques fonctionnent de la même manière mais n'ont simplement pas besoin du paramètre `query`.



**Paramètres du composant :**
  

|  | type | requis | description | défaut |
|--|------|--------|-------------|--------|
| children | * | yes | contenu du lien | - |
| to | String | yes | nom de la route | - |
| query | Object | no | paramètres d'une route dynamique | - |
| className | String | no | classe passée au composant Typography du lien | - |
| activeClassName | String | no | classe passée au composant Typography du lien si celui-ci est actif | - |
| activeStyle | Object | no | styles passés au composant Typography du lien si celui-ci est actif | - |
| noTypo | Boolean | no | par défaut les liens utilisent le composant Typography de material-ui. Il est possible de désactiver ce fonctionnement via ce paramètre | false |
| name | String | no | nom du lien pour la balise `<a>` | - |
| target | String | no | target du lien pour la balise `<a>` | _self |
| prefetch | Boolean | no | permet d'activer la feature prefetch de NextJs pour ce lien | false |
| urlQuery | String | no | permet d'ajouter un élément à la fin de l'url. ex : "?foo=bar" | - |
| linkStyle | Object | no | un objet contenant des styles applicables à la balise `<a>` du lien | - |
| linkClassName | String | no | une classe applicable à la balise `<a>` du lien | - |
| disabled | Boolean | no | permet de désactiver le lien | false |
| linkAttributes | Object | no | contient des attributs custom applicables à la balise `<a>` du lien | - |
| color | String | no | permet de définir une couleur custom pour l'objet Typography | default |
| checkSubActive | Boolean | no | si activé, le lien sera considéré comme actif dès lors que son premier segment correspond au premier segment de l'URL courante | false
 
  
  
## Ajouter une nouvelle page  
  
Plusieurs étapes sont nécessaires pour la création d'une nouvelle page mais le processus a   
grandement été simplifié (si vous scrollez un peu, vous vous rendrez compte que cette section   
est pourtant relativement longue et vous vous direz que je me fou un peu de votre gueule.   
À cela je répondrai qu'en réalité c'est dû au fait que je prend le temps de présenter chaque   
étapes pour m'assurer que vous compreniez bien tout le processus. Je répondrai également que d'une   
certaine manière, oui, je me fou un peu de votre gueule puisqu'en définitive, le paragraphe le plus   
long de la section, vous êtes entrain de le lire, et qu'il ne vous aura pas appris grand chose :)).   

**Attention :** Lisez attentivement toutes les étapes avant de vous lancer! 
  
### 1) Créer la page  
  
La première chose à faire sera de créer le fichier correspondant à la nouvelle page (dans `/client/pages` par défaut).  
  
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
props
 
**styles**

Chaque page doit également avoir accès aux classes qui la concerne (JSS/Material-ui).

**pageData**

Pour finir, certaines pages peuvent avoir besoin d'informations les concernant. Il peut s'agir de leur contenu, leur titre,  
leurs meta-datas, etc... Ces données sont par défaut récupérées depuis une API distante (`germaine.js` dans notre cas)   
puis injectées dans la page par l'intermédiaire d'un autre HOC.  Voir la section dédiée pour plus d'infos.
  
On se retrouve donc avec 4 HOCs à imbriquer les uns dans les autres et cela pour chaque page,   
c'est un peu fastidieux. Pour rendre ça moins galère et plus maintenable,   
je vous suggère d'utiliser le wrapper pageWrapper disponible ici : `client/lib/pageWrapper.js`.  
Ce composant utilise la librairie `recompose.js` pour fusionner les HOCs ensembles.  
  

     const App = ({ pageData }) => ( 
	     <div>
		     <h1>{ pageData.title }</h1>
		 </div>
	 );     
     export default pageWrapper(App, { name: 'app' });  

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
     export default pageWrapper(App, { name: 'app' });  

Il suffit en effet d'utiliser ce composant comme container pour votre page et de lui passer la prop **pageData** (si définie).   
Celle-ci sera notamment utilisée pour générer la balise **<head>** de la page et ses meta-data.   

De cette manière, il vous est également plus simple de définir certains composants communs à toutes les pages, comme un header ou un footer par exemple.
  
**nb:** Toute autre _prop_ passée au composant _Layout_ sera injectée dans l'objet _pageData_.   
Cela permet par exemple de réécrire certains attributs (comme _title_ par exemple).  
  
  
  
### 2) Ajouter les données à la "database" (/fake-api)  
  
Cette étape est optionnelle mais permet d'illustrer comment ajouter de nouvelles données   
(pageData) à la page. Pour cela,  il suffit de rajouter un attribut à l'élément **pages** du fichier database.json :  
  

	{
	     //...  
	     "pages": {  
		     //...  
		     "myPage": {  
			     "title": "myPage",  
			     "metaData": [  
				     { "name": "description", "content": "This is the page description"},  
			     ] 
			     //... 
		     }
		 } 
     }  
     
  
### 3) Créer une nouvelle route  
  
Évidemment, sans route votre page ne sera pas accessible.   
Il faut donc l'ajouter. Pour cela, référez-vous à la section **Router** de ce readme.  
  
  
### 4) Ajouter un namespace pour les locales  
  
Cette étape est optionnelle. Si vous désirez ajouter un namespace correspondant à cette page pour vos traductions,   
il suffit de créer un nouveau fichier dans tous les dossiers contenant vos locales (`/locales/*` par défaut).   
En l'occurence, il devra s'appeler **myPage.json.**  
  
Pensez également à ajouter le nom du namespace dans la partie **namespaces** de la configuration 'lang'.  

Plus d'infos sont disponibles dans la section de cette documentation qui traite de l'internationalisation. 
  
  