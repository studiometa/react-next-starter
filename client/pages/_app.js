import App, { Container }    from 'next/app';
import React                 from 'react';
import Router                from 'next/router';
import { Provider }          from 'react-redux';
import withRedux             from 'next-redux-wrapper';
import createStore           from '../../store/createStore';
import { updateAppLanguage } from '../../store/actions/app.actions';
import config                from '../../config';

import '../styles/app.scss';


export default withRedux(createStore)(class MyApp extends App {
  constructor() {
    super();
    this.state = { isLoading: false };
  }


  static async getInitialProps({ Component, ctx }) {
    const props = {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      }
    };

    // If a language is define, store it as a prop so that we can use it
    // in componentWillMount to save a current language in the redux store
    if (ctx.isServer === true) {
      props.lang = ctx.req.language;
    }

    return props;
  }


  componentWillMount() {

    // Save the current language to the storex
    if (this.props.lang !== undefined) {
      this.props.store.dispatch(updateAppLanguage(this.props.lang));
    } else if (this.props.pageProps.initialLanguage !== undefined) {
      this.props.store.dispatch(updateAppLanguage(this.props.pageProps.initialLanguage));
    } else {
      this.props.store.dispatch(updateAppLanguage(config.lang.default));
    }
  }


  componentDidMount() {
    Router.onRouteChangeStart    = url => {
      this.setState({ isLoading: true });
    };
    Router.onRouteChangeComplete = url => {
      this.setState({ isLoading: false });
    };
  }


  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <div className="app">
          <h1>APP</h1>
          {
            this.state.isLoading === true &&
            <span style={{ position: 'absolute', top: 0 }}>Loading...</span>
          }
          <Provider store={store}>
            <Component {...pageProps}  />
          </Provider>
        </div>
      </Container>
    );
  }
});