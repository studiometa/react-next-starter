import React  from 'react';
import Link   from '../components/Link';
import Layout from '../components/PageLayout';
import axios  from 'axios';



class Product extends React.Component {

  static getInitialProps = async function (context) {
    const { id } = context.query;

    // TODO Get data from the store instead
    try {
      const response  = await axios.get('http://localhost:3000/fake-api/products/' + id);
     // console.log(response)
      return { id, data: response.data };
    } catch (err) {
      console.error(err.message);
    }
  };


  render() {
    const { props } = this;
    const data = props.data  || {};

    return (
      <Layout>
        <div>
          <h2>product: {data.name}</h2>
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



export default Product;