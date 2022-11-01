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
import Examination from '../pages/Examination';
import ResearchBoard from '../pages/ResearchBoard';
import AuthorizationList from '../pages/AuthorizationList';
import CaseForm from '../components/forms/CaseForm';
import UserTable from '../components/UserTable';
import ExaminationForm from '../components/forms/ExaminationForm';

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

          {/* user routes */}
          <Route path="/user/*">
            <Route element={<UserLayout />}>
              <Route path="patient/profile/:username" element={<UserProfile />} />
              <Route path="patient/examination/:username/:medicalinforID" element={<Examination />} />
              <Route path="admin/user_management" element={<UserTable />} />
              <Route path="operator/patient/operator/queryall" element={<AuthorizationList />} />
              <Route path="operator/research/queryall" element={<ResearchBoard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/addcase/:medinfo_id" element={<CaseForm />} />
          <Route path="/appendcase/:medinfo_id/:case_id" element={<ExaminationForm />} />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
