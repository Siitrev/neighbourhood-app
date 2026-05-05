import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
        <Route path="/login" element={<Login />} />
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
    </BrowserRouter>
  );
}

export default App;
