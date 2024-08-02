import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required']
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is Required']
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
