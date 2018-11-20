import React         from 'react';
import { fetchPage } from '../../store/actions/pages.actions';
import config from '../../config'

const lazyGetPageData = (pageName, dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchPage(pageName, (res, err) => {
    if (res && !err) return resolve(res);
    else {
      reject(err);
    }
  }));
});

// This is a Higher Order Component that can be used with all the app pages.
// Its goal is simply to make a request to the API when the Component getInitialProps is called
// an retrieve specific data for the page. This data will be accessible under the page prop 'pageData'


export default (pageName = '', opts = {}) => ComposedComponent => {


  const isRequired = Boolean(opts.required);

  const Extended = (props) => React.createElement(ComposedComponent, props);

  Extended.getInitialProps = async (props = {}) => {

    // Resolve page data
    let pageData = {};

    const currentStore = props.store.getState();

    if (currentStore && currentStore.pages && currentStore.pages[pageName]) {
      pageData = currentStore.pages[pageName];
    } else if (config.general.fetchPagesData === true && isRequired) {
      try {
        pageData = await lazyGetPageData(pageName, props.store.dispatch);
      } catch (err) {
        const data   = err.data || {};
        const status = err.status || err.code || err.statusCode || data.status || data.code || data.statusCode || 500;
        pageData     = { error: status }; // Store the status of the error somewhere
      }
    } else {
      pageData = {};
    }


    // Run page getInitialProps with store and isServer
    const initialProps = ComposedComponent.getInitialProps
      ? await ComposedComponent.getInitialProps(Object.assign({}, props, { pageData }))
      : {};

    return Object.assign({}, initialProps, { pageData });
  };

  return Extended;
};
