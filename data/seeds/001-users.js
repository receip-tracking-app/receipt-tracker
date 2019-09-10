
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 
          userName: 'user1', 
          password:'password0', 
          firstName:"John", 
          lastName:"Finkle", 
          email:'user1@email.com',
          address:"1234 Some St.", 
          city:"New City", 
          state:"Road Island", 
          phone:"555-555-5555", 
          profileImageURL:""  
        },
        {id: 2, 
          userName: 'user2', 
          password:'password2', 
          firstName:"Mary", 
          lastName:"Johnson", 
          email:'user2@email.com',
          address:"123456 Some New St.", 
          city:"Dalton", 
          state:"West Virgina", 
          phone:"555-555-1234", 
          profileImageURL:""  
        },
        {id: 3, 
          userName: 'user3', 
          password:'password3', 
          firstName:"Jessie", 
          lastName:"Smith", 
          email:'user3@email.com',
          address:"4321 Another Rd.", 
          city:"Berlison", 
          state:"Texas", 
          phone:"555-555-9854", 
          profileImageURL:""  
        }
      ]);
    });
};
