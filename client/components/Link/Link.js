import React     from 'react';
import NextLink  from 'next/link';
import getRoutes from '../../../server/routes';
import propTypes from 'prop-types';
import urljoin   from 'url-join';


const routes = getRoutes();


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
  const {
          to,
          children,
          query,
          className,
        } = props;

  // Find a matching route in the route.js config file
  const matchingRoute = routes[to];
  let href            = to;
  let urlAs           = to;

  // Check if a matching route has been found
  // if not, only show an error log on dev env
  if (typeof matchingRoute !== 'object') {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Link.js: Nno matching route has been find for '${ to }'`);
    }

    // If a query is defined and the matching route has a queryParams parameter
    // add the query to the final link path (href and as parameters)
  } else if (query !== undefined && Array.isArray(matchingRoute.queryParams)) {
    href  = urljoin(`${ href.split(':')[0] }`, `?${ matchingRoute.queryParams[0] }=${ query }`);
    urlAs = urljoin(`${ urlAs.split(':')[0] }`, `/${ query }`);
  }

  console.log(href, urlAs);

  return (
    <NextLink href={href} as={urlAs}>
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

export default Link;