import { withStyles }                             from '@material-ui/core/styles';
import React                                      from 'react';
import { loadNamespaces }                         from 'react-i18next';
import { connect }                                from 'react-redux';
import { compose }                                from 'recompose';
import config                                     from '../../config';
import { getInitialProps, I18n, withTranslation } from '../../server/lib/i18n';
import withMUITheme                               from './withMUITheme';
import withPageData                               from './withPageData';


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
  const _namespaces = config.lang.namespaces.includes(name) ? [name, ...namespaces] : namespaces;

  const args = [
    withPageData(name, { required: config.api.fetchPagesData ? !noPageData : false }),
    connect(mapStateToProps),
    withStyles(styles),
  ];

  if (config.lang.enabled) {
    args.push(withTranslation(_namespaces));

    // This way we do not have to define namespacesRequired two times in every page components
    args.push(ComposedComponent => {
        const Extended           = (props) => React.createElement(ComposedComponent, props);
        Extended.getInitialProps = async (props = {}) => {
          const initialProps = ComposedComponent.getInitialProps
            ? await ComposedComponent.getInitialProps(Object.assign({}, props, { pageData }))
            : {};

          return Object.assign({}, initialProps, { namespacesRequired: _namespaces });
        };

        return Extended;
      },
    );
  }

  return withMUITheme(compose(...args)(Component), withTheme);

};