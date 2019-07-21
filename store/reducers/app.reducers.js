import * as actionTypes from '../actions/app.actions';


function updateAppLanguage(state, action) {
  return Object.assign({}, state, {
    lang: action.lang,
  });
}

function setAppSettings(state, action) {

  return Object.assign({}, state, {
    settings: action.settings,
    syncSettings: true // To now that the settings has been set
  });
}

export default (state = {}, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_APP_LANGUAGE:
      return updateAppLanguage(state, action);

    case actionTypes.SET_APP_SETTINGS:
      return setAppSettings(state, action);

    default:
      return state;
  }
};
