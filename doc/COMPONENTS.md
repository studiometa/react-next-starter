# Composants

Si vous jetez un oeil au dossier `/client/components` vous remarquerez 3 sous-dossiers :

- **_doc** : Contient quelques composants utilisés pour les pages de documentation. Vous n'aurez à priori jamais besoin
d'y toucher
- **common** : Contient certains composants communs à toutes les pages et fréquement utilisés
- **utils** : Contient une bibliothèque de plusieurs composants prêts à l'emploi et supposés vous aider dans le développement de votre projet

## common

### PageLayout.js

Ce composant est un wrapper utilisé dans toutes les pages. Nous vous conseillons fortement de l'utiliser à chaque fois.
Il permet par exemple d'ajouter votre Header ou votre Footer sur toutes les pages, mais également d'appliquer un layout
commun à chacune d'entre elles. C'est aussi ce composant qui est indirectement chargé de générer les balises `<meta>` de vos
pages (voir composant Head.js ci-dessous).

Par défaut, les props suivantes sont disponibles pour ce composant. Selon vos besoin, vous devrez cependant probablement modifier
ce composant pour y ajouter les fonctionnalités que vous jugerez nécessaires :

        
| Nom | Requis | Type | Description | Défaut |
|-----|--------|------|-------------|--------|
| children | Oui | any | Le contenu de votre page | - |
| backgroundColor | Non | string | Permet de modifier la couleur de fond de votre page | theme.palette.grey[50] |
| pageData | Oui | Object | Contient l'objet pageData. Passez un objet vite si votre page n'en a pas besoin. Si pageData n'est pas défini, la page retournera une 404 | - |
| debug | Non | Object | Passez n'importe quel objet à cette prop permet d'afficher un debugger en bas de page à l'aide de la librairie react-inspector. Cette feature n'est disponible qu'en développement | - |


### Head.js

Ce composant sert principalement de wrapper pour le [composant Head de NextJs](https://github.com/zeit/next.js#populating-head).

Il est utilisé pour générer la balise `<head>` de toutes vos pages. À noter que le titre de la page peut être défini
via l'objet `pageData` ou au travers du composant `PageLayout` à l'aide de la props `title`. Les balises `<meta>` sont
quant à elles uniquement générées via l'objet `pageData`. Vous pouvez cependant définir des balises par défaut dans le fichier
`seo.config.js` à l'aide de l'attribut `defaultMetaTags`.

### Header.js

Conçu à titre d'exemple, il s'agit simplement du Header présent sur toutes les pages du starter. Si votre projet nécessite un header,
vous pouvez reprendre celui-ci et le modifier à votre sauce. Sinon, supprimez-le.


## Utils

### LangSwitch.js

Ce composant permet d'afficher un sélecteur de langue. Toute la logique est en place, vous n'avez plus qu'à le customizer comme bon vous semble.

Voici quelques features intéressantes : 
- Permet de changer de langue en restant sur la même page (fonctionnement uniquement avec les URLs statiques pour le moment)
- Fonctionne avec ou sans le paramètre `enableRouteTranslation` activé
- Fonctionne même si JavaScript est désactivé côté client
- Ne nécessite aucune props, vous pouvez placer ce composant n'importe où sans avoir à le configurer


### LazyImage.js

Comme son nom l'indique, ce composant permet de créer facilement des images lazy-loadées. Il fonctionne également avec
les background-images. En cas d'erreur de chargement, l'image suivante sera affichée : `/static/imgs/fallback_image.png`. 

Voici la liste des props de ce composant :

| Nom | Requis | Type | Description | Défaut |
|-----|--------|------|-------------|--------|
| src | Non | String | La source de l'image à afficher | - |
| width | Non | String, Number | Largeur de l'image | '100%' |
| height | Non | String, Number | Hauteur de l'image | '100%' |
| useBackgroundImage | Non | Boolean | Définie si l'image doit être affichée en background | false |
| noSkeleton | Non | Boolean | Si true, le skeleton utilisé pour animer le chargement de l'image sera désactivé | false |
| className | Non | String | Une classe appliquable à l'image | - |

### NoScript.js

Permet de créer une balise `<noscript>` 100% fonctionnelle et isomorphique.

**nb**: Si vous désirez effectuer la mécanique inverse, c'est à dire masquer un élément lorsque le JavaScript est activé
sur la partie client, vous pouvez lui attribuer la classe `hidden-no-script`. Celle-ci aura pour effet d'appliquer un
`display: none;` à votre élément. Ce n'est pas idéal, mais ça peut s'avérer pratique. Jetez un oeil au composant LazyImage.js
pour un exemple d'utilisation.

### Skeleton.js

Ce composant permet de générer un "skeleton-screen".

Voici la liste des props de ce composant : 

| Nom | Requis | Type | Description | Défaut |
|-----|--------|------|-------------|--------|
| count | Non | Number | Nombre de lignes à générer | 1 |
| duration | Non | Number | Durée de l'animation en secondes | 1.2 |
| width | Non | Number, String | Largeur du skeleton | null |
| wrapper | Non | ReactNode | Permet d'ajouter un wrapper au skeleton | null |
| lineHeight | Non | Number, String | Hauteur d'une ligne du skeleton | 'normal' |
| className | Non | String | Ajoute une classe au composant | - |
| styles | Non | Object | Ajoute des styles au composant | - |


### ResponsiveModal.js

Permet de générer une modal fonctionnant sur mobile. Ce composant est un wrapper au composant [Modal](https://material-ui.com/api/modal/#modal) de material-ui.

Voici la liste des props de ce composant :
    
| Nom | Requis | Type | Description | Défaut |
|-----|--------|------|-------------|--------|
| isOpen  | Oui | Boolean | Défini si la modal est affichée ou non | - |
| closeModal  | Oui | Function | Callback à appeler pour fermer la modal | - |
| modalProps | Non | Object | Des props custom appliquables au composant Modal | - |
| paperProps | Non | Object | Des props custom appliquables au composant Paper | - |
| contentProps | Non | Object | Des props custom appliquables au composant DialogContent | - |
| maxWidth | Non | String, Number | Largeur max de la modal sur desktop | 480 |
| noCloseBtn | Non | Boolean | Permet de masquer le bouton de fermeture de la modal | false |
| fullScreen | Non | Boolean | Permet d'afficher la modal en plein écran | false |
| title | Non | String | Titre optionnel de la modal  | - |
| bottomActions | Non | ReactNode | Permet d'ajouter des éléments dans le footer de la modal | - |

### PageBuilder

Ce composant est encore en cours de développement.