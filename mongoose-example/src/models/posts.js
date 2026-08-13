import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    index: true,
  }],
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

postSchema.pre('save', function() {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }

  if (this.isModified('published') && this.published) {
    this.publishedAt = new Date();
  } else if (this.isModified('published') && !this.published) {
    this.publishedAt = null;
  }
});

postSchema.virtual('summary').get(function() {
  return this.body.length > 100 ? this.body.substring(0, 100) + '...' : this.body;
});

postSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model('Post', postSchema);
