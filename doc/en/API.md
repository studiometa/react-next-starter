# API and pageData

As this starter was designed for headless use, you will probably need to set up a way to communicate with a remote API to retrieve the data to be displayed. In the case of a completely static site, you can skip this section.

## API Configuration

Some API settings are configured via environment variables. See the "configuration" section of the documentation for more information. 


## pageData

The pageData object is accessible from any page of the application. It contains a certain amount of information on the page and must follow the structure below: 

    {  
      "title": "Home",
      "metaData": [  
	     { "name": "description", "content": "This is the home page"}  
	  ],
	  "content": {...},
	  "settings": {...} 
    },

- **title** : The title of the page as it will be displayed in the `<title>` tag 
- **metaData**: An array to generate `<meta>` tags. Each element of the array must be an object, all the attributes of these objects will be passed to the tag `<meta>`.
- **content**: The content of your page can contain anything depending on your needs
- **settings**: Additional settings specific to this page, once again you can put anything you think is useful. 

You can define that a page does not need the pageData object by setting the attribute `noPageData` to `true` in the page wrapper settings. If you do not want to use this feature at all, it is possible to disable it from the `/config/api.config.js` file using the `fetchPagesData` parameter.

When this setting is enabled, the application will request your API for you to retrieve the information from the page you want to display.
The result is then stored locally thanks to Redux to avoid having to retrieve this information again in the eventuality that the user
would return to a page he has already visited.

It is possible to modify the endpoint used to make this request in the `api.config.js` file by editing the parameter `endpoints.pages`.

*Attention* For this to work, it is essential that your API returns a code 200 and an object in JSON format. 

## Socket.js

The `Socket` class was designed to simplify requests made to the API. It is available at this location: `/client/lib/socket.js`.

- By default, this class is used to retrieve data for certain pages and application settings.
- An instance of this class is also accessible from the redux actions (see the "store" section of the documentation).
- It is up to you to update this class to allow it to handle all the requests you may need from a single location. 


## Fake-api

As the name suggests, this is a "fake API" that only supports GET and FIND requests. This API has been designed using the[germaine.js](https://github.com/chuck-durst/germaine) library. I invite you to read the doc of this library to understand how it works.

- Requests are made on the `/fake-api` endpoint of your application (not editable)
- The data is accessible in the `/server/database.json` folder. 
- You can also disable this feature using the `ENABLE_FAKE_API` environment variable. 

**You can use this service for three reasons:**
- In development, if an API endpoint has not yet been developed, you can use fake-api to simulate requests
- In production, fake-api can be used as a static database 
- In production, it would also be possible to set up a fallback system. If a request to your API fails (404, 500, etc.) you could then solve static content with fake-api.


