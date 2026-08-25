import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/basic_server_3_db';

(async () => {
  await mongoose.connect(uri, {
    dbName: 'basic_server_3_db',
  });
  console.log('Connected to MongoDB');
})();