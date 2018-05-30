import Link        from '../../components/Link';
import Layout      from '../../components/PageLayout';
import pageWrapper from '../../lib/pageWrapper';


export default pageWrapper(({ pageData }) => (
  <Layout pageData={pageData}>
    <div>
      <h1>Products promotions</h1>
      <ul>
        <li>
          <Link to="/product/:id" query={{ id: 1 }}>
            Product 1
          </Link>
        </li>
        <li>
          <Link to="/product/:id" query={{ id: 2 }}>
            Product 2
          </Link>
        </li>
        <li>
          <Link to="/product/:id" query={{ id: 3 }}>
            Product 3
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
), {
  name: 'promotions'
})
