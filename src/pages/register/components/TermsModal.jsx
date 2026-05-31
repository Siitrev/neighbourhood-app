import React, { useEffect, useRef } from 'react';
import './TermsModal.css';

export default function TermsModal({ activeModal, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  useEffect(() => {
    if (!activeModal) return;

    lastActiveElementRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const container = modalRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;

      const lastActive = lastActiveElementRef.current;
      if (lastActive && typeof lastActive.focus === 'function') {
        lastActive.focus();
      }
    };
  }, [activeModal, onClose]);

  if (!activeModal) {
    return null;
  }

  return (
    <div className="terms-modal__overlay" onClick={onClose}>
      <div
        className="terms-modal__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terms-modal__header">
          <h3 id="terms-modal-title">
            {activeModal === 'regulations' ? 'Regulamin Platformy' : 'Polityka Prywatności'}
          </h3>
          <button
            type="button"
            className="terms-modal__close"
            onClick={onClose}
            aria-label="Zamknij"
            ref={closeButtonRef}
          >
            &times;
          </button>
        </div>
        <div className="terms-modal__body">
          <p>
            <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </p>
        </div>
      </div>
    </div>
  );
}
