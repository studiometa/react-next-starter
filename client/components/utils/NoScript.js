import React          from 'react';
import ReactDOMServer from 'react-dom/server';

// This is a simple wrapper that will display its children into a <noscript> tag
// and never render again. This is useful for SRR when you want to display a fallback
// content in case JavaScript has been disabled on the client side

class NoScript extends React.Component {
  shouldComponentUpdate() {
    return false;
  }


  render() {
    return (
      <noscript dangerouslySetInnerHTML={{ __html: ReactDOMServer.renderToStaticMarkup(this.props.children) }}/>
    );
  }
}



export default NoScript;