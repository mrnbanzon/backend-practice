import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
});

export default model('Product', productSchema);