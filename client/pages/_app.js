import Hidden                                                       from '@material-ui/core/Hidden';
import withRedux                                                    from 'next-redux-wrapper';
import App, { Container }                                           from 'next/app';
import NProgress                                                    from 'nprogress';
import React                                                        from 'react';
import { Provider }                                                 from 'react-redux';
import config                                                       from '../../config';
import langDetector                                                 from '../../server/lib/customI18nextLangDetector';
import { fetchAppSettings, updateAppCurrentUrl, updateAppLanguage } from '../../store/actions/app.actions';
import createStore                                                  from '../../store/createStore';
import '../styles/styles.scss';


export default withRedux(createStore)(class _App extends App {

  /**
   * Get App and sub-pages initial props
   * @param Component
   * @param ctx
   * @returns {Promise<{pageProps: {}}>}
   */
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

    } else {
      props.lang = langDetector.find();
    }

    // Store the app settings
    if (config.general.fetchAppSettings === true && ctx.store.getState().app.syncSettings !== true) {
      await ctx.store.dispatch(fetchAppSettings());
    }

    props.query = ctx.query || ctx.req.params;

    return props;
  }


  /**
   * componentDidMount
   */
  async componentDidMount() {

    // Save the current language to the store
    this.props.store.dispatch(updateAppLanguage(this.props.lang));

    // Store the current url
    this.props.store.dispatch(updateAppCurrentUrl(this.props.router.asPath));


    /** On router change start **/

    this.props.router.onRouteChangeStart = url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change START : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }
      NProgress.start();
    };

    /** On router change complete **/

    this.props.router.onRouteChangeComplete = async url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change COMPLETE : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }

      // Store the current url
      this.props.store.dispatch(updateAppCurrentUrl(url));

      NProgress.done();
    };

    /** On router change error **/

    this.props.router.onRouteChangeError = () => NProgress.done();

  }


  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>

          <div className="app">
            <Component {...pageProps} />


            { // This is a dev component that displays the current screen size label at the bottom right corner
              // of the screen
              process.env.NODE_ENV === 'development' &&
              <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                background: 'green',
                color: 'white',
                padding: 5,
                fontSize: 16,
                zIndex: 4000,
              }}>
                <Hidden smUp>xs</Hidden>
                <Hidden xsDown mdUp>sm</Hidden>
                <Hidden lgUp smDown>md</Hidden>
                <Hidden xlUp mdDown>lg</Hidden>
                <Hidden lgDown>xl</Hidden>
              </div>
            }

          </div>
        </Provider>
      </Container>
    );
  }
});