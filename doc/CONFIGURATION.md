# Configuration

The configuration of the application is done through two ways:
- Environment variables: concern all parameters that may change from one context to another
- Configuration files: concern all the parameters specific to the configuration of the elements of your application

## Environment variables

This is the first way to configure your application. This strategy allows you to easily set up a different configuration depending on the context in which your application is running. To do this, you just need to add a `.env` file to the root of your project (be careful, this file must never be versioned!!!)

- It is possible to define a different environment file for each type of environment: `.env.test`, `.env.development`, `.env.production`.
- You can take inspiration from the `.env.example` and `.env.production` files already present on the starter.
- The `/lib/env.js` file allows you to inject these variables into the context of your application (you should never have to edit this file)
- It is possible to configure the configuration of your environment variables from the `/config/env.config.js` file
	- When the application is launched, an exception will be thrown for any environment variable defined as required but not defined
    	- If you want to make a variable accessible in the client-side context, you must specify it in this file.
    	- **Be careful never to pass a variable containing sensitive data!**


## Configuration files

These files are accessible in the `/config` folder and all respect the following nomenclature: `<subject>.config.js`. You will find all the necessary parameters and can add new ones. You will then be able to import any of these files into your application, or import the entire folder to access the complete configuration. 

The `/config/env` folder allows you to define additional configuration files that will be interpreted according to the current node environment. This can be useful if you want to use a different configuration for your tests or during development for example.