import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { CookiesProvider } from 'react-cookie';
import UserLayout from '../pages/Layout/UserLayout';
import Guard from '../guards/AuthGuard';
import NotFound404 from '../pages/Landing/NotFound404';
import UserProfile from '../pages/User/UserProfile';
import { AdminEC, StudentEC } from '../models/Guard';
import { LoginLayout } from '../pages/Layout/LoginLayout';
import { Register } from '../pages/Landing/Register';
import Login from '../pages/Landing/Login';
import Landingpage from '../pages/Landing/Landingpage';
import AuthorizationList from '../pages/Case/CaseDetail';
import CaseForm from '../components/forms/CaseForm';
import ExaminationForm from '../components/forms/ExaminationForm';
import Pill from '../components/Pill';
import CaseDetail from '../pages/Case/CaseDetail';
import DoctorProfile from '../pages/Operator/DoctorProfile';
import UserAuthorizeDoctor from '../pages/User/UserAuthorizeDoctorPage';
import AnotherProfile from '../pages/User/AnotherProfile';
import CaseTable from '../components/Table/CaseTable';
import SearchByKeyWord from '../pages/Case/SearchByKeyword';
import ResearcherProfile from '../pages/Operator/ResearcherProfile';
import CaseResult from '../pages/Case/CaseResult';


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
              <Route path="patient/profile/:username/:medical_id" element={<UserProfile />} />
              <Route path="operator/profile/:doctor_username" element={<DoctorProfile />} />
              <Route path="operator/patient/info/:username/:doctor_username/:medical_id" element={<AnotherProfile />} />
              <Route path="patient/case/:medical_id/:case_id" element={<CaseDetail/>} />
              <Route path="patient/authorize/:username/:medical_id" element={<UserAuthorizeDoctor />} />
              <Route path="researcher/" element={<ResearcherProfile />} />

            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/operator/addcase/:doctor_username" element={<CaseForm />} />
          <Route path="/operator/appendcase/:doctor_username" element={<ExaminationForm />} />
          <Route path="/operator/search/:doctor_username" element={<SearchByKeyWord/>} />
          <Route path="/operator/search/:doctor_username/medicalinfo/table/:medical_id" element={<CaseResult/>} />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
