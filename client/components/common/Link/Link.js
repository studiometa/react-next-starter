import Typography           from '@material-ui/core/Typography';
import classNames           from 'classnames';
import NextLink             from 'next/link';
import Router               from 'next/router';
import propTypes            from 'prop-types';
import React                from 'react';
import config               from '../../../../config/index';
import getMatchingLangRoute from '../../../../helpers/getMatchingLangRoute';
import removeUrlLastSlash   from '../../../../helpers/removeUrlLastSlash';
import wrapper              from '../../../lib/componentWrapper';



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


class Link extends React.Component {
  static propTypes = {

    // The content of the link
    children: propTypes.any.isRequired,

    // The route path
    to: propTypes.string.isRequired,

    // The route query (replacing the :foo in the route path)
    query: propTypes.any,

    // A className applied to the link
    className: propTypes.string,

    // A style to be used when the link is active
    activeStyle: propTypes.object,

    // A className to be used when the link is active
    activeClassName: propTypes.string,

    // Do not use the Typography element in the link
    noTypo: propTypes.bool,

    // The name of the link (native)
    name: propTypes.string,

    // The target of the link (native)
    target: propTypes.string,

    // Define if the related page must be prefetched (only in prod)
    prefetch: propTypes.bool,

    // A query that can be passed to the link
    urlQuery: propTypes.string,

    // Style that can be applied to the link element (<a>)
    linkStyle: propTypes.object,

    // Class name that can be applied to the link element (<a>)
    linkClassName: propTypes.string,

    // Defines if the link is disabled
    disabled: propTypes.bool,

    // Contains custom jsx attributes that will be passed to the final link element
    // such as name, etc
    linkAttributes: propTypes.object,
  };

  static defaultProps = {
    variant: 'button',
    component: 'span',
    noTypo: false,
    target: '_self',
    prefetch: false,
    urlQuery: '',
    linkStyle: { display: 'flex' },
    disabled: false,
    linkAttributes: {},
  };


  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      page: null,
      pathname: null,
      isHidden: false,
      isExternal: false // Define if the provided route is an external link
    };

    let { to, query, lang, target } = this.props;
    let isHidden                    = false;

    if (!to) {
      this.state.isHidden = true;
      return;
    }

    // If the 'to' prop contains a dot, it cannot be a valid route
    // and is probably be an url instead. In this case, all we need to
    // do is to save the url into the 'pathname' state of the component
    // and display a native link instead of the Next Link component
    if (to.includes('.') || to.includes('://')) {
      this.state.isExternal = true;
      this.state.pathname   = to;
      return;
    }

    // If lang is not defined (it must never be, but who knows?), fallback to default language.
    // This is important because we must NEVER have urls without language prefix if the
    // url translation is enabled. This may cause duplicated content pages and have bad effects
    // on your SEO...

    lang = typeof lang === 'string' ? lang : config.lang.default;

    // Find a matching route in the route.js config file
    let { pathname, page, restrict } = getMatchingLangRoute(to, lang);

    // Check if a matching route has been found
    // if not, only show an error log on dev env
    if (typeof pathname !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Link.js: No matching route has been found for '${ to }'`);
      }

      // If a query is defined and the matching route has a queryParams parameter
      // add the query to the final link path (href and as parameters)
    }

    if (typeof query === 'object') {
      Object.entries(query).forEach(([queryName, queryValue]) => (
        queryValue && queryName ? pathname = pathname.replace(`:${queryName}`, queryValue) : null
      ));
    }

    // If the target is _blank, we must generate an absolute url from the
    // route pathname. This way we can open an internal page in a new tab/window.

    if (target === '_blank') {
      this.state.isExternal = true;
      this.state.page       = removeUrlLastSlash(page);
      this.state.pathname   = removeUrlLastSlash(config.server.getUrl(to));
      this.state.isHidden   = isHidden;
    } else {
      this.state.page     = removeUrlLastSlash(page);
      this.state.pathname = removeUrlLastSlash(pathname);
      this.state.isHidden = isHidden;
    }
  }


  componentDidMount() {
    if (process.browser && this._isActive() === true) {
      this.setState({ isActive: true });
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
      || nextProps.lang !== this.props.lang
      || nextProps.to !== this.props.to
      || nextProps.urlQuery !== this.props.urlQuery
      || nextProps.children !== this.props.children
      || nextProps.query !== this.props.query;
  }


  _isActive = () => {
    return (this.props.to !== '/' && Router.route.indexOf(this.props.to) === 0)
      || (Router.route === '/index' && this.props.to === '/');
  };


  render() {
    if (this.state.isHidden === true) return null;
    if (this.props.disabled === true) return this.props.children;

    let {
          className,
          style,
          activeStyle,
          activeClassName,
          linkStyle,
          linkClassName,
          linkAttributes,
          prefetch,
          variant,
          name,
          component,
          noTypo,
          target,
          children,
        } = this.props;

    style = this.state.isActive === true && activeClassName !== undefined
      ? Object.assign({}, style, activeStyle)
      : style;

    className = this.state.isActive === true && activeClassName !== undefined
      ? classNames(className, activeClassName)
      : className;


    // This is the native link component
    const NativeLinkComponent = (
      <a
        href={this.state.pathname}
        name={name || typeof children === 'string' ? children : ''}
        target={target}
        rel={target === '_blank' ? 'noopener' : ''}
        style={linkStyle}
        className={linkClassName}
        {...linkAttributes}
      >
        {
          noTypo === true
            ? this.props.children
            : <Typography className={`${ className }`} style={style} variant={variant} component={component}>
              {children}
            </Typography>
        }
      </a>
    );

    // Return a native external link if 'to' is not
    // a route but an url
    if (this.state.isExternal === true) {
      return NativeLinkComponent;
    } else {
      return (
        <React.Fragment>
          <NextLink href={{
            pathname: this.state.page,
            query: this.props.query,
          }} as={this.state.pathname + this.props.urlQuery} prefetch={prefetch}>
            {NativeLinkComponent}
          </NextLink>
        </React.Fragment>
      );
    }
  };
}



const mapStateToProps = (state) => {
  return {
    lang: state.app.lang,
  };
};

export default wrapper(Link, {
  mapStateToProps,
  isTranslatable: false,
  hasStyles: false,
});