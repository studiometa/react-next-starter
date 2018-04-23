import Link   from '../components/Link';
import Layout from '../components/PageLayout';


const Product = (props) => (
  <Layout>
    <div>
      <h2>product: {props.id}</h2>
      <div>
        <Link to={`/`}>
          Back home
        </Link>
      </div>
      <div>
        <Link to={`/products`}>
          Back to products list
        </Link>
      </div>
    </div>
  </Layout>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  return { id };
};

export default Product;