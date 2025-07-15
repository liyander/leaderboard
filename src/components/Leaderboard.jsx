import React from 'react'

const Leaderboard = ({ leaderboard }) => {
  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'rank-first'
      case 2: return 'rank-second'
      case 3: return 'rank-third'
      default: return 'rank-other'
    }
  }

  const formatLastActivity = (user) => {
    if (!user.lastClaim) {
      return 'Never'
    }
    
    const lastClaimDate = new Date(user.lastClaim)
    const now = new Date()
    const diffTime = Math.abs(now - lastClaimDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffTime / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      
      {/* Table Header */}
      <div className="leaderboard-header">
        <div>Rank</div>
        <div>User</div>
        <div>Score</div>
        <div>Last Activity</div>
      </div>

      <div className="leaderboard-list">
        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p>No users found</p>
            <p>Add some users to get started!</p>
          </div>
        ) : (
          leaderboard.map((user, index) => (
            <div 
              key={`${user._id}-${user.rank}-${index}`} 
              className={`leaderboard-item ${getRankClass(user.rank)}`}
            >
              <div className="rank-section">
                {user.rank}
              </div>
              <div className="user-name">{user.name}</div>
              <div className="user-points">{user.points}</div>
              <div className="last-activity">{formatLastActivity(user)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Leaderboard
