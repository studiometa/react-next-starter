module.exports = () => ({
  '/': { page: '/index' },
  '/produits': { page: '/products' },
  '/promotions': { page: '/products/promotions' },
  '/produit/:id': { page: '/product', queryParams: ['id'] },
});