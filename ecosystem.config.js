module.exports = {
  apps: [{
    name: 'iotp',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '118.24.72.231',
      ref: 'origin/master',
      repo: 'git@github.com:ihoey/api-dode-top.git',
      path: '/data/www/iotp',
      'post-deploy': 'npm i && pm2 reload ecosystem.config.js --env production'
    }
  }
};
