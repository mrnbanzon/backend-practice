import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

productSchema.pre('save', function() {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
});

export default model('Product', productSchema);