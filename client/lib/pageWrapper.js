import withI18next    from './withI18next';
import withPageData   from './withPageData';
import { connect }    from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withMUITheme   from './withMUITheme';
import { compose }    from 'recompose';


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
 * @param {boolean} withTheme: define if the prop 'theme' containing the app theme must be injected into the component
 * * @param {boolean} noPageData: if no page data is required by the component
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
  return withMUITheme(compose(
    withPageData(name, {required: !noPageData}),
    withI18next([name, ...namespaces]),
    connect(mapStateToProps),
    withStyles(styles),
  )(Component), withTheme);

};