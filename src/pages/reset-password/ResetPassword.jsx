import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }

    console.log("Resetowanie hasła dla tokenu:", token, "Nowe hasło:", password);
    
    setIsSuccess(true);
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="reset-page">
      
      <div className="reset-header">
        <img src="/logo.svg" alt="Neighbourhood" className="reset-logo" />
        <h2 className="reset-title">Ustaw nowe hasło</h2>
        <p className="reset-subtitle">
          Wprowadź nowe, bezpieczne hasło dla swojego konta.
        </p>
      </div>

      <div className="reset-card">
        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label className="input-label" htmlFor="password">Nowe Hasło</label>
              <div className="input-wrapper">
                <svg className="input-icon-left" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  className="reset-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg 
                  className="input-icon-right" 
                  onClick={() => setShowPassword(!showPassword)}
                  fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"
                >
                  {showPassword 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  }
                </svg>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">Powtórz Hasło</label>
              <div className="input-wrapper">
                <svg className="input-icon-left" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input 
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"} 
                  className="reset-input" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Zapisz nowe hasło
            </button>
          </form>
        ) : (
          <div className="success-state">
            <div className="success-icon-bg">
              <svg className="success-icon" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p>Hasło zostało zmienione pomyślnie!</p>
            <p className="redirect-text">Zaraz zostaniesz przekierowany do logowania...</p>
          </div>
        )}
      </div>

      <div className="reset-footer">
        NEIGHBOURHOOD SYSTEM © 2026
      </div>
    </div>
  );
}