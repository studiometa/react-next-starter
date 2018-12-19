import classNames from 'classnames';
import propTypes  from 'prop-types';
import React      from 'react';
import wrapper    from '../../lib/componentWrapper';
import NoScript   from './NoScript';
import Skeleton   from './Skeleton';


const styles = theme => ({
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
    width: propTypes.oneOfType([propTypes.string, propTypes.number]),
    height: propTypes.oneOfType([propTypes.string, propTypes.number]),
    useBackgroundImage: propTypes.bool,
    noSkeleton: propTypes.bool,
    className: propTypes.string,
  };

  static defaultProps = {
    style: {},
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
      this._mounted === true && this.setState({ isReady: true, src: '/static/imgs/fallback_image.png' });
    };

    this.imageObject.onload  = success;
    this.imageObject.onerror = error;
    this.imageObject.onabort = error;
    this.imageObject.src     = this.props.src;
  }


  render() {
    const height = this.props.height ? this.props.height : '100%';
    const width  = this.props.width ? this.props.width : '100%';


    /** LOADING STATE **/

    if (this.state.isReady === false || typeof this.state.src !== 'string' || this.props.isLoaded === false) {
      return (
        <div>
          <div className="hidden-no-script">
            {
              this.props.noSkeleton === true
                ? <div style={{ height, width }} className={this.props.className}/>
                : <Skeleton height={height} width={width} isCover={true} className={this.props.className}/>
            }
          </div>
          <NoScript>
            {
              this.props.useBackgroundImage === true &&
              <div
                className={classNames(this.props.className, this.props.classes.backgroundImage, 'async-image-ready')}
                style={{ backgroundImage: `url(${this.props.src})`, height, width, ...this.props.style }}
              />
            }
            {
              this.props.useBackgroundImage !== true &&

              <img
                className={classNames(this.props.className, 'async-image-ready')}
                src={this.props.src}
                style={{ height, width, ...this.props.style }}
              />
            }
          </NoScript>

        </div>
      );
    }

    /** LOADED BACKGROUND IMAGE **/

    if (this.props.useBackgroundImage === true) {
      return (
        <div
          className={classNames(this.props.className, this.props.classes.backgroundImage, 'async-image-ready')}
          style={{ backgroundImage: `url(${this.state.src})`, height, width, ...this.props.style }}
        />
      );
    }

    /** LOADED IMAGE **/

    return (
      <img
        className={classNames(this.props.className, 'async-image-ready')}
        src={this.state.src}
        style={{ height, width, ...this.props.style }}
      />
    );
  }
}



export default wrapper(LazyImage, {
  styles,
});