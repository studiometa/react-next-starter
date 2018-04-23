import Link   from '../components/Link';
import Layout from '../components/PageLayout';


export default () => (
  <Layout>
    <div>
      <h2>Home</h2>
      <Link to={`/products`}>Products</Link>
    </div>
  </Layout>
)
