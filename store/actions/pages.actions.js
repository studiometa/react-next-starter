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
  
  if (currentItems && currentItems[pageId]) {
    return typeof cb === 'function' && cb(currentItems[pageId]);
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

