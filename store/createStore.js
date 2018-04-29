import {
  createStore,
  applyMiddleware,
}                       from 'redux';
import reducers         from './reducers/index';
import thunk            from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Socket           from '../utils/socket';
import config           from '../config';


const isServer = !process.browser;
const logger   = createLogger({
  collapsed: true,
  duration: true,
});

// The socket will be used in thunk actions to simplify the connection
// with an external API. You can learn more about how it works in the readme
// or directly in the Class source file

const socket = new Socket({ isServer, config: config.api });

export default (initialState) => {

  // We do not want middlewares like redux-logger to get
  // fired on the server side
  if (isServer) {
    return createStore(reducers, initialState, applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    return createStore(reducers, initialState, applyMiddleware(logger, thunk.withExtraArgument(socket)));
  }

};
