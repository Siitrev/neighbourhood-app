import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../firebase/AuthContext';
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

export default function Navbar() {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const userName = userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}` : (user?.displayName || user?.email?.split('@')[0] || 'Jan Kowalski');
  const [avatarError, setAvatarError] = React.useState(false);
  const avatarSrc = user?.photoURL || '/profile-avatar.png';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error("Błąd podczas wylogowywania:", err);
    }
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
            <span className="side-nav__profile-name">{userName} {console.log(userData)}</span>
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