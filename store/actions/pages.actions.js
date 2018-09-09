import config from '../../config';


export const PUSH_PAGE = 'PUSH_PAGE';

export function pushPage(pageId, page, lastUpdate) {
  return {
    type: PUSH_PAGE,
    pageId,
    page,
    lastUpdate,
  };
}


/****************** ASYNC ACTIONS ******************/

/**
 * Fetch a page config (defined by a slug) from the API
 * @param pageId
 * @param updateIfExist
 * @param cb
 * @returns {function(*, *, *)}
 */
export const fetchPage = (pageId, updateIfExist = false, cb = () => {}) => async (dispatch, getState, socket) => {
  const currentItems = getState().pages;

  // Here we are checking if there is existing data from the server or local storage
  // if yes, we check if an expiration date exists and if the cache is still valid
  // if yes, return the cache. Else perform a query to update it

  if (currentItems && currentItems[pageId]) {
    if (config.redux.expires.page !== undefined && currentItems[pageId].lastUpdate) {
      if (new Date() - new Date(currentItems[pageId].lastUpdate) < config.redux.expires.page) {
        return typeof cb === 'function' && cb(currentItems[pageId]);
      }
    }
  }

  try {
    const result = await socket.getPage(pageId);
    dispatch(pushPage(pageId, result, new Date()));
    cb(result);
    return result;
  } catch (err) {
    return (cb(null, err));
  }
};

