import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cache-aside-example';

(async() => {
  await mongoose.connect(uri, {
    dbName: 'cache_aside_example_db',
  });
  console.log('Connected to MongoDB');
})();

