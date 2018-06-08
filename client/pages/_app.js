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

import Button            from '@material-ui/core/Button';
import Dialog            from '@material-ui/core/Dialog';
import DialogTitle       from '@material-ui/core/DialogTitle';
import DialogContent     from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions     from '@material-ui/core/DialogActions';
import Typography        from '@material-ui/core/Typography';

import '../styles/styles.scss';

// If we are on a development env and fake-api is enabled, we may have to inject the api store
// somewhere so that making changes to this file can trigger the webpack HMR event.

if (process.env.NODE_ENV === 'development' && config.server.enableFakeAPI === true) {
  const fakeAPIStore = require('../../server/fakeAPI/fakeAPI.store');
}


export default withRedux(createStore)(class _App extends App {
  state = {
    open: false,
  };


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


  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };


  render() {
    const { Component, pageProps, store } = this.props;
    const { open } = this.state;

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
            <Dialog open={open} onClose={this.handleClose}>
              <DialogTitle>Super Secret Password</DialogTitle>
              <DialogContent>
                <DialogContentText>1-2-3-4-5</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.handleClose}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="display1" gutterBottom>
              Material-UI
            </Typography>
            <Typography variant="subheading" gutterBottom>
              example project
            </Typography>
            <Button variant="contained" color="secondary" onClick={this.handleClick}>
              Super Secret Password
            </Button>
            <Component {...pageProps}  />
          </div>
        </Provider>
      </Container>
    );
  }
});