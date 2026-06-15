import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">📚</span>
          <h1>Learning Tracker</h1>
        </div>
        <div className="navbar-subtitle">Master your learning journey</div>
      </div>
    </nav>
  )
}
