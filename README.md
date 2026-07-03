# TaskFlow - Full Stack Task Management System

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features user authentication and task CRUD operations with a responsive modern UI.

![TaskFlow](https://img.shields.io/badge/TaskFlow-Task%20Management-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Challenges](#challenges)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

TaskFlow is a task management system designed to help users organize their daily tasks efficiently. Built with modern web technologies, it provides a seamless experience across devices with task management and user authentication.

### Key Highlights
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Task Management**: Full CRUD operations with validation and error handling
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface built with Tailwind CSS

---

## ✨ Features

### Authentication
- ✅ User registration with email validation
- ✅ User login with JWT token authentication
- ✅ Secure logout with token cleanup
- ✅ Protected routes with automatic redirect
- ✅ Session persistence with localStorage
- ✅ Auto-logout on token expiry (401 handling)

### Task Management
- ✅ Create tasks with title, description, due date, priority, and status
- ✅ View all tasks in a responsive grid layout
- ✅ View individual task details
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation dialog
- ✅ Mark tasks as complete/pending
- ✅ Overdue task indicator

### User Experience
- ✅ Loading states with spinners
- ✅ Empty states with helpful messages
- ✅ Toast notifications (success, error, warning, info)
- ✅ Form validation with real-time feedback
- ✅ Confirmation dialogs for destructive actions
- ✅ Color-coded badges for priority and status

### Security
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ User task isolation (users only see their own tasks)
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Environment variable protection

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and dev server
- **React Router 6.20.0** - Client-side routing
- **Axios 1.6.0** - HTTP client
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js 18.0.0** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 7.0.0** - ODM for MongoDB
- **bcryptjs 2.4.3** - Password hashing
- **jsonwebtoken 9.0.0** - JWT authentication
- **dotenv 16.0.0** - Environment variables
- **Helmet 7.0.0** - Security headers
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools
- **ES Modules** - Modern JavaScript modules
- **Git** - Version control
- **VS Code** - IDE

---

## 📁 Folder Structure

```
Task Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Global error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── .gitignore                # Git ignore rules
│   ├── server.js                 # Express server
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── vite.svg              # Vite logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── TaskCard.jsx      # Task display card
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   ├── Toast.jsx        # Toast notification
│   │   │   ├── ToastContainer.jsx # Toast container
│   │   │   └── EmptyState.jsx   # Empty state component
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   ├── TaskContext.jsx  # Task state
│   │   │   └── ToastContext.jsx # Toast state
│   │   ├── hooks/
│   │   │   └── useAuth.js       # Custom hooks
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx    # Login page
│   │   │   ├── RegisterPage.jsx # Registration page
│   │   │   ├── DashboardPage.jsx # Main dashboard
│   │   │   ├── CreateTaskPage.jsx # Create task form
│   │   │   ├── EditTaskPage.jsx # Edit task form
│   │   │   ├── TaskDetailsPage.jsx # Task details
│   │   │   └── NotFoundPage.jsx # 404 page
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── services/
│   │   │   └── api.js           # Axios instance
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── .gitignore                # Git ignore rules
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── vite.config.js            # Vite configuration
│   └── postcss.config.js         # PostCSS configuration
│
└── README.md                     # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- MongoDB Atlas account (free tier works)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

### Step 2: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier M0)
4. Create a database user with username and password
5. Whitelist IP address (0.0.0.0/0 for development)
6. Get your connection string

### Step 3: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task_db
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRY=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Expected output: `✅ Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Expected output: `Local: http://localhost:5173/`

### Step 6: Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| PORT | Yes | Server port | 5000 |
| MONGODB_URI | Yes | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Yes | Secret key for JWT tokens | 1e39dcd83fc1453ec5c7f4cfadab978dbd200618db91b3d2caea2f46d432ad02 |
| JWT_EXPIRY | No | JWT token expiry time | 24h |
| NODE_ENV | No | Environment mode | development |
| FRONTEND_URL | No | Frontend URL for CORS | http://localhost:5173 |

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| VITE_API_URL | Yes | Backend API URL | http://localhost:5000/api |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "dueDate": "2024-12-31",
  "priority": "high",
  "status": "pending"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "64a1b2c3d4e5f6789012346",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "dueDate": "2024-12-31",
    "priority": "high",
    "status": "pending",
    "user": "64a1b2c3d4e5f6789012345",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "title": "Complete project documentation",
      "description": "Write comprehensive README",
      "dueDate": "2024-12-31",
      "priority": "high",
      "status": "pending",
      "user": "64a1b2c3d4e5f6789012345",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "64a1b2c3d4e5f6789012346",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "dueDate": "2024-12-31",
    "priority": "high",
    "status": "pending",
    "user": "64a1b2c3d4e5f6789012345",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "completed"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "64a1b2c3d4e5f6789012346",
    "title": "Updated task title",
    "description": "Write comprehensive README",
    "dueDate": "2024-12-31",
    "priority": "high",
    "status": "completed",
    "user": "64a1b2c3d4e5f6789012345",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error details"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 🌐 Deployment

### Backend Deployment (Render)

1. **Prepare for Production**
   ```bash
   # Update backend/.env for production
   NODE_ENV=production
   PORT=$PORT
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
   JWT_SECRET=production_jwt_secret
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

2. **Deploy to Render**
   - Create account at [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variables
   - Deploy

3. **Get Backend URL**
   - Render will provide a URL like: `https://taskflow-backend.onrender.com`

### Frontend Deployment (Vercel)

1. **Prepare for Production**
   ```bash
   # Update frontend/.env for production
   VITE_API_URL=https://taskflow-backend.onrender.com/api
   ```

2. **Deploy to Vercel**
   - Create account at [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Connect your GitHub repository
   - Select `frontend` folder as root directory
   - Framework preset: Vite
   - Add environment variable: `VITE_API_URL`
   - Deploy

3. **Get Frontend URL**
   - Vercel will provide a URL like: `https://taskflow.vercel.app`

### Update CORS Configuration

After deployment, update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://taskflow.vercel.app',
  credentials: true
}));
```

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Task Details
![Task Details](screenshots/task-details.png)

### Create Task
![Create Task](screenshots/create-task.png)

*Note: Screenshots should be added after deployment*

---

## 🏆 Challenges

### 1. JWT Token Management
**Challenge:** Handling token expiry and automatic logout
**Solution:** Implemented axios response interceptor to detect 401 errors, clear localStorage, and dispatch custom event for AuthContext to handle logout.

### 2. User Task Isolation
**Challenge:** Ensuring users can only access their own tasks
**Solution:** Added middleware to verify user ID in task routes, filtering tasks by user ID in all queries.

### 3. Form Validation
**Challenge:** Providing real-time validation feedback
**Solution:** Implemented field-level validation with error clearing on input change, using controlled components and validation functions.

### 4. State Management
**Challenge:** Managing complex state across multiple components
**Solution:** Used Context API with custom hooks (useAuth, useTasks, useToast) for centralized state management.

### 5. Responsive Design
**Challenge:** Creating a consistent experience across devices
**Solution:** Used Tailwind CSS with responsive breakpoints (sm, md, lg) and grid layouts that adapt to screen size.

---

## 🚀 Future Improvements

### Planned Features
- [ ] Search tasks
- [ ] Filter tasks by status
- [ ] Filter tasks by priority
- [ ] Pagination
- [ ] Dark mode toggle
- [ ] Profile page
- [ ] Task statistics dashboard
- [ ] Email notification simulation
- [ ] Drag-and-drop task board
- [ ] Role-based access: Admin/User

### Technical Improvements
- [ ] Unit testing with Jest and React Testing Library
- [ ] E2E testing with Playwright
- [ ] API rate limiting
- [ ] Caching with Redis
- [ ] Code splitting
- [ ] Service worker for offline support
- [ ] PWA capabilities
- [ ] Internationalization (i18n)

### Performance Optimizations
- [ ] Lazy loading components
- [ ] Virtual scrolling for large task lists
- [ ] CDN for static assets
- [ ] Database query optimization
- [ ] Compression middleware

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Sandeep Kumar Yadav**

- GitHub: [@sandeepkyadav017](https://github.com/sandeepkyadav017)
- LinkedIn: [Sandeep Kumar Yadav](https://linkedin.com/in/sandeepkyadav017)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the excellent database
- Tailwind CSS for the utility-first CSS framework
- Vercel for frontend hosting
- Render for backend hosting

---

## 📞 Support

If you have any questions or issues, please:
- Open an issue on GitHub
- Contact the author
- Check the documentation

---

**Built with ❤️ using React, Node.js, and MongoDB**
