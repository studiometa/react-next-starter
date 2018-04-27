import React       from 'react';
import Link        from '../components/Link';
import Layout      from '../components/PageLayout';

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h2>Home</h2>
          <Link to={`/products`}>Products</Link>
        </div>
      </Layout>
    );
  }
}

export default Home;