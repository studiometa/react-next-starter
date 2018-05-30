import React         from 'react';
import { fetchPage } from '../../store/actions/pages.actions';


// This is a Higher Order Component that can be used with all the app pages.
// Its goal is simply to make a request to the API when the Component getInitialProps is called
// an retrieve specific data for the page. This data will be accessible under the page prop 'pageData'


export default (pageName = '', opts = {}) => ComposedComponent => {


  const Extended = (props) => React.createElement(ComposedComponent, props);

  Extended.getInitialProps = async (props = {}) => {
    let pageData = await props.store.dispatch(fetchPage(pageName, false));

    // Run page getInitialProps with store and isServer
    const initialProps = ComposedComponent.getInitialProps
      ? await ComposedComponent.getInitialProps(Object.assign({}, props, { pageData }))
      : {};

    return Object.assign({}, initialProps, { pageData });
  };

  return Extended;
};
