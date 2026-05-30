import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import './Register.css';
import { EmailField, PasswordField, CheckboxField, TextField, PhoneField } from '../../components/fields';
import { TermsLabel } from './components/TermsLabel';
import { Button, LinkButton } from '../../components/buttons';
import { AuthFooter } from '../../components/footer';
import TermsModal from './components/TermsModal';

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
  const [activeModal, setActiveModal] = useState(null);
  const [termsError, setTermsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const getPasswordIssues = (password) => {
    const issues = [];
    if ((password || '').length < 8) issues.push('min. 8 znaków');
    if (!/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(password || '')) issues.push('1 wielką literę');
    if (!/\d/.test(password || '')) issues.push('1 cyfrę');
    if (!/[^A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(password || '')) issues.push('1 znak specjalny');
    return issues;
  };

  const formatPasswordError = (password) => {
    const issues = getPasswordIssues(password);
    if (issues.length === 0) return '';
    return `Hasło musi zawierać: ${issues.join(', ')}.`;
  };

  const validateForm = (data) => {
    const nextErrors = {};

    const firstName = (data.firstName || '').trim();
    const lastName = (data.lastName || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const password = data.password || '';

    if (!firstName) nextErrors.firstName = 'Podaj imię.';
    else if (firstName.length < 2) nextErrors.firstName = 'Imię musi mieć co najmniej 2 znaki.';

    if (!lastName) nextErrors.lastName = 'Podaj nazwisko.';
    else if (lastName.length < 2) nextErrors.lastName = 'Nazwisko musi mieć co najmniej 2 znaki.';

    if (!email) nextErrors.email = 'Podaj adres email.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Podaj poprawny adres email.';

    if (!phone) nextErrors.phone = 'Podaj numer telefonu.';
    else if (!/^\+?[0-9][0-9\s-]{7,}$/.test(phone)) nextErrors.phone = 'Podaj poprawny numer telefonu.';

    if (!password) nextErrors.password = 'Podaj hasło.';
    else {
      const pwdError = formatPasswordError(password);
      if (pwdError) nextErrors.password = pwdError;
    }

    if (!termsAccepted) nextErrors.terms = 'Musisz zaakceptować regulamin i politykę prywatności, aby założyć konto.';

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (error) setError('');

    if (name === 'password' && touchedFields.password) {
      const pwdError = value ? formatPasswordError(value) : 'Podaj hasło.';
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (pwdError) next.password = pwdError;
        else delete next.password;
        return next;
      });
      return;
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    if (name === 'password') {
      const pwdError = value ? formatPasswordError(value) : 'Podaj hasło.';
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (pwdError) next.password = pwdError;
        else delete next.password;
        return next;
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setTermsError('');

    const nextErrors = validateForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      if (nextErrors.terms) setTermsError(nextErrors.terms);
      setError('Sprawdź poprawność pól w formularzu.');
      return;
    }
    
    setLoading(true);
    try {
      const trimmedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      };

      const userCredential = await createUserWithEmailAndPassword(auth, trimmedData.email, trimmedData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${trimmedData.firstName} ${trimmedData.lastName}`
      });

      await setDoc(doc(db, 'users', user.uid), {
        firstName: trimmedData.firstName,
        lastName: trimmedData.lastName,
        phone: trimmedData.phone,
        email: trimmedData.email,
        role: 'resident',
        groupId: null 
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Podany adres email jest już w użyciu.');
      } else if (err.code === 'auth/weak-password') {
        setError('Hasło jest za słabe. Musi mieć min. 8 znaków oraz zawierać: 1 wielką literę, 1 cyfrę i 1 znak specjalny.');
      } else {
        setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setActiveModal(null);

  const openModal = (type) => {
    setActiveModal(type);
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
          <form className="register-card" onSubmit={handleRegister} noValidate>
            <div className="register-header">
              <h2>Utwórz konto</h2>
              <p>Wypełnij poniższe dane, aby dołączyć.</p>
            </div>

            {error ? (
              <div className="register-alert register-alert--error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="form-row">
              <div className="register-field-group">
                <TextField
                  id="firstName"
                  name="firstName"
                  label="Imię"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jan"
                  autoComplete="given-name"
                  required
                  inputProps={{
                    minLength: 2,
                    maxLength: 60,
                    'aria-invalid': Boolean(fieldErrors.firstName),
                    'aria-describedby': fieldErrors.firstName ? 'firstName-error' : undefined,
                    className: fieldErrors.firstName ? 'text-field__input--error' : undefined,
                  }}
                />
                {fieldErrors.firstName ? (
                  <p id="firstName-error" className="register-field-error">
                    {fieldErrors.firstName}
                  </p>
                ) : null}
              </div>

              <div className="register-field-group">
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Nazwisko"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Kowalski"
                  autoComplete="family-name"
                  required
                  inputProps={{
                    minLength: 2,
                    maxLength: 60,
                    'aria-invalid': Boolean(fieldErrors.lastName),
                    'aria-describedby': fieldErrors.lastName ? 'lastName-error' : undefined,
                    className: fieldErrors.lastName ? 'text-field__input--error' : undefined,
                  }}
                />
                {fieldErrors.lastName ? (
                  <p id="lastName-error" className="register-field-error">
                    {fieldErrors.lastName}
                  </p>
                ) : null}
              </div>
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
              inputProps={{
                inputMode: 'email',
                maxLength: 254,
                'aria-invalid': Boolean(fieldErrors.email),
                'aria-describedby': fieldErrors.email ? 'email-error' : undefined,
                className: fieldErrors.email ? 'auth-field__input--error' : undefined,
              }}
            />
            {fieldErrors.email ? (
              <p id="email-error" className="register-field-error">
                {fieldErrors.email}
              </p>
            ) : null}

            <PhoneField
              id="phone"
              name="phone"
              label="Numer Telefonu"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+48 000 000 000"
              required
              inputProps={{
                inputMode: 'tel',
                pattern: '^\\+?[0-9][0-9\\s-]{7,}$',
                'aria-invalid': Boolean(fieldErrors.phone),
                'aria-describedby': fieldErrors.phone ? 'phone-error' : undefined,
                className: fieldErrors.phone ? 'text-field__input--error' : undefined,
              }}
            />
            {fieldErrors.phone ? (
              <p id="phone-error" className="register-field-error">
                {fieldErrors.phone}
              </p>
            ) : null}

            <PasswordField
              id="password"
              name="password"
              label="Hasło"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              inputProps={{
                minLength: 8,
                pattern: '^(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*\\d)(?=.*[^A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż]).{8,}$',
                onBlur: handleBlur,
                'aria-invalid': Boolean(fieldErrors.password),
                'aria-describedby': fieldErrors.password ? 'password-error password-hint' : 'password-hint',
                className: fieldErrors.password ? 'auth-field__input--error' : undefined,
              }}
            />
            {fieldErrors.password ? (
              <p id="password-error" className="register-field-error">
                {fieldErrors.password}
              </p>
            ) : null}

            <p id="password-hint" className="register-field-hint">
              Wymagania hasła: min. 8 znaków, 1 wielka litera, 1 cyfra, 1 znak specjalny.
            </p>

            <CheckboxField
              id="terms"
              variant="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError('');
                if (error) setError('');
                if (fieldErrors.terms) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.terms;
                    return next;
                  });
                }
              }}
              describedById={termsError ? 'terms-error' : undefined}
              label={
                <TermsLabel
                  handleRegulations={() => openModal('regulations')}
                  handlePrivacy={() => openModal('policy')}
                />
              }
            />

            {termsError ? (
              <p id="terms-error" className="register-field-error register-terms-error" role="alert">
                {termsError}
              </p>
            ) : null}

            <Button type="submit" disabled={loading}>
              {loading ? 'Ładowanie...' : 'Zarejestruj się'}
            </Button>

            <div className="login-link-container">
              <span className="login-link-text">Masz już konto?</span>
              <LinkButton to="/login">Zaloguj się</LinkButton>
            </div>
          </form>

          <AuthFooter />
        </div>

        <TermsModal activeModal={activeModal} onClose={closeModal} />

      </div>
    </div>
  );
}