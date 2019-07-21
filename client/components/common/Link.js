import Typography           from '@material-ui/core/Typography';
import classNames           from 'classnames';
import propTypes            from 'prop-types';
import React                from 'react';
import config               from '../../../config/index';
import removeUrlLastSlash   from '../../../helpers/removeUrlLastSlash';
import { Link as NextLink } from '../../../server/lib/i18n';
import routes               from '../../../server/routes';
import wrapper              from '../../lib/componentWrapper';



/**
 * This component can be used to build links that works properly with NextJs
 * and the custom router.
 *
 * This is an example of how it should be used :
 * <Link to="/products/:id" query="my-product">Some link text</Link>
 *
 * Take a look at the documentation if you want to know more about this component
 *
 * @param props
 * @returns {*}
 * @constructor
 */


class Link extends React.Component {
  static propTypes = {

    // The content of the link, it can be almost anything
    children: propTypes.any.isRequired,

    // The route path as defined in the routes.js file
    to: propTypes.string.isRequired,

    // The route query(ies)
    query: propTypes.any,

    // A className that is applied to the <a> tag of the link
    className: propTypes.string,

    // A style to be used when the link is active
    activeStyle: propTypes.object,

    // A className to be used when the link is active
    activeClassName: propTypes.string,

    // Do not use the M-ui Typography element in the link
    noTypo: propTypes.bool,

    // The name of the link (native)
    name: propTypes.string,

    // The target of the link (native)
    target: propTypes.string,

    // Define if the related page must be pre-fetched (only in prod)
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

    // Colors for the Typography component
    color: propTypes.oneOf(['initial', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary']),

    // if true, the component will consider the link active whenever its first segment matches the current route
    checkSubActive: propTypes.bool,
  };

  static defaultProps = {
    variant: 'button',
    component: 'span',
    color: 'initial',
    noTypo: false,
    target: '_self',
    prefetch: false,
    urlQuery: '',
    linkStyle: { display: 'flex' },
    disabled: false,
    checkSubActive: false,
    linkAttributes: {},
  };


  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      page: null,
      pathname: null,
      isHidden: false,
      isExternal: false, // Define if the provided route is an external link
    };

    let { to, query, target } = this.props;
    let isHidden              = false;

    if (!to) {
      this.state.isHidden = true;
      return;
    }

    // If the 'to' prop contains a dot, it cannot be a valid route
    // and is probably be an url. In this case, all we need to
    // do is to save the url into the 'pathname' state of the component
    // and display a native link instead of the Next Link component
    if (to.includes('.') || to.includes('://')) {
      this.state.isExternal = true;
      this.state.pathname   = to;
      return;
    }

    // Find a matching route in the route.js config file
    let { page } = routes[to] || {};

    // Check if a matching route has been found
    // if not, only show an error log on dev env
    if (typeof to !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Link.js: No matching route has been found for '${ to }'`);
      }
    }

    if (typeof query === 'object') {
      Object.entries(query).forEach(([queryName, queryValue]) => (
        queryValue && queryName ? to = to.replace(`:${queryName}`, queryValue) : null
      ));
    }

    // If the 'target' is _blank, we must generate an absolute url from the
    // route pathname. This way we can open an internal page in a new tab/window.

    if (target === '_blank') {
      this.state.isExternal = true;
      this.state.page       = removeUrlLastSlash(page);
      this.state.pathname   = removeUrlLastSlash(config.server.getUrl(to));
      this.state.isHidden   = isHidden;
    } else {
      this.state.page     = removeUrlLastSlash(page);
      this.state.pathname = removeUrlLastSlash(to);
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
      || nextProps.children !== this.props.children;
  }


  _isActive = () => {
    if (this.props.router.route === '/index' && this.props.to === '/') {
      return true;
    } else if (this.props.checkSubActive) {
      const segment = this.props.to
        .slice(1)
        .split('/')[0];
      return this.props.router.route.indexOf(`/${segment}`) === 0;
    } else {
      return this.props.to !== '/' && this.props.router.route.indexOf(this.props.to) === 0;
    }
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
          color,
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
            :
            <Typography className={`${ className }`} style={style} variant={variant} component={component} color={color}>
              {children}
            </Typography>
        }
      </a>
    );

    // Return a native external link if 'to' is not a route but an url
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



export default wrapper(Link, {
  isTranslatable: false,
  hasStyles: false,
  withRouter: true,
});