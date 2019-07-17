
export const UPDATE_APP_LANGUAGE = 'UPDATE_APP_LANGUAGE';
export function _updateAppLanguage(lang) {
    return {
      type: UPDATE_APP_LANGUAGE,
      lang,
  }
}

export const SET_APP_SETTINGS = 'SET_APP_SETTINGS';
export function setAppSettings(settings) {
  return {
    type: SET_APP_SETTINGS,
    settings
  };
}

/****************** ASYNC ACTIONS ******************/


export const updateAppLanguage = (lang) => async (dispatch, getState, socket) => {
  try {
    socket.setLang(lang);
    dispatch(_updateAppLanguage(lang));
  } catch (err) {
    console.log(err);
  }
};

 /**
 * Fetch the app settings from the API
 */
export const fetchAppSettings = (cb = ()=>{}) => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getSettings();

    dispatch(setAppSettings(result));
    return cb(result);
  } catch (err) {
    cb(err, null);
  }
};