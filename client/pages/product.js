import React            from 'react';
import { connect }      from 'react-redux';
import { fetchProduct } from '../../store/actions/products.actions';
import Link             from '../components/Link';
import Layout           from '../components/PageLayout';
import Error            from './_error';
import pageWrapper      from '../lib/pageWrapper';



class Product extends React.Component {
  static async getInitialProps({ store, req, query, pageData }) {

    if (query && query.id !== undefined) {
      const product = await store.dispatch(fetchProduct(query.id, false));

      if (!product) {
        return { notFound: true };
      }

      return { product };
    }
  }


  shouldComponentUpdate(nextProps) {

    // This way we can easily check if nextProps and props are identical by making
    // abstraction of the 't' prop which is a function that causes many updates but
    // do never really change

    return Object.assign({}, nextProps, { t: this.props.t }) === this.props;
  }


  render() {
    const product = this.props.product || {};

    if (this.props.notFound) {
      return (
        <Error statusCode={404}/>
      );
    }

    const title = this.props.pageData.title.replace('%s', product.name);

    return (
      <Layout pageData={this.props.pageData} title={ title }>
        <div>
          <h2>{product.name}</h2>
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



export default pageWrapper(Product, {
  name: 'product',
});
