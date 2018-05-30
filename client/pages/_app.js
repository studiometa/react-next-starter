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
import '../styles/app.scss';

// If we are on a development env and fake-api is enabled, we may have to inject the api store
// somewhere so that making changes to this file can trigger the webpack HMR event.

if (process.env.NODE_ENV === 'development' && config.server.enableFakeAPI === true) {
  const fakeAPIStore = require('../../server/fakeAPI/fakeAPI.store');
}

export default withRedux(createStore)(class _App extends App {
  constructor() {
    super();
    this.state = { isLoading: false };
  }


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
            {
              this.state.isLoading === true &&
              <span style={{ position: 'absolute', top: 0 }}>Loading...</span>
            }

            <Component {...pageProps}  />
          </div>
        </Provider>
      </Container>
    );
  }
});