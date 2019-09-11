
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {

      users.increments('id');
      users.timestamp('created_at').defaultTo(knex.fn.now());
      users.string('userName')
       .unique();
      users.string('password');
      users.string('firstName')
      .notNullable();
      users.string('lastName')
      .notNullable();
      users.date('dateOfBirth');
      users.string('email')
      .unique();
      users.string('address');
      users.string('city');
      users.string('state');
      users.string('phone');
      users.string('profileImageURL');
    
  })
  .createTable('receipts', receipts => {
        receipts.increments('id')
        .notNullable();
        receipts.timestamp('created_at').defaultTo(knex.fn.now());
        receipts.date('transactionDate')
        .notNullable();
        receipts.string('merchant')
        .notNullable();
        receipts.float('amountSpent')
        .notNullable();
  })
  .createTable('category', category => {
      category.increments('id');
      category.string('categoryName')
      .unique();
  })
  .createTable('rimages', rimages => {
      rimages.increments('id')
      rimages.string('imageURL')
      .unique();
  })
  .createTable('users_receipts', users_receipts => {
      users_receipts.integer('users_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      users_receipts.integer('receipts_id')
      .unique()
      .references('id')
      .inTable('receipts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  .createTable('receipts_category', receipts_category => {
      receipts_category.integer('receipts_id')
      .unsigned()
      .references('id')
      .inTable('receipts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      receipts_category.integer('category')
      .unsigned()
      .references('id')
      .inTable('category')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  .createTable('receipts_rimages', receipts_rimages => {
      receipts_rimages.integer('receipts_id')
      .unsigned()
      .references('id')
      .inTable('receipts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      receipts_rimages.integer('rimages_id')
      .unsigned()
      .references('id')
      .inTable('rimages')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
  
};

exports.down = function(knex) {
 return knex.schema.dropTableIfExists('receipts_rimages')
  .dropTableIfExists('receipts_category')
  .dropTableIfExists('users_receipts')
  .dropTableIfExists('rimages')
  .dropTableIfExists('category')
  .dropTableIfExists('receipts')
  .dropTableIfExists('users');
};
