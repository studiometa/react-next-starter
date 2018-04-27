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


export default (initialState) => {

  if (isServer) {
    return createStore(reducers, initialState, applyMiddleware(thunk));
  } else {
    return createStore(reducers, initialState, applyMiddleware(logger, thunk));
  }

};
