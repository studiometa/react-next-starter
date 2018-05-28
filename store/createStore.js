import {
  createStore,
  applyMiddleware,
}                       from 'redux';
import reducers         from './reducers/index';
import thunk            from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Socket           from '../lib/socket';
import config           from '../config';
import getRoutes        from '../server/routes';


const routes = getRoutes();

const isServer = !process.browser;
const logger   = createLogger({
  collapsed: true,
  duration: true,
});

// The socket will be used in thunk actions to simplify the connection
// with an external API. You can learn more about how it works in the readme
// or directly in the Class source file

const socket = new Socket({ isServer, config: config.api });

// This is used by the server has a default state structure. This is very helpful while
// it allow us to be sure that some default attributes while always be defined. It is also a
// go place to inject other data, settings, etc

const DEFAULT_STATE = {
  app: {
    lang: config.lang.default,
    routes: Object.assign({}, routes, { current: {} }),
  },
  products: {},
  pages: {},
};

export default (initialState = DEFAULT_STATE) => {

  // We do not want middlewares like redux-logger to get
  // fired on the server side
  if (isServer) {
    return createStore(reducers, initialState, applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    return createStore(reducers, initialState, applyMiddleware(logger, thunk.withExtraArgument(socket)));
  }

};
