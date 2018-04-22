import Link from 'next/link'

const Product = (props) => (
  <div>
    <h1>product: {props.id}</h1>
    <Link href={`/`}>
      <a>Back home</a>
    </Link>
    <Link href={`/products`}>
      <a>Back to products list</a>
    </Link>
  </div>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  return { id };
};

export default Product;