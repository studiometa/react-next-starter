export const SET_PRODUCTS = 'SET_PRODUCTS';

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products,
  };
}


// TODO Wrap this in a HOC function (or similar) to make it more easy to declare such recurrent actions
export const fetchProducts = (updateIfExist = true) => (dispatch, getState) => (
  new Promise(resolve => {
    const currentItems = getState().products;
    if (updateIfExist === false && Array.isArray(currentItems) && currentItems.length > 0) {
      resolve(currentItems);
    } else {
      setTimeout(() => {
        dispatch(setProducts(['foo', 'bar']));
        resolve(['foo', 'bar']);
      }, 1000);
    }
  })
);

