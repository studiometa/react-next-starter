import React from 'react';

import Link              from '../../components/Link/index';
import Layout            from '../../components/PageLayout';
import withRedux         from 'next-redux-wrapper';
import createStore       from '../../../store/createStore';
import { fetchProducts } from '../../../store/actions/products.actions';



class Products extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchProducts(false));
    return null;
  }


  render() {
    const { products } = this.props;

    return (
      <Layout>
        <div>
          <h2>PAGE NAME </h2>
          <ul>
            {
              products !== undefined &&
              products.map((product, key) => (
                <li key={key}>
                  <Link to="/product/:id" query={product}>
                    Product {product}
                  </Link>
                </li>
              ))
            }

          </ul>
          <Link to="/products/promotions">Promotions</Link>
        </div>
      </Layout>
    );
  }
}



export default withRedux(createStore, (state) => ({ products: state.products }))(Products);