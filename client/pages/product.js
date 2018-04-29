import React            from 'react';
import { fetchProduct } from '../../store/actions/products.actions';
import Link             from '../components/Link';
import Layout           from '../components/PageLayout';
import withRedux        from 'next-redux-wrapper';
import createStore      from '../../store/createStore';



class Product extends React.Component {
  static async getInitialProps({ store, req, query }) {

    if (query && query.id !== undefined) {
      const product = await store.dispatch(fetchProduct(query.id, false));

      return { product };
    }
  }


  render() {
    const product = this.props.product || {};

    return (
      <Layout>
        <div>
          <h2>product: {product.name}</h2>
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
  }

}



export default withRedux(createStore)(Product);
