import Avatar                       from '@material-ui/core/Avatar';
import MenuItem                     from '@material-ui/core/MenuItem';
import Select                       from '@material-ui/core/Select';
import classNames                   from 'classnames';
import { withRouter }               from 'next/router';
import qs                           from 'qs';
import React                        from 'react';
import { connect }                  from 'react-redux';
import urlJoin                      from 'url-join';
import config                       from '../../../config/index';
import resolvePathnameFromRouteName from '../../../helpers/resolvePathnameFromRouteName';
import NoScript                     from './NoScript';
import {i18n}                       from '../../../server/lib/i18n'
import {updateAppLanguage}          from '../../../store/actions/app.actions';


/**
 * This component displays a button to switch the current language
 * It can resolve a given url to any other language at the condition that
 * this url is not dynamic.
 */
const LangSwitch = (({ lang, routes, classes = {}, dispatch }) => {
  if (config.lang.enabled2 !== true) return null;

  const onChange = ({ target }) => {
    i18n.changeLanguage(target.value, () => {
dispatch(updateAppLanguage(target.value))
    })
  };

  return  (
    <React.Fragment>
      <Select value={lang} onChange={onChange} className={classNames(classes.select, 'hidden-no-script')}>
        {
          config.lang.available.map(_lang =>
            <MenuItem value={_lang.lang} key={_lang.name} className={classes.menuItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`/static/imgs/flags/${_lang.locale}.png`}
                  alt={_lang.name}
                  className={classes.icon}
                  style={{ width: '16px', height: '16px', marginRight: '8px' }}
                />
                <span className={classes.text}>{_lang.name}</span>
              </div>
            </MenuItem>,
          )
        }
      </Select>
    </React.Fragment>
  );
});

export default connect(state => ({
  lang: state.app ? state.app.lang : undefined,
  routes: state.app ? state.app.routes : undefined,
}))(LangSwitch)