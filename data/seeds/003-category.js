
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {
          id: 1,
          categoryName: 'Food'
        },
        {
          id: 2,
          categoryName: 'Gas'
        },
        {
          id: 3,
          categoryName: 'Utilites'
        },
        {
          id: 4,
          categoryName: 'Household Supplies'
        },

      ]);
    });
};
