import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: String,
  content: String,
});

export default model('Post', postSchema);