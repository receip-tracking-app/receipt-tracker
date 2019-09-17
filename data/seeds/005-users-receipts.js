
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_receipts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_receipts').insert([
        {
          users_id: 1,
          receipts_id: 1
        },
        {
          users_id: 2,
          receipts_id: 2
        },
        {
          users_id: 3,
          receipts_id: 3
        },
        {
          users_id: 1,
          receipts_id: 4
        }, 
        {
          users_id: 1,
          receipts_id: 5
        },
      ]);
    });
};
