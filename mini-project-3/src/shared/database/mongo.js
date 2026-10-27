import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mini_project_3_db'; 

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (err) {
    console.error(`DB Connection Error: ${err.message || err}`);
    process.exit(1);
  }
};

export { connectDB };