exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('username', 128).notNullable()
      table
        .string('email', 128)
        .unique()
        .notNullable()
      table.string('password', 256).notNullable()
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('pantry').dropTableIfExists('users')
}
