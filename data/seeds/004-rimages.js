
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rimages').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('rimages').insert([
        {id: 1, 
          imageURL: 'image1.jpg'
        },
        {id: 2, 
          imageURL: 'image2.jpg'
        },
        {id: 3, 
          imageURL: 'image3.jpg'
        },
        
      ]);
    });
};
