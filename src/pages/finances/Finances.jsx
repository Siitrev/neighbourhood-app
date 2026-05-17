import React, { useState } from 'react';
import './Finances.css';
import {
  HomeIcon,
  FinanceIcon,
  WrenchIcon,
  WaterDropIcon,
  FlameIcon,
  TrashIcon,
  HistoryIcon,
  PhoneIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ReceiptIcon,
  ChevronDownIcon,
} from '../../components/icons';

const TOTAL_AMOUNT = '842,50';
const TRANSFER_TITLE = 'Opłata eksploatacyjna 05/2024';

const CURRENT_FEES = [
  { id: 'czynsz',      Icon: HomeIcon,      label: 'Czynsz',     amount: '450,00 PLN' },
  { id: 'remonty',    Icon: WrenchIcon,    label: 'Remonty',    amount: '120,00 PLN' },
  { id: 'woda',       Icon: WaterDropIcon, label: 'Woda',       amount: '115,50 PLN' },
  { id: 'ogrzewanie', Icon: FlameIcon,     label: 'Ogrzewanie', amount: '95,00 PLN'  },
  { id: 'smieci',     Icon: TrashIcon,     label: 'Śmieci',     amount: '62,00 PLN'  },
];

const HISTORY_INITIAL = [
  { id: 1, date: '15 KWI 2024', title: 'Opłata 04/2024',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 2, date: '14 MAR 2024', title: 'Nadpłata za wodę', amount: '-124,15', status: 'KOREKTA',      method: 'Systemowa', negative: true  },
  { id: 3, date: '10 MAR 2024', title: 'Opłata 03/2024',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 4, date: '12 LUT 2024', title: 'Opłata 02/2024',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
];

const HISTORY_EXTRA = [
  { id: 5,  date: '15 STY 2024', title: 'Opłata 01/2024',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 6,  date: '12 GRU 2023', title: 'Opłata 12/2023',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 7,  date: '10 LIS 2023', title: 'Opłata 11/2023',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 8,  date: '13 PAŹ 2023', title: 'Opłata 10/2023',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 9, date: '15 WRZ 2023', title: 'Opłata 09/2023',         amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 10, date: '14 SIE 2023', title: 'Opłata 08/2023',        amount: '798,00',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 11, date: '13 LIP 2023', title: 'Opłata 07/2023',        amount: '798,00',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
];

export default function Finances() {
  const [paymentMethod, setPaymentMethod] = useState("blik");
  const [showMore, setShowMore] = useState(false);

  const visibleHistory = showMore
    ? [...HISTORY_INITIAL, ...HISTORY_EXTRA]
    : HISTORY_INITIAL;

  return (
    <main className="finances-wrapper">
      <header className="finances-header">
        <h1 className="finances-title">Finanse</h1>
        <p className="finances-subtitle">
          Zarządzaj swoimi opłatami i historią transakcji.
        </p>
      </header>

      {/* ── Bieżące Opłaty ── */}
      <section className="finances-card" aria-labelledby="heading-fees">
        <div className="finances-card__header">
          <span
            className="finances-card__icon-wrap theme-bg-finance"
            aria-hidden="true"
          >
            <ReceiptIcon
              width={20}
              height={20}
              className="theme-text-finance"
            />
          </span>
          <h2 className="finances-card__title" id="heading-fees">
            Bieżące Opłaty
          </h2>
        </div>

        <ul className="finances-fees-grid" aria-label="Lista bieżących opłat">
          {CURRENT_FEES.map(({ id, Icon, label, amount }) => (
            <li key={id} className="finances-fee-item">
              <span className="finances-fee-item__label">
                <Icon width={16} height={16} aria-hidden="true" />
                {label}
              </span>
              <strong className="finances-fee-item__amount">{amount}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Opłać Rachunki ── */}
      <section className="finances-card" aria-labelledby="heading-pay">
        <div className="finances-card__header">
          <span
            className="finances-card__icon-wrap theme-bg-finance"
            aria-hidden="true"
          >
            <FinanceIcon
              width={20}
              height={20}
              className="theme-text-finance"
            />
          </span>
          <h2 className="finances-card__title" id="heading-pay">
            Opłać Rachunki
          </h2>
        </div>

        <div className="finances-pay-fields">
          <div className="finances-pay-field">
            <p className="finances-field-label" id="label-amount">
              KWOTA DO ZAPŁATY
            </p>
            <div
              className="finances-field-value finances-field-value--amount"
              aria-labelledby="label-amount"
              role="status"
            >
              {TOTAL_AMOUNT} PLN
            </div>
          </div>
          <div className="finances-pay-field">
            <label
              className="finances-field-label"
              htmlFor="transfer-title-display"
            >
              TYTUŁ PRZELEWU
            </label>
            <div
              className="finances-field-value"
              id="transfer-title-display"
              role="textbox"
              aria-readonly="true"
            >
              {TRANSFER_TITLE}
            </div>
          </div>
        </div>

        <fieldset className="finances-payment-methods">
          <legend className="finances-field-label">METODA PŁATNOŚCI</legend>
          <div className="finances-payment-options">
            <button
              type="button"
              className={`finances-payment-option${paymentMethod === "blik" ? " finances-payment-option--selected" : ""}`}
              onClick={() => setPaymentMethod("blik")}
              aria-pressed={paymentMethod === "blik"}
            >
              <PhoneIcon width={22} height={22} aria-hidden="true" />
              <span className="finances-payment-option__text">
                <span className="finances-payment-option__sublabel">
                  SZYBKA PŁATNOŚĆ
                </span>
                <strong className="finances-payment-option__name">BLIK</strong>
              </span>
            </button>

            <button
              type="button"
              className={`finances-payment-option${paymentMethod === "transfer" ? " finances-payment-option--selected" : ""}`}
              onClick={() => setPaymentMethod("transfer")}
              aria-pressed={paymentMethod === "transfer"}
            >
              <GlobeIcon width={22} height={22} aria-hidden="true" />
              <span className="finances-payment-option__text">
                <span className="finances-payment-option__sublabel">
                  E-TRANSFER
                </span>
                <strong className="finances-payment-option__name">
                  Przelew online
                </strong>
              </span>
            </button>
          </div>
        </fieldset>

        <a
          href="https://blik.com"
          target="_blank"
          rel="noopener noreferrer"
          className="finances-pay-btn"
        >
          <ShieldCheckIcon width={18} height={18} aria-hidden="true" />
          Zapłać teraz ({TOTAL_AMOUNT} PLN)
        </a>
      </section>

      {/* ── Historia ── */}
      <section className="finances-card" aria-labelledby="heading-history">
        <div className="finances-card__header">
          <span
            className="finances-card__icon-wrap theme-bg-tickets"
            aria-hidden="true"
          >
            <HistoryIcon
              width={20}
              height={20}
              className="theme-text-tickets"
            />
          </span>
          <h2 className="finances-card__title" id="heading-history">
            Historia
          </h2>
        </div>

        <ul
          id="finances-history-list"
          className="finances-history-grid"
          aria-label="Historia transakcji"
          aria-live="polite"
        >
          {visibleHistory.map((tx) => (
            <li key={tx.id} className="finances-tx">
              <span className="finances-tx__date">{tx.date}</span>
              <div className="finances-tx__row">
                <span className="finances-tx__title">{tx.title}</span>
                <strong
                  className={`finances-tx__amount${tx.negative ? " finances-tx__amount--negative" : ""}`}
                >
                  {tx.amount} PLN
                </strong>
              </div>
              <div className="finances-tx__badges">
                <span
                  className={`finances-tx__badge finances-tx__badge--${
                    tx.status === "ZAKSIĘGOWANO" ? "success" : "correction"
                  }`}
                >
                  {tx.status}
                </span>
                <span className="finances-tx__badge finances-tx__badge--method">
                  {tx.method}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="finances-show-more"
          onClick={() => setShowMore((prev) => !prev)}
          aria-expanded={showMore}
          aria-controls="finances-history-list"
        >
          {showMore ? "POKAŻ MNIEJ TRANSAKCJI" : "POKAŻ WIĘCEJ TRANSAKCJI"}
          <ChevronDownIcon
            width={14}
            height={14}
            aria-hidden="true"
            className={showMore ? "finances-chevron--rotated" : ""}
          />
        </button>
      </section>
    </main>
  );
}