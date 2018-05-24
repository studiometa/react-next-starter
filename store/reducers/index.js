import { combineReducers } from 'redux';
import products            from './products.reducers';
import pages               from './pages.reducers';
import app                 from './app.reducers';


export default combineReducers({
  products,
  pages,
  app,
});