module.exports = {
  lang: {

    // The default language also used as a fallback
    default: 'en',

    // If set on true, a route will look like '/en/products' instead of '/products'
    // if the lang segment is not defined, a 301 redirection will be done in order
    // to add it in the final url. Note that this redirection is handle with Express
    // and will only be triggered if a matching route has been resolved. (@see server.js)
    //
    // IMPORTANT: Do not update this parameter in production, this will update all the
    // app routes and have a lot of undesired effects on your SEO
    enableRouteLangSegment: true,

    // All the languages that are available are defined here
    available: [
      {
        lang: 'en',
        locale: 'en_EN',
      },
      {
        lang: 'fr',
        locale: 'fr_FR',
      }
    ]
  }

};