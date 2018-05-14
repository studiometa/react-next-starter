module.exports = () => ({
  '/': { page: '/index' },
  '/products': { page: '/products' },
  '/promotions': { page: '/products/promotions'},
  '/product/:id': { page: '/product', queryParams: ['id'] },
});