/**
 * Settings related to your app SEO used by Helmet and NextJs's Head component
 */
module.exports = {

  // The default pages title that will be showed when no related title has been found
  defaultPagesTitle: 'React Next Starter',

  // A list of default meta tags that will be used for the app on every pages
  defaultMetaTags: [
    { name: 'description', content: 'A production-ready starter to build a SSR React app using NextJs and Material-ui.' },
    { name: 'author', content: 'Chuck Durst @ Studio Meta' },
  ],
};