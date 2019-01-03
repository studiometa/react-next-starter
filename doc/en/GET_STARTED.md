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