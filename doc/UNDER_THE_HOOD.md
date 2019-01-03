# Under the hood  
  
## Project architecture  
```
    .  
    ├── build                   # The app build after running `npm run build`  
    ├── client                  # Contains all the code that belongs to the client side  
    │ ├── components            # All the client components  
    │ ├── lib                   # Lib files for the client side   
    │ ├── pages                 # All the client pages   
    │ ├── public                # Everything in this folder will be accessible at the root of your project URL (robots.txt, htaccess, etc)   
    │ ├── static                # Static files will be accessible under /static. It's a good place to put your assets for example   
    │ └── styles                # Here you can put some scss files for your styles   
    ├── config                  # The app config files used in both client and server sides  
    ├── node_modules            # The projet dependencies  
    ├── server                  # Contains all the code that belongs to the server slide
    │ └── lib                   # Lib files for the server side  
    ├── static                  # All the statics files, assets, images, fonts, etc  
    ├── locales                 # Locales files for i18n  
    ├── doc                     # Contains all the documentation files
    ├── store                   # Contains all the code that belongs to the store  
    │ ├── actions               # All the app actions  
    │ └── reducers              # All the app reducers  
    ├── __tests__               # Contains all the tests files
    └── helpers                 # Contains helpers that can be used in the whole project  
```
 
 
 This tree structure is inspired by the one proposed in the NextJs guidelines but has been slightly modified for a better distribution of the main elements:
  - In the **client** folder, you will find everything related to the **view** 
  - In the folder **store**, you will find the elements that are relevant to the **model** part
  - The folder **server** contains most of the  **server** logic with the definition of routes an so on
  - The **lib** and **helpers** folders provide some useful components that can be used anywhere in the project
 
 
 ## server.js
 
 
 This file exposes the instance of a class containing all the server logic. Its use has been greatly simplified since version 2.0.0. This class has a `start` and a `stop` method. There is basically nothing more to understand in order to be able to use it. Other methods are also available but they are mainly helpers.
 
 Here is a non-exhaustive list of the features managed by the class when launching the server. Some of these features are only activated in production:
  - Assigning an available port
  - Verification of the global structure of the project (presence of the files essential for its proper functioning)
  - Activation of certain middleware, cors, compression etc.
  - Initialization of germaine.js for the implementation of the "fake-api".
  - Implementation of i18next for multi-language management
  - Creation of listeners that will allow you to serve the pages of the site, solve in the right language, etc
  - Adding a possible access restriction with basic authentication
  - Checking the validity of routes
  - Starting the server cache
 
 
 ## The /client/static file
 
 Store all your assets in this folder and then access them from the `/static` pathname 