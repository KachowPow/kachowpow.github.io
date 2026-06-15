import express from 'express'
import Progress from '../models/Progress.js'

const router = express.Router()

// Get all progress items
router.get('/', async (req, res) => {
  try {
    const items = await Progress.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single progress item
router.get('/:id', async (req, res) => {
  try {
    const item = await Progress.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Progress item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create progress item
router.post('/', async (req, res) => {
  try {
    const { bookTitle, currentChapter, totalChapters, tasksCompleted, totalTasks } = req.body

    if (!bookTitle) {
      return res.status(400).json({ error: 'Book title is required' })
    }

    const progressItem = new Progress({
      bookTitle,
      currentChapter: currentChapter || 0,
      totalChapters: totalChapters || 0,
      tasksCompleted: tasksCompleted || 0,
      totalTasks: totalTasks || 0,
      dailyProgress: [
        {
          date: new Date(),
          consistency: 0,
        },
      ],
    })

    await progressItem.save()
    res.status(201).json(progressItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update progress item
router.put('/:id', async (req, res) => {
  try {
    const { bookTitle, currentChapter, totalChapters, tasksCompleted, totalTasks } = req.body

    const progressItem = await Progress.findByIdAndUpdate(
      req.params.id,
      {
        bookTitle,
        currentChapter,
        totalChapters,
        tasksCompleted,
        totalTasks,
      },
      { new: true, runValidators: true }
    )

    if (!progressItem) {
      return res.status(404).json({ error: 'Progress item not found' })
    }

    res.json(progressItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete progress item
router.delete('/:id', async (req, res) => {
  try {
    const progressItem = await Progress.findByIdAndDelete(req.params.id)

    if (!progressItem) {
      return res.status(404).json({ error: 'Progress item not found' })
    }

    res.json({ message: 'Progress item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add daily progress tracking
router.post('/:id/daily', async (req, res) => {
  try {
    const { consistency } = req.body
    const progressItem = await Progress.findById(req.params.id)

    if (!progressItem) {
      return res.status(404).json({ error: 'Progress item not found' })
    }

    progressItem.dailyProgress.push({
      date: new Date(),
      consistency: consistency || 0,
    })

    await progressItem.save()
    res.json(progressItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
