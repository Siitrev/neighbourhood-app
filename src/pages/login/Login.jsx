import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '../../components/icons';

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
            <MailIcon className="input-icon" />
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
            <LockIcon className="input-icon" />
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
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
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