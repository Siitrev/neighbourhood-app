import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword';
import Register from './pages/register/Register';
import Chat from './pages/chat/Chat';
import Communication from './pages/communication/Communication';
import Dashboard from './pages/dashboard/Dashboard';
import Finances from './pages/finances/Finances';
import Tickets from './pages/tickets/Tickets';
import Profile from './pages/profile/Profile';
import ForumThread from './pages/forum-thread/ForumThread';

import './styles/variables.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register/:token" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } /> 
        
        <Route path="/finances" element={
          <ProtectedRoute>
            <Finances />
          </ProtectedRoute>
        } />
        <Route path="/tickets" element={
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/communication" element={
          <ProtectedRoute>
            <Communication />
          </ProtectedRoute>
        } /> 
        <Route path="/communication/forum/:threadId" element={
          <ProtectedRoute>
            <ForumThread />
          </ProtectedRoute>
        } /> 
        <Route path="/communication/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
