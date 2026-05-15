import React from 'react';

export default function AccountStatus({ residentId, joinedDate, status, description }) {
  return (
    <div className="profile-card summary-card">
      <h2 className="card-heading">Status Konta</h2>
      <div className="summary-list">
        <div className="summary-row">
          <span>ID Mieszkańca</span>
          <strong className="mono-text">{residentId}</strong>
        </div>
        <div className="summary-row">
          <span>Dołączył(a)</span>
          <strong>{joinedDate}</strong>
        </div>
      </div>
      <div className="summary-status">
        <div className="status-dot"></div>
        <span>{status}</span>
      </div>
      <p className="summary-desc">{description}</p>
    </div>
  );
}