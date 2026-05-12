import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Register.css';
import { EmailField, PasswordField, CheckboxField, TextField, PhoneField } from '../../components/auth';

export default function Register() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      alert("Musisz zaakceptować regulamin, aby założyć konto.");
      return;
    }

    console.log("Rejestracja z tokenem:", token, "Dane:", formData);

    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="brand-column">
          <img src="/logo.svg" alt="Neighbourhood" className="brand-logo" />
          <h1 className="brand-title">Witaj w swojej wspólnocie.</h1>
          <p className="brand-subtitle">
            Zarejestruj się, aby uzyskać dostęp do panelu mieszkańca Neighbourhood. Zarządzaj zgłoszeniami, sprawdzaj ogłoszenia i komunikuj się z zarządcą w jednym miejscu.
          </p>

          <div className="features-row">
            <div className="feature-card">
              <svg className="feature-icon" width="20" height="16" viewBox="0 0 20 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 9V7H20V9H16ZM17.2 16L14 13.6L15.2 12L18.4 14.4L17.2 16ZM15.2 4L14 2.4L17.2 0L18.4 1.6L15.2 4ZM3 15V11H2C1.45 11 0.979167 10.8042 0.5875 10.4125C0.195833 10.0208 0 9.55 0 9V7C0 6.45 0.195833 5.97917 0.5875 5.5875C0.979167 5.19583 1.45 5 2 5H6L11 2V14L6 11H5V15H3ZM12 11.35V4.65C12.45 5.05 12.8125 5.5375 13.0875 6.1125C13.3625 6.6875 13.5 7.31667 13.5 8C13.5 8.68333 13.3625 9.3125 13.0875 9.8875C12.8125 10.4625 12.45 10.95 12 11.35Z"/>
              </svg>
              <h3 className="feature-title">Powiadomienia</h3>
              <p className="feature-desc">Bądź na bieżąco ze wszystkimi wydarzeniami w spółdzielni.</p>
            </div>

            <div className="feature-card">
              <svg className="feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20L16 16H6C5.45 16 4.97917 15.8042 4.5875 15.4125C4.19583 15.0208 4 14.55 4 14V13H15C15.55 13 16.0208 12.8042 16.4125 12.4125C16.8042 12.0208 17 11.55 17 11V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V20ZM2 10.175L3.175 9H13V2H2V10.175ZM0 15V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V9C15 9.55 14.8042 10.0208 14.4125 10.4125C14.0208 10.8042 13.55 11 13 11H4L0 15ZM2 9V2V9Z"/>
              </svg>
              <h3 className="feature-title">Komunikacja</h3>
              <p className="feature-desc">Bezpośredni kontakt z zarządem.</p>
            </div>
          </div>
        </div>

        <div className="form-column">
          <form className="register-card" onSubmit={handleRegister}>
            <div className="register-header">
              <h2>Utwórz konto</h2>
              <p>Wypełnij poniższe dane, aby dołączyć.</p>
            </div>

            <div className="form-row">
              <TextField
                id="firstName"
                name="firstName"
                label="Imię"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jan"
                autoComplete="given-name"
                required
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Nazwisko"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Kowalski"
                autoComplete="family-name"
                required
              />
            </div>

            <EmailField
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@domena.pl"
              autoComplete="email"
              required
            />

            <PhoneField
              id="phone"
              name="phone"
              label="Numer Telefonu"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+48 000 000 000"
              required
            />

            <PasswordField
              id="password"
              name="password"
              label="Hasło"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />

            <CheckboxField
              id="terms"
              variant="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              label={
                <span className="terms-text">
                  Akceptuję{' '}
                  <button
                    type="button"
                    className="terms-link"
                    onClick={() => alert('Regulamin nie jest jeszcze dostępny w aplikacji.')}
                  >
                    Regulamin
                  </button>{' '}
                  oraz{' '}
                  <button
                    type="button"
                    className="terms-link"
                    onClick={() =>
                      alert('Polityka Prywatności nie jest jeszcze dostępna w aplikacji.')
                    }
                  >
                    Politykę Prywatności
                  </button>{' '}
                  platformy Neighbourhood.
                </span>
              }
            />

            <button type="submit" className="btn-register">
              Zarejestruj się
            </button>

            <div className="login-link-container">
              <span className="login-link-text">Masz już konto?</span>
              <Link to="/login" className="login-link-action">Zaloguj się</Link>
            </div>
          </form>

          <div className="register-footer">
            NEIGHBOURHOOD © 2026
          </div>
        </div>

      </div>
    </div>
  );
}