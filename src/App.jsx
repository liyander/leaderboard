import { useState, useEffect } from 'react'
import './App.css'
import UserSelector from './components/UserSelector'
import Leaderboard from './components/Leaderboard'
import ClaimHistory from './components/ClaimHistory'
import AddUser from './components/AddUser'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [leaderboard, setLeaderboard] = useState([])
  const [history, setHistory] = useState([])
  const [lastClaimedPoints, setLastClaimedPoints] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_BASE = 'https://leaderboard-0f0y.onrender.com/api'

  // Initialize users and fetch data
  useEffect(() => {
    initializeData()
  }, [])

  const initializeData = async () => {
    try {
      console.log('Loading data with API:', API_BASE)
      
      // Fetch all data directly (no initialization needed)
      await Promise.all([
        fetchUsers(),
        fetchLeaderboard(),
        fetchHistory()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
      alert(`Error connecting to server: ${error.message}. Please check if the backend is running.`)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        console.error('Data is not an array:', data)
        setUsers([])
      }
    } catch (error) {
      console.error('=== ERROR FETCHING USERS ===')
      console.error('Error details:', error)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      alert('Failed to fetch users: ' + error.message)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE}/leaderboard`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setLeaderboard(data)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/history`)
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error('Error fetching history:', error)
    }
  }

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      alert('Please select a user first!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser }),
      })

      const data = await response.json()
      setLastClaimedPoints(data.points)
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setLastClaimedPoints(null)
      }, 3000)
      
      // Refresh all data
      await Promise.all([
        fetchUsers(),
        fetchLeaderboard(),
        fetchHistory()
      ])
    } catch (error) {
      console.error('Error claiming points:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (userName) => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      })

      if (response.ok) {
        await fetchUsers()
        await fetchLeaderboard()
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-brand">
          🏆 Leaderboard
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Profile</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
      </nav>

      <header className="app-header">
        <h1>🏆 Leaderboard System</h1>
        <p>Top performers this month</p>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <UserSelector 
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
          
          <button 
            className="claim-btn"
            onClick={handleClaimPoints}
            disabled={loading || !selectedUser}
          >
            {loading ? 'Claiming...' : 'Claim Points'}
          </button>

          {lastClaimedPoints && (
            <div className="points-notification">
              🎉 You claimed {lastClaimedPoints} points!
            </div>
          )}

          <AddUser onAddUser={handleAddUser} />
        </div>

        <div className="content-grid">
          <Leaderboard leaderboard={leaderboard} />
          <ClaimHistory history={history} />
        </div>
      </main>
    </div>
  )
}

export default App
