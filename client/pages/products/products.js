import Link   from '../../components/Link/index';
import Layout from '../../components/PageLayout';


export default () => (
  <Layout>
    <div>
      <h2>Products</h2>
      <ul>
        <li>
          <Link to="/product/:id" query={1}>
            Product 1
          </Link>
        </li>
        <li>
          <Link to="/product/:id" query={2}>
            Product 2
          </Link>
        </li>
        <li>
          <Link to="/product/:id" query={3}>
            Product 3
          </Link>
        </li>

      </ul>
      <Link to="/products/promotions">Promotions</Link>
    </div>
  </Layout>
)
