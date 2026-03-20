const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

const categories = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Clothing', description: 'Apparel and fashion items' },
  { name: 'Home & Kitchen', description: 'Home appliances and kitchen tools' }
];

const products = [
  {
    name: 'Laptop Pro 15',
    description: 'A powerful laptop for professionals',
    price: 1299.99,
    quantity: 15,
    category: 'Electronics',
    brand: 'Dell',
    sku: 'DELL-LP15-001',
    inStock: true
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise cancelling bluetooth headphones',
    price: 199.99,
    quantity: 30,
    category: 'Electronics',
    brand: 'Sony',
    sku: 'SONY-WH-002',
    inStock: true
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for all terrains',
    price: 89.99,
    quantity: 50,
    category: 'Clothing',
    brand: 'Nike',
    sku: 'NIKE-RS-003',
    inStock: true
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with timer',
    price: 49.99,
    quantity: 20,
    category: 'Home & Kitchen',
    brand: 'Cuisinart',
    sku: 'CUIS-CM-004',
    inStock: true
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with GPS',
    price: 299.99,
    quantity: 25,
    category: 'Electronics',
    brand: 'Apple',
    sku: 'APPL-SW-005',
    inStock: true
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await Category.deleteMany({});
  await Product.deleteMany({});

  await Category.insertMany(categories);
  console.log(`✅ Seeded ${categories.length} categories`);

  await Product.insertMany(products);
  console.log(`✅ Seeded ${products.length} products`);

  await mongoose.disconnect();
  console.log('✅ Done');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});