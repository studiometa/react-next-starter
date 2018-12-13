import Grid     from '@material-ui/core/Grid';
import List     from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper    from '@material-ui/core/Paper';
import Typography    from '@material-ui/core/Typography';
import React    from 'react';
import wrapper  from '../../lib/componentWrapper';
import Link     from '../common/Link';
import PageBuilder   from '../utils/PageBuilder';


const styles = theme => ({
  link: {
    ...theme.styles.hover.offLinkUnderline
  },

  link__active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold
  }
});



class DocPageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.routes = [];
    Object.keys(props.routes).forEach(routeName => {
      if (routeName.indexOf('/_doc') === 0) {
        this.routes.push(routeName);
      }
    });
  }

  render() {
    const { data, classes, t } = this.props;

    return (
      <Grid container spacing={40}>
        <Grid item md={3}>
          <Paper>
            <List component="nav">
              {
                this.routes.map((route, key) => (
                  <ListItem key={route}>
                    <Link to={route} className={classes.link} activeClassName={classes.link__active}>
                      {key + 1}. {t(`_doc.routes.${route}`)}
                    </Link>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>

        <Grid item md={9}>
          <Typography variant="h1" paragraph>
            {data.title}
          </Typography>
          <PageBuilder structure={data.pageBuilder}/>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}



const mapStateToProps = state => ({
  routes: state.app.routes,
});

export default wrapper(DocPageLayout, { styles, mapStateToProps });