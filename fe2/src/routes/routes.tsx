import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { CookiesProvider } from 'react-cookie';
import UserLayout from '../pages/Layout/UserLayout';
import Guard from '../guards/AuthGuard';
import NotFound404 from '../pages/NotFound404';
import UserProfile from '../pages/UserProfile';
import UserManagement from '../pages/UserManagement';
import { AdminEC, StudentEC } from '../models/Guard';
import { LoginLayout } from '../pages/LoginLayout';
import { Register } from '../pages/Register';
import Login from '../pages/Login';
import Landingpage from '../pages/Landingpage';

export default function AppRoute() {
  const AdminGuard: GuardEC = {
    guardEntity: AdminEC,
  };

  const StudentGuard: GuardEC = {
    guardEntity: StudentEC,
  };

  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          {/* public routes */}
          <Route element={<LoginLayout />}>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
