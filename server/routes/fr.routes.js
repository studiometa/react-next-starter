module.exports = () => ({
  '/': { page: '/index', lang: 'fr' },
  '/produits': { page: '/products', lang: 'fr' },
  '/produits/promotions': { page: '/products/promotions', lang: 'fr' },
  '/produits/:id': { page: '/product', queryParams: ['id'], lang: 'fr' },
});