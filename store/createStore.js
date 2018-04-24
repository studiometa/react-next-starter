import { createStore } from 'redux';
import reducer         from './reducers/index';

const REDUCERS_PATH = './reducers/index';
export default (initialState) => {

  const store = createStore(reducer, initialState);

  // if (module.hot) {
  //   module.hot.accept(REDUCERS_PATH, () => {
  //     console.log('Replacing reducer');
  //     store.replaceReducer(require(REDUCERS_PATH).default);
  //   });
  // }

  return store;

};
