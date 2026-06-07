import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const fallbackUri = 'mongodb+srv://riffatperveen:perveen0951@cluster0.hxajutz.mongodb.net/ecommerce?retryWrites=true&w=majority';
    const uri = process.env.MONGO_URI || fallbackUri;
    
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return uri;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;
