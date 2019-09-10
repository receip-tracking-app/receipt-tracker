
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('receipts_rimages').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('receipts_rimages').insert([
        {
           receipts_id: 1,
           rimages_id: 1
          },
          {
            receipts_id: 2,
            rimages_id: 3
           },
           {
            receipts_id: 3,
            rimages_id: 3
           },
       
      ]);
    });
};
