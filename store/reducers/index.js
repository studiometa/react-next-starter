import { combineReducers } from 'redux';
import products            from './products.reducers';
import pages               from './pages.reducers';


export default combineReducers({
  products,
  pages,
});