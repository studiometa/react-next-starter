# Router  
  
## Routes

With NextJs, route management is normally based on the content of the `/pages` folder. This means that by default, the route `https://site.com/exemple` points to the file `/pages/example.js`  
  
In order to meet the needs of this starter (multi-lingual etc.), it was preferable to implement an in-house solution for routes management. These are defined in the file `/server/routes.js`.  

**In this file, each route is defined according to the following model: **

`<routeName>: { page: <pagePath>, langRoutes: <langRoutes>, prefetch: <prefetch>, neverCache: <neverCache> },`

|  | type | description | example |
|--|------|-------------|---------|
| routeName | String | The route pathname | /user/profile/:id |
| pagePath | String | The path to the Js file of the corresponding page in the pages folder | /user/profile (for the file /pages/user/profile.js)  |
| langRoutes | Object | In case url translation is enabled, this parameter allows to modify the appearance of URLs for a given language | {"en": "/user/profile/:id", "fr": "/utilisateur/profil/:id"} |
| prefetch | Boolean | Enables the NextJs "prefetch" feature for this page | true |
| neverCache | Boolean | If the server cache is enabled, this setting ensures that this page will never be cached | true |

It is of course possible for you to add any other parameter that you think is necessary

## Route naming

In order to maintain a certain consistency across the application, be sure to observe the following rules for naming your routes. These rules apply to both the `routeName` parameter and the values of the `langRoutes` parameter:
- Routes are always written in lower case, without accents
- Only dashes and underscores are allowed within a road segment
- A road always starts with a slash
- A route never ends with a slash (except the home page, since the route is only one character)
- A route therefore follows this model: `/<segment>/<segment>/<segment>/<segment>`
- A segment can be dynamic, in which case it must start with two dots: `/:<dynamicSegment>`
	- The values will then be accessible via the `query` parameter in the `getInitialProps` method on the corresponding page.

**nb** : Two roads cannot point to the same page!


## multi-lingual routes

If you are planning to develop a multi-lingual site, it may be necessary to have access to different urls depending on the current language.
Until version 2.0 of this starter, it was possible to create totally different routes depending on the language. Since version 3.0, a lot of
changes have been made and URL translation is now managed by the `localSubpaths` parameter accessible in the `/config/lang.config.js` file. This parameter allows you to add
automatically a language segment to all your URLs. next-i18next will also redirect the user if this setting is enabled
but no language segment has been specified in the URL.

