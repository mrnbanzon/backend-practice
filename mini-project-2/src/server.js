import createApp from './app.js';

const PORT = process.env.PORT || 3000;

const server = createApp();

server.listen(PORT, () => {
  console.log(`mini-project-2 server is running on port ${PORT}`);
});