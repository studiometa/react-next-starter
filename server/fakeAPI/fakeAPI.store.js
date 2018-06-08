module.exports = {
  products: [
    { name: 'First product' },
    { name: 'The second one' },
    { name: 'The third' },
    { name: 'After the third' },
    { name: 'Before the sixth' },
    { name: 'The sixth' },
    { name: 'The last one' },
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