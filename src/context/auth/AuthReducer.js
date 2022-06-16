import { LOGIN, LOGOUT } from './AuthTypes';

const AuthReducer = (state, { payload, type }) => {
  if (type === LOGIN) {
    return {
      ...state,
      currentUser: payload,
    };
  }

  if (type === LOGOUT) {
    return {
      ...state,
      currentUser: null,
    };
  }

  throw new Error('No matching action type');
};

export default AuthReducer;
