import { withStyles } from '@material-ui/core/styles';
import withUIWidth    from '@material-ui/core/withWidth';
import { translate }  from 'react-i18next';
import { connect }    from 'react-redux';
import { compose }    from 'recompose';
import config         from '../../config';


/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} isTranslatable: defines if the component must be translatable (will add the 't' function)
 * @param {boolean} isConnected: defines if the component must be connected to redux store
 * @param {boolean} hasStyles: defines if the component has MUI styles
 * @param {boolean} withTheme: defines if the theme must be injected to the component's props
 * @param {boolean} withWidth: defines if the current screen size breakpoint must be injected to the component's props
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
  namespaces = [],
}) => {
  const args = [];
  (isConnected || typeof mapStateToProps === 'function') && args.push(connect(mapStateToProps));
  (hasStyles || typeof styles === 'object') && args.push(withStyles(styles, { withTheme: withTheme && !withWidth }));
  withWidth && args.push(withUIWidth({ initialWidth: 'lg', withTheme }));
  (isTranslatable || namespaces.length > 0) && args.push(translate([config.lang.defaultNamespace, ...namespaces]));

  return compose.apply(this, args)(Component);
};