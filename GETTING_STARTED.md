# 🎯 Getting Started - Step by Step

## What You're Building

A **Notion-like learning tracker** with:
- 📝 Document uploads for your learning notes
- 📊 Progress tracking table (chapters, tasks, percentage bars)
- 📈 Analytics dashboard with charts and insights
- 💾 Data persisted in MongoDB
- ⚡ Real-time updates with smooth animations

---

## Pre-Setup (5 minutes)

### 1. Verify Prerequisites

Open PowerShell/Terminal and run:

```powershell
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version
```

**Don't have Node.js?** 
→ Download from https://nodejs.org/ (Latest LTS version)

**Don't have MongoDB?**
→ Either:
- Install local MongoDB: https://docs.mongodb.com/manual/installation/
- OR Use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas

---

## Setup (5 minutes)

### Option A: Windows Users (Easiest)

**Step 1:** Open File Explorer
- Navigate to your project folder
- Look for `setup.bat`
- **Double-click** it
- Let it install all dependencies

**Step 2:** Edit environment
- Open `server/.env` in a text editor
- Add your MongoDB connection string:
  ```env
  MONGODB_URI=mongodb://localhost:27017/learning-tracker
  ```

**Step 3:** Start MongoDB
- Open PowerShell
- Run: `mongod`
- Leave it running (new window)

**Step 4:** Start the app
- Open PowerShell in project folder
- Run: `npm run dev`
- Wait for "Server running on http://localhost:5000"

**Step 5:** Open browser
- Go to http://localhost:3000
- You should see the Learning Tracker!

---

### Option B: macOS/Linux Users

**Step 1:** Open Terminal

**Step 2:** Run setup script
```bash
# Give permission and run
chmod +x setup.sh
bash setup.sh
```

**Step 3:** Edit environment
```bash
# Edit server/.env
nano server/.env

# Add your MongoDB URI:
# MONGODB_URI=mongodb://localhost:27017/learning-tracker
```

**Step 4:** Start MongoDB
```bash
# If you installed locally
brew services start mongodb-community

# Or use MongoDB Atlas (update .env with connection string)
```

**Step 5:** Start the app
```bash
npm run dev
```

**Step 6:** Open browser
- Go to http://localhost:3000

---

### Option C: Docker Users (Includes MongoDB)

```bash
# Build and run everything (MongoDB, Backend, Frontend)
docker-compose up --build

# Access at http://localhost:3000
```

---

## First Launch

### What You'll See

When you open http://localhost:3000:

```
┌──────────────────────────────────────────────┐
│          📚 Learning Tracker                 │
│    Master your learning journey              │
├──────────────────────────────────────────────┤
│                                              │
│  [📝 Documents] [📊 Progress] [📈 Analytics]│
│                                              │
│  📝 Upload Learning Notes                    │
│  ┌────────────────────────────────────────┐  │
│  │ Title: [________________]               │  │
│  │ Content: [_____________________]        │  │
│  │ [📤 Upload Document]                    │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Your Documents                              │
│  ┌──────┐ ┌──────┐ ┌──────┐               │  │
│  │ Doc 1│ │ Doc 2│ │ Doc 3│  (empty now)  │  │
│  └──────┘ └──────┘ └──────┘               │  │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Tutorial: Upload Your First Document

### Step 1: Add a Document

1. Click the **📝 Documents** tab (already selected)
2. In the "Upload Learning Notes" section:
   - **Title:** Type: "React Fundamentals"
   - **Content:** Type: "Today I learned about components, JSX, and hooks. Components are reusable UI units..."
3. Click **📤 Upload Document**

### Expected Result
- Green success message appears
- Your document appears as a card below
- Card shows title, date, and content preview

---

## Tutorial: Track Your Progress

### Step 2: Add a Learning Item

1. Click the **📊 Progress Tracker** tab
2. In the form at the top:
   - **Book/Course Title:** "The Complete React Course"
   - **Current Chapter:** 5
   - **Total Chapters:** 20
   - **Tasks Done:** 12
   - **Total Tasks:** 30
3. Click **Add Item**

### Expected Result
```
┌──────────────────────────────────────────────┐
│ Book/Course          │ Chapters │ Tasks │ %  │
├──────────────────────┼──────────┼───────┼────┤
│ The Complete React   │ 5 / 20   │ 12/30 │45% │
│ Course               │    ✏️ ✅ 🗑️     │    │
└──────────────────────────────────────────────┘
```

### Edit Progress
- Click ✏️ button next to chapter to update chapter number
- Click ✅ button to mark more tasks completed
- Progress bar updates automatically

---

## Tutorial: View Analytics

### Step 3: Check Your Dashboard

1. Click the **📈 Analytics** tab
2. You'll see:

```
┌────────────────────────────────────────────┐
│ Learning Items │ Avg Progress │ Tasks │ 🔥│
│ 1              │ 45%          │ 12    │ 7 │
└────────────────────────────────────────────┘

[📉 Daily Consistency Trend (Line Chart)]
[📊 Progress by Item (Bar Chart)]

