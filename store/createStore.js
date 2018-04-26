import {
  createStore,
  applyMiddleware,
}                       from 'redux';
import reducers         from './reducers/index';
import thunk            from 'redux-thunk';
import { createLogger } from 'redux-logger';


const isServer = !process.browser;
const logger   = createLogger({
  collapsed: true,
  duration: true,
});


export default () => {

  // !important: do not modify initialState, it may cause some
  // confusions about what source of truth must be used to define update
  // the store when new data will be fetched from the server

  if (isServer) {
    return createStore(reducers, {}, applyMiddleware(thunk));
  } else {
    return createStore(reducers, {}, applyMiddleware(logger, thunk));
  }

};
