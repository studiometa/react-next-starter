import AppBar           from '@material-ui/core/AppBar';
import Grid             from '@material-ui/core/Grid';
import Toolbar          from '@material-ui/core/Toolbar';
import React            from 'react';
import NoSSR            from 'react-no-ssr';
import packageJson      from '../../../package';
import componentWrapper from '../../lib/componentWrapper';
import LangSwitch       from '../utils/LangSwitch';
import Link             from './Link/index';

const styles = theme => ({
  link: {
    color: theme.palette.error.main,
  },

  link__active: {
    color: theme.palette.secondary.main,
  },

  langSwitchSelect: {
    color: theme.palette.error.main,
  },

  langSwitchText: {
    fontSize: theme.typography.body1.fontSize,
  },
});


/**
 * Header component of the App
 * You can keep and customize this component or remove it depending on your needs
 * @param props
 * @returns {*}
 * @constructor
 */
const Header = function Header(props) {

  let {
        classes,
        t,
      } = props;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center" justify="flex-start" spacing={32}>
              <Grid item>
                <Link to={'/'} className={classes.link} activeClassName={classes.link__active} variant="h6">
                  {packageJson.name}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/readme'} className={classes.link} activeClassName={classes.link__active}>
                  {t('menu_links.readme')}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/_sandbox'} className={classes.link} activeClassName={classes.link__active} color="error">
                  {t('menu_links.sandbox')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <NoSSR>
              <LangSwitch classes={{ select: classes.langSwitchSelect, text: classes.langSwitchText }}/>
            </NoSSR>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default componentWrapper(Header, {
  styles,
});
