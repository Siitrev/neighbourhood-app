import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  DashboardIcon,
  FinanceIcon,
  TicketsIcon,
  CommunicationIcon,
  ProfileIcon,
  LogoutIcon,
} from '../icons';
import './Navbar.css';

const navigationItems = [
  { to: '/', label: 'Pulpit', icon: DashboardIcon, end: true },
  { to: '/finances', label: 'Finanse', icon: FinanceIcon },
  { to: '/tickets', label: 'Zgłoszenia', icon: TicketsIcon },
  { to: '/communication', label: 'Komunikacja', icon: CommunicationIcon },
  { to: '/profile', label: 'Mój Profil', icon: ProfileIcon },
];

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userName = currentUser?.name || 'Jan Kowalski';
  const [avatarError, setAvatarError] = React.useState(false);
  const avatarSrc = currentUser?.avatarUrl || '/profile-avatar.png';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login', { replace: true });
  };

  return (
    <aside className="side-nav" aria-label="Główna nawigacja">
      <div className="side-nav__brand">
        <img src="/logo.svg" alt="Neighbourhood" className="side-nav__logo" />
      </div>

      <nav className="side-nav__menu">
        {navigationItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `side-nav__link${isActive ? ' side-nav__link--active' : ''}`
            }
          >
            <span className="side-nav__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="side-nav__label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="side-nav__bottom">
        <div className="side-nav__profile">
          <div className="side-nav__avatar" aria-hidden="true">
            {!avatarError ? (
              <img
                src={avatarSrc}
                alt=""
                className="side-nav__avatar-image"
                onError={() => setAvatarError(true)}
              />
            ) : (
              userInitial
            )}
          </div>
          <div className="side-nav__profile-text">
            <span className="side-nav__profile-name">{userName}</span>
            <span className="side-nav__profile-subtitle">Lokal nr 42</span>
          </div>
        </div>

        <button type="button" className="side-nav__logout" onClick={handleLogout}>
          <span className="side-nav__logout-icon" aria-hidden="true">
            <LogoutIcon />
          </span>
          <span className="side-nav__logout-label">Wyloguj</span>
        </button>
      </div>
    </aside>
  );
}