const packageJson = require('../package');
/**
 * Settings related to your app SEO used NextJs's Head component
 */
module.exports = {

  // The default pages title that will be showed when no related title has been found
  defaultPagesTitle: packageJson.name,

  // A list of default meta tags that will be used for the app on every pages
  defaultMetaTags: [
    { name: 'description', content: packageJson.description },
    { name: 'author', content: packageJson.author },
  ],
};