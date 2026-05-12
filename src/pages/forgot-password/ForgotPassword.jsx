import React, { useState } from 'react';
import './ForgotPassword.css';
import { EmailField } from '../../components/fields';
import { Button, LinkButton } from '../../components/buttons';
import { CheckIcon } from '../../components/icons';
import { AuthFooter } from '../../components/footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    console.log("Wysyłanie linku do resetu na:", normalizedEmail);
    setIsSent(true);
  };

  return (
    <div className="recovery-page">
      
      <div className="recovery-header">
        <img src="/logo.svg" alt="Neighbourhood" className="recovery-logo" />
        <h2 className="recovery-title">Odzyskiwanie hasła</h2>
        <p className="recovery-subtitle" role="status" aria-live="polite">
          {isSent 
            ? "Instrukcje resetowania hasła zostały wysłane na Twój adres e-mail."
            : "Podaj swój adres e-mail, na który zarejestrowane jest konto. Wyślemy Ci link do zmiany hasła."
          }
        </p>
      </div>

      <div className="recovery-card">
        {!isSent ? (
          <form className="recovery-form" onSubmit={handleSubmit}>
            <EmailField
              id="email"
              name="email"
              label="Adres e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domena.pl"
              autoComplete="email"
              required
              inputProps={{ inputMode: 'email' }}
            />

            <Button type="submit">
              Wyślij link do resetowania
            </Button>
          </form>
        ) : (
          <div className="success-state">
            <div className="success-icon-bg">
              <CheckIcon className="success-icon" width={32} height={32} />
            </div>
            <p>Sprawdź swoją skrzynkę odbiorczą.</p>
          </div>
        )}

        <div className="back-to-login">
          <LinkButton to="/login" className="back-link">Wróć do logowania</LinkButton>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}