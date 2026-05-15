import React from 'react';
import { HomeIcon } from '../../../components/icons';

export default function ApartmentDetails({ address, apartmentNumber, floor, area }) {
  return (
    <div className="blue-card">
      <header className="blue-card-header">
        <HomeIcon className="blue-card-icon" />
        <h2>Dane Lokalu</h2>
      </header>
      
      <div className="blue-card-details">
        <div className="detail-row">
          <span className="detail-label">ADRES</span>
          <strong className="detail-value">{address}</strong>
        </div>
        <div className="detail-grid">
          <div className="detail-col">
            <span className="detail-label">NR LOKALU</span>
            <strong className="detail-value">{apartmentNumber}</strong>
          </div>
          <div className="detail-col">
            <span className="detail-label">PIĘTRO</span>
            <strong className="detail-value">{floor}</strong>
          </div>
        </div>
        <div className="detail-row">
          <span className="detail-label">METRAŻ</span>
          <strong className="detail-value">{area}</strong>
        </div>
      </div>

      <div className="blue-card-footer">
        <div className="info-icon">i</div>
        <p>Dane lokalu są synchronizowane automatycznie. W przypadku błędów skontaktuj się z administracją.</p>
      </div>
    </div>
  );
}