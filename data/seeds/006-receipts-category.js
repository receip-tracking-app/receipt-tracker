
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('receipts_category').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('receipts_category').insert([
        {
           receipts_id: 1 ,
           category: 4
          },
          {
            receipts_id: 2 ,
            category: 2
           },
           {
            receipts_id: 3 ,
            category: 1
           },
           {
            receipts_id: 4 ,
            category: 1
           },
           {
            receipts_id: 5 ,
            category: 2
           },
          
      ]);
    });
};
