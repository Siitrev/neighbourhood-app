import React from 'react';
import Button from '../buttons/Button';

export default function DashboardCard({
  icon: Icon,
  iconBgClass = '',
  iconColorClass = '',
  imageSrc,
  notificationCount,
  label,
  labelColorClass = '',
  badgeText,
  title,
  titleIsValue = false,
  description,
  buttonText,
  onClick
}) {
  return (
    <article className="dashboard-card">
      <div className="card-main-content">
        {imageSrc ? (
          <div className="card-image-preview">
            <img src={imageSrc} alt="Miniaturka ogłoszenia" className="announcement-image" />
          </div>
        ) : (
          <div className={`card-icon-box ${iconBgClass}`}>
            {notificationCount != null && (
              <span className="card-notification-tag">{notificationCount}</span>
            )}
            {Icon && <Icon className={`card-icon ${iconColorClass}`} />}
          </div>
        )}
        <div className="card-text-stack">
          {badgeText ? (
            <div className="card-inline-group">
              <span className={`card-label ${labelColorClass}`}>{label}</span>
              <span className="card-badge-status">{badgeText}</span>
            </div>
          ) : (
            <span className={`card-label ${labelColorClass}`}>{label}</span>
          )}
          <h2 className={titleIsValue ? 'card-value' : 'card-headline'}>{title}</h2>
          <p className="card-desc">{description}</p>
        </div>
      </div>
      <Button className="dashboard-action-btn" onClick={onClick}>
        {buttonText}
      </Button>
    </article>
  );
}