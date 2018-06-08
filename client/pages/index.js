import React       from 'react';
import Link        from '../components/Link';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';
import Button      from '@material-ui/core/Button';

class Home extends React.Component {
  render() {

    return (
      <Layout pageData={this.props.pageData}>
        <div>
          <h2>{this.props.t('home')}</h2>
          <Link to={`/products`}>
            <Button variant="contained" color="primary" onClick={this.handleClick}>
              {this.props.t('products')}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
}



export default pageWrapper(Home, {
  name: 'home'
});
