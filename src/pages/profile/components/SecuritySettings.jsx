import React from 'react';
import Button from '../../../components/buttons/Button';
import { LockIcon } from '../../../components/icons';

export default function SecuritySettings() {
  return (
    <section className="profile-card">
      <header className="card-header">
        <div className="card-icon-box box-primary">
          <LockIcon className="card-icon color-primary" />
        </div>
        <h2 className="card-heading">Zmiana Hasła</h2>
      </header>
      
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row three-cols">
          <div className="form-group">
            <label htmlFor="currentPassword">Obecne hasło</label>
            <input 
              type="password" 
              id="currentPassword" 
              name="currentPassword" 
              placeholder="••••••••" 
              autoComplete="current-password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nowe hasło</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              placeholder="Minimum 8 znaków" 
              autoComplete="new-password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Powtórz nowe hasło</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Minimum 8 znaków" 
              autoComplete="new-password"
              className="form-input"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" className="profile-btn">Aktualizuj zabezpieczenia</Button>
        </div>
      </form>
    </section>
  );
}