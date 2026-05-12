import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email && password) {
      const mockUser = {
        id: 'user-123',
        name: 'Jan Kowalski',
        email: email,
        role: 'resident'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      
      navigate('/');
    } else {
      alert("Proszę wpisać email i hasło.");
    }
  };

  return (
    <div className="login-page">
      
      <div className="login-header">
        <img src="/logo.svg" alt="Neighbourhood" className="login-logo" />
        <h2 className="login-subtitle">
          Witaj ponownie. Zaloguj się do swojego panelu mieszkańca.
        </h2>
      </div>

      <form className="login-card" onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <div className="input-wrapper">
            <svg className="input-icon" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z" fill="currentColor"/>
            </svg>
            <input 
              id="email"
              name="email"
              type="email" 
              className="login-input" 
              placeholder="email@domena.pl"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="password">Hasło</label>
            <button
              type="button"
              className="forgot-password"
              onClick={() => alert('Opcja odzyskiwania hasła nie jest jeszcze dostępna.')}
            >
              Nie pamiętasz hasła?
            </button>
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7ZM2 19V9V19Z" fill="currentColor"/>
            </svg>
            <input 
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="login-input with-right-icon" 
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              aria-pressed={showPassword}
              aria-controls="password"
            >
              {showPassword ? (
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9ZM8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65ZM8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25ZM8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75Z" fill="currentColor"/>
                  <path d="M2 1L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9ZM8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65ZM8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25ZM8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="checkbox-input"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="checkbox-label">
            Zapamiętaj mnie na tym urządzeniu
          </label>
        </div>

        <button type="submit" className="btn-submit">
          Zaloguj się
        </button>

      </form>

      <div className="login-footer">
        OBSŁUGIWANE PRZEZ NEIGHBOURHOOD SYSTEM © 2026
      </div>
    </div>
  );
}