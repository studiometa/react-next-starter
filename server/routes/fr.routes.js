module.exports = () => ({
  '/': { page: '/index' },
  '/produits': { page: '/products' },
  '/promotions': { page: '/products/promotions' },
  '/produits/:id': { page: '/product', queryParams: ['id'] },
});