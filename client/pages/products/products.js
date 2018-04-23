import React from 'react';

import Link   from '../../components/Link/index';
import Layout from '../../components/PageLayout';
import axios from 'axios';


class Products extends React.Component {
  static getInitialProps = async function (context) {
    try {
      const response  = await axios.get('http://localhost:3000/fake-api/pages/products');

      return { data: response.data };
    } catch (err) {
      console.error(err.message);
    }
  };

  componentDidMount() {

  }

  render() {
    const data = this.props.data || {};

    return (
      <Layout>
        <div>
          <h2>{ data.name }</h2>
          <ul>
            {
              data.products !== undefined &&
                data.products.map((product, key) => (
                  <li key={ key }>
                    <Link to="/product/:id" query={product}>
                      Product {product }
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

export default Products;
