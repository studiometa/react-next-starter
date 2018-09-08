import * as actionTypes from '../actions/app.actions';


function updateAppLanguage(state, action) {
  return Object.assign({}, state, {
    lang: action.lang,
  });
}

function setAppSettings(state, action) {

  return Object.assign({}, action.settings);
}

function updateAppCurrentUrl(state, action) {
  return Object.assign({}, state, {
    currentUrl: action.url,
  });
}


export default (state = {}, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_APP_LANGUAGE:
      return updateAppLanguage(state, action);

    case actionTypes.SET_APP_SETTINGS:
      return setAppSettings(state, action);

    case actionTypes.UPDATE_APP_CURRENT_URL:
      return updateAppCurrentUrl(state, action);

    default:
      return state;
  }
};
