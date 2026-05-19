import React from 'react';
import './Dashboard.css';
import { MailIcon, FinanceIcon, TicketsIcon, CommunicationIcon } from '../../components/icons'; 
import DashboardCard from '../../components/cards/DashboardCard';
import DashboardBanner from '../../components/banners/DashboardBanner';

export default function Dashboard() {
  return (
    <main className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-welcome">Dzień dobry, Janie.</h1>
        <p className="dashboard-info">Oto przegląd Twojego mieszkania na dziś.</p>
      </header>

      <section className="dashboard-feed">
        {/* KARTA 1: FINANSE */}
        <DashboardCard
          icon={FinanceIcon}
          iconBgClass="theme-bg-finance"
          iconColorClass="theme-text-finance"
          label="Rachunek"
          labelColorClass="theme-text-finance"
          title="842,50 PLN"
          titleIsValue={true}
          description="Termin płatności: 15.06.2026"
          buttonText="Szczegóły opłat"
        />

        {/* KARTA 2: ZGŁOSZENIA */}
        <DashboardCard
          icon={TicketsIcon}
          iconBgClass="theme-bg-tickets"
          iconColorClass="theme-text-tickets"
          label="Twoje zgłoszenia"
          labelColorClass="theme-text-tickets"
          badgeText="2 AKTYWNE"
          title="Usterki i Naprawy"
          description="Aktualnie pracujemy nad rozwiązaniem Twoich zgłoszeń."
          buttonText="Pokaż zgłoszenia"
        />

        {/* KARTA 3: KOMUNIKACJA */}
        <DashboardCard
          imageSrc="/mocks/announcement-image.png"
          label="Najnowsze ogłoszenie • 15 MAJ 2026"
          labelColorClass="theme-text-finance"
          title="Modernizacja oświetlenia klatek"
          description="Wymiana opraw na panele LED w blokach A i B..."
          buttonText="Czytaj dalej"
        />

        {/* KARTA 4: WIADOMOŚCI */}
        <DashboardCard
          icon={MailIcon}
          iconBgClass="theme-bg-messages position-relative"
          iconColorClass="theme-text-messages"
          notificationCount={3}
          label="Skrzynka odbiorcza"
          labelColorClass="theme-text-finance"
          title="3 nieprzeczytane wiadomości"
          description="Masz nowe wiadomości od administracji budynku."
          buttonText="Otwórz wiadomości"
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