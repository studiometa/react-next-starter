import { connect }    from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withMUITheme   from './withMUITheme';
import { compose }    from 'recompose';


/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - inject pageData after having fetching it from the API
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @returns {*}
 */
export default (Component, {
  mapStateToProps = null,
  styles = {},
}) => {
  return withMUITheme(compose(
    connect(mapStateToProps),
    withStyles(styles),
  )(Component));

};

//return withPageData(name)(
//   withMUITheme(
//     withI18next([name, ...locales])(
//       connect(mapStateToProps)(
//         withStyles(styles)(
//           Component,
//         ),
//       ),
//     ),
//   ),
// );