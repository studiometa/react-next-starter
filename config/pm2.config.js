const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

/**
 * This config file is used by pm2
 */
module.exports = {
  name: 'chefsquare',
  max_memory_restart : `${maxMemory}M`,
  instances : instances,
  exec_mode : 'cluster',
  script: './server/index.js',
  error_file: './logs/pm2.errors.log',
  out_file: './logs/pm2.out.log',
  env: {
    NODE_ENV: 'production',
  },
};