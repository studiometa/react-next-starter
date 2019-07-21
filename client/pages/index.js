import Grid        from '@material-ui/core/Grid';
import Typography  from '@material-ui/core/Typography';
import React       from 'react';
import Layout      from '../components/common/PageLayout';
import LazyImage   from '../components/utils/LazyImage';
import pageWrapper from '../lib/pageWrapper';


const styles = theme => ({
  title: {
    marginBottom: theme.spacing(4),
  },
});

const Home = React.memo(function ({ pageData, classes }) {
  return (
    <Layout pageData={pageData}>
      <Typography variant="h1" className={classes.title} align="center">react-next-starter</Typography>
      <Grid container justify="center">
        <Grid item md={6}>
          <LazyImage src="https://miro.medium.com/max/1200/1*8g-FaXXbEUFP11oZD1kfaA.jpeg"/>
        </Grid>
      </Grid>
    </Layout>
  );
});


export default pageWrapper(Home, {
  name: 'home',
  styles,
});
