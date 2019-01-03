# Discover the starter
  
By default, 3 pages are available:  
- home : white page easily reusable (copy/past) 
- readme: Allows to access the starter readme (demo page, to be deleted)
- documentation: contains the starter doc
- sandbox: contains a number of practical information, especially to preview the current theme

**nb:** The documentation and sandbox pages have been designed to be accessible only when the application is running on a development environment. This means that you can keep them, even after you have put your project into production!
  
  
## 1) Launch the app
  
If you have installed the dependencies (`npm i`), all you have to do is launch the **development** server by doing a `npm run dev`.  
  
If everything went well you should see a message like this:  
  
 DONE Compiled successfully in 1773ms  04:07:14 AM  
 > Ready on http://localhost:3000  
 > Building page: /  
 
 
It is possible to **configure the port** used from the environment variables (we will come back to this later)
  
## 2) A monster wakes up...  
  
Now that the server is purring, go to your browser at `http://localhost:3000` with **the devTool network tab open**.  
  
**We are on a development environment, so:**  
  
- Don't pay attention to the size of the downloaded Js files, webpack tends to inject a lot of data under development. So don't panic if your bundle is several MB.... This will no longer be the case in prod :).  
  
- Also don't pay attention to the "on-demand-entries-ping" requests, it's just the server that makes pings to allow the Webpack HMR (Hot Module Reload) to work.  
  
- To understand a little more closely what the different Js files correspond to, I invite you to throw away a look at the [NextJs doc](https://nextjs.org/docs/).  
  
## 3)Go to the /documentation page
  
If you take a look at the new requests made, you will notice that the page has **not been fully reloaded**.   
Nothing new if you are familiar with React, VueJs or other.  
  
**Some new files have been downloaded:**  
  
- **intro.js** : The script of the page  
- **_doc** : This request is made to the API to retrieve the content of the page. Here the content is therefore only downloaded if the page is displayed. Go to the "pageData" section of this readme for more information. 
  
## 5) Reload the page completely, then go to the homepage (click on the logo)  
  
Normally, you should notice the following request: `http://localhost:3000/fake-api/pages/home`  
  
This is again a request made to the API to retrieve the page information. It is this query that displays the "welcomeMessage" variable.  
  
## 6) Reload the page  
  
Bam! The message is still displayed on the page, but the request has not been made. This is simply because this time the request was made on the server side, before the page was rendered :).  If you are used to SSR, this should not surprise you.
  
## 7) Change the language using the selector at the top right  
  
- The page is fully reloaded to ensure that all content is correctly updated in the desired language.   
- The page is the same! This is because the `LangSwitch` component is able to resolve the current page in any language defined in the configuration. Be careful, it only works with static urls for the moment.
  
## 8) Go to this address: http://localhost:3000/readme  
  
The router will automatically recognize the language attached to the "readme" page, even if it is not defined in the url  
  
  
## 9) Go to this address: http://localhost:3000/lisez-moi  
  
The router will automatically recognize the language attached to the "read me" page, even if it is not defined in the url  
  
## 10) Disable JavaScript and reload the page  
  
TTADAAAAAA 🎉 the site is fully navigable and the content loads correctly. Including the image of the home page, initially lazy-loaded.  
   
However, this is not magic. If it is a priority for you that your project can be fully functional without JavaScript, **it will probably be necessary to anticipate a significant additional development time**.   

In this example, the image is displayed using a `<noscript>` tag which, when the Js is disabled, will simply add the image to the DOM without going through the lazy-load process.  

Links are transformed into simple HTML links pointing to the different pages of the site.  