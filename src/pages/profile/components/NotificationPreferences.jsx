import React from 'react';
import { BellIcon } from '../../../components/icons';

export default function NotificationPreferences({ preferences, onPreferenceChange }) {
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
                <input 
                  type="checkbox" 
                  checked={pref.email} 
                  onChange={() => onPreferenceChange(pref.id, 'email')}
                />
                <span className="checkbox-custom"></span>
                EMAIL
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={pref.sms} 
                  onChange={() => onPreferenceChange(pref.id, 'sms')}
                />
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