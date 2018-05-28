import React              from 'react';
import config             from '../../config';
import { connect }        from 'react-redux';
import removeUrlLastSlash from '../../helpers/removeUrlLastSlash';


const getRouteFromPathname = (path, currentLang, destLang, query, routes) => {

  // Remove lang segment from the url
  if (path.slice(0, 3) === `/${currentLang}`) {
    path = path.slice(3);
  }

  // Take care of having at least a single slash for path
  if (path.length === 0) {
    path = '/';
  }

  // If the url contains parameters, we must loop over them and compute the
  // path in order to make it looks like it's original route (ie. /products/1 may become /products/:id)
  if (typeof query === 'object' && Object.keys(query).length > 0) {
    Object.entries(query).forEach(([queryName, queryValue]) => {
      if (path.includes(`/${queryValue}`)) {
        path = path.replace(`/${queryValue}`, `/:${queryName}`);
      }
    });
  }

  // Check that a page can be retrieved from the current lang
  if (typeof routes[currentLang] === 'object'
    && typeof routes[currentLang][path] === 'object'
    && routes[currentLang][path].page !== undefined) {

    // Try to find a page for the requested language that matches the current language
    // page
    if (typeof routes[destLang] === 'object') {
      const target = Object.entries(routes[destLang]).find(([targetPath, targetRoute]) => {
        return targetRoute.page === routes[currentLang][path].page;
      });

      // If a page has been found, build a valid target url and add parameters to it if needed
      if (Array.isArray(target)) {
        let targetPath = `/${target[1].lang}${target[0]}`;

        if (target[1].queryParams && typeof query === 'object') {
          target[1].queryParams.forEach(param => {
            targetPath = targetPath.replace(`:${param}`, query[param]);
          });
        }
        return removeUrlLastSlash(targetPath);
      }
    }
  }

};

export default connect(state => ({
  lang: state.app ? state.app.lang : undefined,
  routes: state.app ? state.app.routes : undefined,
}))(({ lang, asPath, push, routes, query }) => {

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
        const resolvedPathname = getRouteFromPathname(asPath, lang, _lang, query, routes);
        if (resolvedPathname !== undefined) {
          links.push({
            path: resolvedPathname,
            name: _lang,
          });
        }
      }
    }
  });

  return links.length > 0 && config.lang.enableRouteTranslation === true ? (
    <div className="lang-switch">
      {
        links.map((link, key) => (
          <a href={link.path} name={link.name} key={key}>{link.name}</a>
        ))
      }
    </div>
  ) : null;
});