import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ClientPage from './pages/ClientPage';
import BillingPage from './pages/BillingPage';
import UserPage from './pages/UserPage';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <ClientPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <BillingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
            <PrivateRoute>
            <UserPage />
            </PrivateRoute>
        }
        />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;