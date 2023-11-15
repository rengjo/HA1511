// src/App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    // Beim Mounten der Komponente Daten vom Backend abrufen
    fetch('http://backend-container:5000/products')  // Beachte die Verwendung des Container-Namens als Host
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddProduct = () => {
    // Neues Produkt zum Backend hinzufügen
    fetch('http://backend-container:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({ name: '', description: '', price: 0 });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div>
      <h1>Product Management</h1>
      
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.description} - ${product.price}
          </li>
        ))}
      </ul>

      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default App;