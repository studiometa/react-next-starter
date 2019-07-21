import { ServerStyleSheets }                from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React                                from 'react';
import config                               from '../../config';
import { i18n }                             from '../../server/lib/i18n';
import MUITheme                             from '../MUITheme';



class MyDocument extends Document {
  render() {
    const lang = this.props.lang || config.lang.default;

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
        <meta name="theme-color" content={MUITheme.palette.primary.main}/>
        <script src="/static/js/polyfills/js-object.js"/>
        <noscript>
          <style type="text/css">
            {` .hidden-no-script {display:none;} `}
          </style>
        </noscript>
      </Head>
      <body>
      <Main/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
      <NextScript/>
      </body>
      </html>
    );
  }
}



MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets             = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    lang: !ctx.req ? i18n.language : ctx.req.language,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};


export default MyDocument;