[see the next-i18next doc](https://github.com/isaachinman/next-i18next#5-locale-subpaths)

**Attention**, disabling this setting does not mean that your site will be "mono-language". It is always possible for you to set up a multi-lingual site, the only difference is to add this segment in the url.
The current language will still be accessible from a cookie.

## Create a link in the app  
  
To create a link, it is necessary to use **the Link component** accessible in the `/client/components/common` folder.  
 When you create a link, all you have to do is to indicate the corresponding **route**.  The component will do the rest, which means generating a valid link, to the right page and in the right language. 
  
  
### The Link Component
  
It is mainly used as a **wrapper for the Link component of NextJs** (next/link) to make it easier to use and allow better maintainability of the application's links in the future.  
  
**Let's take the following route:**

    "/product/:id" : { page: "/product", langRoutes: { fr: "/produit/:id" } }   
    

This route is supposed to return to a product page defined by the `id` parameter.  

Here's how to create a link to this page:
  

     <Link to="/product/:id" query={ { id: 23 } }>  
	     Discover the product
     </Link>  


This link will redirect the user to the `mysite.com/product/23` page.
If url translation is enabled, in French it would look like this: `mysite.com/en/product/23`
  
 This is a dynamic URL. Static URLs work the same way but simply do not need the `query` parameter.



**Component parameters :**
  

|  | type | required | description | default |
|--|------|----------|-------------|---------|
| children | * | yes | link content | - |
| to | String | yes | route name | - |
| query | Object | no | dynamic route queries | - |
| noTypo | Boolean | no | by default links use the Typography component of material-ui. It is possible to disable this operation via this parameter | false |
| className | String | no | class passed to the Typography component of the link | - |
| activeClassName | String | no | class passed to the Typography component of the link if it is active | - |
| activeStyle | Object | no | styles passed to the Typography component of the link if it is active | - |
| name | String | no | link name of the `<a>` tag | - |
| target | String | no | target of the `<a>` tag | _self |
| prefetch | Boolean | no | allows you to enable NextJs' feature preview for this link | false |
| urlQuery | String | no | allows you to add an element at the end of the url. ex : "?foo=bar" | - |
| linkStyle | Object | no | an object containing styles applicable to the `<a>` tag of the link | - |
| linkClassName | String | no | a class applicable to the `<a>` tag of the link | - |
| disabled | Boolean | no | allows you to disable the link | false |
| linkAttributes | Object | no | contains custom attributes applicable to the `<a>` tag of the link | - |
| color | String | no | allows you to define a custom color for the Typography object | default |
| checkSubActive | Boolean | no | if enabled, the link will be considered active as soon as its first segment corresponds to the first segment of the current URL | false
 
  
  
## Add a new page  

**Attention**: Read all the steps carefully before you start! Here I describe each step precisely but the procedure is actually much simpler than the one presented below.
  
### 1) Create the page
  
The first thing to do is to create the file corresponding to the new page (in `/client/pages` by default).  
  
     export default () => (  
	     <div>  
		     <h1>{ pageData.title }</h1>  
	     </div>  
     )  

The example below will not be enough to make your page work.  
To do this, each page needs three things:  
  
**Redux**  
  
Each page must have access to the **state** and the **dispatch** method of the **store**. The real logic of injection and creation of the store is located in the `_app.js` file, so there is not much particular to do except to use the HOC **connect** of **react-redux**.  
  
**i18next**  
  
In the forecast of a multi-language site, it is also necessary to plan the injection of new props 
  
  
**styles**  
  
Each page must also have access to the classes that concern it (JSS/Material-ui).  
  
**pageData**  
  
Finally, some pages may require information about themselves. It can be their content, title, meta-datas, etc.... By default, this data is retrieved from a remote API (`germaine.js` in our case) and then injected into the page via another HOC.  See the dedicated section for more information.
  
So we find ourselves with 4 HOCs to nest into each other and that for each page, it's a little tedious. To make it less difficult and more maintainable,   
I suggest you use the wrapper pageWrapper available here: `client/lib/pageWrapper.js`. This component uses the `recompose.js` library to merge the HOCs together.  
  

     const App = ({ pageData }) => ( 
	     <div>
		     <h1>{ pageData.title }</h1>
		 </div>
	 );     
     export default pageWrapper(App, { name: 'app' });  

In this example, we simply return **a call to the pageWrapper function** whose first parameter corresponds to our page and the second to options. Its use is documented below in this readme.  
  
From now on, the page is functional. However, one last element is still missing: the wrapper **Layout.**  
  
This wrapper is a component that is best used on all pages. Its use is very simple: 
  

     const App = ({ pageData }) => ( 
	     <Layout pageData={pageData}>
		     <div> 
			     <h1>{ pageData.title }</h1> 
			 </div>
		</Layout> 
     );
     export default pageWrapper(App, { name: 'app' });  

All you have to do is use this component as a container for your page and pass it the prop **pageData**.   
This will be used to generate the **<head>** tag of the page and its meta-data.   

This also makes it easier for you to define certain components common to all pages, such as a header or a footer for example.
  
**nb:** Any other _prop_ passed to the component _Layout_ will be injected into the object _pageData_.   
This allows, for example, to rewrite certain attributes (such as _title_ for example).  
  
  
  
### 2) Adding data to the database (/fake-api)  
  
This step is optional but illustrates how to add new data (pageData) to the page. To do this, simply add an attribute to the **pages** element of the database.json file:  
  

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
     
  
### 3) Create a new route  
  
Obviously, without a route your page will not be accessible. It must therefore be added.
 To do this, refer to the top of this page.  
  
  
### 4) Add a namespace for locales  
  
This step is optional. If you want to add a namespace corresponding to this page for your translations, simply create a new file in all folders containing your locales (`/locales/*` by default). In this case, it should be called **myPage.json.**  
  
Also remember to add the namespace name in the **namespaces** part of the lang configuration.  

More information is available in the internationalization section of this documentation. 
  
  