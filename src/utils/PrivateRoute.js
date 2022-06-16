import LoadingToRedirect from './LoadingToRedirect';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useGlobalAuthContext();

  return currentUser ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
