import axios        from 'axios';
import urlJoin      from 'url-join';
import config       from '../config';
import langDetector from '../server/lib/customI18nextLangDetector';


export default class Socket {
  constructor() {
    this.getPage = this.getPage.bind(this);
    this.lang    = langDetector.find();
  }

  setLang(lang) {
    this.lang = lang;
  }

  /**
   * Get global settings
   * @returns {Promise<any>}
   */
  async getSettings() {
    try {
      return await this.get(this.resolveUrl(config.api.endpoints.settings));
    } catch (err) {
      throw err;
    }
  };


  /**
   * Get data and meta-data for a defined page.
   * @param pageId
   * @returns {Promise<any>}
   */
  async getPage(pageId) {
    try {
      return await this.get(this.resolveUrl(config.api.endpoints.pages, pageId));
    } catch (err) {
      throw err;
    }
  };


  /**
   * Simply making a get request on a defined endpoint.
   * It is possible to set some parameters to the request as well.
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async get(url = '', params = {}) {
    try {
      const result = await axios.get(url, params);
      if (!result.data) {
        throw { status: 404, message: 'Not found' };
      }
      return result.data;
    } catch (error) {
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
   */
  resolveUrl(...segments) {
    return urlJoin(config.api.getUrl(), ...segments)
      .replace(/{{lang}}/, this.lang);
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