import React, { useState, useMemo } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { MailIcon, FinanceIcon, TicketsIcon, CommunicationIcon } from '../../components/icons';
import DashboardCard from '../dashboard/components/DashboardCard';
import DashboardBanner from '../dashboard/components/DashboardBanner';
import { useAuth } from '../../firebase/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const firstName = useMemo(() => {
    if (userData?.firstName) return userData.firstName;
    if (user?.displayName) return user.displayName.split(' ')[0];
    return 'Mieszkańcu';
  }, [user, userData]);

  const [isPaid] = useState(() => localStorage.getItem('ifPaymentDone') === 'true');

  const [unreadCount] = useState(() => {
    const stored = localStorage.getItem('chat_unread_count');
    return stored !== null ? parseInt(stored, 10) : 1;
  });

  const [activeTicketCount] = useState(() => {
    const BASE_ACTIVE = 2;
    const stored = localStorage.getItem('submitted_tickets');
    if (!stored) return BASE_ACTIVE;
    try {
      return BASE_ACTIVE + JSON.parse(stored).length;
    } catch {
      return BASE_ACTIVE;
    }
  });

  return (
    <main className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-welcome">Dzień dobry, {firstName}.</h1>
        <p className="dashboard-info">Oto przegląd Twojego mieszkania na dziś.</p>
      </header>

      <section className="dashboard-feed">
        {/* KARTA 1: FINANSE */}
        <DashboardCard
          icon={FinanceIcon}
          iconBgClass="theme-bg-finance"
          iconColorClass="theme-text-finance"
          label={isPaid ? "Status konta" : "Rachunek"}
          labelColorClass="theme-text-finance"
          title={isPaid ? "0,00 PLN" : "842,50 PLN"}
          titleIsValue={true}
          description={isPaid ? "Brak bieżących opłat do uregulowania." : "Termin płatności: 15.06.2026"}
          buttonText="Szczegóły opłat"
          onClick={() => navigate('/finances')}
        />

        {/* KARTA 2: ZGŁOSZENIA */}
        <DashboardCard
          icon={TicketsIcon}
          iconBgClass="theme-bg-tickets"
          iconColorClass="theme-text-tickets"
          label="Twoje zgłoszenia"
          labelColorClass="theme-text-tickets"
          badgeText={`${activeTicketCount} AKTYWNE`}
          title="Usterki i Naprawy"
          description="Aktualnie pracujemy nad rozwiązaniem Twoich zgłoszeń."
          buttonText="Pokaż zgłoszenia"
          onClick={() => navigate('/tickets')}
        />

        {/* KARTA 3: KOMUNIKACJA */}
        <DashboardCard
          imageSrc="/mocks/announcement-image.png"
          label="Najnowsze ogłoszenie • 15 MAJ 2026"
          labelColorClass="theme-text-finance"
          title="Modernizacja oświetlenia klatek"
          description="Wymiana opraw na panele LED w blokach A i B..."
          buttonText="Czytaj dalej"
          onClick={() => navigate('/communication')}
        />

        {/* KARTA 4: WIADOMOŚCI */}
        <DashboardCard
          icon={MailIcon}
          iconBgClass="theme-bg-messages position-relative"
          iconColorClass="theme-text-messages"
          notificationCount={unreadCount > 0 ? unreadCount : undefined}
          label="Skrzynka odbiorcza"
          labelColorClass="theme-text-finance"
          title={
            unreadCount === 0
              ? 'Brak nowych wiadomości'
              : `${unreadCount} nieprzeczytana wiadomość`
          }
          description={
            unreadCount === 0
              ? 'Wszystkie wiadomości zostały przeczytane.'
              : 'Masz nowe wiadomości od administracji budynku.'
          }
          buttonText="Otwórz wiadomości"
          onClick={() => navigate('/communication/chat')}
        />

        {/* BANER DOLNY */}
        <DashboardBanner
          icon={CommunicationIcon}
          message="Przerwa w dostawie wody w najbliższy wtorek (10:00 - 14:00)."
        />
      </section>
    </main>
  );
}