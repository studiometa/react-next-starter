import * as actionTypes from '../actions/products.actions';


/**
 * Add a product to the store
 * @param {object} state
 * @param {object} action
 * @param {string} action.productId the key of the new product
 * @param {object} action.product the product that must be added
 */
function addProduct(state, action) {
  return Object.assign({}, state, {
    [action.productId]: action.product
  });
}

export default (state = [] , action) => {
  switch(action.type) {
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    default:
      return state;
  }
};
