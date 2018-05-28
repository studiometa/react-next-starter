import React       from 'react';
import config      from '../../config';
import { connect } from 'react-redux';

export default connect(state => ({
  lang: state.app ? state.app.lang : undefined,
  routes: state.app ? state.app.routes : undefined,
}))(({ lang, asPath, push, routes }) => {

  let links = [];

  // Check that push is a function
  if (typeof push !== 'function') {
    return null;
  }

  //if (typeof routes === 'object' && routes.current && routes.current)

  // Build a link for all available languages (defined in the config)
  config.lang.available.forEach((e, i) => {
    const _lang = e.lang;
    if (typeof lang === 'string' && typeof asPath === 'string') {
      if (_lang !== lang && asPath.substr(0, 3) === `/${lang}`) {
        links.push(<a href={ `/${_lang}` } key={i}>{_lang}</a>)
      }
    }
  });

  return links.length > 0 && config.lang.enableRouteTranslation === true ? (
    <div className="lang-switch">
      {
        links.map((link) => (
          link
        ))
      }
    </div>
  ) : null;
});