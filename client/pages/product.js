import Link   from 'next/link';
import Layout from '../components/PageLayout';


const Product = (props) => (
  <Layout>
    <div>
      <h2>product: {props.id}</h2>
      <Link href={`/`}>
        <a>Back home</a>
      </Link>
      <Link href={`/products`}>
        <a>Back to products list</a>
      </Link>
    </div>
  </Layout>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  return { id };
};

export default Product;