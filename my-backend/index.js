const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importiere CORS-Modul

const app = express();
const port = 5000;

app.use(cors());  // Füge CORS hinzu
app.use(bodyParser.json());

// MongoDB-Verbindung herstellen
mongoose.connect('mongodb://database-container:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Produkt-Schema definieren
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

// API-Routen definieren

// Produkte abrufen
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Neues Produkt hinzufügen
app.post('/products', async (req, res) => {
  console.log('Received POST request:', req.body);
  const { name, description, price } = req.body;
  try {
    const newProduct = new Product({ name, description, price });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});