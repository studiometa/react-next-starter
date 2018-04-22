/**
 * This is a list of all the routes available for express.
 * For each of them it is possible to define a path to listen on
 * an a callback function with req and res arguments
 * @type {*[]}
 */
module.exports = [
  {
    path: '/products',
    page: '/products'
  },
  {
    path: '/products/promotions',
    page: '/products/promotions',
  },
  {
    path: '/product/:id',
    page: '/product',
    queryParams: ['id'],
  }
];