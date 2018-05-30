const fileStore = require('./fakeAPI.store');
module.exports  = function (store = fileStore, { minDelay = 0, maxDelay = 300, } = {}) {


  /**
   * Get a store segment from an url string query
   * @param string
   */
  this.resolveDataFromPath = (string = '') => {
    const path = string.split('/');
    let res    = Object.assign({}, store);

    path.map(s => {
      res = (res && res[s]
          ? res[s]
          : undefined
      );
    });
    return res;
  };

  /**
   * Returns a random string from a defined range
   * @param min
   * @param max
   * @returns {*}
   */
  this.getRandom = (min, max) => (Math.random() * (max - min) + min);


  /**
   * GET method of the API
   * @param url
   * @param res
   */
  this.get = ({ url }, res) => {
    url = url.replace(/\/$/, '').replace(/^\/+/g, '');
    url = url.substring(url.indexOf('/') + 1);

    const result = this.resolveDataFromPath(url);

    if (result) {
      setTimeout(() => {
        res.json(result);
      }, this.getRandom(minDelay, maxDelay));
    } else {
      res.status(404).json({ error: { message: '\'Sorry, we cannot find that!\'' } });
    }
  };

  /**
   * FIND method of the API
   * @param req
   * @param res
   */
  this.find = (req, res) => {
    setTimeout(() => {
      res.json(store);
    }, this.getRandom(minDelay, maxDelay));
  };
};

