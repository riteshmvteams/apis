import mongoose from 'mongoose';

const factSchema = new mongoose.Schema(
  {
    fact: {
      type: String,
      required: [true, 'Fact is required'],
      unique: true
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category id Required']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Category id Required']
    },
    tags: {
      type: [String],
      required: [true, 'Tag is required']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Fact', factSchema);
