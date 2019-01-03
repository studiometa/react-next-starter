const path = require('path');
const fs   = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp   = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

module.exports = {
  app: resolveApp('.'),
  appBuild: resolveApp('build'),
  appDoc: resolveApp('doc'),
  appPublic: resolveApp('client/public'),
  appStatic: resolveApp('client/static'),
  appPackageJson: resolveApp('package.json'),
  appClient: resolveApp('client'),
  appClientPages: resolveApp('client/pages'),
  appServer: resolveApp('server'),
  testsSetup: resolveApp('config/jest.setup.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  appLocales: resolveApp('locales'),
  appConfig: resolveApp('config/index.js'),
  pm2config: resolveApp('config/ecosystem.config.js'),
};
