import * as actionTypes from '../actions/products.actions';

function setProducts(state, action) {
  console.log('setProducts:reducer', action.products);
  return [...action.products];
}

export default (state = [] , action) => {
  switch(action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    default:
      return state;
  }
};
