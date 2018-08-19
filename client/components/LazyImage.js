import classNames from 'classnames';
import propTypes  from 'prop-types';
import React      from 'react';
import wrapper    from '../lib/componentWrapper';
import Skeleton   from './Skeleton/index';


const styles = theme => ({
  borderedImage: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: theme.spacing.unit,
      left: theme.spacing.unit,
      width: `calc(100% - ${theme.spacing.unit * 2}px)`,
      height: `calc(100% - ${theme.spacing.unit * 2}px)`,
      border: '1px solid #fff',
    },
  },

  backgroundImage: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});



/**
 * This component allows you to very easily add an async image that will display
 * a skeleton screen while loading. It can be both an image or a background-image.
 * Checkout the prop types to see how you can customize it :).
 */
class LazyImage extends React.PureComponent {
  static propTypes = {
    src: propTypes.string,
    width: propTypes.number,
    height: propTypes.number,
    bordered: propTypes.bool,
    useBackgroundImage: propTypes.bool,
    noSkeleton: propTypes.bool,
    className: propTypes.string,
  };


  imageObject = null;
  _mounted    = false;
  state       = {
    isReady: false,
    src: null,
  };


  componentDidMount() {
    this._mounted = true;
    this.getCover();
  }


  componentWillUnmount() {
    this._mounted = false;
  }


  componentDidUpdate(prevProps) {
    if (this.props.src && prevProps.src !== this.props.src) {
      this.getCover();
    }
  }


  /**
   * Here we are fetching the image silently and handling the load
   * result
   */
  getCover() {
    if (!this.props.src) return;

    this.imageObject = new Image();
    const success    = () => {
      this._mounted === true && this.setState({ isReady: true, src: this.props.src });
    };
    const error      = () => {
      this._mounted === true && this.setState({ isReady: true, src: '/static/imgs/default_image.png' });
    };

    this.imageObject.onload  = success;
    this.imageObject.onerror = error;
    this.imageObject.onabort = error;
    this.imageObject.src     = this.props.src;
  }


  render() {
    const height = this.props.height ? this.props.height + 'px' : '100%';
    const width  = this.props.width ? this.props.width + 'px' : '100%';

    if (this.state.isReady === false || typeof this.state.src !== 'string' || this.props.isLoaded === false) {
      return this.props.noSkeleton === true
        ? <div style={{ height, width }} className={this.props.className}/>
        : <Skeleton height={height} width={width} isCover={true} className={this.props.className}/>;
    }

    if (this.props.useBackgroundImage === true) {
      return (
        <div className={this.props.bordered === true ? this.props.classes.borderedImage : ''}>
          <div
            className={classNames(this.props.className, this.props.classes.backgroundImage, 'async-image-ready')}
            style={{ backgroundImage: `url(${this.state.src})`, height, width, ...this.props.style }}
          />
        </div>
      );
    }

    return (
      <div
        className={this.props.bordered === true ? this.props.classes.borderedImage : ''}
        style={this.props.style || {}}
      >
        <img
          className={classNames(this.props.className, 'async-image-ready')}
          src={this.state.src}
          style={{ height, width }}
        />
      </div>
    );
  }
}



export default wrapper(LazyImage, {
  styles,
});