import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { CookiesProvider } from 'react-cookie';
import UserLayout from '../pages/Layout/UserLayout';
import Guard from '../guards/AuthGuard';
import NotFound404 from '../pages/NotFound404';
import UserProfile from '../pages/UserProfile';
import { AdminEC, StudentEC } from '../models/Guard';
import { LoginLayout } from '../pages/LoginLayout';
import { Register } from '../pages/Register';
import Login from '../pages/Login';
import Landingpage from '../pages/Landingpage';
import Examination from '../pages/Examination';
import ResearchBoard from '../pages/ResearchBoard';
import AuthorizationList from '../pages/CaseDetail';
import CaseForm from '../components/forms/CaseForm';
import ExaminationForm from '../components/forms/ExaminationForm';
import Pill from '../components/Pill';
import PatientList from '../pages/PatientList';
import CaseDetail from '../pages/CaseDetail';
import DoctorProfile from '../pages/DoctorProfile';
import FindDoctor from '../pages/FindDoctor';
import AnotherProfile from '../pages/AnotherProfile';
import CaseTable from '../components/CaseTable';
import SearchByKeyWord from '../pages/SearchByKeyword';



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
              <Route path="patient/examination/:username/:medicalinforID" element={<Examination />} />
              <Route path="operator/profile/:username" element={<DoctorProfile />} />
              <Route path="operator/patient/info/:username/:medical_id" element={<AnotherProfile />} />
              <Route path="patient/case/:medical_id/:case_id" element={<CaseDetail/>} />
              <Route path="patient/authorize/:username/:medical_id" element={<FindDoctor />} />

            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/operator/addcase/:doctor_username" element={<CaseForm />} />
          <Route path="/operator/appendcase/:doctor_username" element={<ExaminationForm />} />
          <Route path="/operator/patient/list" element={<PatientList/>} />
          <Route path="/operator/search/" element={<SearchByKeyWord/>} />
          <Route path="/operator/search/medicalinfo/table/:medical_id" element={<CaseTable/>} />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
