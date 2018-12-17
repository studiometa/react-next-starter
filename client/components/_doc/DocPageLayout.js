import Grid       from '@material-ui/core/Grid';
import List       from '@material-ui/core/List';
import ListItem   from '@material-ui/core/ListItem';
import Paper      from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React      from 'react';

import wrapper from '../../lib/componentWrapper';
import Link    from '../common/Link';


const styles = theme => ({
  link: {
    ...theme.styles.hover.offLinkUnderline,
  },

  link__active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },

  mdContent: {
    fontFamily: theme.typography.fontFamily,
  },
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

    this.state = {};

    try {
      const camelToSnake = require('../../../helpers/camelToSnake');
      this.state.readme  = require(`../../../doc/${camelToSnake(props.name).toUpperCase()}.md`);
    } catch (err) {
      throw new Error(err);
    }
  }


  render() {
    const { classes, t } = this.props;

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
          <div dangerouslySetInnerHTML={{ __html: this.state.readme }} className={classes.mdContent}/>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}



const mapStateToProps = state => ({
  routes: state.app.routes,
});

export default wrapper(DocPageLayout, { styles, mapStateToProps, withRouter: true });