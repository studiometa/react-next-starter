import Avatar                       from '@material-ui/core/Avatar';
import MenuItem                     from '@material-ui/core/MenuItem';
import Select                       from '@material-ui/core/Select';
import classNames                   from 'classnames';
import { withRouter }               from 'next/router';
import qs                           from 'qs';
import React                        from 'react';
import { connect }                  from 'react-redux';
import urlJoin                      from 'url-join';
import config                       from '../../../config/index';
import resolvePathnameFromRouteName from '../../../helpers/resolvePathnameFromRouteName';
import NoScript                     from './NoScript';


const resolveLinksWithLangSegment = (routes, route, search) => {
  const links = [];
  if (routes[route] && routes[route].langRoutes) {
    config.lang.available.forEach(e => {
      const pathname = resolvePathnameFromRouteName(route, e.lang);
      links.push({
        path: urlJoin('/', pathname, search),
        name: e.lang,
        display: e.name,
        locale: e.locale,
      });
    });
  } else {
    config.lang.available.forEach(e => {
      links.push({
        path: urlJoin('/', e.lang),
        name: e.lang,
        display: e.name,
        locale: e.locale,
      });
    });
  }
  return links;
};


const resolveLinks = (routes, route, search = '') => {
  const links = [];

  if (routes[route]) {
    const pathname = resolvePathnameFromRouteName(route);
    config.lang.available.forEach(e => {
      const parsedSearch = qs.parse(search.slice(1));
      parsedSearch.lang  = e.lang;
      links.push({
        path: urlJoin('/', pathname, `?${qs.stringify(parsedSearch)}`),
        name: e.lang,
        display: e.name,
        locale: e.locale,
      });
    });
  }
  return links;
};

/**
 * This component displays a button to switch the current language
 * It can resolve a given url to any other language at the condition that
 * this url is not dynamic.
 *
 * Nb: this component can only be used on the client side while it requires
 * the NextJs instance. You may also need to wrap it with the react-no-ssr component.
 */
export default React.memo(connect(state => ({
  lang: state.app ? state.app.lang : undefined,
  routes: state.app ? state.app.routes : undefined,
}))(withRouter(({ lang, routes, classes = {}, router }) => {

  if (config.lang.enabled !== true) return null;

  let { route } = router;

  let links = [];

  // Check that push is a function
  if (!routes || !lang) {
    return null;
  }

  const search = process.browser ? location.search : '';

  // Build a link for all available languages (defined in the config)
  if (config.lang.enableRouteTranslation === true) {
    links = resolveLinksWithLangSegment(routes, route, search);
  } else {
    links = resolveLinks(routes, route, search);
  }

  const onChange = ({ target }) => {
    const link = links.find(l => l.name === target.value);
    if (link) location.href = urlJoin(location.origin, link.path);
  };

  return links.length > 0 && (
    <React.Fragment>
      <Select value={lang} onChange={onChange} className={classNames(classes.select, 'hidden-no-script')}>
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
      <NoScript>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            links.map(link =>
              <a
                className={classes.text}
                style={{ marginRight: 8, color: '#fff' }}
                href={link.path}
                key={link.name}>
                {link.name}
              </a>,
            )
          }
        </div>
      </NoScript>
    </React.Fragment>
  );
})));