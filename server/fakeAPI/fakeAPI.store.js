module.exports = {
  products: [
    { name: 'Product 0' },
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
    { name: 'Product 5' },
    { name: 'Product 6' },
  ],
  pages: {
    products: {
      title: 'Products',
      metaData: [
        { name: 'description', content: 'This is the products page'},
      ],
      content: {
        listingTitle: 'Products list',
        products: [0, 1, 2, 3, 4, 5, 6]
      }
    },
    home: {
      title: 'Home',
      metaData: [
        { name: 'description', content: 'This is the home page'},
      ]
    },
    promotions: {
      title: 'Promotions',
      metaData: [
        { name: 'description', content: 'This is the promotions page'},
      ]
    },
    product: {
      title: 'Product | %s',
      metaData: [
        { name: 'description', content: 'This is a product page'},
      ]
    },
  }
};