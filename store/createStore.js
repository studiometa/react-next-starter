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

const socket = new Socket({ isServer, config: config.api });

export default (initialState) => {

  if (isServer) {
    return createStore(reducers, initialState, applyMiddleware(thunk.withExtraArgument(socket)));
  } else {
    return createStore(reducers, initialState, applyMiddleware(logger, thunk.withExtraArgument(socket)));
  }

};
