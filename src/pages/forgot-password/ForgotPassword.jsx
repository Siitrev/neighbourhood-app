import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wysyłanie linku do resetu na:", email);
    setIsSent(true);
  };

  return (
    <div className="recovery-page">
      
      <div className="recovery-header">
        <img src="/logo.svg" alt="Neighbourhood" className="recovery-logo" />
        <h2 className="recovery-title">Odzyskiwanie hasła</h2>
        <p className="recovery-subtitle">
          {isSent 
            ? "Instrukcje resetowania hasła zostały wysłane na Twój adres e-mail."
            : "Podaj swój adres e-mail, na który zarejestrowane jest konto. Wyślemy Ci link do zmiany hasła."
          }
        </p>
      </div>

      <div className="recovery-card">
        {!isSent ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Adres E-mail</label>
              <div className="input-wrapper">
                <svg className="input-icon" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input 
                  id="email"
                  type="email" 
                  className="recovery-input" 
                  placeholder="email@domena.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Wyślij link do resetowania
            </button>
          </form>
        ) : (
          <div className="success-state">
            <div className="success-icon-bg">
              <svg className="success-icon" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p>Sprawdź swoją skrzynkę odbiorczą.</p>
          </div>
        )}

        <div className="back-to-login">
          <Link to="/login" className="back-link">
            Wróć do logowania
          </Link>
        </div>
      </div>

      <div className="recovery-footer">
        NEIGHBOURHOOD SYSTEM © 2026
      </div>
    </div>
  );
}