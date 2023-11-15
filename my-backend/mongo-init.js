// mongo-init.js

db.createUser({
    user: 'myuser',
    pwd: 'mypassword',
    roles: [
      {
        role: 'readWrite',
        db: 'mydatabase',
      },
    ],
  });
  
  db.products.insertMany([
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 29.99,
    },
  ]);
  