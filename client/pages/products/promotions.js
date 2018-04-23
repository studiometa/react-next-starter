import Link   from '../../components/Link';
import Layout from '../../components/PageLayout';


export default () => (
  <Layout>
    <div>
      <h1>Products promotions</h1>
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
    </div>
  </Layout>
)