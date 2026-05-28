import React, { useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import Button from '../../../components/buttons/Button';
import { LockIcon } from '../../../components/icons';

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      return setError('Nowe hasła nie są identyczne.');
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("Brak zalogowanego użytkownika.");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      await updatePassword(user, newPassword);
      setSuccess('Hasło zostało pomyślnie zaktualizowane.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Obecne hasło jest nieprawidłowe.');
      } else if (err.code === 'auth/weak-password') {
        setError('Nowe hasło jest za słabe. Musi mieć co najmniej 6 znaków.');
      } else {
        setError('Wystąpił błąd podczas aktualizacji hasła. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="profile-card">
      <header className="card-header">
        <div className="card-icon-box box-primary">
          <LockIcon className="card-icon color-primary" />
        </div>
        <h2 className="card-heading">Zmiana Hasła</h2>
      </header>
      
      <form className="profile-form" onSubmit={handleSubmit}>
        {error && <div role="alert" style={{ color: 'red', marginBottom: 'var(--space-2, 8px)' }}>{error}</div>}
        {success && <div role="status" style={{ color: 'green', marginBottom: 'var(--space-2, 8px)' }}>{success}</div>}

        <div className="form-row three-cols">
          <div className="form-group">
            <label htmlFor="currentPassword">Obecne hasło</label>
            <input 
              type="password" 
              id="currentPassword" 
              name="currentPassword" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••" 
              autoComplete="current-password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nowe hasło</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 znaków" 
              autoComplete="new-password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Powtórz nowe hasło</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Minimum 8 znaków" 
              autoComplete="new-password"
              required
              className="form-input"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="submit" className="profile-btn" disabled={loading}>
            {loading ? 'Aktualizowanie...' : 'Aktualizuj zabezpieczenia'}
          </Button>
        </div>
      </form>
    </section>
  );
}