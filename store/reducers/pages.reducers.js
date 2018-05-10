import * as actionTypes from '../actions/pages.actions';

/**
 * Add a page to the store
 * @param {object} state
 * @param {object} action
 * @param {string} action.pageId the key of the new page
 * @param {object} action.page the page that must be added
 */
function pushPage(state, action) {
  return Object.assign({}, state, {
    [action.pageId]: action.page
  });
}

export default (state = {}, action) => {
  switch(action.type) {
    case actionTypes.PUSH_PAGE:
      return pushPage(state, action);
    default:
      return state;
  }
};
