import React from 'react';
import Button from '../../../components/buttons/Button';
import { UserIcon } from '../../../components/icons';

export default function ContactDetails({ defaultEmail, defaultPhone }) {
  return (
    <section className="profile-card">
      <header className="card-header">
        <div className="card-icon-box box-primary">
          <UserIcon className="card-icon color-primary" />
        </div>
        <h2 className="card-heading">Dane Kontaktowe</h2>
      </header>
      
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              defaultValue={defaultEmail} 
              autoComplete="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Numer telefonu</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              defaultValue={defaultPhone} 
              autoComplete="tel"
              className="form-input"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" className="profile-btn">Zapisz zmiany</Button>
        </div>
      </form>
    </section>
  );
}