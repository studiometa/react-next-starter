export const ADD_PRODUCT = 'ADD_PRODUCT';

export function addProduct(productId, product) {
  return {
    type: ADD_PRODUCT,
    productId,
    product,
  };
}


export const fetchProduct = (productId, updateIfExist = true) => async (dispatch, getState, socket) => {
  const currentItems = getState().products;
  if (updateIfExist === false && currentItems[productId] !== undefined) {
    return currentItems[productId];
  } else {
    try {
      const result = await socket.getProduct(productId);
      dispatch(addProduct(productId, result));
      return result;
    } catch (err) {
      console.log('error in products.action.js:fetchProduct', err);
    }
  }
};