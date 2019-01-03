# Troubleshooting

## The development server is slow

Unfortunately, there is no solution to this problem. In development mode, files are not minified, optimized or gziped. NextJs has to compile a large part of your changes on the fly, which can sometimes generate some delays.

However, if your application seems so slow that it never displays anything, it may be an unresolved promise or an unprocessed request. Node has[some tools](https://stackoverflow.com/questions/20990955/how-do-i-debug-promise-based-code-in-node) to solve this type of problem.
 
In any case, I advise you to estimate the speed of your application only in production mode.
 
 ## The Hot Module Reload of webpack makes me crazy
 
 In principle, NextJs still does not offer an effective solution to disable this feature, however, you can block requests using your browser's development tools. 
 
 Take a look at [this issue](https://github.com/zeit/next.js/issues/1109) for more information.
 
 ## I have a "did not match" error in my console
 
 ```bash
 Warning: Prop 'className' did not match. Server: "MuiTypography-root-246 MuiTypography-title-252 MuiTypography-colorInherit-265 PageComponent-flex-207" Client: "MuiTypography-root-44 MuiTypography-title-50 MuiTypography-colorInherit-63 PageComponent-flex-5"
 ```
 
 It's that you discover the joys of SSR :D! Be aware of this type of warnings, as they are often a sign of a design defect that can potentially have a big impact on the performance of your application!
 
 What is happening here is actually quite simple. Your page is rendered a first time on the server side, then a second time ([hydrate](https://reactjs.org/docs/react-dom.html#hydrate)) on the client side. If the two versions are not identical at the time of the first rendering, React will not know which one to keep and will therefore update the entire DOM to keep only the rendering done on the client side. I let you guess the potential consequences on the loading of your page....
 
 There is no miracle solution to solve this problem. You must have identified which part of your code is responsible.  To do this, the easiest way is to gradually delete segments until the error disappears. Once the wrong code is identified, you will have to determine what causes this error.
 
 Here is an example :
 
 ```jsx harmony
 render(
    <div>
      {
        process.browser === true && "You are on the browser !"
      }
    </div>
 )
 ```
 
 In this example, it is obvious that the page generated on the server side will not be identical to the one generated on the client side, since we are using a condition that will not return the same result in these two paradigms. 
 
 
 ## An error tells me that document, body, window (etc) is not defined
 
 Another SSR constraint. There is nothing to stop you from using these entities, but you can't do it anywhere.
  
  For example, if you use `window` in the constructor of a React Class, this constructor will be interpreted on the server side, where `window` simply does not exist. The same is true for the `render` method for example. 
  
  If, on the other hand, you do the same thing in a method like `componentDidMount`, you will no longer have any errors, since it is not never interpreted on the server side!
 
 ## Node just crashed
 
 Yes, unfortunately it happens, just as it can happen to planes.... Usually, this happens for a random and difficult to identify reason. This is generally [segmentation fault] (https://en.wikipedia.org/wiki/Segmentation_fault), that
  means that Node tried to access a memory segment that was not allocated to him.
  
  Fortunately, in production, there are a lot of tools available to automatically restart the server in case of this problem would happen. 
  
  Personally with this starter, it has never happened to me before :).
 
 
 ## My bundle / some of my chunks are too heavy
 
 Alert spoiler: the node_modules are probably responsible!
  
  To make sure, go to the `build` folder and open the `stats.html` file in your browser. You should no longer have any trouble identifying the responsible package!