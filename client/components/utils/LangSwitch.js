import Avatar         from '@material-ui/core/Avatar';
import MenuItem       from '@material-ui/core/MenuItem';
import Select         from '@material-ui/core/Select';
import { withRouter } from 'next/router';
import React          from 'react';
import { connect }    from 'react-redux';
import urlJoin        from 'url-join';
import config         from '../../../config/index';


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

  if (!process.browser || config.lang.enableRouteTranslation !== true) return null;

  let { route, push } = router;

  let links = [];

  // Check that push is a function
  if (typeof push !== 'function' || !routes || !lang) {
    return null;
  }


  const search = location.search || '';

  // Build a link for all available languages (defined in the config)
  if (routes[route] && routes[route].langRoutes) {
    config.lang.available.forEach(e => {
      const routeConfig = routes[route];
      if (routeConfig.langRoutes[e.lang]) {
        links.push({
          path: urlJoin('/', e.lang, routeConfig.langRoutes[e.lang], search),
          name: e.lang,
          display: e.name,
          locale: e.locale,
        });
      } else {
        links.push({
          path: urlJoin('/', e.lang, route, search),
          name: e.lang,
          display: e.name,
          locale: e.locale,
        });
      }
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

})));