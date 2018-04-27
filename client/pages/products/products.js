import React from 'react';

import Link          from '../../components/Link/index';
import Layout        from '../../components/PageLayout';
import withRedux     from 'next-redux-wrapper';
import createStore   from '../../../store/createStore';
import { fetchPage } from '../../../store/actions/pages.actions';
import ProductCard   from '../../components/ProductCard';



class Products extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchPage('products', false));
    return null;
  }


  render() {
    console.log(this.props);
    const { products } = this.props.page;

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
                    <ProductCard productId={ product }/>
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



export default withRedux(createStore, ({ pages }) => ({ page: pages.products }))(Products);