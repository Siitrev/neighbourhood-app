import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import './ResetPassword.css';
import { PasswordField } from '../../components/fields';
import { Button } from '../../components/buttons';
import { CheckIcon } from '../../components/icons';
import { AuthFooter } from '../../components/footer';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSuccess) return;

    const timeoutId = window.setTimeout(() => navigate('/login'), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    
    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne. Sprawdź, czy wpisano je tak samo.');
      return;
    }

    try {
      await confirmPasswordReset(auth, token, password);
      setIsSuccess(true);
    } catch (err) {
      console.error("Błąd resetowania hasła:", err);
      setError('Nie udało się zresetować hasła. Link mógł wygasnąć lub jest nieprawidłowy.');
    }
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
          <form className="reset-form" onSubmit={handleSubmit}>
            <PasswordField
              id="newPassword"
              name="newPassword"
              label="Nowe hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              inputProps={{
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': error ? 'password-mismatch' : undefined,
              }}
            />

            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Powtórz hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              inputProps={{
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': error ? 'password-mismatch' : undefined,
              }}
            />

            {error ? (
              <p id="password-mismatch" className="reset-error" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit">Zapisz nowe hasło</Button>
          </form>
        ) : (
          <div className="success-state" role="status" aria-live="polite">
            <div className="success-icon-bg">
              <CheckIcon className="success-icon" width={32} height={32} />
            </div>
            <p>Hasło zostało zmienione pomyślnie!</p>
            <p className="redirect-text">Zaraz zostaniesz przekierowany do logowania...</p>
          </div>
        )}
      </div>

      <AuthFooter />
    </div>
  );
}