# Introduction  
  
## Presentation  
  
This starter was developed to simplify the implementation of a SSR React site with NextJs and Material-ui.

The initial idea was to allow the rapid implementation of a web application using a modern technical foundation but starting from a sufficiently complete base to get to the heart of the matter. 

As each project is unique, this starter has been designed to be as customizable as possible. This documentation has been written to help you familiarize yourself with some basic principles, but as always, it is by tinkering that you will really learn to take advantage of the features offered by this starter.

Be careful, however, the more you change the core of the project, the more complicated it will be to make any subsequent updates. If this starter does not meet some of your specific needs, do not hesitate to suggest a pull-request or ask us directly! :)  
   
## Motivations

I know what you're thinking. Another developer who shares his homemade starter!
Well, yes, you're right. Articles that question the usefulness of starters are abounding on the Internet, 
encouraging the use of tools such as CRA instead. But I think the problem is more the lack of documentation
that comes with these starters than their real usefulness. 

Originally this starter was not intended to be one. The first development was initially designed to be used
on a specific project. But it seems that a good developer never does the same thing twice. Today I use it
for all my new projects and it allows me to develop more quickly than ever complex applications with all the
the necessary features. 

The big negative point with this type of tool is maintenance. A simple `npm update` will not be enough for you to put your project
with the latest features offered by this starter. 

It is from this observation that I decided to develop this project by developing a generator like CRA. The latter will complete the
same role as this starter with the following advantages:
- The core is ported to a node module, so it can be maintained with npm
- The sources of your projects will only contain your own code (or almost)
- It will always be possible to "eject" the project to access all the code

Leave me a message if you want to be kept informed of its release! :) 
   
 ## Features   
   
- native SSR routing  
- Configuration according to the environment thanks to the '.env' files  
- ready-to-use node server (expressJs)
- redux for native SSR and local storage management  
- custom loading (prefetch, webpack chunks, code splitting, etc)  
- native sass support (although I recommend using JSS as much as possible  
- fake API for development (based on germaine.js)  
- Native i18n support with multi-language router and native character string translation system  
- tests & CI/CD  
- JSS support
- Material-ui and theme-based development  
- Native server cache management  
- Client cache management using a service-worker
- Offline mode
 