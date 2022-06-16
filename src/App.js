import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from 'utils/PrivateRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { productInputs, userInputs } from 'formData';
import { useGlobalContext } from 'context/darkMode/DarkModeContext';
import {
  Home,
  Layout,
  List,
  Login,
  New,
  NotFound,
  SharedLayout,
  Single,
} from 'pages';

import './style/dark.scss';

function App() {
  const { darkMode } = useGlobalContext();

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Router>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='users'
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<List />} />
              <Route path=':userId' element={<Single />} />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add new user' />}
              />
            </Route>
            <Route
              path='products'
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<List />} />
              <Route path=':productId' element={<Single />} />
              <Route
                path='new'
                element={<New inputs={productInputs} title='Add new product' />}
              />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
