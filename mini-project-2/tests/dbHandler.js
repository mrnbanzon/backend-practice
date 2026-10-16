import mongoose from 'mongoose';

export const connect = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  console.log('Database dropped');

  await mongoose.connection.close();
  console.log('Database connection closed');
};

export const clearDatabase = async () => {
  console.log('Clearing database...');
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  console.log('Database cleared');
};