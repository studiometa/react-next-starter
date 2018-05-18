import App, { Container } from 'next/app';
import React              from 'react';
import Router             from 'next/router';
import { Provider }       from 'react-redux';
import withRedux          from 'next-redux-wrapper';
import createStore        from '../../store/createStore';
import style              from '../styles/app.scss';




export default withRedux(createStore, {debug: true})(class MyApp extends App {
  constructor() {
    super();
    this.state = { isLoading: false };
  }


  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      }
    };
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