import Avatar             from '@material-ui/core/Avatar';
import MenuItem           from '@material-ui/core/MenuItem';
import Select             from '@material-ui/core/Select';
import Router             from 'next/router';
import React              from 'react';
import { connect }        from 'react-redux';
import config             from '../../../config/index';
import removeUrlLastSlash from '../../../helpers/removeUrlLastSlash';


const getRouteFromPathname = (path, currentLang, destLang, query, routes) => {

  // just in case
  path = decodeURI(path);

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
  currentUrl: state.app ? state.app.currentUrl : undefined,
}))(({ lang, routes, currentUrl, classes = {} }) => {

  // Works only on the client side while we are using the Next Router instance
  if (!process.browser) return null;

  let { query, asPath, push } = Router;

  let links = [];

  // Check that push is a function
  if (typeof push !== 'function' || !routes || !lang || ! currentUrl) {
    return null;
  }

  const search = currentUrl && currentUrl.includes('?') ? '?' + currentUrl.split('?')[1] : '';

  // Build a link for all available languages (defined in the config)
  config.lang.available.forEach(e => {
    const _lang = e.lang;
    if (typeof lang === 'string' && typeof asPath === 'string') {
      if (asPath.includes('?')) asPath = asPath.split('?')[0];
      const resolvedPathname = getRouteFromPathname(asPath, lang, _lang, query, routes);
      if (resolvedPathname !== undefined) {
        links.push({
          path: resolvedPathname + search,
          name: _lang,
          display: e.name,
          locale: e.locale,
        });
      }
    }
  });

  const onChange = ({ target }) => {
    const link = links.find(l => l.name === target.value);

    if (link) push(link.path);
  };

  return links.length > 0 && (
    <Select value={lang} onChange={onChange} className={classes.select}>
      {
        links.map(link =>
          <MenuItem value={link.name} key={link.name} className={classes.menuItem}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={`/static/imgs/flags/${link.locale}.png`}
                alt={link.display}
                className={classes.icon}
                style={{ width: '16px', height: '16px', marginRight: '8px' }}
              />
              <span className={classes.text}>{link.display}</span>
            </div>
          </MenuItem>,
        )
      }
    </Select>
  );

});