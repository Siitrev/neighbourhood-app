import React from 'react';
import { updateEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Button from '../../../components/buttons/Button';
import { UserIcon } from '../../../components/icons';
import { auth, db } from '../../../firebase/firebase';

export default function ContactDetails({ defaultEmail, defaultPhone }) {
  const [email, setEmail] = React.useState(defaultEmail || '');
  const [phone, setPhone] = React.useState(defaultPhone || '');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setEmail(defaultEmail || '');
  }, [defaultEmail]);

  React.useEffect(() => {
    setPhone(defaultPhone || '');
  }, [defaultPhone]);

  const normalizePhone = (value) => {
    if (Array.isArray(value)) {
      return value.join('');
    }

    return String(value ?? '').trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const user = auth.currentUser;
      const normalizedPhone = normalizePhone(phone);

      if (!user) {
        throw new Error('Brak zalogowanego użytkownika.');
      }

      await setDoc(doc(db, 'users', user.uid), {
        phone: normalizedPhone,
        phoneNumber: normalizedPhone,
      }, { merge: true });

      if (email && email !== user.email) {
        await updateEmail(user, email);

        await setDoc(doc(db, 'users', user.uid), {
          email,
        }, { merge: true });
      }

      setPhone(normalizedPhone);

      toast.success('Dane kontaktowe zostały zapisane.');
    } catch (err) {
      console.error('Error updating contact details:', err);

      if (err?.code === 'auth/requires-recent-login') {
        toast.error('Numer telefonu został zapisany, ale aby zmienić adres email, zaloguj się ponownie.');
      } else {
        toast.error('Nie udało się zapisać danych kontaktowych. Spróbuj ponownie.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="profile-card">
      <header className="card-header">
        <div className="card-icon-box box-primary">
          <UserIcon className="card-icon color-primary" />
        </div>
        <h2 className="card-heading">Dane Kontaktowe</h2>
      </header>
      
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Numer telefonu</label>
            <input
              type="tel" 
              id="phone" 
              name="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="form-input"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" className="profile-btn" disabled={saving}>
            {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </Button>
        </div>
      </form>
    </section>
  );
}