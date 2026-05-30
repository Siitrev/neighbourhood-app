import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Communication.css';
import {
  WaterDropIcon,
  GatheringIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PdfIcon,
  DownloadIcon,
  ChatBubbleIcon,
} from '../../components/icons';
import { Button } from '../../components/buttons';

const ANNOUNCEMENTS_INITIAL = 2;
const FORUM_INITIAL = 2;

const ANNOUNCEMENTS = [
  {
    id: 'water-break',
    overline: 'Wiadomość systemowa',
    title: 'Planowana przerwa w dostawie wody',
    desc: 'W dniu 12 maja w godzinach 8:00–12:00 nastąpi przerwa w dostawie wody pitnej dla bloków A, B i C.\nProsimy o wcześniejsze zaopatrzenie się w wodę na ten okres.\nZa utrudnienia przepraszamy.',
    cta: 'Szczegóły',
    Icon: WaterDropIcon,
    iconSize: { width: 20, height: 25 },
  },
  {
    id: 'meeting',
    overline: 'Ogłoszenie',
    title: 'Zebranie Członków Spółdzielni',
    desc: 'Zapraszamy na zebranie w dniu 25 maja o godzinie 18:00 w świetlicy przy ul. Różanej 5.\nTematem spotkania będzie omówienie planu remontów na rok 2025 oraz budżetu spółdzielni.\nObecność członków jest mile widziana.',
    cta: 'Czytaj dalej',
    Icon: GatheringIcon,
    iconSize: { width: 30, height: 15 },
  },
  {
    id: 'elevator',
    overline: 'Ogłoszenie',
    title: 'Przegląd windy – Blok A',
    desc: 'W dniu 4 czerwca w godzinach 9:00–13:00 odbędzie się obowiązkowy przegląd techniczny windy w Bloku A.\nW tym czasie winda będzie wyłączona z użytkowania.\nProsimy o uwzględnienie tego w planach dnia, szczególnie osoby starsze i z niepełnosprawnościami.',
    cta: 'Czytaj dalej',
    Icon: GatheringIcon,
    iconSize: { width: 30, height: 15 },
  },
  {
    id: 'parking',
    overline: 'Wiadomość systemowa',
    title: 'Zmiany w organizacji parkingu',
    desc: 'Od 1 lipca wprowadzamy nowe oznaczenia miejsc postojowych na parkingu przy ul. Różanej.\nKażde miejsce zostanie przypisane do konkretnego lokalu – szczegółowy wykaz zostanie wysłany pocztą.\nSamochody zaparkowane niezgodnie z nowym podziałem mogą zostać odholowane na koszt właściciela.',
    cta: 'Szczegóły',
    Icon: WaterDropIcon,
    iconSize: { width: 20, height: 25 },
  },
  {
    id: 'garden',
    overline: 'Ogłoszenie',
    title: 'Prace porządkowe na terenie zielonym',
    desc: 'W sobotę od godziny 10:00 planowane są prace porządkowe na terenie zielonym wokół bloków – prosimy o ostrożność i nieutrudnianie pracy ekipie.\nZostanie przeprowadzone koszenie trawników, przycinanie żywopłotów oraz usuwanie suchych gałęzi.\nPrace potrwają do ok. godziny 15:00.',
    cta: 'Czytaj dalej',
    Icon: GatheringIcon,
    iconSize: { width: 30, height: 15 },
  },
];

const FORUM_THREADS = [
  {
    id: 'missing-cat-23322',
    initials: 'AM',
    title: 'Zaginął kot (MCO) - Blok B',
    meta: 'Anna M. • 2 godz. temu',
    tag: 'Zwierzęta',
    replies: 12,
  },
  {
    id: 'plumber-43423',
    initials: 'PL',
    title: 'Rekomendacja hydraulika?',
    meta: 'Piotr L. • wczoraj',
    tag: 'Usługi',
    replies: 7,
  },
  {
    id: 'noise-56564',
    initials: 'KB',
    title: 'Hałas w nocy – co robić?',
    meta: 'Kasia B. • 2 dni temu',
    tag: 'Porządek',
    replies: 5,
  },
  {
    id: 'bicycle-34432',
    initials: 'MT',
    title: 'Stojaki rowerowe przy wejściu',
    meta: 'Marek T. • 3 dni temu',
    tag: 'Infrastruktura',
    replies: 9,
  },
  {
    id: 'playground-24423',
    initials: 'JG',
    title: 'Propozycje dot. placu zabaw',
    meta: 'Joanna G. • tydzień temu',
    tag: 'Sąsiedzi',
    replies: 18,
  },
  {
    id: 'internet-42442',
    initials: 'RS',
    title: 'Polecany dostawca internetu',
    meta: 'Rafał S. • tydzień temu',
    tag: 'Usługi',
    replies: 21,
  },
];

