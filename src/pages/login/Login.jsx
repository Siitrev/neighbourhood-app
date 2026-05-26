import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import './Login.css';
import { EmailField, PasswordField, CheckboxField } from '../../components/fields';
import { Button, LinkButton } from '../../components/buttons';
import { AuthFooter } from '../../components/footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (email && password) {
      setLoading(true);
      try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (err) {
        console.error(err);
        setError("Nie udało się zalogować. Sprawdź poprawność danych.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Proszę wpisać email i hasło.");
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

      {error && <div className="login-error" role="alert" style={{ color: 'red', marginBottom: 'var(--space-2, 8px)' }}>{error}</div>}

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

        <Button type="submit" disabled={loading}>
          {loading ? 'Ładowanie...' : 'Zaloguj się'}
        </Button>

      </form>

      <AuthFooter />
    </div>
  );
}