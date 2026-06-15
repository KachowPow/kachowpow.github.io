import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Analytics.css'

export default function Analytics({ items }) {
  const generateDailyProgressData = () => {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        consistency: Math.floor(Math.random() * 40) + 60,
        itemsUpdated: Math.floor(Math.random() * 5) + 1,
      })
    }
    return last7Days
  }

  const generateProgressData = () => {
    return items.map((item) => ({
      name: item.bookTitle.substring(0, 20),
      progress: Math.round(
        ((item.currentChapter + item.tasksCompleted) / (item.totalChapters + item.totalTasks)) *
          100
      ) || 0,
    }))
  }

  const dailyData = generateDailyProgressData()
  const progressData = generateProgressData()

  const overallProgress = progressData.length
    ? Math.round(progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length)
    : 0

  return (
    <div className="analytics">
      <h2>📈 Analytics Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{items.length}</div>
            <div className="stat-label">Learning Items</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{overallProgress}%</div>
            <div className="stat-label">Average Progress</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">
              {items.reduce((sum, item) => sum + item.tasksCompleted, 0)}
            </div>
            <div className="stat-label">Tasks Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">7</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>📉 Daily Consistency Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consistency" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>📊 Progress by Item</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-section">
        <h3>💡 Insights</h3>
        <div className="insights-list">
          <div className="insight-item">
            <span className="insight-icon">✅</span>
            <span>You're on a 7-day learning streak! Keep it up!</span>
          </div>
          <div className="insight-item">
            <span className="insight-icon">🎯</span>
            <span>
              {items.length > 0
                ? `You have ${items.length} active learning items. Consider focusing on fewer items to increase depth.`
                : 'Start by adding your first learning item to begin tracking your progress!'}
            </span>
          </div>
          <div className="insight-item">
            <span className="insight-icon">📈</span>
            <span>Your consistency has improved 15% compared to last week!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
