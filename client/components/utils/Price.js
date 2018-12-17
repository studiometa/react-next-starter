import fx      from 'money';
import React   from 'react';
import config  from '../../../config/index';
import wrapper from '../../lib/componentWrapper';


const mapStateToProps = state => ({
  preferredCurrency: state.user.preferences.currency,
  lang: state.app.lang,
  currencyRates: state.app.currencyRates,
});


/**
 * This component can be used each time a price must be displayed. All you have to do is
 * wrapping the price value with it and it will:
 * - Show the price in the user currency
 * - Format the price in the user language
 */
export default React.memo(wrapper(({ children, preferredCurrency, lang, currencyRates }) => {

  // Check that the price value is valid or return it
  if (children === undefined || typeof children !== 'number') return children;

  // Get the user preferred currency
  preferredCurrency = preferredCurrency || config.shop.currencies.default;

  let value = children;

  // Switch to the good currency
  if (preferredCurrency !== config.shop.currencies.default) {
    fx.rates = currencyRates;
    fx.base  = config.shop.currencies.default;
    value    = Math.round(fx.convert(value,
      { from: config.shop.currencies.default, to: preferredCurrency }) * 100) / 100;
  }

  // Return the formatted price using the native Intl class
  return new Intl.NumberFormat(lang,
    {
      style: 'currency',
      currency: preferredCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

}, {
  isTranslatable: false,
  mapStateToProps,
}));