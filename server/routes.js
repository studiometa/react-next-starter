module.exports = {

  /** _DEV_ **/

  '/_sandbox': { page: '/_sandbox', langRoutes: { fr: '/_sandbox', en: '/_sandbox' } },


  /** GENERAL **/

  '/': { page: '/index', langRoutes: { fr: '/', en: '/' }, prefetch: true, neverCache: true },
  //'/readme': { page: '/readme', langRoutes: { fr: '/lisez-moi', en: '/readme' } },

  '/test': { page: '/readme', langRoutes: { fr: '/lisez-moi' } },
};