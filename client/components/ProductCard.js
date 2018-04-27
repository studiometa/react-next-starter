import React            from 'react';
import { connect }      from 'react-redux';
import { fetchProduct } from '../../store/actions/products.actions';



class ProductCard extends React.Component {
  state = { data: null };


  componentDidMount() {
    // Check if a product id is defined
    if (this.props.productId !== undefined) {

      // If there is no matching product in the store, fetch it!
      if (!this.props.products || !this.props.products[this.props.productId]) {
        this.props.dispatch(fetchProduct(this.props.productId, false)).then(data => {

          // Finally store the result in the component state;
          this.setState({ data });
        });
      } else {

        // if the product exists, store it to the component state
        this.setState({
          data: this.props.products[this.props.productId],
        });
      }
    }
  }


  render() {

    // Display a loader if the component has no data
    if (!this.state.data || !this.state.data.name) {
      return (
        <pre>Loading...</pre>
      );
    }

    return (
      <div>
        {this.state.data.name}
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductCard);

