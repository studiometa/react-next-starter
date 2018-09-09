import Grid           from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes      from 'prop-types';
import React          from 'react';
import config         from '../../config';
import Error          from '../pages/_error';
import Head           from './Head';
import Header         from './Header';

// xs, sm, md, lg, and xl.
const styles = theme => ({
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
    overflowY: 'hidden',
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
        title,
        ...rest // Any other property will be assigned to the pageData object
      } = props;

  // Display an error if
  if (!pageData || (pageData.error === 404 && noPageData !== true) || (pageData.error && pageData.error !== 404)) {
    return <Error statusCode={pageData.error}/>;
  }

  // Here we are merging all other props to the pageData object
  // that will next be sent to the Head component
  Object.assign(pageData, rest);

  return (
    <div className={`${ classes.root }${pageData.title && 'page-' + pageData.title}`}>
      <Head {...pageData} title={title || pageData.title}/>
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
    </div>
  );
});

PageLayout.propTypes = {
  pageData: PropTypes.object, // The pageData object received by the component
  children: PropTypes.any, // the page content
  classes: PropTypes.object, // classes for the page layout components
  backgroundColor: PropTypes.string, // The background color of the page
  noPageData: PropTypes.bool, // If true, the pageData will not be required
  title: PropTypes.string, // The title of the page. Can be defined in pageData (pageData.title)
};

export default PageLayout;
