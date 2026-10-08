import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mini_project_2_db';

await mongoose.connect(uri, {
  dbName: 'mini_project_2_db',
});

console.log('Connected to MongoDB');
