import App, { Container } from 'next/app';
import React              from 'react';
import Router             from 'next/router';


/**
 * NOT WORKING BEFORE NEXTJS 6.0.0
 */

export default class MyApp extends App {
  constructor() {
    super();
    this.state = { isLoading: false };
  }


  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <div>
          <h1>APP</h1>
          {
            this.state.isLoading === true &&
            <span style={ { position: 'absolute', top: 0 } }>Loading...</span>
          }
        </div>
        <Component {...pageProps} />
      </Container>
    );
  }
}