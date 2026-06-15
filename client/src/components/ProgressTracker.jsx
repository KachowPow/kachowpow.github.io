import { useState } from 'react'
import axios from 'axios'
import './ProgressTracker.css'

export default function ProgressTracker({ items, onUpdate }) {
  const [trackerItems, setTrackerItems] = useState(items)
  const [newItem, setNewItem] = useState({
    bookTitle: '',
    currentChapter: 0,
    totalChapters: 0,
    tasksCompleted: 0,
    totalTasks: 0,
  })
  const [editingId, setEditingId] = useState(null)

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!newItem.bookTitle.trim()) {
      alert('Please enter a book title')
      return
    }

    try {
      const response = await axios.post('/api/progress', newItem)
      setTrackerItems([...trackerItems, response.data])
      setNewItem({
        bookTitle: '',
        currentChapter: 0,
        totalChapters: 0,
        tasksCompleted: 0,
        totalTasks: 0,
      })
      alert('Progress item added!')
    } catch (error) {
      alert('Error adding progress item: ' + error.message)
    }
  }

  const handleUpdateItem = async (id, updates) => {
    try {
      const response = await axios.put(`/api/progress/${id}`, updates)
      setTrackerItems(trackerItems.map((item) => (item._id === id ? response.data : item)))
      setEditingId(null)
      onUpdate(trackerItems)
    } catch (error) {
      alert('Error updating progress: ' + error.message)
    }
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      await axios.delete(`/api/progress/${id}`)
      setTrackerItems(trackerItems.filter((item) => item._id !== id))
      onUpdate(trackerItems)
    } catch (error) {
      alert('Error deleting progress: ' + error.message)
    }
  }

  const getProgressPercentage = (item) => {
    const chapterProgress = item.totalChapters ? (item.currentChapter / item.totalChapters) * 100 : 0
    const taskProgress = item.totalTasks ? (item.tasksCompleted / item.totalTasks) * 100 : 0
    return Math.round((chapterProgress + taskProgress) / 2)
  }

  return (
    <div className="progress-tracker">
      <h2>📊 Progress Tracker</h2>

      <form onSubmit={handleAddItem} className="add-progress-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Book/Course Title"
            value={newItem.bookTitle}
            onChange={(e) => setNewItem({ ...newItem, bookTitle: e.target.value })}
          />
          <input
            type="number"
            placeholder="Current Chapter"
            min="0"
            value={newItem.currentChapter}
            onChange={(e) => setNewItem({ ...newItem, currentChapter: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Total Chapters"
            min="0"
            value={newItem.totalChapters}
            onChange={(e) => setNewItem({ ...newItem, totalChapters: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Tasks Done"
            min="0"
            value={newItem.tasksCompleted}
            onChange={(e) => setNewItem({ ...newItem, tasksCompleted: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Total Tasks"
            min="0"
            value={newItem.totalTasks}
            onChange={(e) => setNewItem({ ...newItem, totalTasks: parseInt(e.target.value) })}
          />
          <button type="submit" className="primary">
            Add Item
          </button>
        </div>
      </form>

      <div className="tracker-table-container">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Book/Course</th>
              <th>Chapters</th>
              <th>Tasks</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trackerItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">
                  No progress items yet. Add one to start tracking!
                </td>
              </tr>
            ) : (
              trackerItems.map((item) => (
                <tr key={item._id}>
                  <td className="title-cell">{item.bookTitle}</td>
                  <td className="chapter-cell">
                    {item.currentChapter} / {item.totalChapters}
                  </td>
                  <td className="tasks-cell">
                    {item.tasksCompleted} / {item.totalTasks}
                  </td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${getProgressPercentage(item)}%` }}
                      />
                      <span className="progress-text">{getProgressPercentage(item)}%</span>
                    </div>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="secondary"
                      onClick={() => {
                        const newChapter = prompt(
                          'New chapter number:',
                          item.currentChapter.toString()
                        )
                        if (newChapter !== null) {
                          handleUpdateItem(item._id, { currentChapter: parseInt(newChapter) })
                        }
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="secondary"
                      onClick={() => {
                        const newTasks = prompt(
                          'Tasks completed:',
                          item.tasksCompleted.toString()
                        )
                        if (newTasks !== null) {
                          handleUpdateItem(item._id, { tasksCompleted: parseInt(newTasks) })
                        }
                      }}
                    >
                      ✅
                    </button>
                    <button
                      className="secondary"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
