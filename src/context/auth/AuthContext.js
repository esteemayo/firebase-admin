import { createContext, useReducer, useContext, useEffect } from 'react';

import AuthReducer from './AuthReducer';
import { LOGIN, LOGOUT } from './AuthTypes';

const getLocalStorage = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const INITIAL_STATE = {
  currentUser: getLocalStorage(),
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  const loginUser = (user) => {
    dispatch({
      type: LOGIN,
      payload: user,
    });
  };

  const logoutUser = () => {
    localStorage.clear();
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
