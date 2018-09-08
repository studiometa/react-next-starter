/**
 * This config file is used by pm2
 */
module.exports = {
  apps: [{
    name: 'react-next-starter',
    script: './server/index.js',
    error_file: './logs/pm2.errors.log',
    out_file: './logs/pm2.out.log',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
    },
  }],
};