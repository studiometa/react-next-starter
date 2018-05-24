import React       from 'react';
import { connect } from 'react-redux';
import Link        from '../components/Link';
import Layout      from '../components/PageLayout';
import withI18next from '../lib/withI18next';



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



// export default withI18next()(connect()(Home));
export default Home;