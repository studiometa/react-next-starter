export const PUSH_PAGE = 'PUSH_PAGE';

export function pushPage(pageId, page) {
  return {
    type: PUSH_PAGE,
    pageId,
    page
  };
}


/****************** ASYNC ACTIONS ******************/

/**
 * Fetch a page config (defined by a slug) from the API
 * @param pageId
 * @param cb
 * @returns {function(*, *, *)}
 */
export const fetchPage = (pageId, cb = () => {}) => async (dispatch, getState, socket) => {
  const currentItems = getState().pages;

  if (currentItems && currentItems[pageId]) {
    return typeof cb === 'function' ? cb(currentItems[pageId]) : currentItems[pageId];
  }

  try {
    const result = await socket.getPage(pageId);
    dispatch(pushPage(pageId, result));
    return cb(result);
  } catch (err) {
    return (cb(null, err));
  }
};

