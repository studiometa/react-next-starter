// import axios from 'axios';
//
//
// ​
// export const REQUEST_PRODUCTS = 'REQUEST_POSTS';
//
// export function requestProducts() {
//   return {
//     type: REQUEST_PRODUCTS
//   };
// }
// ​
// export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
//
// export function updateProducts(products) {
//   return {
//     type: UPDATE_PRODUCTS,
//     posts: products,
//   };
// }
//
// ​
// // Meet our first thunk action creator!
// // Though its insides are different, you would use it just like any other action creator:
// // store.dispatch(fetchPosts('reactjs'))
// ​
// export function fetchProducts() {
//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.
// ​
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.
//   ​
//     dispatch(requestPosts(subreddit));
// ​
//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.
//   ​
//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.
//   ​
//     return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//       .then(
//         response => response.json(),
//         // Do not use catch, because that will also catch
//         // any errors in the dispatch and resulting render,
//         // causing a loop of 'Unexpected batch number' errors.
//         // https://github.com/facebook/react/issues/6895
//         error => console.log('An error occurred.', error),
//       )
//       .then(json =>
//     // We can dispatch many times!
//     // Here, we update the app state with the results of the API call.
//   ​
//         dispatch(receivePosts(subreddit, json));
//   )
//   };
// }

export function fetchProducts() {
  return {
    type: 'FETCH_PRODUCTS',
    payload: new Promise((res) => {
      setTimeout(() => {
        res('foo');
      }, 1000)
    })
  }
}