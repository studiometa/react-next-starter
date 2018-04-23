/**
 * This is a list of all the routes available for express.
 * For each of them it is possible to define a path to listen on
 * an a callback function with req and res arguments
 */
module.exports = () => ({
  '/products': { page: '/products' },
  '/products/promotions': { page: '/products/promotions' },
  '/product/:id': { page: '/product', queryParams: ['id'] },
});