import Link   from 'next/link';
import Layout from '../components/PageLayout';


export default () => (
  <Layout>
    <div>
      <h2>Home</h2>
      <Link href={`/products`}><a>Products</a></Link>
    </div>
  </Layout>
)
