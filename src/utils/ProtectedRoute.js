import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useGlobalAuthContext();

  return currentUser ? <Navigate to='/' /> : children;
};

export default ProtectedRoute;
