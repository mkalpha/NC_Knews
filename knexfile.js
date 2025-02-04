const ENV = process.env.NODE_ENV || 'development';
console.log('ENV :', ENV);

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
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
    },
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
  },

};

module.exports = { ...baseConfig, ...dbConfig[ENV] };
