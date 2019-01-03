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
 * @param updateIfExist
 * @param cb
 * @returns {function(*, *, *)}
 */
export const fetchPage = (pageId, updateIfExist = false, cb = () => {}) => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getPage(pageId);
    dispatch(pushPage(pageId, result, new Date()));
    cb(result);
    return result;
  } catch (err) {
    return (cb(null, err));
  }
};

