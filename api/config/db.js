import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI environment variable is completely missing in Vercel! You need to add it in your Vercel Project Settings -> Environment Variables.");
    }
    if (uri.includes('localhost')) {
      throw new Error("MONGO_URI is set to localhost, which Vercel cannot reach! Please set it to your MongoDB Atlas connection string.");
    }
    
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return uri;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;
