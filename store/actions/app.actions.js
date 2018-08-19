
export const UPDATE_APP_LANGUAGE = 'UPDATE_APP_LANGUAGE';
export function updateAppLanguage(lang) {
  return {
    type: UPDATE_APP_LANGUAGE,
    lang,
  };
}
export const UPDATE_APP_CURRENT_URL = 'UPDATE_APP_CURRENT_URL';
export function updateAppCurrentUrl(url) {
  return {
    type: UPDATE_APP_CURRENT_URL,
    url,
  };
}

export const SET_APP_SETTINGS = 'SET_APP_SETTINGS';
export function setAppSettings(settings) {
  return {
    type: SET_APP_SETTINGS,
    settings
  };
}


export const fetchAppSettings = () => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getSettings();

    dispatch(setAppSettings(result));
    return result;
  } catch (err) {
    console.log('error in app.action.js:fetchAppSettings', err);
  }
};