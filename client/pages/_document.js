import Document, { Head, Main, NextScript } from 'next/document';
// ./pages/_document.js
import React                                from 'react';
import JssProvider                          from 'react-jss/lib/JssProvider';
import flush                                from 'styled-jsx/server';
import customI18nextLangDetector            from '../../server/lib/customI18nextLangDetector';
import getPageContext                       from '../lib/getPageMUIContext';



class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;
    const lang            = customI18nextLangDetector.path.lookup() || 'fr';
    return (
      <html lang={lang}>
      <Head>
        <meta name="format-detection" content="telephone=no"/>
        <meta
          name="viewport"
          content={
            'user-scalable=0, initial-scale=1, ' +
            'minimum-scale=1, width=device-width, height=device-height'
          }
        />
        {/* PWA primary color */}
        <meta name="theme-color" content={pageContext.theme.palette.primary.main}/>
        <script src="/static/js/polyfills/js-object.js"/>
      </Head>
      <body>
      <Main/>
      <link rel="stylesheet" href="/static/fonts/BwSurco-Bold-export/BwSurco-Bold.css"/>
      <link rel="stylesheet" href="/static/fonts/BwSurco-Light-export/BwSurco-Light.css"/>
      <link rel="stylesheet" href="/static/fonts/BwSurco-Medium-export/BwSurco-Medium.css"/>
      <link rel="stylesheet" href="/static/fonts/BwSurco-Regular-export/BwSurco-Regular.css"/>
      <NextScript/>
      </body>
      </html>
    );
  }
}



MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page        = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;