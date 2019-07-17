import { withStyles }                   from '@material-ui/core/styles';
import withUIWidth                      from '@material-ui/core/withWidth';
import { withRouter as withNextRouter } from 'next/router';
import { translate }                    from 'react-i18next';
import { connect }                      from 'react-redux';
import { compose }                      from 'recompose';
import config                           from '../../config';
import { withTranslation }              from '../../server/lib/i18n';


/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} isTranslatable: defines if the component should be translatable (will add the 't' function)
 * @param {boolean} isConnected: defines if the component should be connected to redux store
 * @param {boolean} hasStyles: defines if the component has MUI styles
 * @param {boolean} withTheme: defines if the theme should be injected to the component's props
 * @param {boolean} withWidth: defines if the current screen size breakpoint should be injected to the component's props
 * @param {boolean} withRouter: inject the pathname, query and asPath into the component
 * @param {array} namespaces: custom namespaces that can be added to i18next
 * @returns {*}
 */
export default (Component, {
  mapStateToProps = null,
  styles = {},
  isTranslatable = true,
  isConnected = false,
  hasStyles = true,
  withTheme = false,
  withWidth = false,
  withRouter = false,
  namespaces = [],
}) => {
  const args = [];

  if (isConnected || typeof mapStateToProps === 'function') args.push(connect(mapStateToProps));
  if (hasStyles || typeof styles === 'object') args.push(withStyles(styles, { withTheme: withTheme && !withWidth }));
  if (withWidth) args.push(withUIWidth({ initialWidth: 'lg', withTheme }));
  if (config.lang.enabled && isTranslatable || namespaces.length > 0) args.push(translate([config.lang.defaultNamespace, ...namespaces]));

  if (config.lang.enabled2) {
    args.push(withTranslation([config.lang.defaultNamespace, ...namespaces]));
  }

  if (withRouter) Component = withNextRouter(Component);

  return compose.apply(this, args)(Component);
};