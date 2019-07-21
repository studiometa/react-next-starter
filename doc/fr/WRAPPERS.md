# Wrappers
  
Ils sont deux et permettent de wrapper facilement vos pages et vos composants afin d'y intégrer facilement certaines fonctionnalités par l'intermédiaire de différents HOCs.  
  
Ils sont disponibles dans le dossier `/client/lib`. Ce sont des fonctions dont le premier paramètre correspond au composant à "wrapper" et le second un objet contenant des paramètres.  
  
## pageWrapper  
  
Permet de wrapper chacune de vos pages. Vous devez utiliser ce wrapper lorsque vous créez une nouvelle page.  
  
     const MyPage = () => (<div>coucou</div>);   
     export default pageWrapper(MyPage, { name: 'my-page' })  

   
Ce composant gère les paramètres suivants :   
 - **name** : Nom de la page. Également utilisé pour les requêtes à l'API et pour l'utilisation d'une locale propre à la page.
 - **namespaces** : Permet d'utiliser des namespaces supplémentaires pour la traduction du contenu  
 - **mapStateToProps** : Même fonction utilisée par Redux pour injecter des props au composant  
 - **styles** : Objet utilisé par JSS et Material-ui pour générer les styles de la page  
 - **withTheme** : Si true, la prop "theme" sera accessible par le composant, contenant l'objet Theme de material-ui  
 - **noPageData** : Indispensable si la page n'est pas supposée récupérer de contenu à travers l'API pour éviter qu'une erreur 404 soit retournée.   
  
## componentWrapper  
  
Ce composant est sensiblement le même que le précédent et peut être utilisé pour tous vos composants.  
      
     const MyComponent = () => (<div>coucou</div>);
     export default componentWrapper(MyComponent, { name: 'my-component' })  
    
Ce composant gère les paramètres suivants :  
 - **isTranslatable** : true par défaut, permet de désactiver la traduction pour ce composant  
 - **isConnected** : Défini si le composant doit être connecté à redux. Si oui, la prop 'dispatch' sera accessible.  
  Si `mapStateToProps` est défini, le composant sera toujours considéré comme étant connecté  
 - **namespaces** : Permet d'utiliser des namespaces supplémentaires pour la traduction du contenu. Le composant hérite par défaut des namespaces de la page ou du composant parent.  
 - **mapStateToProps** : Même fonction utilisée par Redux pour injecter des props au composant  
 - **styles** : Objet utilisé par JSS et Material-ui pour générer les styles de la page  
 - **withTheme** : Si true, la prop "theme" sera accessible par le composant, contenant l'objet Theme de material-ui  
 - **withRouter**: Donne accès à la prop "router" correspondant à l'objet router de NextJs
 - **withWidth**: Même fonctionnement que le HOC homonyme de Material-ui
