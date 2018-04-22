import App, { Container } from 'next/app';
import React              from 'react';


/**
 * NOT WORKING BEFORE NEXTJS 6.0.0
 */

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <h1>APP</h1>
        <Component {...pageProps} />
      </Container>
    );
  }
}