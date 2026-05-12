import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { EmailField, PasswordField, CheckboxField } from '../../components/fields';
import { Button, LinkButton } from '../../components/buttons';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        <EmailField
          id="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@domena.pl"
          autoComplete="username"
          required
        />

        <PasswordField
          id="password"
          name="password"
          label="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          labelRight={
            <LinkButton
              className="forgot-password"
              to="/forgot-password"
            >
              Nie pamiętasz hasła?
            </LinkButton>
          }
        />

        <CheckboxField
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Zapamiętaj mnie na tym urządzeniu"
        />

        <Button type="submit">
          Zaloguj się
        </Button>

      </form>

      <div className="login-footer">
        OBSŁUGIWANE PRZEZ NEIGHBOURHOOD SYSTEM © 2026
      </div>
    </div>
  );
}