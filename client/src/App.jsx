import { useState, useEffect } from 'react'
import axios from 'axios'
import DocumentUploader from './components/DocumentUploader'
import ProgressTracker from './components/ProgressTracker'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('documents')
  const [documents, setDocuments] = useState([])
  const [progressItems, setProgressItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDocuments()
    fetchProgressItems()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/documents')
      setDocuments(response.data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const fetchProgressItems = async () => {
    try {
      const response = await axios.get('/api/progress')
      setProgressItems(response.data)
    } catch (error) {
      console.error('Error fetching progress items:', error)
    }
  }

  const handleDocumentUpload = (newDocument) => {
    setDocuments([...documents, newDocument])
  }

  const handleProgressUpdate = (updatedProgress) => {
    setProgressItems(updatedProgress)
    fetchProgressItems()
  }

  return (
    <div className="app">
      <Navbar />
      <div className="app-container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            📝 Documents
          </button>
          <button
            className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            📊 Progress Tracker
          </button>
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        <div className="content">
          {activeTab === 'documents' && (
            <div className="tab-content">
              <DocumentUploader onUpload={handleDocumentUpload} />
              <div className="documents-list">
                <h2>Your Documents</h2>
                {documents.length === 0 ? (
                  <p className="empty-state">No documents yet. Upload your first learning note!</p>
                ) : (
                  <div className="documents-grid">
                    {documents.map((doc) => (
                      <div key={doc._id} className="document-card">
                        <h3>{doc.title}</h3>
                        <p className="doc-meta">{new Date(doc.createdAt).toLocaleDateString()}</p>
                        <p className="doc-preview">{doc.content.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <ProgressTracker items={progressItems} onUpdate={handleProgressUpdate} />
          )}

          {activeTab === 'analytics' && (
            <Analytics items={progressItems} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
