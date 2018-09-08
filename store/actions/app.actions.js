
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

/****************** ASYNC ACTIONS ******************/

 /**
 * Fetch the app settings from the API
 * @returns {function(*, *, *)}
 */
export const fetchAppSettings = (cb) => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getSettings();

    dispatch(setAppSettings(result));
    cb(result)
    return result;
  } catch (err) {
    cb(err, null);
  }
};