import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext';
import Loader from '../../components/protected-route/Loader';
import './Profile.css';
import ContactDetails from './components/ContactDetails';
import SecuritySettings from './components/SecuritySettings';
import NotificationPreferences from './components/NotificationPreferences';
import ApartmentDetails from './components/ApartmentDetails';
import AccountStatus from './components/AccountStatus';

const DEFAULT_NOTIFICATION_PREFS = [
  { id: 1, title: 'Ogłoszenia spółdzielni', description: 'Ważne komunikaty dotyczące budynku i osiedla.', email: true, sms: true },
  { id: 2, title: 'Statusy zgłoszeń', description: 'Informacje o postępach w pracach technicznych.', email: true, sms: false },
  { id: 3, title: 'Wiadomości prywatne', description: 'Powiadomienia o nowym kontakcie od administracji.', email: true, sms: false }
];

export default function Profile() {
  const { user, userData: firestoreUser, loading } = useAuth();
  const navigate = useNavigate();

  const userData = {
    email: user?.email || "Brak emailu",
    phone: firestoreUser?.phone || "Brak telefonu"
  };

  const [notificationPrefs, setNotificationPrefs] = React.useState(() => {
    const saved = localStorage.getItem("notification_preferences");
    if (saved) {
      return JSON.parse(saved);
    } else {
      localStorage.setItem("notification_preferences", JSON.stringify(DEFAULT_NOTIFICATION_PREFS));
      return DEFAULT_NOTIFICATION_PREFS;
    }
  });

  const handlePreferenceChange = (id, type) => {
    setNotificationPrefs((prev) => {
      const updated = prev.map((pref) =>
        pref.id === id ? { ...pref, [type]: !pref[type] } : pref
      );
      localStorage.setItem("notification_preferences", JSON.stringify(updated));
      return updated;
    });
  };

  const apartmentData = {
    address: "ul. Architektów 15",
    apartmentNumber: "42",
    floor: "4",
    area: "64.5 m²"
  };

  const accountData = {
    residentId: "#2024-X42",
    joinedDate: "12.01.2023",
    status: "ZWERYFIKOWANY",
    description: "Twój profil posiada pełny dostęp do wszystkich funkcji portalu Neighbourhood."
  };

  if (loading) {
    return (
      <main className="profile-wrapper">
        <header className="profile-header">
          <div>
            <Loader width="200px" height="40px" />
            <div style={{ marginTop: 'var(--space-2, 8px)' }}>
              <Loader width="350px" height="24px" />
            </div>
          </div>
          <Loader width="120px" height="40px" />
        </header>

        <div className="profile-layout">
          <div className="profile-main-col">
            <Loader height="300px" />
            <div style={{ marginTop: 'var(--space-3, 24px)' }}>
              <Loader height="200px" />
            </div>
          </div>

          <aside className="profile-side-col">
            <Loader height="250px" />
            <div style={{ marginTop: 'var(--space-3, 24px)' }}>
              <Loader height="150px" />
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-wrapper">
       <header className="profile-header">
          <h1 className="profile-title">Mój Profil</h1>
          <p className="profile-subtitle">Zarządzaj swoimi danymi, ustawieniami bezpieczeństwa oraz preferencjami powiadomień.</p>
      </header>
      
      <div className="profile-layout">
        <div className="profile-main-col">
          <ContactDetails defaultEmail={userData.email} defaultPhone={userData.phone} />
          <SecuritySettings />
          
          {/* Przekazujemy stan oraz funkcję obsługującą zmianę */}
          <NotificationPreferences 
            preferences={notificationPrefs} 
            onPreferenceChange={handlePreferenceChange} 
          />
        </div>

        <aside className="profile-side-col">
          <ApartmentDetails {...apartmentData} />
          <AccountStatus {...accountData} />
        </aside>
      </div>
    </main>
  );
}