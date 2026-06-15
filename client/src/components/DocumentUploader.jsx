import { useState } from 'react'
import axios from 'axios'
import './DocumentUploader.css'

export default function DocumentUploader({ onUpload }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/documents', {
        title,
        content,
      })
      onUpload(response.data)
      setTitle('')
      setContent('')
      alert('Document uploaded successfully!')
    } catch (error) {
      alert('Error uploading document: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="document-uploader">
      <h2>📝 Upload Learning Notes</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Chapter 5 - Advanced React Patterns"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here... Describe what you learned, key concepts, examples, etc."
            rows="6"
          />
        </div>

        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Uploading...' : '📤 Upload Document'}
        </button>
      </form>
    </div>
  )
}
