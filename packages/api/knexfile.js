module.exports = {
  client: 'pg',
  dev: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'prepperpantry',
      user: 'prepper',
      password: 'this-is-secure',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  prod: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
