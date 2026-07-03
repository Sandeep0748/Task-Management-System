# Task Management System

A full-stack task management application with user authentication, task CRUD operations, and a modern responsive UI.

## 🚀 Live Demo

**Frontend (Vercel):** https://task-management-system-nine-hazel.vercel.app/login

**Backend API (Render):** https://task-management-system-1-yww8.onrender.com

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes for authenticated users

### Task Management
- Create, read, update, and delete tasks
- Task details view
- Dashboard with task overview
- Real-time task updates
- Task filtering and organization

### User Experience
- Modern, responsive UI with TailwindCSS
- Intuitive navigation with React Router
- Toast notifications for user feedback
- Loading states and error handling
- Protected routes with authentication checks

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend API hosting

## 📋 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the frontend directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### Running the Application

1. Make sure MongoDB is running
2. Start the backend server (from backend directory): `npm run dev`
3. Start the frontend server (from frontend directory): `npm run dev`
4. Open `http://localhost:5173` in your browser

## 📁 Project Structure

```
Task Management System/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🧪 Testing

To test the application:
1. Register a new user account
2. Login with your credentials
3. Create tasks using the dashboard
4. Edit and delete tasks as needed

## 📝 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
