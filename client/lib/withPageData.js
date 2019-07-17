import React         from 'react';
import { fetchPage } from '../../store/actions/pages.actions';


function getErrorStatus(error = {}) {
  let statusCode = undefined;
  for (let _code of ['status', 'code', 'statusCode', 'status', 'code', 'statusCode']) {
    if (!!error[_code]) {
      statusCode = error[_code];
      break;
    }
  }
  return statusCode
}

const lazyGetPageData = (pageName, dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchPage(pageName, false, (res, err) => {
    if (res && !err) return resolve(res);
    else {
      reject(err);
    }
  }));
});

// This is a HOC that can be used with all the app pages.
// Its goal is simply to make a request to the API when the Component getInitialProps is called
// an retrieve specific data for the page. these data will be accessible under the page prop 'pageData'


export default (pageName = '', opts = {}) => ComposedComponent => {


  const required = Boolean(opts.required);

  const Extended = (props) => React.createElement(ComposedComponent, props);

  Extended.getInitialProps = async (props = {}) => {

    // Resolve page data
    let pageData = {};

    const currentStore = props.store.getState();
    if (currentStore && currentStore.pages && currentStore.pages[pageName]) {
      pageData = currentStore.pages[pageName];
    } else if (required) {
      try {
        pageData = await lazyGetPageData(pageName, props.store.dispatch);
      } catch (err) {
        pageData = { error: getErrorStatus(err) || 404 }; // Store the status of the error somewhere
      }
    }

    // Run page getInitialProps with store and isServer
    const initialProps = ComposedComponent.getInitialProps
      ? await ComposedComponent.getInitialProps(Object.assign({}, props, { pageData }))
      : {};

    return Object.assign({}, initialProps, { pageData, pageName });
  };

  return Extended;
};
