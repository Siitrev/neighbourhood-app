import React from 'react';

export default function DashboardBanner({ icon: Icon, message }) {
  return (
    <aside className="dashboard-banner">
      <div className="banner-inner">
        {Icon && <Icon className="banner-icon-img" />}
        <p className="banner-message">{message}</p>
      </div>
    </aside>
  );
}