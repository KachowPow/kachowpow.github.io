import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    category: {
      type: String,
      default: 'General',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Document', documentSchema)
