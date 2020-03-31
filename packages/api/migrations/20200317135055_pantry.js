exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('pantry', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.text('name', 128).notNullable()
      table.timestamp('expire').notNullable()
      table.integer('quantity').notNullable()
      table.text('volume', 128).notNullable()
      table.uuid('user_id').notNullable()
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('pantry')
}
