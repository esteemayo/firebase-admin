import { DARK, LIGHT, TOGGLE } from './DarkModeTypes';

const DarkModeReducer = (state, { type }) => {
  if (type === LIGHT) {
    return {
      ...state,
      darkMode: false,
    };
  }

  if (type === DARK) {
    return {
      ...state,
      darkMode: true,
    };
  }

  if (type === TOGGLE) {
    return {
      ...state,
      darkMode: !state.darkMode,
    };
  }

  throw new Error('No matching action type');
};

export default DarkModeReducer;
