# Wrappers
  
They are two and allow you to easily wrap your pages and components in order to easily integrate some functionalities through different HOCs.  
  
They are available in the `/client/lib` folder. These are functions whose first parameter corresponds to the component to be wrapped and the second one to an object containing parameters.  
  
## pageWrapper  
  
Allows you to wrap each of your pages. You must use this wrapper when you create a new page.  
  
     const MyPage = () => (<div>hello</div>);   
     export default pageWrapper(MyPage, { name: 'my-page' })  

   
This component manages the following parameters:   
 - **name** : Name of the page. Also used for API requests and for using a page specific locale.
 - **namespaces** : Allows you to use additional namespaces for content translation  
 - **mapStateToProps** : Same function used by Redux to inject props to the component  
 - **Styles** : Object used by JSS and Material-ui to generate page styles  
 - **withTheme** : If true, the prop "theme" will be accessible by the component, containing the Theme object of material-ui  
 - **NoPageData**: Essential if the page is not supposed to retrieve content through the API to avoid a 404 error being returned.   
  
## componentWrapper  
  
This component is essentially the same as the previous one and can be used for all your components.  
      
     const MyComponent = () => (<div>hello</div>);
     export default componentWrapper(MyComponent, { name: 'my-component' })  
    
This component supports the following parameters:  
 - **isTranslatable** : true by default, allows you to disable translation for this component  
 - **IsConnected**: Defines whether the component should be connected to redux. If so, the dispatch prop will be accessible.  
  If `mapStateToProps` is defined, the component will always be considered connected  
 - **Namespaces**: Allows you to use additional namespaces for content translation. By default, the component inherits the namespaces of the parent page or component.  
 - **mapStateToProps** : Same function used by Redux to inject props to the component  
 - **Styles** : Object used by JSS and Material-ui to generate page styles  
 - **withTheme** : If true, the prop "theme" will be accessible by the component, containing the Theme object of material-ui  
 - **WithRouter**: Gives access to the "router" prop corresponding to the NextJs object router
 - **WithWidth**: Same operation as the HOC with the same name as Material-ui
