# 🏆 Leaderboard System

A modern, full-stack leaderboard application built with React.js and Node.js that allows users to claim random points and see real-time rankings.

## ✨ Features

### Core Functionality
- **User Management**: Display 10 default users with ability to add new users
- **Point Claiming**: Award random points (1-10) to selected users
- **Dynamic Rankings**: Real-time leaderboard updates based on total points
- **Claim History**: Complete history of all point claims with pagination
- **Responsive Design**: Modern, clean UI that works on all devices

### User Interface
- 🎯 User selection dropdown with current points display
- 🎲 One-click point claiming with instant feedback
- 🏅 Visual leaderboard with rank badges and animations
- 📊 Paginated claim history with timestamps
- ➕ Add new users functionality
- 📱 Fully responsive design

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **ES6+** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd leaderboard-system
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas connection string in backend/index.js
```

### 5. Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

### 6. Start the Frontend Development Server
```bash
# In the root directory
npm run dev
```
The frontend will start on `http://localhost:5173`

## 🎮 How to Use

1. **Initialize Data**: The app automatically creates 10 default users on first load
2. **Select User**: Choose a user from the dropdown to claim points for
3. **Claim Points**: Click the "Claim Points" button to award random points (1-10)
4. **View Rankings**: See the real-time leaderboard update with new rankings
5. **Add Users**: Use the "Add New User" form to create additional users
6. **View History**: Check the claim history with pagination for all past claims

## 📁 Project Structure

```
leaderboard-system/
├── backend/
│   ├── index.js              # Express server and API routes
│   └── package.json          # Backend dependencies
├── src/
│   ├── components/
│   │   ├── UserSelector.jsx  # User selection dropdown
│   │   ├── Leaderboard.jsx   # Rankings display
│   │   ├── ClaimHistory.jsx  # History with pagination
│   │   └── AddUser.jsx       # Add new user form
│   ├── App.jsx               # Main application component
│   ├── App.css               # Modern styling
│   └── main.jsx              # Application entry point
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  points: Number (default: 0)
}
```

### Claim History Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  points: Number,
  claimedAt: Date (default: Date.now)
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/init` | Initialize default users |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Add a new user |
| POST | `/api/claim` | Claim points for a user |
| GET | `/api/leaderboard` | Get ranked leaderboard |
| GET | `/api/history` | Get claim history |

## 🎨 Design Features

- **Modern Gradient Background**: Eye-catching purple gradient
- **Card-based Layout**: Clean, organized component structure
- **Rank Badges**: Gold, silver, bronze badges for top 3 users
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: User feedback during API calls
- **Empty States**: Helpful messages when no data exists
- **Responsive Design**: Works perfectly on mobile and desktop

## 🏆 Bonus Features Implemented

- ✅ **Clean and Modern UI**: Beautiful gradient design with card layouts
- ✅ **Responsive Layout**: Mobile-first responsive design
- ✅ **Efficient Pagination**: Smart pagination for claim history
- ✅ **Reusable Components**: Well-structured, modular React components
- ✅ **Code Comments**: Comprehensive comments and documentation
- ✅ **Best Practices**: Modern React patterns, error handling, loading states

## 🚀 Future Enhancements

- Real-time updates with WebSockets
- User authentication and profiles
- Achievement system and badges
- Data visualization with charts
- Export functionality for leaderboard data
- Dark/light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Created with ❤️ for the Triple W Solutions coding challenge.

---

**Happy Coding! 🎉**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
