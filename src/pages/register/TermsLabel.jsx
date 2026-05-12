import React from 'react';
import { LinkButton } from '../../components/buttons';
import './TermsLabel.css';

export const TermsLabel = () => {
  return (
    <span className="terms-text">
      Akceptuję{' '}
      <LinkButton
        className="terms-link"
        onClick={() => alert('Regulamin nie jest jeszcze dostępny w aplikacji.')}
      >
        Regulamin
      </LinkButton>{' '}
      oraz{' '}
      <LinkButton
        className="terms-link"
        onClick={() =>
          alert('Polityka Prywatności nie jest jeszcze dostępna w aplikacji.')
        }
      >
        Politykę Prywatności
      </LinkButton>{' '}
      platformy Neighbourhood.
    </span>
  );
}

export default TermsLabel;