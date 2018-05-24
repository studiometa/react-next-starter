import * as actionTypes        from '../actions/app.actions';


function updateAppLanguage(state, action) {
  return Object.assign({}, state, {
    lang: action.lang
  });
}

export default (state = {}, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_APP_LANGUAGE:
      return updateAppLanguage(state, action);
    default:
      return state;
  }
};
