import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return uri;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;
