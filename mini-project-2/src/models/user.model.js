import mongoose from "mongoose";
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from query results by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await argon2.hash(this.password);
});

userSchema.methods.comparePassword = async (candidate) => {
  return await argon2.verify(this.password, candidate);
};

export default mongoose.model('User', userSchema);