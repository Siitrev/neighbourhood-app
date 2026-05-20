import React, { useState, useRef } from "react";
import "./Tickets.css";
import {
  ChevronDownIcon,
  CameraIcon,
  CheckIcon,
  WarningIcon,
  TicketWrenchIcon,
  BrushIcon,
  DotsIcon,
  PhoneCallIcon,
} from "../../components/icons";
import { Button } from "../../components/buttons";

const CATEGORIES = [
  { id: "awaria", Icon: WarningIcon, label: "Awaria" },
  { id: "usterka", Icon: TicketWrenchIcon, label: "Usterka" },
  { id: "sprzatanie", Icon: BrushIcon, label: "Sprzątanie" },
  { id: "inne", Icon: DotsIcon, label: "Inne" },
];

const CATEGORY_CONFIG = {
  awaria: { Icon: WarningIcon, title: (loc) => `Awaria – ${loc}` },
  usterka: { Icon: TicketWrenchIcon, title: (loc) => `Usterka – ${loc}` },
  sprzatanie: {
    Icon: BrushIcon,
    title: (loc) => `Zgłoszenie sprzątania – ${loc}`,
  },
  inne: { Icon: DotsIcon, title: (loc) => `Inne zgłoszenie – ${loc}` },
};

const LOCATIONS = [
  "Lokal (Mieszkanie)",
  "Klatka schodowa",
  "Parking",
  "Teren wspólny",
  "Piwnica",
  "Winda",
];

const STATUS_CONFIG = {
  "W REALIZACJI": { modifier: "in-progress", actionLabel: "Szczegóły" },
  "NOWE":         { modifier: "new", actionLabel: "Szczegóły" },
  "ZAKOŃCZONE":   { modifier: "done", actionLabel: "Archiwum" },
};

const INITIAL_TICKETS = [
  {
    id: 1,
    number: "ZG-2023-042",
    date: "14 PAŹ 2023",
    status: "W REALIZACJI",
    Icon: TicketWrenchIcon,
    title: "Usterka oświetlenia w klatce",
    description:
      "Brak światła na 3. piętrze przy windzie. Miejsce: Klatka schodowa.",
  },
  {
    id: 2,
    number: "ZG-2023-045",
    date: "DZISIAJ 08:30",
    status: "NOWE",
    Icon: WarningIcon,
    title: "Awaria domofonu - brak sygnału",
    description: "Nie słychać dzwonka w mieszkaniu nr 4. Miejsce: Lokal.",
  },
  {
    id: 3,
    number: "ZG-2023-039",
    date: "10 PAŹ 2023",
    status: "ZAKOŃCZONE",
    Icon: BrushIcon,
    title: "Zanieczyszczenie na parkingu",
    description: "Rozlany olej na miejscu nr 12. Teren wspólny.",
  },
];

const EXTRA_TICKETS = [
  {
    id: 4,
    number: "ZG-2023-031",
    date: "02 PAŹ 2023",
    status: "ZAKOŃCZONE",
    Icon: TicketWrenchIcon,
    title: "Awaria windy w bloku B",
    description:
      "Winda zatrzymuje się między piętrami. Miejsce: Klatka schodowa.",
  },
  {
    id: 5,
    number: "ZG-2023-027",
    date: "25 WRZ 2023",
    status: "ZAKOŃCZONE",
    Icon: BrushIcon,
    title: "Zabrudzenia na klatce schodowej",
    description:
      "Plamy na ścianie przy wejściu do bloku. Miejsce: Klatka schodowa.",
  },
  {
    id: 6,
    number: "ZG-2023-021",
    date: "10 WRZ 2023",
    status: "ZAKOŃCZONE",
    Icon: WarningIcon,
    title: "Awaria oświetlenia zewnętrznego",
    description: "Nie działają lampy przy wejściu do garażu. Miejsce: Parking.",
  },
  {
    id: 7,
    number: "ZG-2023-015",
    date: "28 SIE 2023",
    status: "ZAKOŃCZONE",
    Icon: TicketWrenchIcon,
    title: "Uszkodzona skrzynka pocztowa",
    description:
      "Skrzynka nr 42 nie domyka się prawidłowo. Miejsce: Klatka schodowa.",
  },
  {
    id: 8,
    number: "ZG-2023-009",
    date: "14 SIE 2023",
    status: "ZAKOŃCZONE",
    Icon: DotsIcon,
    title: "Hałas w godzinach nocnych",
    description: "Głośna muzyka z lokalu nr 12 po 22:00. Miejsce: Lokal.",
  },
  {
    id: 9,
    number: "ZG-2023-004",
    date: "03 SIE 2023",
    status: "ZAKOŃCZONE",
    Icon: BrushIcon,
    title: "Wywóz odpadów wielkogabarytowych",
    description: "Stara sofa pozostawiona przy altanie śmietnikowej.",
  },
];

