import express from 'express'
import Document from '../models/Document.js'

const router = express.Router()

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 }).limit(100)
    res.json(documents)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single document
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }
    res.json(document)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create document
router.post('/', async (req, res) => {
  try {
    const { title, content, tags, category } = req.body

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' })
    }

    const document = new Document({
      title,
      content,
      tags: tags || [],
      category: category || 'General',
    })

    await document.save()
    res.status(201).json(document)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update document
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags, category } = req.body
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, category },
      { new: true, runValidators: true }
    )

    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json(document)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id)

    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json({ message: 'Document deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
