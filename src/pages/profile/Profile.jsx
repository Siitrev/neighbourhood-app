import React from 'react';
import './Profile.css';
import ContactDetails from './components/ContactDetails';
import SecuritySettings from './components/SecuritySettings';
import NotificationPreferences from './components/NotificationPreferences';
import ApartmentDetails from './components/ApartmentDetails';
import AccountStatus from './components/AccountStatus';

export default function Profile() {
  // Przykładowe dane wstrzykiwane z góry (np. pobrane z API)
  const userData = {
    email: "jan.kowalski@example.com",
    phone: "+48 600 100 200"
  };

  const notificationPrefs = [
    { id: 1, title: 'Ogłoszenia spółdzielni', description: 'Ważne komunikaty dotyczące budynku i osiedla.', email: true, sms: true },
    { id: 2, title: 'Statusy zgłoszeń', description: 'Informacje o postępach w pracach technicznych.', email: true, sms: false },
    { id: 3, title: 'Wiadomości prywatne', description: 'Powiadomienia o nowym kontakcie od administracji.', email: true, sms: false }
  ];

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

  return (
    <main className="profile-wrapper">
      <header className="profile-header">
        <h1 className="profile-title">Mój Profil</h1>
        <p className="profile-subtitle">Zarządzaj swoimi danymi, ustawieniami bezpieczeństwa oraz preferencjami powiadomień.</p>
      </header>

      <div className="profile-layout">
        {/* LEWA KOLUMNA: Formularze i Ustawienia */}
        <div className="profile-main-col">
          
          <ContactDetails defaultEmail={userData.email} defaultPhone={userData.phone} />
          <SecuritySettings />
          <NotificationPreferences preferences={notificationPrefs} />

        </div>

        {/* PRAWA KOLUMNA: Informacje tylko do odczytu */}
        <aside className="profile-side-col">
          
          <ApartmentDetails {...apartmentData} />
          <AccountStatus {...accountData} />

        </aside>
      </div>
    </main>
  );
}