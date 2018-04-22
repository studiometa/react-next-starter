/**
 * This is a list of all the routes available for express.
 * For each of them it is possible to define a path to listen on
 * an a callback function with req, res and app args
 * @type {*[]}
 */
module.exports = [
  {
    path: '/p/:id',
    callback: (req, res, app) => {
      const actualPage  = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    }
  },
  {
    path: '*',
    callback: (req, res, app) => {
      return app.getRequestHandler()(req, res);
    }
  }
];