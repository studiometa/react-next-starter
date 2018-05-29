import axios   from 'axios';
import urlJoin from 'url-join';
import config  from '../config';


export default class Socket {
  constructor({ config, isServer }) {
    this.config   = config;
    this.isServer = isServer;
    this.getPage  = this.getPage.bind(this);
  }


  /**
   * Get data and meta-data for a defined page.
   * @param pageId
   * @returns {Promise<any>}
   */
  async getPage(pageId) {
    return await this.get(this._resolveUrl('pages', pageId));
  };


  /**
   * Get data and meta-data for a defined product.
   * @param productId
   * @returns {Promise<any>}
   */
  async getProduct(productId) {
    return await this.get(this._resolveUrl('products', productId.toString()));
  };


  /**
   * Simply making a get request on a defined endpoint.
   * It is possible to set some parameters to the request as well.
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async get(url = '', params = {}) {
    console.log('socket:get NODE_ENV', process.env.NODE_ENV);
    console.log('socket:get NOW_URL', process.env.NOW_URL);
    console.log('socket:get host config :', config.server.host);
    console.log('socket:get url :', url, 'params :', params);
    try {
      const result = await axios.get(url, params);
      console.log('socket:get res :', result);
      if (!result.data) {
        throw { status: 404, message: 'Not found' };
      }
      return result.data;
    } catch (error) {
      console.log('socket:get error :', error);
      throw this._computeError(error);
    }
  }


  /**
   * Makes it more easy to build
   * urls for the requests by adding the
   * base url defined in the config property of
   * the class
   * @param segments
   * @returns {*}
   * @private
   */
  _resolveUrl(...segments) {
    return urlJoin(this.config.getUrl(), ...segments);
  }


  /**
   * Computes axios errors to make them
   * more reusable. It is also possible to define
   * a custom message if needed.
   * This function may be moved
   * to the utils folder in the future
   * @param error
   * @param message
   * @returns {{}}
   * @private
   */
  _computeError(error = {}, message) {
    const _result = { message };
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      //_result.data = error.response.data; // TODO enable this when real server errors model is defined
      _result.status = error.response.status;
    }

    if (error.message && !message) {
      _result.message = error.message;
    }

    //_result.error = error;
    return _result;
  }

}