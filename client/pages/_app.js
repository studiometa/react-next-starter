import App, { Container }    from 'next/app';
import React                 from 'react';
import Router                from 'next/router';
import { Provider }          from 'react-redux';
import withRedux             from 'next-redux-wrapper';
import createStore           from '../../store/createStore';
import { updateAppLanguage } from '../../store/actions/app.actions';
import config                from '../../config';
import LangSwitch            from '../components/LangSwitch';
import Link                  from '../components/Link';
import NProgress             from 'nprogress';


import '../styles/styles.scss';

export default withRedux(createStore)(class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    const props = {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };

    if (ctx.isServer === true) {

      // If a language is defined, store it as a prop so that we can use it
      // in componentWillMount to save a current language in the redux store

      props.lang = ctx.req.language;
    }

    props.query = ctx.query || ctx.req.params;

    return props;
  }


  componentDidMount() {

    // Save the current language to the store

    if (this.props.lang !== undefined) {
      this.props.store.dispatch(updateAppLanguage(this.props.lang));
    } else if (this.props.pageProps.initialLanguage !== undefined) {
      this.props.store.dispatch(updateAppLanguage(this.props.pageProps.initialLanguage));
    } else {
      this.props.store.dispatch(updateAppLanguage(config.lang.default));
    }

    Router.onRouteChangeStart    = url => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = url => {
      NProgress.done();
    };
    Router.onRouteChangeError    = () => NProgress.done();
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <div className="app">
            <Link to="/">
              <h1>APP</h1>
            </Link>
            <LangSwitch
              asPath={this.props.router.asPath}
              push={Router.push}
              query={this.props.query}
            />
            <Component {...pageProps}  />
          </div>
        </Provider>
      </Container>
    );
  }
});