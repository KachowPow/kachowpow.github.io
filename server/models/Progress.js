import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true,
    },
    currentChapter: {
      type: Number,
      default: 0,
    },
    totalChapters: {
      type: Number,
      default: 0,
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
    totalTasks: {
      type: Number,
      default: 0,
    },
    dailyProgress: [
      {
        date: Date,
        consistency: Number,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Progress', progressSchema)
