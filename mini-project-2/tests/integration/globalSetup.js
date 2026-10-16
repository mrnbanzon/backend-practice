const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function() {
  process.env.REFRESH_TOKEN_SECRET = 'test_refresh_token_secret';
  process.env.ACCESS_TOKEN_SECRET = 'test_access_token_secret';

  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();

  console.log(`MongoDB Memory Server started at: ${process.env.MONGO_URI}`);
  
  global.__MONGOD__ = mongod; 
};