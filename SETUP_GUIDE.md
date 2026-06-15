# 📚 Learning Tracker - Complete Setup Guide

An interactive Notion-like website for tracking your learning progress. Upload your notes, manage reading progress with chapter tracking, complete tasks, and visualize your learning consistency through beautiful charts and analytics.

## ✨ Features

- **📝 Document Management** - Upload and store your learning notes and insights
- **📊 Progress Tracking** - Track chapters read and tasks completed across multiple books/courses with visual progress bars
- **📈 Analytics Dashboard** - View your learning consistency, daily progress trends, and achievement stats
- **🎯 Task Completion** - Monitor your task completion rate for each learning item
- **💾 Data Persistence** - All your data is saved in MongoDB for long-term tracking
- **⚡ Real-time Updates** - Instant updates across all features with smooth animations

## 🏗️ Project Structure

```
learning-tracker/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── DocumentUploader.jsx
│   │   │   ├── ProgressTracker.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── *.css      # Component styles
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json
├── server/                 # Express.js backend
│   ├── models/            # MongoDB schemas
│   │   ├── Document.js
│   │   └── Progress.js
│   ├── routes/            # API endpoints
│   │   ├── documents.js
│   │   └── progress.js
│   ├── index.js           # Server entry point
│   ├── .env.example       # Environment variables template
│   └── package.json
├── package.json           # Root package (scripts for running both)
└── README.md             # This file

```

## 🚀 Quick Start (5 Minutes)

### Step 1: Prerequisites

Make sure you have:
- **Node.js v16+** - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - **Local:** [Install MongoDB Community](https://docs.mongodb.com/manual/installation/)
  - **Cloud:** [MongoDB Atlas (free tier)](https://www.mongodb.com/cloud/atlas)

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### Step 3: Setup Environment

```bash
# Copy the example .env file
cp server/.env.example server/.env

# Edit server/.env with your MongoDB URI
# If using local MongoDB:
#   MONGODB_URI=mongodb://localhost:27017/learning-tracker
# If using MongoDB Atlas (replace with your credentials):
#   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-tracker
```

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows: Open Command Prompt and run
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and update it in `server/.env`

### Step 5: Run Everything

From the root directory:

```bash
npm run dev
```

This starts:
- **Frontend:** http://localhost:3000 (React Vite app)
- **Backend:** http://localhost:5000 (Express API)

You should see both servers starting in the terminal.

## 📖 Usage Guide

### 1. Upload Learning Notes 📝

1. Click the **Documents** tab
2. Enter a title (e.g., "Chapter 5 - React Hooks")
3. Write your learning notes in the content box
4. Click "Upload Document"
5. Your notes appear as cards below

### 2. Track Your Progress 📊

1. Click the **Progress Tracker** tab
2. Add a new learning item:
   - **Book/Course Title** - What you're learning
   - **Current Chapter** - Which chapter you're on (0-X)
   - **Total Chapters** - How many chapters total
   - **Tasks Done** - How many tasks you've completed
   - **Total Tasks** - Total tasks in the course
3. Click **Add Item**
4. Update progress:
   - Click ✏️ button to update chapter number
   - Click ✅ button to mark tasks completed
   - Click 🗑️ to delete an item

The progress bar automatically calculates: `(chapters + tasks) / 2`

### 3. View Analytics 📈

1. Click the **Analytics** tab
2. See your statistics:
   - **Learning Items** - How many books/courses you're tracking
   - **Average Progress** - Overall completion percentage
   - **Tasks Completed** - Total tasks done
   - **Day Streak** - Consecutive learning days
3. Review the charts:
   - **Daily Consistency Trend** - Line chart showing last 7 days
   - **Progress by Item** - Bar chart showing individual item progress
4. Read AI-generated insights about your learning habits

## 🔧 Available Scripts

```bash
# Development (runs both frontend and backend)
npm run dev

# Frontend only
npm run dev:client

# Backend only
npm run dev:server

# Build frontend
npm run build:client

# Build backend
npm run build:server

# Start production server (backend only)
npm start
```

## 📡 API Reference

All endpoints return JSON. Base URL: `http://localhost:5000/api`

### Documents Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/documents` | Get all documents |
| GET | `/documents/:id` | Get specific document |
| POST | `/documents` | Create new document |
| PUT | `/documents/:id` | Update document |
| DELETE | `/documents/:id` | Delete document |

**POST/PUT Document Body:**
```json
{
  "title": "Chapter 3 Notes",
  "content": "What I learned...",
  "tags": ["react", "hooks"],
  "category": "Programming"
}
```

### Progress Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/progress` | Get all progress items |
| GET | `/progress/:id` | Get specific item |
| POST | `/progress` | Create progress item |
| PUT | `/progress/:id` | Update progress item |
| DELETE | `/progress/:id` | Delete progress item |
| POST | `/progress/:id/daily` | Add daily tracking |

**POST/PUT Progress Body:**
```json
{
  "bookTitle": "Learning React",
  "currentChapter": 5,
  "totalChapters": 15,
  "tasksCompleted": 12,
  "totalTasks": 30
}
```

## 🎨 Customization

### Change Theme Colors

Edit `client/src/index.css`:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --accent-color: #3b82f6;      /* Change this for main color */
  --success-color: #10b981;      /* Change for success indicators */
  --warning-color: #f59e0b;      /* Change for warnings */
}
```

### Modify Component Styles

Each component has its own CSS file in `client/src/components/`:
- `Navbar.css` - Header styling
- `DocumentUploader.css` - Upload form styling
- `ProgressTracker.css` - Table and tracker styling
- `Analytics.css` - Dashboard styling

## 🐛 Troubleshooting

### Issue: "MongoDB connection error"
```
Error: Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Make sure MongoDB is running: `mongod`
- Or check your MongoDB Atlas connection string in `.env`
- Verify `MONGODB_URI` format is correct

### Issue: "Port 3000 already in use"
```
Error: EADDRINUSE :::3000
```
**Solution:** 
Edit `client/vite.config.js`:
```javascript
server: {
  port: 3001,  // Use different port
}
```

### Issue: "Frontend can't reach backend"
**Solution:**
1. Make sure both servers are running: `npm run dev`
2. Check the proxy in `client/vite.config.js` points to correct backend
3. Verify backend is running on http://localhost:5000/api/health

### Issue: "Cannot find module" errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules server/node_modules
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

## 🚀 Future Enhancements

Potential features to add:

1. **Search & Filter**
   - Search documents by title/content
   - Filter progress items by category

2. **Export Data**
   - Export progress as CSV/Excel
   - PDF reports of learning journey

3. **Notifications**
   - Reminders to log progress
   - Streak milestones

4. **Social Features**
   - Share progress with friends
   - Accountability partners
   - Study groups

5. **Advanced Analytics**
   - Heatmap of learning activity
   - Predicted completion dates
   - Time spent per chapter

6. **UI Improvements**
   - Dark mode toggle
   - Mobile-responsive design
   - Drag-and-drop file upload

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Axios** - HTTP client
- **Recharts** - Chart visualization
- **React Icons** - Icon set
- **CSS3** - Styling

### Backend
- **Node.js & Express** - Web framework
- **MongoDB & Mongoose** - Database & ODM
- **CORS** - Cross-origin requests
- **dotenv** - Environment config

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the API documentation
3. Check server logs for error messages
4. Verify all prerequisites are installed correctly

---

**Happy Learning! 🎓📚**

Start tracking your progress today and watch yourself grow as a learner!
