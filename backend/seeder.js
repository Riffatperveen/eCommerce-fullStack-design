import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

// Top level connectDB removed

const products = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics',
    stock: 15,
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Fitness tracking smartwatch with heart rate monitor.',
    category: 'Electronics',
    stock: 10,
  },
  {
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Comfortable and lightweight running shoes for daily wear.',
    category: 'Clothing',
    stock: 20,
  },
  {
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
    description: 'RGB mechanical keyboard with tactile switches.',
    category: 'Electronics',
    stock: 5,
  },
  {
    name: 'Coffee Maker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
    description: 'Programmable coffee maker with thermal carafe.',
    category: 'Home Appliances',
    stock: 8,
  },
  {
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    description: 'Non-slip eco-friendly yoga mat.',
    category: 'Fitness',
    stock: 25,
  },
  {
    name: 'Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-1011e1f70dd2?w=500&q=80',
    description: 'High-precision optical gaming mouse with customizable buttons.',
    category: 'Electronics',
    stock: 12,
  },
  {
    name: 'Backpack',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    description: 'Durable water-resistant backpack for school and travel.',
    category: 'Accessories',
    stock: 18,
  },
  {
    name: 'Water Bottle',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    description: 'Stainless steel insulated water bottle.',
    category: 'Accessories',
    stock: 30,
  },
  {
    name: 'Desk Lamp',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    category: 'Home Appliances',
    stock: 15,
  },
];

export const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('123456', 10),
        isAdmin: false,
      }
    ]);

    await Product.insertMany(products);

    console.log('Data Imported!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

if (process.argv[2] === '-d') {
  connectDB().then(() => {
    importData().then(() => process.exit()).catch(() => process.exit(1));
  });
}
