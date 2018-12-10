import Grid           from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes      from 'prop-types';
import React          from 'react';
import Inspector      from 'react-inspector';
import config         from '../../../config';
import Error          from '../../pages/_error';
import Head           from './Head';
import Header         from './Header';

// xs, sm, md, lg, and xl.
const styles = theme => ({

  root: {
    '&.full-page .page-layout-content': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: `${theme.spacing.unit * 2}px`,
      },
    },
  },

  layout: {
    margin: '0 auto',
    background: theme.palette.grey[50],
  },

  container: {
    maxWidth: config.interface.pageContentMaxWidth,
    minHeight: '100vh',
    margin: 'auto',
  },

  content: {
    paddingTop: `${theme.spacing.unit * 8}px`,
    paddingLeft: theme.styles.responsivePadding.paddingLeft,
    paddingRight: theme.styles.responsivePadding.paddingRight,
    //overflowY: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingTop: `${theme.spacing.unit * 8}px`,
      ...theme.styles.responsivePadding[theme.breakpoints.down('md')],
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${theme.spacing.unit * 6}px`,
      ...theme.styles.responsivePadding[theme.breakpoints.down('sm')],
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: `${theme.spacing.unit * 6}px`,
      ...theme.styles.responsivePadding[theme.breakpoints.down('xs')],
    },
  },
});


/**
 *  This component is a simple page layout that must be added to every pages of the app.
 *  Note that in order to work properly, this component needs a 'pageData' prop that contains
 *  all the information about the page (those information has generally been fetched from an API but it can also
 *  be a simple config file !). This prop will principally be used for SEO purpose, like generating the page <head>
 *  children like metas, title, etc.
 *
 *  Note that all other props passed to this component (except 'children' of course) will be passed
 *  to the Head component. It means that you can easily override some pageData properties like title for example.
 * @param props
 * @returns {*}
 */
const PageLayout = withStyles(styles)(function Layout(props) {

  let {
        pageData, // The pageData object received by the component
        children, // the page content
        classes, // classes for the page layout components
        backgroundColor, // The background color of the page
        noPageData, // If true, the pageData will not be required
        fullPage, // Hide the header and the footer
        debug, // An object to display on the inspector (dev only)
        ...rest // Any other property will be assigned to the pageData object
      } = props;

  // Display an error if
  if (noPageData !== true && (!pageData || pageData.error === 404 || (pageData.error && pageData.error !== 404))) {
    const statusCode = pageData && pageData.statusCode ? pageData.statusCode : 404;
    return <Error statusCode={statusCode}/>;
  }

  // Here we are merging all other props to the pageData object
  // that will next be sent to the Head component
  Object.assign(pageData || {}, rest);

  return (
    <div className={`${ classes.root } page-${pageData.title} ${fullPage ? 'full-page' : 'no-full'}`}>
      <Head {...pageData}/>
      <Header/>
      <Grid container className={classes.layout} style={backgroundColor ? { backgroundColor } : {}}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <div className={classes.content}>
              {children}
            </div>
          </div>
        </Grid>
      </Grid>

      {
        // This is only for dev purpose (it displays the workshop object at the bottom of the page)
        process.env.NODE_ENV === 'development' && typeof debug === 'object' &&
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}>
          <Inspector
            theme="chromeDark"
            data={debug}
            expandLevel={0}
          />
        </div>
      }

    </div>
  );
});

PageLayout.propTypes = {
  pageData: PropTypes.object, // The pageData object received by the component
  children: PropTypes.any, // the page content
  classes: PropTypes.object, // classes for the page layout components
  backgroundColor: PropTypes.string, // The background color of the page
  noPageData: PropTypes.bool, // If true, the pageData will not be required
  fullPage: PropTypes.bool, // Hide the header and the footer
  debug: PropTypes.object,
};

export default PageLayout;
