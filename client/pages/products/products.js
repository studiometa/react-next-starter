import React from 'react';

import Link              from '../../components/Link/index';
import Layout            from '../../components/PageLayout';
import axios             from 'axios';
import withRedux         from 'next-redux-wrapper';
import createStore       from '../../../store/createStore';
import { fetchProducts } from '../../../store/actions/products.actions';



class Products extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    console.log('Products:getInitialProps');
    const currentState = store.getState().products;

  /*  if (Array.isArray(currentState) && currentState.length > 0 && !isServer) {
      return { data: { products: currentState } };
    } else {

    }*/


    // If it's a server, then all async actions must be done before return or return a promise
    if (isServer) {
      const products = await store.dispatch(fetchProducts(true));
      return { products }
    } else {

      // If it's a client, then it does not matter because client can be progressively rendered
      store.dispatch(fetchProducts(false));
    }


    return { };

  };


  componentDidMount() {
    this.props.dispatch(fetchProducts(false));
  }


  render() {
    console.log('--', this.props);
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



export default withRedux(createStore, state => state)(Products);