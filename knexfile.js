// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'twitter_clone_dev'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'twitter_clone_test'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
