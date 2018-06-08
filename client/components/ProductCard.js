import React            from 'react';
import { fetchProduct } from '../../store/actions/products.actions';
import Card             from '@material-ui/core/Card';
import CardContent      from '@material-ui/core/CardContent';
import CardMedia        from '@material-ui/core/CardMedia';
import Typography       from '@material-ui/core/Typography';
import wrapper          from '../lib/componentWrapper';
import Skeleton         from './Skeleton';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};



class ProductCard extends React.Component {
  state = { data: undefined };


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

    const isLoaded    = typeof this.state.data === 'object';
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          {
            isLoaded
              ? <CardMedia
                className={classes.media}
                image="https://picsum.photos/200/300"
              />
              : <Skeleton height={200}/>
          }
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {isLoaded ? this.state.data.name : <Skeleton/>}
            </Typography>
            <Typography component="p">
              {
                isLoaded
                  ? 'are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
                  : <Skeleton count={3}/>
              }
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default wrapper(ProductCard, { mapStateToProps, styles });

