import { withStyles } from '@material-ui/core/styles';
import { connect }    from 'react-redux';
import { compose }    from 'recompose';
import config         from '../../config';
import withI18next    from './withI18next';
import withMUITheme   from './withMUITheme';
import withPageData   from './withPageData';


/**
 * This is a page wrapper that does the following things:
 * - connect the component to redux
 * - connect the component to i18next
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {string} name: the slug name of the page (used by the api, etc)
 * @param {array} namespaces: additional locales that can be injected to the page
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} withTheme: define if the prop 'theme' containing the app theme should be injected into the component
 * @param {boolean} noPageData: true if no pageData is required by the page
 * @returns {*}
 */

export default (Component, {
  name,
  namespaces = [],
  mapStateToProps = null,
  styles = {},
  withTheme = false,
  noPageData = false,
}) => {
  const args = [
    withPageData(name, { required: !noPageData }),
    connect(mapStateToProps),
    withStyles(styles),
  ];
  if (config.lang.enabled) {
    args.push(withI18next(config.lang.namespaces.includes(name) ? [name, ...namespaces] : namespaces));
  }
  return withMUITheme(compose(...args)(Component), withTheme);

};