import React, { useState, useEffect, useMemo } from 'react';
import './Finances.css';
import {
  HomeIcon,
  FinanceIcon,
  WrenchIcon,
  WaterDropIcon,
  TermometerIcon,
  TrashIcon,
  HistoryIcon,
  PhoneIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ReceiptIcon,
  ChevronDownIcon,
  CheckIcon,
} from '../../components/icons';
import { Button } from '../../components/buttons';

const TOTAL_AMOUNT = '842,50';
const TRANSFER_TITLE = 'Opłata eksploatacyjna 06/2026';

const CURRENT_FEES = [
  { id: 'czynsz',     Icon: HomeIcon,      label: 'Czynsz',     amount: '450,00 PLN' },
  { id: 'remonty',    Icon: WrenchIcon,    label: 'Remonty',    amount: '120,00 PLN' },
  { id: 'woda',       Icon: WaterDropIcon, label: 'Woda',       amount: '115,50 PLN' },
  { id: 'ogrzewanie', Icon: TermometerIcon, label: 'Ogrzewanie', amount: '95,00 PLN'  },
  { id: 'smieci',     Icon: TrashIcon,     label: 'Śmieci',     amount: '62,00 PLN'  },
];

const HISTORY_INITIAL = [
  { id: 1, date: '13 MAJ 2026', title: 'Opłata eksploatacyjna 05/2026',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 2, date: '15 KWI 2026', title: 'Opłata eksploatacyjna 04/2026',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false  },
  { id: 3, date: '10 MAR 2026', title: 'Opłata eksploatacyjna 03/2026',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 4, date: '12 LUT 2026', title: 'Opłata eksploatacyjna 02/2026',   amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
];

const HISTORY_EXTRA = [
  { id: 5,  date: '15 STY 2026', title: 'Opłata eksploatacyjna 01/2026',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 6,  date: '12 GRU 2025', title: 'Opłata eksploatacyjna 12/2025',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 7,  date: '10 LIS 2025', title: 'Opłata eksploatacyjna 11/2025',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 8,  date: '13 PAŹ 2025', title: 'Opłata eksploatacyjna 10/2025',        amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
  { id: 9, date: '15 WRZ 2025', title: 'Opłata eksploatacyjna 09/2025',         amount: '842,50',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 10, date: '14 SIE 2025', title: 'Opłata eksploatacyjna 08/2025',        amount: '798,00',  status: 'ZAKSIĘGOWANO', method: 'BLIK',      negative: false },
  { id: 11, date: '13 LIP 2025', title: 'Opłata eksploatacyjna 07/2025',        amount: '798,00',  status: 'ZAKSIĘGOWANO', method: 'Przelew',   negative: false },
];

export default function Finances() {
  const [paymentMethod, setPaymentMethod] = useState("blik");
  const [showMore, setShowMore] = useState(false);
  
  const [isPaid, setIsPaid] = useState(() => localStorage.getItem('ifPaymentDone') === 'true');
  const [showBlikModal, setShowBlikModal] = useState(false);
  const [blikCode, setBlikCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePayNow = () => {
    if(paymentMethod === "blik") {
      setShowBlikModal(true);
      setBlikCode('');
    } else {
      window.open('https://www.przelewy24.pl/demo/demo.php', '_blank', 'noopener,noreferrer');
    }
  };

  const handleBlikSubmit = (e) => {
    e.preventDefault();
    if (blikCode.length !== 6) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowBlikModal(false);
      setIsPaid(true);
      localStorage.setItem('ifPaymentDone', 'true');
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 2000);
  };

  const visibleHistory = useMemo(() => {
    let history = showMore ? [...HISTORY_INITIAL, ...HISTORY_EXTRA] : [...HISTORY_INITIAL];
    
    if (isPaid) {
      history = [
        { 
          id: 'new_payment', 
          date: 'DZISIAJ', 
          title: TRANSFER_TITLE, 
          amount: TOTAL_AMOUNT, 
          status: 'ZAKSIĘGOWANO', 
          method: 'BLIK', 
          negative: false 
        },
        ...history
      ];
    }
    return history;
  }, [showMore, isPaid]);

  return (
    <main className="finances-wrapper">
      
      {/* ── Toast Sukcesu ── */}
      {showToast && (
        <div className="finances-toast" role="status" aria-live="polite">
          <CheckIcon width={18} height={18} aria-hidden="true" />
          Płatność BLIK przebiegła pomyślnie!
        </div>
      )}

      {/* ── Modal BLIK ── */}
      {showBlikModal && (
        <div className="finances-modal-overlay">
          <div className="finances-modal">
            <h3 className="finances-card__title">Płatność BLIK</h3>
            <p className="finances-subtitle" style={{ fontSize: '14px' }}>
              Przepisz 6-cyfrowy kod z aplikacji mobilnej Twojego banku, aby zatwierdzić płatność w wysokości <strong>{TOTAL_AMOUNT} PLN</strong>.
            </p>
            
            <form onSubmit={handleBlikSubmit} className="finances-blik-form">
              <input
                type="text"
                className="finances-field-input finances-blik-input"
                placeholder="000 000"
                maxLength="6"
                autoFocus
                disabled={isProcessing}
                value={blikCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setBlikCode(val);
                }}
              />
            
              <div className="finances-modal-actions">
                <Button 
                  type="button" 
                  className="finances-modal-btn-cancel" 
                  onClick={() => setShowBlikModal(false)}
                  disabled={isProcessing}
                >
                  Anuluj
                </Button>
                <Button 
                  type="submit" 
                  className="finances-modal-btn-submit" 
                  disabled={blikCode.length !== 6 || isProcessing}
                >
                  {isProcessing ? 'Przetwarzanie...' : 'Potwierdź kod'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="finances-header">
        <h1 className="finances-title">Finanse</h1>
        <p className="finances-subtitle">
          Zarządzaj swoimi opłatami i historią transakcji.
        </p>
      </header>

      {/* Wyświetlanie warunkowe: Zależne od statusu opłacenia */}
      {!isPaid ? (
        <>
          {/* ── Bieżące Opłaty ── */}
          <section className="finances-card" aria-labelledby="heading-fees">
            <div className="finances-card__header">
              <span
                className="finances-card__icon-wrap theme-bg-finance"
                aria-hidden="true"
              >
                <ReceiptIcon width={20} height={20} className="theme-text-finance" />
              </span>
              <h2 className="finances-card__title" id="heading-fees">
                Bieżące Opłaty
              </h2>
            </div>

            <ul className="finances-fees-grid" aria-label="Lista bieżących opłat">
              {CURRENT_FEES.map(({ id, Icon, label, amount }) => (
                <li key={id} className={`finances-fee-item finances-fee-item--${id}`}>
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
                <FinanceIcon width={20} height={20} className="theme-text-finance" />
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
                <input
                  className="finances-field-input finances-field-input--amount"
                  aria-labelledby="label-amount"
                  readOnly
                  value={`${TOTAL_AMOUNT} PLN`}
                />
              </div>
              <div className="finances-pay-field">
                <label
                  className="finances-field-label"
                  htmlFor="transfer-title-display"
                >
                  TYTUŁ PRZELEWU
                </label>
                <input
                  className="finances-field-input finances-field-input--title"
                  id="transfer-title-display"
                  readOnly
                  value={TRANSFER_TITLE}
                />
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
                  <PhoneIcon width={19} height={28} aria-hidden="true" />
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
                  <GlobeIcon width={25} height={25} aria-hidden="true" />
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

            <Button type="button" className="finances-pay-btn" onClick={handlePayNow}>
              <ShieldCheckIcon width={16} height={20} aria-hidden="true" />
              Zapłać teraz ({TOTAL_AMOUNT} PLN)
            </Button>
          </section>
        </>
      ) : (
        /* ── Brak bieżących opłat (Sukces) ── */
        <section className="finances-card finances-paid-state">
          <div className="finances-paid-icon-wrap">
            <CheckIcon width={48} height={48} className="theme-text-finance" />
          </div>
          <h2 className="finances-card__title" style={{ textAlign: 'center' }}>Brak bieżących płatności</h2>
          <p className="finances-subtitle" style={{ textAlign: 'center' }}>
            Wszystkie Twoje rachunki i opłaty eksploatacyjne są uregulowane. Dziękujemy!
          </p>
        </section>
      )}

      {/* ── Historia ── */}
      <section className="finances-card" aria-labelledby="heading-history">
        <div className="finances-card__header">
          <span
            className="finances-card__icon-wrap theme-bg-tickets"
            aria-hidden="true"
          >
            <HistoryIcon width={20} height={20} className="theme-text-tickets" />
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