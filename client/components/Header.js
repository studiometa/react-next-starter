import AppBar           from '@material-ui/core/AppBar';
import Grid             from '@material-ui/core/Grid';
import Toolbar          from '@material-ui/core/Toolbar';
import React            from 'react';
import packageJson      from '../../package';
import componentWrapper from '../lib/componentWrapper';
import LangSwitch       from './LangSwitch';
import Link             from './Link';

// xs, sm, md, lg, and xl.
const styles = theme => ({
  link: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },

  link__active: {
    textDecoration: 'underline'
  }
});


const Header = function Header(props) {

  let {
        classes, // classes for the page layout components
        t,
      } = props;


  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center" justify="flex-start" spacing={32}>
              <Grid item>
                <Link to={'/'} className={classes.link} variant="title">
                  {packageJson.name}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/readme'} className={classes.link}  activeClassName={classes.link__active}>
                  {t('menu_links.readme')}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/_sandbox'} className={classes.link} activeClassName={classes.link__active}>
                  {t('menu_links.sandbox')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <LangSwitch/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default componentWrapper(Header, {
  styles,
});
