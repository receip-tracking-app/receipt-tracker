
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
        },{ id: 4,
          transactionDate: '',
          merchant: 'Jack In The Box',
          amountSpent: '5.88' 
        },{ id: 5,
          transactionDate: '',
          merchant: 'Valero',
          amountSpent: '50.01' 
        },
  
      ]);
    });
};
