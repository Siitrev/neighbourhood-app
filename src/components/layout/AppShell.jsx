import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import useContentsquareTracking from '../content-square/useContentsquare';
import './AppShell.css';

export default function AppShell() {
  useContentsquareTracking();
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}
