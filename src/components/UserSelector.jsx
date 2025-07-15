import React from 'react'

const UserSelector = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="user-selector">
      <label htmlFor="user-select" className="selector-label">
        Select User:
      </label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => onSelectUser(e.target.value)}
        className="user-dropdown"
        style={{
          backgroundColor: 'white',
          color: '#1f2937'
        }}
      >
        <option value="" style={{ backgroundColor: 'white', color: '#1f2937' }}>
          {users.length === 0 ? 'Loading users...' : 'Choose a user...'}
        </option>
        {users.map((user) => (
          <option 
            key={user._id} 
            value={user._id}
            style={{ backgroundColor: 'white', color: '#1f2937', padding: '8px' }}
          >
            {user.name} ({user.points} points)
          </option>
        ))}
      </select>
      {users.length === 0 && (
        <p className="loading-text">Loading users from database...</p>
      )}
    </div>
  )
}

export default UserSelector
