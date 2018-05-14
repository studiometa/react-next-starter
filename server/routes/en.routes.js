module.exports = () => ({
  '/': { page: '/index', lang: 'en' },
  '/products': { page: '/products', lang: 'en' },
  '/products/promotions': { page: '/products/promotions', lang: 'en' },
  '/product/:id': { page: '/product', queryParams: ['id'], lang: 'en' },
});