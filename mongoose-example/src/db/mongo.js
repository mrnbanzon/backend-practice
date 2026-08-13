import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

(async() => {
  await mongoose.connect(uri, {
    dbName: 'mydb',
  });
  console.log('Connected to MongoDB');
})();

