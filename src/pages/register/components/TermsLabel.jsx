import React from 'react';
import { LinkButton } from '../../../components/buttons';
import './TermsLabel.css';

export const TermsLabel = ({handleRegulations, handlePrivacy}) => {
  return (
    <span className="terms-text">
      Akceptuję{' '}
      <LinkButton
        className="terms-link"
        onClick={handleRegulations}
      >
        Regulamin
      </LinkButton>{' '}
      oraz{' '}
      <LinkButton
        className="terms-link"
        onClick={handlePrivacy}
      >
        Politykę Prywatności
      </LinkButton>{' '}
      platformy Neighbourhood.
    </span>
  );
}

export default TermsLabel;