# 📚 Learning Tracker

> An interactive Notion-like platform for tracking your learning journey with progress analytics, note-taking, and daily consistency tracking.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Overview

Learning Tracker is a full-stack web application designed to help you:

- 📝 **Upload and organize** your learning notes and insights
- 📊 **Track progress** across multiple books, courses, or learning projects
- 📈 **Visualize** your learning consistency through interactive charts
- 🎯 **Monitor** chapter completion and task progress with real-time updates

Perfect for students, developers, or anyone serious about tracking their learning journey.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 **Document Management** | Upload, store, and organize your learning notes |
| 📊 **Progress Tracker** | Spreadsheet-like table showing chapters, tasks, and progress bars |
| 📈 **Analytics Dashboard** | View daily consistency trends, progress charts, and learning statistics |
| 🎯 **Task Tracking** | Monitor task completion across all learning items |
| 💾 **Persistent Storage** | All data saved to MongoDB for long-term tracking |
| ⚡ **Real-time Updates** | Instant synchronization with beautiful animations |

## 🏗️ Tech Stack

### Frontend
- React 18 with Vite (fast development and build)
- Recharts for beautiful data visualization
- Axios for API communication
- CSS3 for modern styling

### Backend
- Express.js for REST API
- MongoDB with Mongoose ODM
- CORS for cross-origin requests
- Dotenv for configuration

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)

### Installation (3 steps)

**1. Clone and install dependencies:**
```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

**2. Configure environment:**
```bash
cp server/.env.example server/.env
# Edit server/.env and add your MongoDB connection string
```

**3. Start the application:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Adding Learning Notes
1. Go to **Documents** tab
2. Enter title and content of what you learned
3. Click **Upload Document**
4. View all your notes in the documents grid

### Tracking Progress
1. Go to **Progress Tracker** tab
2. Add a new learning item with:
   - Book/Course title
   - Current chapter and total chapters
   - Tasks completed and total tasks
3. Update progress using the inline edit buttons
4. Track your completion percentage with visual progress bars

### Viewing Analytics
1. Go to **Analytics** tab
2. See your learning statistics and trends
3. View daily consistency and progress by item
4. Read AI-generated insights about your learning patterns

## 📁 Project Structure

```
learning-tracker/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app
│   │   └── index.css      # Global styles
│   ├── vite.config.js
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── index.js           # Server entry
│   └── package.json
├── SETUP_GUIDE.md         # Detailed setup instructions
├── QUICK_START.txt        # Quick command reference
└── docker-compose.yml     # Docker setup
```

## 🔧 Available Commands

```bash
# Start both frontend and backend
npm run dev

# Frontend only
npm run dev:client

# Backend only  
npm run dev:server

# Build for production
npm run build

# Production mode
npm start
```

## 📡 API Endpoints

### Documents
- `GET /api/documents` - Fetch all documents
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Progress
- `GET /api/progress` - Fetch all progress items
- `POST /api/progress` - Create progress item
- `PUT /api/progress/:id` - Update progress item
- `DELETE /api/progress/:id` - Delete progress item

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed API documentation.

## 🐛 Troubleshooting

**MongoDB connection error?**
- Ensure MongoDB is running locally with `mongod` or
- Update your MongoDB Atlas connection string in `server/.env`

**Port already in use?**
- Edit port in `client/vite.config.js` or `server/index.js`

**Frontend can't reach backend?**
- Verify backend is running on http://localhost:5000
- Check the proxy setting in `client/vite.config.js`

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting tips.

## 🚢 Deployment

### Deploy Frontend (Vercel)
```bash
cd client
npm run build
# Deploy the dist/ folder to Vercel
```

### Deploy Backend
Use services like:
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Heroku](https://heroku.com/)
- [AWS](https://aws.amazon.com/)

## 🎨 Customization

### Change Theme Colors
Edit the CSS variables in `client/src/index.css`:
```css
:root {
  --accent-color: #3b82f6;  /* Change primary color */
  --success-color: #10b981; /* Change success color */
}
```

### Add Features
The codebase is well-structured for adding:
- Search and filtering
- User authentication
- Data export (CSV/PDF)
- Dark mode
- Mobile optimization

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Vite Guide](https://vitejs.dev/)

## 🤝 Contributing

Found a bug or have a feature idea? Feel free to open an issue or submit a pull request!

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 💡 Tips for Success

1. **Consistency is key** - Update your progress daily for accurate streaks
2. **Be specific** - Detailed notes are more valuable for future review
3. **Review insights** - Check the analytics regularly to identify patterns
4. **Set goals** - Aim for specific chapter and task targets

## 🎓 Learning Resources

If you're learning web development:
- [The Odin Project](https://www.theodinproject.com/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Happy Learning! 🚀**

Track your progress, stay consistent, and watch yourself grow.
