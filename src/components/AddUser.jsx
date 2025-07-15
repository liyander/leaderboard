import React, { useState } from 'react'

const AddUser = ({ onAddUser }) => {
  const [newUserName, setNewUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newUserName.trim()) {
      alert('Please enter a user name!')
      return
    }

    setIsLoading(true)
    try {
      await onAddUser(newUserName.trim())
      setNewUserName('')
      alert('User added successfully!')
    } catch (error) {
      alert('Error adding user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="add-user">
      <h3>➕ Add New User</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          placeholder="Enter user name..."
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="user-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="add-user-btn"
          disabled={isLoading || !newUserName.trim()}
        >
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default AddUser
