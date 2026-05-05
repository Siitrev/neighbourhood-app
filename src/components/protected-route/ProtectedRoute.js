import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('currentUser'); 
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;