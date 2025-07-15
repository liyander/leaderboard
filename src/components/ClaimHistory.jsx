import React, { useState } from 'react'

const ClaimHistory = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Calculate pagination
  const totalPages = Math.ceil(history.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentHistory = history.slice(startIndex, endIndex)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
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

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getUserName = (claim) => {
    // Try userSnapshot first (preserved name), then populated userId, then fallback
    if (claim.userSnapshot && claim.userSnapshot.name) {
      return claim.userSnapshot.name
    }
    if (claim.userId && claim.userId.name) {
      return claim.userId.name
    }
    if (typeof claim.userId === 'string') {
      return 'Unknown User'
    }
    return 'System'
  }

  return (
    <div className="claim-history">
      <h2>Claim History</h2>
      
      {/* Table Header */}
      <div className="history-header">
        <div>User</div>
        <div>Points</div>
        <div>Time</div>
      </div>

      <div className="history-list">
        {currentHistory.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">�</div>
            <div className="empty-state-title">No Activity Yet</div>
            <div className="empty-state-message">Start claiming points to see your history!</div>
          </div>
        ) : (
          currentHistory.map((claim) => (
            <div key={claim._id} className="history-item">
              <div className="history-user">
                {getUserName(claim)}
              </div>
              <div className="history-points">
                +{claim.points}
              </div>
              <div className="history-time">
                {formatDate(claim.claimedAt)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default ClaimHistory
