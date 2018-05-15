import { translate, loadNamespaces } from 'react-i18next';
import { getInitialProps, I18n }     from '../../lib/i18n';
import config from '../../config'

export default (namespaces = []) => ComposedComponent => {

  // Be sure to always use the default namespace
  if (!namespaces.includes(config.lang.defaultNamespace)) {
    namespaces.unshift(config.lang.defaultNamespace)
  }

  // Populate translation with react-i18next
  const Extended = translate(namespaces, { i18n: I18n, wait: process.browser })(
    ComposedComponent,
  );

  // Extends initial props
  Extended.getInitialProps = async (props) => {
    const i18nInitialProps = props.req
      ? getInitialProps(props.req, namespaces)
      : await loadNamespaces({
        components: [{ props: { namespaces } }],
        i18n: I18n,
      });

    const composedInitialProps = ComposedComponent.getInitialProps
      ? await ComposedComponent.getInitialProps(Object.assign({}, props, { i18nInitialProps }))
      : {};

    return {
      ...composedInitialProps,
      ...i18nInitialProps,
    };
  };

  return Extended;
};