💡 Insights
├─ You're on a 7-day streak!
├─ You have 1 active item
└─ Your consistency improved 15%!
```

---

## What Each Tab Does

### 📝 Documents Tab
```
Purpose: Store and organize your learning notes
├─ Upload Form
│  ├─ Title input
│  ├─ Content textarea
│  └─ Upload button
└─ Documents Grid
   ├─ Document cards
   ├─ Title, date, preview
   └─ Click to read full content
```

### 📊 Progress Tracker Tab
```
Purpose: Track chapters read and tasks completed
├─ Add New Item Form
│  ├─ Book title
│  ├─ Current/Total chapters
│  ├─ Completed/Total tasks
│  └─ Add Item button
└─ Progress Table
   ├─ Book title column
   ├─ Chapters column
   ├─ Tasks column
   ├─ Progress bar (%)
   └─ Action buttons (edit, update, delete)
```

### 📈 Analytics Tab
```
Purpose: Visualize your learning journey
├─ Statistics Cards (4 total)
│  ├─ Learning items count
│  ├─ Average progress %
│  ├─ Total tasks completed
│  └─ Day streak
├─ Charts Section
│  ├─ Daily consistency trend (7 days)
│  └─ Progress by item (bar chart)
└─ Insights
   ├─ AI-generated recommendations
   └─ Learning habits summary
```

---

## Quick Reference

### Common Actions

**Add Document:**
1. Documents tab → Fill form → Upload

**Add Learning Item:**
1. Progress tab → Fill form → Add Item

**Update Progress:**
1. Progress tab → Click ✏️ for chapter or ✅ for tasks

**Delete Item:**
1. Progress tab → Click 🗑️ button

**Check Analytics:**
1. Analytics tab → View charts and stats

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Focus form input | `Tab` |
| Submit form | `Enter` |
| Navigate tabs | `Click` tab buttons |

---

## Common First Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Make sure `mongod` is running
- Or verify MongoDB Atlas connection string in `server/.env`

### Issue: "Port 3000 already in use"
**Solution:**
- Stop other apps using port 3000
- Or edit `client/vite.config.js` to use different port

### Issue: "Nothing appears on page"
**Solution:**
- Check browser console (F12)
- Make sure backend is running (`npm run dev:server`)
- Refresh page (Ctrl+R / Cmd+R)

### Issue: "Backend URL error"
**Solution:**
- Make sure backend is running on http://localhost:5000
- Check proxy in `client/vite.config.js`

---

## Next Steps After First Launch

1. ✅ Upload 5-10 documents with your learning notes
2. ✅ Add 3-5 learning items to track
3. ✅ Update progress daily
4. ✅ Check analytics to see patterns
5. ✅ Customize colors (edit `client/src/index.css`)
6. ✅ Deploy to production (see SETUP_GUIDE.md)

---

## Project Structure Summary

```
Your Project
├── client/        ← Frontend (React app)
├── server/        ← Backend (API server)
├── SETUP_GUIDE.md ← Detailed setup help
└── README_NEW.md  ← Project overview
```

---

## Need More Help?

**Check these files:**
1. **SETUP_GUIDE.md** - Complete documentation
2. **PROJECT_SUMMARY.md** - What I built
3. **ARCHITECTURE.md** - How it works
4. **QUICK_START.txt** - Commands reference

---

## Customization Ideas (After Running)

Once it's working, try:

1. **Change Colors**
   - Edit `client/src/index.css`
   - Modify CSS variables

2. **Add Features**
   - Search documents
   - Filter by category
   - Export data
   - Dark mode

3. **Improve UI**
   - Add icons
   - Change layout
   - Add more charts

---

## Success Checklist

- ✅ All dependencies installed
- ✅ MongoDB running
- ✅ Frontend loaded (http://localhost:3000)
- ✅ Backend running (http://localhost:5000)
- ✅ Can upload documents
- ✅ Can add learning items
- ✅ Can see analytics
- ✅ Updates happen in real-time

**If all ✅, you're ready to start learning!** 🎓

---

## Troubleshooting Flowchart

```
App not loading?
├─ YES → Frontend issue
│  ├─ Check http://localhost:3000
│  ├─ Check browser console (F12)
│  └─ Run: npm run dev:client
│
└─ NO → Continue...

Backend errors?
├─ YES → Backend issue
│  ├─ Check http://localhost:5000/api/health
│  ├─ Check server terminal
│  └─ Run: npm run dev:server
│
└─ NO → Continue...

Database errors?
├─ YES → MongoDB issue
│  ├─ Is mongod running?
│  ├─ Check .env MONGODB_URI
│  └─ Verify connection string
│
└─ NO → Success! Everything works!
```

---

## Time Estimates

| Task | Time |
|------|------|
| Install dependencies | 3 min |
| Setup environment | 1 min |
| Start app | 1 min |
| Upload first document | 1 min |
| Add learning item | 1 min |
| **Total** | **~7 minutes** |

---

## Pro Tips

1. **Daily Updates** - Update your progress daily for accurate stats
2. **Detailed Notes** - Write specific notes, not just summaries
3. **Set Goals** - Aim for specific chapter/task targets
4. **Review** - Check analytics weekly to see patterns
5. **Share** - Show your progress to accountability partners

---

**You're all set! Start tracking your learning today! 🚀📚**
