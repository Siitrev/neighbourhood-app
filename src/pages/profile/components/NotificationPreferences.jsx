import React from 'react';
import { BellIcon } from '../../../components/icons';

export default function NotificationPreferences({ preferences }) {
  return (
    <section className="profile-card">
      <header className="card-header">
        <div className="card-icon-box box-primary">
          <BellIcon className="card-icon color-primary" />
        </div>
        <h2 className="card-heading">Preferencje Powiadomień</h2>
      </header>

      <div className="notifications-list">
        {preferences.map((pref) => (
          <div className="notification-row" key={pref.id}>
            <div className="notification-info">
              <h3>{pref.title}</h3>
              <p>{pref.description}</p>
            </div>
            <div className="notification-toggles">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked={pref.email} />
                <span className="checkbox-custom"></span>
                EMAIL
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked={pref.sms} />
                <span className="checkbox-custom"></span>
                SMS
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}