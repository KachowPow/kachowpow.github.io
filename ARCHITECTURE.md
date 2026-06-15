# Learning Tracker - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                             │
│              http://localhost:3000                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼─────────────┐        ┌───────▼────────────┐
    │  REACT FRONTEND  │        │  VITE BUILD TOOL   │
    │  (Port 3000)     │        │  (Dev Server)      │
    │                  │        │                    │
    │ ┌──────────────┐ │        │ Hot Module Reload  │
    │ │ Components:  │ │        │                    │
    │ ├─ Navbar      │ │        └────────────────────┘
    │ ├─ Documents   │ │
    │ ├─ Progress    │ │
    │ └─ Analytics   │ │
    │                │ │
    │ Libraries:     │ │
    │ ├─ Recharts    │ │  Axios API Calls
    │ ├─ React Icons │ │         │
    │ └─ CSS         │ │         │
    └────────────────┘ │         │
                       └─────────┼──────┐
                                 │      │
                    ┌────────────▼──┐   │
                    │                │   │
         ┌──────────▼──────────┐     │   │
         │  EXPRESS BACKEND    │     │   │
         │  (Port 5000)        │     │   │
         │                     │     │   │
         │ API Routes:         │     │   │
         │ ├─ /api/documents   ◄─────┼───┘
         │ └─ /api/progress    │     │
         │                     │     │
         │ Middleware:         │     │
         │ ├─ CORS             │     │
         │ ├─ Express JSON     │     │
         │ └─ Error Handler    │     │
         └────────┬────────────┘     │
                  │                  │
              Mongoose               │
              ODM Layer              │
                  │                  │
         ┌────────▼─────────────┐    │
         │   MONGODB            │    │
         │   Database           │    │
         │                      │    │
         │ Collections:         │    │
         │ ├─ documents         │    │
         │ │  ├─ title          │    │
         │ │  ├─ content        │    │
         │ │  ├─ tags           │    │
         │ │  └─ timestamps     │    │
         │ │                    │    │
         │ └─ progress_items    │    │
         │    ├─ bookTitle      │    │
         │    ├─ chapters       │    │
         │    ├─ tasks          │    │
         │    └─ daily_progress │    │
         │                      │    │
         └──────────────────────┘    │
                                     │
                    ┌────────────────┘
                    │
                 Health Check
```

## Data Flow Diagram

### 1. Upload Document Flow
```
User Input (Title + Content)
         │
         ▼
React Form Component
         │
         ▼
Axios POST /api/documents
         │
         ▼
Express Route Handler
         │
         ▼
Validate Data
         │
         ▼
Create Document Model
         │
         ▼
Save to MongoDB
         │
         ▼
Return Created Document
         │
         ▼
Update React State
         │
         ▼
Re-render Component
         │
         ▼
Display in Grid
```

### 2. Track Progress Flow
```
User Input (Book/Chapter/Tasks)
         │
         ▼
ProgressTracker Form
         │
         ▼
Axios POST /api/progress
         │
         ▼
Express Route Handler
         │
         ▼
Create Progress Model
         │
         ▼
Save to MongoDB
         │
         ▼
Return Created Item
         │
         ▼
Update React State
         │
         ▼
Calculate Progress %
         │
         ▼
Display in Table with Progress Bar
```

### 3. Analytics Flow
```
React Component Mounts
         │
         ▼
Axios GET /api/progress
         │
         ▼
MongoDB Returns All Items
         │
         ▼
Process Data:
├─ Calculate stats
├─ Generate chart data
└─ Create insights
         │
         ▼
Recharts Renders:
├─ Stat Cards
├─ Line Chart
├─ Bar Chart
└─ Insights List
```

## Component Hierarchy

```
App
├─ Navbar
│  └─ Brand + Title
│
├─ Tabs Navigation
│  ├─ Documents Tab
│  ├─ Progress Tab
│  └─ Analytics Tab
│
├─ Content Area
│  ├─ Documents Tab Content
│  │  ├─ DocumentUploader
│  │  │  └─ Form
│  │  └─ DocumentGrid
│  │     └─ DocumentCard (repeating)
│  │
│  ├─ Progress Tab Content
│  │  ├─ ProgressTracker
│  │  │  ├─ Add Form
│  │  │  └─ Progress Table
│  │  │     └─ TableRows (repeating)
│  │  └─ Action Buttons
│  │
│  └─ Analytics Tab Content
│     ├─ StatsGrid
│     │  └─ StatCard (repeating x4)
│     ├─ ChartsGrid
│     │  ├─ DailyConsistency Chart
│     │  └─ ProgressByItem Chart
│     └─ InsightsSection
│        └─ InsightItem (repeating)
```

## API Request/Response Examples

### Create Document
```
REQUEST:
POST /api/documents
Content-Type: application/json

{
  "title": "Chapter 5 - React Hooks",
  "content": "Learned about useState and useEffect...",
  "tags": ["react", "hooks"],
  "category": "Programming"
}

RESPONSE (201 Created):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Chapter 5 - React Hooks",
  "content": "Learned about useState and useEffect...",
  "tags": ["react", "hooks"],
  "category": "Programming",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Create Progress Item
```
REQUEST:
POST /api/progress
Content-Type: application/json

{
  "bookTitle": "Learning React",
  "currentChapter": 5,
  "totalChapters": 15,
  "tasksCompleted": 12,
  "totalTasks": 30
}

RESPONSE (201 Created):
{
  "_id": "507f1f77bcf86cd799439012",
  "bookTitle": "Learning React",
  "currentChapter": 5,
  "totalChapters": 15,
  "tasksCompleted": 12,
  "totalTasks": 30,
  "dailyProgress": [
    {
      "date": "2024-01-15T10:30:00Z",
      "consistency": 0
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│           PRODUCTION DEPLOYMENT                  │
└──────────────────────────────────────────────────┘
         │                              │
    ┌────▼────────┐            ┌───────▼──────────┐
    │   VERCEL    │            │   RENDER.IO /    │
    │   (Frontend)│            │   RAILWAY        │
    │             │            │   (Backend)      │
    │ ├─ Build    │            │                  │
    │ ├─ Deploy   │            │ ├─ Node Server   │
    │ │ dist/     │            │ ├─ Environment   │
    │ └─ Serve    │            │ └─ Auto-reload   │
    └─────────────┘            └────────┬─────────┘
         │                              │
         │                   ┌──────────▼──────┐
         │                   │                 │
         │                   │  MONGODB ATLAS  │
         │                   │  (Cloud DB)     │
         │                   │                 │
         │                   │ ├─ Collections  │
         │                   │ ├─ Indexes      │
         │                   │ └─ Backups      │
         │                   │                 │
         └───────────────────└─────────────────┘
```

## Security Considerations

```
Security Layers:
│
├─ CORS
│  └─ Restrict cross-origin requests
│
├─ Input Validation
│  └─ Validate all user inputs
│
├─ Error Handling
│  └─ Don't expose sensitive errors
│
├─ Environment Variables
│  └─ Keep secrets in .env
│
└─ Database Security
   └─ MongoDB Atlas encryption
```

## Scaling Strategy

```
Current: Single Instance
├─ Frontend: 1 Vite server
├─ Backend: 1 Express server
└─ Database: 1 MongoDB instance

Scalable To:
├─ Load Balancer
├─ Multiple Backend Instances
├─ Database Replication
└─ CDN for Frontend
```

---

This architecture is clean, scalable, and follows modern web development best practices!
