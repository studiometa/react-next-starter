import CssBaseline       from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes         from 'prop-types';
import React             from 'react';
import getPageContext    from './getPageMUIContext';


function withRoot(Component, withTheme = false) {
  class WithRoot extends React.Component {
    constructor(props) {
      super(props);

      this.pageContext = this.props.pageContext || getPageContext();
    }


    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }


    pageContext = null;


    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <ThemeProvider
          theme={this.pageContext.theme}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline/>
          <Component {...this.props} theme={withTheme ? this.pageContext.theme : undefined}/>
        </ThemeProvider>
      );
    }
  }



  WithRoot.propTypes = {
    pageContext: PropTypes.object,
  };

  WithRoot.getInitialProps = ctx => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
