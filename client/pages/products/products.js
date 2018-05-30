import React from 'react';

import Link          from '../../components/Link/index';
import Layout        from '../../components/PageLayout';
import ProductCard   from '../../components/ProductCard';
import pageWrapper   from '../../lib/pageWrapper';



class Products extends React.Component {

  render() {
    const pageData = this.props.pageData;

    return (
      <Layout pageData={pageData}>
        <div className="products-page">
          <h2>{this.props.t('products:nb_products',
            { count: pageData && pageData.content.products ? pageData.content.products.length : 0 })}</h2>
          <ul>
            {
              pageData !== undefined && pageData.content.products.length > 0 &&
              pageData.content.products.map((product, key) => (
                <li key={key}>
                  <Link to="/product/:id" query={{ id: product }}>
                    <ProductCard productId={product}/>
                  </Link>
                </li>
              ))
            }
          </ul>
          <Link to="/promotions">Promotions</Link>
        </div>
      </Layout>
    );
  }
}



export default pageWrapper(Products, {
  name: 'products'
});