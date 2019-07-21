# First steps


## Get the last version

Start by downloading the latest version of the starter: 

```shell
$ git clone https://github.com/studiometa/react-next-starter.git MyApp
$ cd MyApp
```
  
## Install the dependencies
```shell
$ npm i  
```

## Checklist - Getting started

*tips* : You can keep the documentation pages, as well as the _sandbox page, they will never be accessible
in production!

#### package.json
- Change the name
- Modify the description
- Change the version number
- Modify the keywords

#### env.development
- Modify the port
- Modify API settings

#### Configuration
- Configure the language settings in the `lang.config.js` file (and add the locale files if necessary)
- Modify the API settings in the `api.config.js` file
- Change the basic SEO settings in the `seo.config.js` file

## Content
- Modify the file `PageLayout.js` to adapt it to your needs (modify/delete the header, etc)
- Delete the readme page in the `pages` folder as well as its route in the `routes.js` file
- Modify the home page to add your content

#### other
- Modify the readme


## Launch the app in dev mode
```shell
$ npm run dev
```

## Launch the app in production mode
```shell
$ npm run build
$ npm run start
```

## Launch the app in production mode with PM2

*First of all, remember to modify the environment variables in the `env.production` file*

[PM2](http://pm2.keymetrics.io/) is a powerful tool that allows you to "[cluster](http://pm2.keymetrics.io/docs/usage/cluster-mode/)"  your application, i.e. to make it multi-process. PM2 also ensures the maintenance of your project with access to a [monitoring interface](http://pm2.keymetrics.io/docs/usage/monitoring/). Finally, it allows to automatically restart your application if it crashes. All this makes PM2 the ultimate weapon for production.

```shell
$ npm run build
$ npm run pm2:start
```

Warning, this command will execute a daemon that will be executed in the background. To stop this process use the following command:

```shell
$ npm run pm2:stop <process_name>
```

The process name corresponds to the name of your project as defined in the `package.json` file.


## Launch tests
```shell
$ npm run test
```