const ALL_TICKETS = [...INITIAL_TICKETS, ...EXTRA_TICKETS];
const ACTIVE_STATUSES = new Set(["NOWE", "W REALIZACJI"]);

export default function Tickets() {
  const [selectedCategory, setSelectedCategory] = useState("awaria");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [photoName, setPhotoName] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [submittedTickets, setSubmittedTickets] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const photoInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoName(file.name);
  };

  const handleSubmit = () => {
    if (!description.trim()) return;

    const catConfig = CATEGORY_CONFIG[selectedCategory];
    const newTicket = {
      id: `submitted-${Date.now()}`,
      number: `ZG-${new Date().getFullYear()}-${String(ALL_TICKETS.length + submittedTickets.length + 1).padStart(3, "0")}`,
      date: "DZISIAJ",
      status: "NOWE",
      Icon: catConfig.Icon,
      title: catConfig.title(location),
      description: description.trim().slice(0, 120),
    };

    setSubmittedTickets((prev) => [newTicket, ...prev]);
    setActiveFilter("all");
    setShowMore(false);

    clearTimeout(toastTimerRef.current);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 4000);

    setDescription("");
    setPhotoName(null);
    setSelectedCategory("awaria");
    setLocation(LOCATIONS[0]);
  };

  const allDisplayTickets = [...submittedTickets, ...ALL_TICKETS];

  const filteredTickets = allDisplayTickets.filter((t) =>
    activeFilter === "active" ? ACTIVE_STATUSES.has(t.status) : true,
  );

  const visibleTickets = showMore
    ? filteredTickets
    : filteredTickets.slice(0, 3);

  const activeCount = allDisplayTickets.filter((t) =>
    ACTIVE_STATUSES.has(t.status),
  ).length;
  const totalCount = allDisplayTickets.length;

  return (
    <main className="tickets-wrapper">
      <header className="tickets-header">
        <h1 className="tickets-title">Zgłoszenia</h1>
        <p className="tickets-subtitle">
          Szybko dostarcz informacje o problemie w Twojej spółdzielni.
        </p>
      </header>

      {/* ── Nowe Zgłoszenie ── */}
      <section className="tickets-card" aria-labelledby="heading-new">
        <div className="tickets-new__heading">
          <p className="tickets-new__overline">CENTRUM POMOCY</p>
          <h2 className="tickets-new__title" id="heading-new">
            Nowe Zgłoszenie
          </h2>
        </div>

        {toastVisible && (
          <div className="tickets-toast" role="status" aria-live="polite">
            <CheckIcon width={18} height={18} aria-hidden="true" />
            Zgłoszenie zostało wysłane pomyślnie!
          </div>
        )}

        <div className="tickets-form-body">
          <div className="tickets-form-columns">
            <div className="tickets-form-left">
              <div>
                <p className="tickets-field-label" id="label-category">
                  WYBIERZ KATEGORIĘ
                </p>
                <div
                  className="tickets-categories"
                  role="group"
                  aria-labelledby="label-category"
                >
                  {CATEGORIES.map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      className={`tickets-category-btn${selectedCategory === id ? " tickets-category-btn--selected" : ""}`}
                      onClick={() => setSelectedCategory(id)}
                      aria-pressed={selectedCategory === id}
                    >
                      <Icon width={18} height={18} aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="tickets-field-label"
                  htmlFor="ticket-location"
                >
                  MIEJSCE
                </label>
                <div className="tickets-select-wrap">
                  <select
                    id="ticket-location"
                    className="tickets-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className="tickets-select-chevron"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="tickets-form-right">
              <label
                className="tickets-field-label"
                htmlFor="ticket-description"
              >
                OPIS PROBLEMU
              </label>
              <textarea
                id="ticket-description"
                className="tickets-textarea"
                placeholder="Opisz szczegółowo zgłoszenie..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="tickets-form-actions">
            <label className="tickets-photo-btn" htmlFor="ticket-photo">
              <CameraIcon width={18} height={18} aria-hidden="true" />
              {photoName ? photoName : "Dodaj zdjęcie (opcjonalnie)"}
              <input
                ref={photoInputRef}
                id="ticket-photo"
                type="file"
                accept="image/*"
                className="tickets-photo-input"
                onChange={handlePhotoChange}
              />
            </label>
            <Button
              type="button"
              className="tickets-submit-btn"
              onClick={handleSubmit}
              disabled={!description.trim()}
            >
              Wyślij zgłoszenie &rsaquo;
            </Button>
          </div>
        </div>
      </section>

      {/* ── Twoje Zgłoszenia ── */}
      <section aria-labelledby="heading-my">
        <div className="tickets-list-header">
          <div>
            <h2 className="tickets-section-title" id="heading-my">
              Twoje Zgłoszenia
            </h2>
            <p className="tickets-section-subtitle">
              Aktualnie pracujemy nad rozwiązaniem Twoich interwencji.
            </p>
          </div>
          <div
            className="tickets-filters"
            role="group"
            aria-label="Filtruj zgłoszenia"
          >
            <button
              type="button"
              className={`tickets-filter-btn${activeFilter === "all" ? " tickets-filter-btn--active" : ""}`}
              onClick={() => {
                setActiveFilter("all");
                setShowMore(false);
              }}
              aria-pressed={activeFilter === "all"}
            >
              WSZYSTKIE ({totalCount})
            </button>
            <button
              type="button"
              className={`tickets-filter-btn${activeFilter === "active" ? " tickets-filter-btn--active" : ""}`}
              onClick={() => {
                setActiveFilter("active");
                setShowMore(false);
              }}
              aria-pressed={activeFilter === "active"}
            >
              AKTYWNE ({activeCount})
            </button>
          </div>
        </div>

        <ul
          key={activeFilter}
          id="tickets-list"
          className="tickets-list"
          aria-label="Lista zgłoszeń"
          aria-live="polite"
        >
          {visibleTickets.map((ticket) => {
            const config = STATUS_CONFIG[ticket.status];
            const { Icon } = ticket;
            return (
              <li
                key={ticket.id}
                className={`tickets-item tickets-item--${config.modifier}`}
              >
                <div className="tickets-item__icon-wrap" aria-hidden="true">
                  {Icon && <Icon width={20} height={20} />}
                </div>

                <div className="tickets-item__content">
                  <div className="tickets-item__meta">
                    <span className="tickets-item__number">
                      #{ticket.number}
                    </span>
                    <span className="tickets-item__dot" aria-hidden="true">
                      •
                    </span>
                    <span className="tickets-item__date">{ticket.date}</span>
                    <span
                      className={`tickets-item__badge tickets-item__badge--${config.modifier}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h3 className="tickets-item__title">{ticket.title}</h3>
                  <p className="tickets-item__desc">{ticket.description}</p>
                </div>

                <button
                  type="button"
                  className={`tickets-item__action tickets-item__action--${config.modifier}`}
                >
                  {config.actionLabel}
                </button>
              </li>
            );
          })}
        </ul>

        {filteredTickets.length > 3 && (
          <button
            type="button"
            className="tickets-show-more"
            onClick={() => setShowMore((prev) => !prev)}
            aria-expanded={showMore}
            aria-controls="tickets-list"
          >
            {showMore ? "POKAŻ MNIEJ ZGŁOSZEŃ" : "POKAŻ WIĘCEJ ZGŁOSZEŃ"}
            <ChevronDownIcon
              width={14}
              height={14}
              aria-hidden="true"
              className={showMore ? "tickets-chevron--rotated" : ""}
            />
          </button>
        )}
      </section>

      {/* ── Nagłe Przypadki ── */}
      <section
        className="tickets-emergency"
        aria-labelledby="heading-emergency"
      >
        <div className="tickets-emergency__content">
          <p className="tickets-emergency__overline">NAGŁE PRZYPADKI</p>
          <h2 className="tickets-emergency__title" id="heading-emergency">
            Potrzebujesz pilnej pomocy?
          </h2>
          <p className="tickets-emergency__desc">
            W przypadku awarii zagrażającej życiu lub mieniu, prosimy o
            bezpośredni kontakt telefoniczny z całodobowym pogotowiem
            technicznym.
          </p>
          <Button
            className="tickets-emergency__phone"
            onClick={() => { window.location.href = "tel:+48123456789"; }}
          >
            <PhoneCallIcon width={18} height={18} aria-hidden="true" />
            +48 123 456 789
          </Button>
        </div>
        <div className="tickets-emergency__image" aria-hidden="true">
          <img
            src="/mocks/emergency-image.png"
            alt=""
            className="tickets-emergency__img"
          />
        </div>
      </section>
    </main>
  );
}