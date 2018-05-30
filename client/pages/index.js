import React       from 'react';
import Link        from '../components/Link';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';



class Home extends React.Component {
  render() {
    return (
      <Layout pageData={this.props.pageData}>
        <div>
          <h2>{this.props.t('home')}</h2>
          <Link to={`/products`}>{this.props.t('products')}</Link>
        </div>
      </Layout>
    );
  }
}



export default pageWrapper(Home, {
  name: 'home'
});
