import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  category: {
    type: String,
    index: true,
  },
  tags: [{
    type: String,
    index: true,
  }],
  inStock: {
    type: Boolean,
    default: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

schema.index({ name: 'text', description: 'text' }); // text index for search; expensive - consider mongodb atlas search for production environments

export default mongoose.Model('Product', schema);