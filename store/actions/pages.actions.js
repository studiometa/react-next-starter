export const PUSH_PAGE = 'PUSH_PAGE';

export function pushPage(pageId, page) {
  return {
    type: PUSH_PAGE,
    pageId,
    page,
  };
}

export const fetchPage = (pageId, updateIfExist = true) => async (dispatch, getState, socket) => {
  const currentItems = getState().pages;

  if (updateIfExist === false && currentItems[pageId] !== undefined) {
    return currentItems[pageId];
  } else {
    try {
      const result = await socket.getPage(pageId);
      dispatch(pushPage(pageId, result));
      return result;
    } catch (err) {
      console.log('error in pages.action.js:fetchPage', err);
    }
  }
};

