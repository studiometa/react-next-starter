import CssBaseline                             from '@material-ui/core/CssBaseline';
import Hidden                                  from '@material-ui/core/Hidden';
import { MuiThemeProvider }                    from '@material-ui/core/styles';
import withRedux                               from 'next-redux-wrapper';
import App, { Container }                      from 'next/app';
import NProgress                               from 'nprogress';
import React                                   from 'react';
import JssProvider                             from 'react-jss/lib/JssProvider';
import { Provider }                            from 'react-redux';
import config                                  from '../../config';
import envBoolean                              from '../../helpers/envBoolean';
import langDetector                            from '../../server/lib/customI18nextLangDetector';
import { fetchAppSettings, updateAppLanguage } from '../../store/actions/app.actions';
import createStore                             from '../../store/createStore';
import getPageContext                          from '../lib/getPageMUIContext';

import '../styles/styles.scss';


export default withRedux(createStore)(class _App extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }


  static async getInitialProps({ Component, ctx }) {
    const props = {};

    if (ctx.isServer === true) {
      props.lang = ctx.req.language;
    } else {
      props.lang = langDetector.find();
    }

    ctx.store.dispatch(updateAppLanguage(props.lang));

    props.pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, lang: props.lang }) : {}),
    };

    // Store the app settings
    if (config.api.fetchAppSettings === true && ctx.store.getState().app.syncSettings !== true) {
      await ctx.store.dispatch(fetchAppSettings());
    }

    props.query = ctx.query || ctx.req.params;


    return props;
  }


  /**
   * componentDidMount
   */
  async componentDidMount() {

    // Init the service-worker
    this._initServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    /** On router change start **/

    this.props.router.events.on('routeChangeStart', url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change START : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }
      NProgress.start();
    });

    /** On router change complete **/

    this.props.router.events.on('routeChangeComplete', async url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change COMPLETE : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }

      NProgress.done();
    });

    /** On router change error **/

    this.props.router.events.on('routeChangeError', () => NProgress.done());

  }


  /**
   * Init the service worker
   * @private
   */
  _initServiceWorker() {
    if (process.browser && 'serviceWorker' in navigator) {
      if (envBoolean(process.env.ENABLE_SERVICE_WORKER)) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => {
            console.log('> service worker registration successful');
          })
          .catch(err => {
            console.warn('> service worker registration failed', err.message);
          });
      } else {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister()
              .then(() => {
                console.log('> service worker successfully unregistered');
              })
              .catch(err => {
                console.warn('> service worker unregistration failed', err.message);
              });

          }
        });
      }
    }
  }


  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext ? this.pageContext.sheetsRegistry : {}}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
             tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline/>
              <div className="app">
                <Component {...pageProps} pageContext={this.pageContext}/>


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
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
});