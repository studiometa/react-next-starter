import * as actionTypes from '../actions/app.actions';


function updateAppLanguage(state, action) {
  return Object.assign({}, state, {
    lang: action.lang,
  });
}

function setAppSettings(state, action) {
  const currencyRates = action.settings.devises;

  // Because the API is not returning the rates in the expected format
  // we must do an extra conversion here
  if (currencyRates && isNaN(currencyRates[0])) {
    Object.entries(currencyRates).forEach(([name, options]) => {
      if (isNaN(options)) {
        currencyRates[name] = (options && !isNaN(options.rate)) ? options.rate : undefined;
      }
    });
  }

  return Object.assign({}, state, {
    currencyRates: action.settings.devises,
    countries: action.settings.countries,
    syncSettings: true // To now that the settings has been set
  });
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
