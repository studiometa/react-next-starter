import React       from 'react';
import NextLink    from 'next/link';
import getRoutes   from '../../../server/routes';
import propTypes   from 'prop-types';
import urljoin     from 'url-join';
import { connect } from 'react-redux';
import config      from '../../../config';


const routes = getRoutes();
const { enableRouteTranslation } = config.lang;

const getMatchingRoute = (path, lang) => {
  if (enableRouteTranslation === true && lang) {
    if (typeof routes[lang] === 'object') {
      const defaultMatchingRoute = routes[config.lang.default][path]

      if (defaultMatchingRoute !== undefined) {
        if (defaultMatchingRoute.lang === lang) {
          return defaultMatchingRoute
        } else {
          const realMatchingRoute = routes[lang]
        }
      }
    }
    return routes.all[path];
  }
};

/**
 * This component is a handler to make it more easy to build
 * links that works with NextJs.
 *
 * Here we can simply build a link like this:
 * <Link to="/products/:id" query="my-product">My product</Link>
 *
 * The to parameter defines the href of the route
 *
 * If a query parameter is set, the component will look for the matching
 * route in the server/routes/routes.js file. If a matching route is found and
 * that route has a queryParams parameter, the first element of this array will
 * be taken and set has url query key.
 * For example, if the queryParams value of matching route of the Link defined before
 * is ['id'], the href generated would be "/product?id=my-product"
 *
 * This way we do not have to cary about the query key but only about its value. This
 * makes it more easy for us to build links that follow the same pattern.
 * @param props
 * @returns {*}
 * @constructor
 */
const Link = (props) => {
  let {
        to,
        children,
        query,
        className,
        lang,
        dispatch,
        ...rest
      } = props;

  // If lang is not defined (it must never be, but who knows?), fallback to default language.
  // This is important because we must NEVER have urls without language prefix if the
  // url translation is enabled. This may cause duplicated content pages and have bad effects
  // on your SEO...

  lang = typeof lang === 'string' ? lang : config.lang.default;

  // Find a matching route in the route.js config file
  const matchingRoute = getMatchingRoute(to, lang);
  let href            = to;
  let urlAs           = to;

  // Check if a matching route has been found
  // if not, only show an error log on dev env
  if (typeof matchingRoute !== 'object') {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Link.js: No matching route has been found for '${ to }'`);
    }

    // If a query is defined and the matching route has a queryParams parameter
    // add the query to the final link path (href and as parameters)
  } else if (query !== undefined && Array.isArray(matchingRoute.queryParams)) {
    href  = urljoin(`${ href.split(':')[0] }`, `?${ matchingRoute.queryParams[0] }=${ query }`);
    urlAs = urljoin(`${ urlAs.split(':')[0] }`, `/${ query }`);
  }

  if (lang && enableRouteTranslation === true) {
    href = urljoin('/' + lang + '/', href);
    urlAs = urljoin('/' + lang + '/', urlAs);
  }

  return (
    <NextLink href={href} as={urlAs} {...rest}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};

Link.propTypes = {
  children: propTypes.any.isRequired,
  to: propTypes.string.isRequired,
  query: propTypes.any,
  className: propTypes.string,
};

const mapStateToProps = (state) => {
  return {
    lang: state.app ? state.app.lang : undefined,
  };
};

export default connect(mapStateToProps)(Link);