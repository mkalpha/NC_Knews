const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seed: {
    directory: './seed/seeds.js',
  },
};

const dbConfig = {
  development: {
    connection: {
      database: 'nc_news',
      user: 'andrew',
      password: 'password',
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      user: 'andrew',
      password: 'password',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
