module.exports = async function() {
  if (global.__MONGOD__) {
    console.log('Stopping MongoDB Memory Server...');
    await global.__MONGOD__.stop();
    console.log('MongoDB Memory Server stopped');
  }
};