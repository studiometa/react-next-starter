const fileStore = require('./fakeAPI.store');
module.exports  = function (store = fileStore, {
  minDelay = 300,
  maxDelay = 1200,
}                                 = {}) {
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

  this.getRandom = (min, max) => (Math.random() * (max - min) + min);

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
};

