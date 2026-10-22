import createApp from './app.js';

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`mini-project-3 listening on port ${PORT}`);
});