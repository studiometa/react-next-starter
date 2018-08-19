import { combineReducers } from 'redux';
import app                 from './app.reducers';
import pages               from './pages.reducers';


export default combineReducers({
  pages,
  app,
});