export const UPDATE_APP_LANGUAGE = 'UPDATE_APP_LANGUAGE';
export function updateAppLanguage(lang) {
  return {
    type: UPDATE_APP_LANGUAGE,
    lang,
  };
}