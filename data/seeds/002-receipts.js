
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('receipts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('receipts').insert([
        { id: 1,
          transactionDate: '',
          merchant: 'Wal-Mart',
          amountSpent: '20.56' 
        },{ id: 2,
          transactionDate: '',
          merchant: 'Shell Corner Store',
          amountSpent: '30.00' 
        },{ id: 3,
          transactionDate: '',
          merchant: 'Carls JR',
          amountSpent: '9.27' 
        },
  
      ]);
    });
};
