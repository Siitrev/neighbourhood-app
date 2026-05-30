import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import AppShell from './components/layout/AppShell';
import CreatePost from './pages/create-post/CreatePost';
import { AuthProvider } from './firebase/AuthContext';
import ScrollToTop from './components/layout/ScrollToTop'
import { ToastContainer } from "react-toastify";
import './styles/variables.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer position="top-right"autoClose={3000}/>
        <ScrollToTop />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register/:token" element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="finances" element={<Finances />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="profile" element={<Profile />} />
            <Route path="communication">
              <Route index element={<Communication />} />
              <Route path="forum/:threadId" element={<ForumThread />} />
              <Route path="chat" element={<Chat />} />
              <Route path="create-post" element={<CreatePost />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
