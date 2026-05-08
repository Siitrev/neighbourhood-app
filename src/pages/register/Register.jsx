import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Register.css';

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
  const [showPassword, setShowPassword] = useState(false);

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
              <div className="input-group">
                <label className="input-label" htmlFor="firstName">Imię</label>
                <div className="input-wrapper">
                  <input 
                    id="firstName" name="firstName" type="text" 
                    className="register-input" 
                    placeholder="Jan" 
                    value={formData.firstName} onChange={handleChange} required
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="lastName">Nazwisko</label>
                <div className="input-wrapper">
                  <input 
                    id="lastName" name="lastName" type="text" 
                    className="register-input" 
                    placeholder="Kowalski" 
                    value={formData.lastName} onChange={handleChange} required
                  />
                </div>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <div className="input-wrapper">
                <svg className="input-icon-left" width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H1.5ZM7.5 6.75L1.5 3V10.5H13.5V3L7.5 6.75ZM7.5 5.25L13.5 1.5H1.5L7.5 5.25ZM1.5 3V1.5V3V10.5V3Z" fill="#C2C6D5"/>
                </svg>
                <input 
                  id="email" name="email" type="email" 
                  className="register-input with-icon" 
                  placeholder="email@domena.pl" 
                  value={formData.email} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="phone">Numer Telefonu</label>
              <div className="input-wrapper">
                <svg className="input-icon-left" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.7125 13.5C11.15 13.5 9.60625 13.1594 8.08125 12.4781C6.55625 11.7969 5.16875 10.8313 3.91875 9.58125C2.66875 8.33125 1.70312 6.94375 1.02188 5.41875C0.340625 3.89375 0 2.35 0 0.7875C0 0.5625 0.075 0.375 0.225 0.225C0.375 0.075 0.5625 0 0.7875 0H3.825C4 0 4.15625 0.059375 4.29375 0.178125C4.43125 0.296875 4.5125 0.4375 4.5375 0.6L5.025 3.225C5.05 3.425 5.04375 3.59375 5.00625 3.73125C4.96875 3.86875 4.9 3.9875 4.8 4.0875L2.98125 5.925C3.23125 6.3875 3.52813 6.83437 3.87188 7.26562C4.21562 7.69688 4.59375 8.1125 5.00625 8.5125C5.39375 8.9 5.8 9.25937 6.225 9.59062C6.65 9.92188 7.1 10.225 7.575 10.5L9.3375 8.7375C9.45 8.625 9.59688 8.54062 9.77812 8.48438C9.95937 8.42813 10.1375 8.4125 10.3125 8.4375L12.9 8.9625C13.075 9.0125 13.2188 9.10312 13.3313 9.23438C13.4438 9.36563 13.5 9.5125 13.5 9.675V12.7125C13.5 12.9375 13.425 13.125 13.275 13.275C13.125 13.425 12.9375 13.5 12.7125 13.5ZM2.26875 4.5L3.50625 3.2625L3.1875 1.5H1.51875C1.58125 2.0125 1.66875 2.51875 1.78125 3.01875C1.89375 3.51875 2.05625 4.0125 2.26875 4.5ZM8.98125 11.2125C9.46875 11.425 9.96562 11.5938 10.4719 11.7188C10.9781 11.8438 11.4875 11.925 12 11.9625V10.3125L10.2375 9.95625L8.98125 11.2125Z" fill="#C2C6D5"/>
                </svg>
                <input 
                  id="phone" name="phone" type="tel" 
                  className="register-input with-icon" 
                  placeholder="+48 000 000 000" 
                  value={formData.phone} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Hasło</label>
              <div className="input-wrapper">
                <svg className="input-icon-left" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 15.75C1.0875 15.75 0.734375 15.6031 0.440625 15.3094C0.146875 15.0156 0 14.6625 0 14.25V6.75C0 6.3375 0.146875 5.98438 0.440625 5.69063C0.734375 5.39688 1.0875 5.25 1.5 5.25H2.25V3.75C2.25 2.7125 2.61562 1.82812 3.34687 1.09687C4.07812 0.365625 4.9625 0 6 0C7.0375 0 7.92188 0.365625 8.65312 1.09687C9.38437 1.82812 9.75 2.7125 9.75 3.75V5.25H10.5C10.9125 5.25 11.2656 5.39688 11.5594 5.69063C11.8531 5.98438 12 6.3375 12 6.75V14.25C12 14.6625 11.8531 15.0156 11.5594 15.3094C11.2656 15.6031 10.9125 15.75 10.5 15.75H1.5ZM1.5 14.25H10.5V6.75H1.5V14.25ZM6 12C6.4125 12 6.76562 11.8531 7.05937 11.5594C7.35312 11.2656 7.5 10.9125 7.5 10.5C7.5 10.0875 7.35312 9.73438 7.05937 9.44063C6.76562 9.14688 6.4125 9 6 9C5.5875 9 5.23438 9.14688 4.94063 9.44063C4.64688 9.73438 4.5 10.0875 4.5 10.5C4.5 10.9125 4.64688 11.2656 4.94063 11.5594C5.23438 11.8531 5.5875 12 6 12ZM3.75 5.25H8.25V3.75C8.25 3.125 8.03125 2.59375 7.59375 2.15625C7.15625 1.71875 6.625 1.5 6 1.5C5.375 1.5 4.84375 1.71875 4.40625 2.15625C3.96875 2.59375 3.75 3.125 3.75 3.75V5.25ZM1.5 14.25V6.75V14.25Z" fill="#C2C6D5"/>
                </svg>
                <input 
                  id="password" name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="register-input with-icon" 
                  placeholder="••••••••" 
                  value={formData.password} onChange={handleChange} required
                />
                <svg 
                  className="input-icon-right" 
                  onClick={() => setShowPassword(!showPassword)}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </div>
            </div>

            <div className="terms-group">
              <input 
                type="checkbox" 
                id="terms" 
                className="terms-checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <p className="terms-text">
                Akceptuję <a href="#" className="terms-link">Regulamin</a> oraz <a href="#" className="terms-link">Politykę Prywatności</a> platformy Neighbourhood.
              </p>
            </div>

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