const DOCUMENTS = [
  {
    id: 'statute',
    title: 'Statut Spółdzielni „Neighbourhood”',
    meta: 'PDF • 2.3 MB',
  },
  {
    id: 'house-rules',
    title: 'Regulamin Porządku Domowego',
    meta: 'PDF • 1.1 MB',
  },
];

export default function Communication() {
  const navigate = useNavigate();
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showAllForum, setShowAllForum] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [userPosts, setUserPosts] = useState(() => {
    const saved = localStorage.getItem('forum_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAnnouncementDetails = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleMoreAnnouncements = () => {
    setShowAllAnnouncements((prev) => !prev);
  };

  const handleMoreDiscussions = () => {
    setShowAllForum((prev) => !prev);
  };

  const handleCreatePost = () => {
    navigate('/communication/create-post');
  };

  const handleDownload = () => {};

  const visibleAnnouncements = useMemo(() => {
    if (showAllAnnouncements) return ANNOUNCEMENTS;
    return ANNOUNCEMENTS.slice(0, ANNOUNCEMENTS_INITIAL);
  }, [showAllAnnouncements]);

  const allForumThreads = useMemo(() => {
    const combined = [...userPosts, ...FORUM_THREADS];
    
    return combined.map(thread => {
      const savedComments = localStorage.getItem(`forum_comments_${thread.id}`);
      
      if (savedComments) {
        try {
          const parsed = JSON.parse(savedComments);
          return { ...thread, replies: parsed.length };
        } catch (error) {
          console.error("Błąd parsowania komentarzy:", error);
          return thread;
        }
      }
      
      return thread;
    });
  }, [userPosts]);

  const visibleForumThreads = useMemo(() => {
    if (showAllForum) return allForumThreads;
    return allForumThreads.slice(0, FORUM_INITIAL);
  }, [showAllForum, allForumThreads]);

  const ModalIcon = selectedAnnouncement ? selectedAnnouncement.Icon : null;

  return (
    <div className="communication-wrapper">
      
      {/* ── Dialog / Modal Szczegółów Ogłoszenia ── */}
      {selectedAnnouncement && (
        <div 
          className="communication-modal-overlay" 
          onClick={() => setSelectedAnnouncement(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="communication-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="communication-modal__header">
              <div className="communication-modal__title-row">
                {ModalIcon && (
                  <div className="communication-icon-tile communication-theme-bg-announcements">
                    <ModalIcon
                      width={selectedAnnouncement.iconSize.width}
                      height={selectedAnnouncement.iconSize.height}
                      className="communication-icon communication-theme-text-announcements"
                    />
                  </div>
                )}
                <div className="communication-modal__title-group">
                  <p className="communication-overline communication-theme-text-announcements">
                    {selectedAnnouncement.overline}
                  </p>
                  <h3 className="communication-modal__title">{selectedAnnouncement.title}</h3>
                </div>
              </div>
            </div>
            
            <p className="communication-modal__desc">{selectedAnnouncement.desc}</p>
            
            <div className="communication-modal__actions">
              <Button 
                className="communication-btn" 
                onClick={() => setSelectedAnnouncement(null)}
              >
                Zamknij
              </Button>
            </div>
          </div>
        </div>
      )}

      <header className="communication-header">
        <h1 className="communication-title">Komunikacja</h1>
        <p className="communication-subtitle">Bądź na bieżąco z życiem Twojej spółdzielni.</p>
      </header>

      <section className="communication-section" aria-labelledby="communication-announcements-title">
        <div className="communication-section__header">
          <h2 id="communication-announcements-title" className="communication-section__title">
            Najnowsze Ogłoszenia
          </h2>
        </div>

        <ul
          id="communication-announcements-list"
          className="communication-list"
          aria-label="Lista ogłoszeń"
        >
          {visibleAnnouncements.map((announcement) => {
            const { id, overline, title, desc, cta, Icon, iconSize } = announcement;
            return (
              <li key={id} className="communication-anim-item">
                <article className="communication-card">
                  <div className="communication-card__left">
                    <div className="communication-icon-tile communication-theme-bg-announcements">
                      <Icon
                        width={iconSize.width}
                        height={iconSize.height}
                        className="communication-icon communication-theme-text-announcements"
                      />
                    </div>

                    <div className="communication-card__content">
                      <p className="communication-overline communication-theme-text-announcements">{overline}</p>
                      <h3 className="communication-card__title">{title}</h3>
                      <p className="communication-card__desc">{desc}</p>
                    </div>
                  </div>

                  {/* Przekazujemy całe ogłoszenie do funkcji przy kliknięciu */}
                  <Button className="communication-btn" onClick={() => handleAnnouncementDetails(announcement)}>
                    {cta}
                  </Button>
                </article>
              </li>
            );
          })}
        </ul>

        {ANNOUNCEMENTS.length > ANNOUNCEMENTS_INITIAL && (
          <div className="communication-more">
            <button
              type="button"
              className="communication-more__btn"
              onClick={handleMoreAnnouncements}
              aria-controls="communication-announcements-list"
              aria-expanded={showAllAnnouncements}
            >
              {showAllAnnouncements ? 'POKAŻ MNIEJ OGŁOSZEŃ' : 'POKAŻ WIĘCEJ OGŁOSZEŃ'}
              <ChevronDownIcon
                width={14}
                height={14}
                aria-hidden="true"
                className={`communication-icon ${showAllAnnouncements ? 'communication-chevron--rotated' : ''}`}
              />
            </button>
          </div>
        )}
      </section>

      <section className="communication-section" aria-labelledby="communication-inbox-title">
        <div className="communication-section__header">
          <h2 id="communication-inbox-title" className="communication-section__title">
            Skrzynka Odbiorcza
          </h2>
        </div>

        <article className="communication-card communication-inbox-card">
          <div className="communication-card__left">
            <div className="communication-badge-wrap" aria-hidden="true">
              <div className="communication-icon-tile communication-theme-bg-announcements">
                <span className="communication-inbox-initials communication-theme-text-announcements">PP</span>
              </div>
              <span className="communication-badge">3</span>
            </div>

            <div className="communication-card__content">
              <h3 className="communication-card__title">Czat z administracją</h3>
              <p className="communication-card__desc">
                Szanowny Panie, informujemy że serwisant został już wezwany...
              </p>
            </div>
          </div>

          <Button className="communication-btn" onClick={() => navigate('/communication/chat')}>
            Otwórz czat
          </Button>
        </article>
      </section>

      <section className="communication-section" aria-labelledby="communication-forum-title">
        <div className="communication-section__header">
          <div>
            <h2 id="communication-forum-title" className="communication-section__title">
              Forum Mieszkańców
            </h2>
            <p className="communication-section__subtitle">Porozmawiaj z sąsiadami</p>
          </div>

          <Button className="communication-btn communication-btn--compact" onClick={handleCreatePost}>
            Dodaj wpis
          </Button>
        </div>

        <ul
          id="communication-forum-list"
          className="communication-list"
          aria-label="Lista dyskusji na forum"
        >
          {visibleForumThreads.map(({ id, initials, title, meta, tag, replies }) => (
            <li key={id} className="communication-anim-item">
              <button
                type="button"
                className="communication-forum-item"
                onClick={() => navigate(`/communication/forum/${id}`)}
                aria-label={`Otwórz dyskusję: ${title}`}
              >
                <div className="communication-card__left">
                  <div className="communication-avatar" aria-hidden="true">
                    {initials}
                  </div>

                  <div className="communication-card__content">
                    <h3 className="communication-card__title communication-card__title--md">{title}</h3>
                    <div className="communication-forum-meta">
                      <span className="communication-meta-text">{meta}</span>
                      <span className="communication-tag">{tag}</span>
                    </div>
                  </div>
                </div>

                <div className="communication-forum-stats" aria-hidden="true">
                  <span className="communication-stat">
                    <ChatBubbleIcon width={12} height={12} className="communication-icon" />
                    {replies}
                  </span>
                  <ChevronRightIcon width={8} height={12} className="communication-icon" />
                </div>
              </button>
            </li>
          ))}
        </ul>

        {FORUM_THREADS.length > FORUM_INITIAL && (
          <div className="communication-more">
            <button
              type="button"
              className="communication-more__btn"
              onClick={handleMoreDiscussions}
              aria-controls="communication-forum-list"
              aria-expanded={showAllForum}
            >
              {showAllForum ? 'POKAŻ MNIEJ DYSKUSJI' : 'POKAŻ WIĘCEJ DYSKUSJI'}
              <ChevronDownIcon
                width={14}
                height={14}
                aria-hidden="true"
                className={`communication-icon ${showAllForum ? 'communication-chevron--rotated' : ''}`}
              />
            </button>
          </div>
        )}
      </section>

      <section className="communication-section" aria-labelledby="communication-docs-title">
        <div className="communication-section__header">
          <h2 id="communication-docs-title" className="communication-section__title">
            Dokumenty i Regulamin
          </h2>
        </div>

        <div className="communication-docs" role="list" aria-label="Lista dokumentów">
          {DOCUMENTS.map(({ id, title, meta }) => (
            <div key={id} className="communication-docs__row" role="listitem">
              <div className="communication-card__left">
                <div className="communication-icon-tile communication-icon-tile--radius8 communication-theme-bg-danger-soft">
                  <PdfIcon width={25} height={25} className="communication-icon communication-theme-text-danger" />
                </div>

                <div className="communication-card__content">
                  <h3 className="communication-doc-title">{title}</h3>
                  <p className="communication-doc-meta">{meta}</p>
                </div>
              </div>

              <button
                type="button"
                className="communication-doc-action"
                onClick={handleDownload}
                aria-label={`Pobierz dokument: ${title}`}
              >
                <DownloadIcon width={16} height={16} className="communication-icon" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}